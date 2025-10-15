import jwt from "jsonwebtoken";

const authService = (req, res, next) => {
  // Usa headers en minúsculas (Express los normaliza así)
  const authHeader = req.headers.authorization;
  console.log("🔹 Encabezado Authorization recibido:", authHeader);

  // Validar existencia del encabezado
  if (!authHeader) {
    return res
      .status(401)
      .json({ error: "Acceso denegado. No se proporcionó un token." });
  }

  // Extraer el token (eliminar 'Bearer ')
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7).trim()
    : authHeader.trim();

  console.log("🔹 Token limpio:", token);

  try {
    // Verificar el token con el mismo secreto usado al crearlo
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token decodificado correctamente:", decoded);

    // Guardar el usuario en la request para uso posterior
    req.usuario = decoded;

    next(); // 👈 continuar a la siguiente función (el controlador)
  } catch (error) {
    console.error("❌ Error al verificar token:", error.message);
    return res
      .status(403)
      .json({ error: "El token ha expirado o es inválido." });
  }
};

export default authService;
