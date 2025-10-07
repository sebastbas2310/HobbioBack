import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import process from "process";
import { Sequelize, DataTypes } from "sequelize";
import configFile from "../config/config.js";

// Necesario para reemplazar __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = configFile[env];
const db = {};

// Inicializar Sequelize
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// Autenticación inicial
sequelize
  .authenticate()
  .then(() => console.log("✅ Conexión establecida con Sequelize"))
  .catch((err) =>
    console.error("❌ Error al conectar con Sequelize:", err.message)
  );

// Cargar todos los modelos dinámicamente
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      !file.endsWith(".test.js")
    );
  })
  .forEach(async (file) => {
    const modelModule = await import(path.join(__dirname, file));
    const model = modelModule.default(sequelize, DataTypes);
    db[model.name] = model;
  });

// Ejecutar asociaciones
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
