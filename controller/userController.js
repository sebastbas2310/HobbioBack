// controller/userController.js
import bcrypt from "bcryptjs";
import { supabase } from "../config/supabaseClient.js";

const UserController = {
  getUser: async (req, res) => {
    try {
      const { data: users, error } = await supabase.from("users").select("*");
      if (error) throw error;
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  addUser: async (req, res) => {
    try {
      const { user_name, user_status, email, password, things_like, phone_number } = req.body;

      if (!password) {
        return res.status(400).json({ error: "La contraseña es obligatoria" });
      }

      // Revisar si el usuario ya existe
      const { data: existingUser, error: findError } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

      if (findError && findError.code !== "PGRST116") throw findError; // PGRST116 = no encontrado

      if (existingUser) {
        return res.status(400).json({ error: "El usuario ya existe" });
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
      res.status(500).json({ error: error.message });
    }
  },

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
};

export default UserController;
