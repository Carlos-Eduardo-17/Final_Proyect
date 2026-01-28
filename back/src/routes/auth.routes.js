import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// =========================
// Auth
// =========================

router.post("/register", authController.register);
router.post("/verify-email", authController.verifyEmail);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.get("/me", authMiddleware,(req,res) =>{res.json(req.user)});
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout exitoso" });
});


export default router;