import { supabase } from "../config/supabaseClient.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar usuario en la tabla "user"
    const { data: users, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single(); // `.single()` devuelve un objeto en lugar de array

    if (error || !users) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    const esPasswordCorrecto = await bcrypt.compare(password, users.password);
    if (!esPasswordCorrecto) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }
    
    const token = jwt.sign(
      { id: users.user_id, email: users.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
