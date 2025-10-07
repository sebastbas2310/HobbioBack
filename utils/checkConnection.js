import { supabase } from "../config/supabaseClient.js";

export async function checkConnection() {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("user_id")
      .limit(1);

    if (error) {
      console.error("❌ No se pudo conectar a la base de datos:", error.message);
    } else {
      console.log("✅ Conexión a la base de datos establecida correctamente");
    }
  } catch (err) {
    console.error("❌ Error inesperado al verificar la base de datos:", err.message);
  }
}
