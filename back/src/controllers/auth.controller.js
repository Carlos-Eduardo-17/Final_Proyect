import { authService } from "../services/auth.service.js";
import jwt from "jsonwebtoken";

export const authController = {

  async register(req, res, next) {
    try {
      const { firstName, lastName, email, password } = req.body;

      const user = await authService.register({
        firstName,
        lastName,
        email,
        password,
      });

      res.status(201).json({
        message: "Usuario registrado. Revisa tu correo para verificar la cuenta.",
        userId: user._id,
      });
    } catch (error) {
      next(error);
    }
  },

  async verifyEmail(req, res, next) {
    try {
      const { email, code } = req.body;

      await authService.verifyEmail({ email, code });

      res.json({
        message: "Cuenta verificada correctamente. Ya puedes iniciar sesión.",
      });
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await authService.login({ email, password });

      // inicio prueba
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      // fin prueba

      res.json({
        message: "Login exitoso",
        user: {
          id: user._id,
          email: user.email,
          role: user.role.name,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;

      await authService.forgotPassword(email);

      res.json({
        message: "Si el correo existe, se enviaron instrucciones",
      });
    } catch (error) {
      next(error);
    }
  },

  async resetPassword(req, res, next) {
    try {
      const { token, newPassword } = req.body;

      await authService.resetPassword({ token, newPassword });

      res.json({
        message: "Contraseña actualizada correctamente",
      });
    } catch (error) {
      next(error);
    }
  },
};
