import { authService } from "../services/auth.service.js";

export const authController = {
  // =========================
  // Registro
  // =========================
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

  // =========================
  // Verificar email
  // =========================
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

  // =========================
  // Login
  // =========================
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const result = await authService.login({ email, password });

      res.json(result); // token + user
    } catch (error) {
      next(error);
    }
  },

  // =========================
  // Forgot password
  // =========================
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

  // =========================
  // Reset password
  // =========================
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
