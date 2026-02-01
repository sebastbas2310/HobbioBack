// controller/userController.js
import bcrypt from "bcryptjs";
import { supabase } from "../config/supabaseClient.js";

const UserController = {
  // Obtener todos los usuarios
  getUser: async (req, res) => {
    try {
      const { data: users, error } = await supabase.from("users").select("*");
      if (error) throw error;
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Agregar nuevo usuario
  addUser: async (req, res) => {
    try {
      const { user_name, user_status, email, password, things_like, phone_number } = req.body;

      if (!password) {
        return res.status(400).json({ error: "La contraseña es obligatoria" });
      }

      // Verificar si ya existe el usuario
      const { data: existingUser, error: findError } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

      if (findError && findError.code !== "PGRST116") throw findError;

      if (existingUser) {
        return res.status(400).json({ error: "El correo ya está registrado" });
      }

      const passwordH = await bcrypt.hash(password, 10);

      const { data: newUser, error: insertError } = await supabase
        .from("users")
        .insert([{ user_name, user_status, email, password: passwordH, things_like, phone_number }])
        .select()
        .single();

      if (insertError) throw insertError;

      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message || "Error interno del servidor" });
    }
  },

  // Actualizar datos de usuario
  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { user_name, user_status, email, password, things_like, phone_number } = req.body;

      const updates = {};
      if (user_name) updates.user_name = user_name;
      if (user_status !== undefined) updates.user_status = user_status;
      if (email) updates.email = email;
      if (things_like) updates.things_like = things_like;
      if (phone_number) updates.phone_number = phone_number;
      if (password) updates.password = await bcrypt.hash(password, 10);

      const { data: updatedUser, error } = await supabase
        .from("users")
        .update(updates)
        .eq("user_id", id)
        .select()
        .single();

      if (error) throw error;

      res.status(200).json({
        message: "Usuario actualizado correctamente",
        User: updatedUser,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Cambiar estado del usuario
  changeUserStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { user_status } = req.body;

      if (!["Activo", "Inactivo"].includes(user_status)) {
        return res.status(400).json({ error: "Estado inválido. Use 'Activo' o 'Inactivo'." });
      }

      const { data: updatedUser, error } = await supabase
        .from("users")
        .update({ user_status })
        .eq("user_id", id)
        .select()
        .single();

      if (error) throw error;

      res.json({ message: `Estado actualizado a ${user_status}`, User: updatedUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Obtener usuario por ID
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;

      const { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", id)
        .single();

      if (error) throw error;

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // 🔹 Cambiar contraseña del usuario
  changePassword: async (req, res) => {
    try {
      const { id } = req.params;
      const { oldPassword, newPassword } = req.body;

      if (!oldPassword || !newPassword) {
        return res.status(400).json({ error: "Debes proporcionar la contraseña actual y la nueva." });
      }

      // 1️⃣ Buscar usuario
      const { data: user, error: userError } = await supabase
        .from("users")
        .select("password")
        .eq("user_id", id)
        .single();

      if (userError) throw userError;
      if (!user) return res.status(404).json({ error: "Usuario no encontrado." });

      // 2️⃣ Verificar contraseña actual
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "La contraseña actual es incorrecta." });
      }

      // 3️⃣ Hashear nueva contraseña
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // 4️⃣ Actualizar en base de datos
      const { data: updatedUser, error: updateError } = await supabase
        .from("users")
        .update({ password: hashedPassword })
        .eq("user_id", id)
        .select()
        .single();

      if (updateError) throw updateError;

      res.status(200).json({
        message: "Contraseña actualizada correctamente.",
        user: updatedUser,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default UserController;
