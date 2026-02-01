// routes/userRoutes.js
import express from "express";
import UserController from "../controller/userController.js";

const router = express.Router();

// Rutas de usuarios
router.get("/", UserController.getUser);
router.get("/:id", UserController.getUserById);
router.post("/", UserController.addUser);
router.put("/:id", UserController.updateUser);
router.patch("/:id/status", UserController.changeUserStatus);

// 🔹 Nueva ruta para cambiar contraseña
router.put("/:id/change-password", UserController.changePassword);

export default router;
