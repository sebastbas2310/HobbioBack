import { supabase } from "../config/supabaseClient.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

/**
 * ✅ REGISTRO
 */
export const register = async (req, res) => {
  const { user_name, email, password, phone_number, things_like } = req.body;

  if (!email || !password || !user_name) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  try {
    // 1️⃣ Verificar si el correo ya existe
    const { data: existingUser } = await supabase
      .from("users")
      .select("email")
      .eq("email", email)
      .maybeSingle();

    if (existingUser) {
      return res.status(409).json({ error: "El correo ya está registrado" });
    }

    // 2️⃣ Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3️⃣ Insertar usuario
    const { data, error } = await supabase.from("users").insert([
      {
        user_name,
        email,
        password: hashedPassword,
        phone_number,
        things_like,
      },
    ]);

    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Error al crear el usuario" });
    }

    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

/**
 * ✅ LOGIN
 */
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    const esPasswordCorrecto = await bcrypt.compare(password, user.password);
    if (!esPasswordCorrecto) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user.user_id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

/**
 * ✅ VERIFICAR CORREO
 */
export const checkEmail = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Falta el parámetro email" });
  }

  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("email")
      .eq("email", email)
      .maybeSingle();

    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Error consultando la base de datos" });
    }

    res.json({ exists: !!user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
