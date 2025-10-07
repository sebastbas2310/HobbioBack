import { Router } from "express";
import { login } from "../controller/authController.js";
import { register } from "../controller/authController.js";

const router = Router();

router.post("/login", login);
router.post("/register", register);

export default router;
