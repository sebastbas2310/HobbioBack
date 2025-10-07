import { Router } from "express";
import UserController from "../controller/userController.js"; // ✅ default import
import authService from "../services/authService.js";

const router = Router();

router.get("/", UserController.getUser);
router.post("/adduser", UserController.addUser);
router.post("/:id", authService, UserController.updateUser);
router.post("/ChangeStatus/:id", authService, UserController.changeUserStatus);
router.get("/:id", authService, UserController.getUserById);

export default router;
