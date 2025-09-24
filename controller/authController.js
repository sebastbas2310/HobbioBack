const { worker } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    // Buscar usuario por email
    const Worker = await worker.findOne({ where: { email } });

    if (!Worker) {
      return res.status(400).json({ error: "Usuario no encontrado." });
    }

    // Validar contraseña
    const esPasswordCorrecto = await bcrypt.compare(password, Worker.password);
    if (!esPasswordCorrecto) {
      return res.status(401).json({ error: "Contraseña incorrecta." });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: Worker.id, email: Worker.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = { login };