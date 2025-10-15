import { Router } from "express";
import UserController from "../controller/userController.js"; // ✅ default import
import authService from "../services/authService.js";

const router = Router();

router.get("/", UserController.getUser);
router.post("/adduser", UserController.addUser);
router.put("/:id", authService, UserController.updateUser);
router.post("/ChangeStatus/:id", authService, UserController.changeUserStatus);
router.get("/:id", authService, UserController.getUserById);
router.put("/:id/change-password", authService, UserController.changePassword);

export default router;
