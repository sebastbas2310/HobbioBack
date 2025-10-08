import jwt from "jsonwebtoken";

const authService = (req, res, next) => {
  const token = req.header("Authorization");

  console.log("Token recibido:", token); // <-- Log para ver el token recibido

  if (!token) {
    return res
      .status(401)
      .json({ error: "Acceso denegado. Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    console.log("Token decodificado:", decoded); // <-- Log para ver el payload decodificado
    req.usuario = decoded;
    next();
  } catch (error) {
    console.log("Error al verificar token:", error); // <-- Log para ver errores de verificación
    return res.status(403).json({ error: "El token ha expirado o es inválido" });
  }
};

export default authService;
