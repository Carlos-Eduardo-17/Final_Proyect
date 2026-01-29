/*
Registro
Verificación de email
Login
Generación de JWT
Recuperación de contraseña

❌ No usa req / res
❌ No define permisos
❌ No toca carritos, pedidos ni pagos
*/

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import { userRepository } from "../repositories/user.repository.js";
import { roleRepository } from "../repositories/role.repository.js";
import {
  sendVerificationEmail,
  sendResetPasswordEmail,
} from "../utils/mailer.js";

export const authService = {
  async register({ firstName, lastName, email, password }) {

    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("El email ya está registrado");
    }

    const userRole = await roleRepository.findByName("USER");
    if (!userRole) {
      throw new Error("Rol USER no encontrado");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationCodeExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const user = await userRepository.create({
      firstName,
      lastName,
      email,
      passwordHash,
      role: userRole._id,
      status: "PENDING",
      emailVerified: false,
      verificationCode,
      verificationCodeExpiresAt,
    });
  console.log("Usuario pendiente creado, se está enviando el código de verificación")
    await sendVerificationEmail(email, verificationCode);

    return {
      id: user._id,
      email: user.email,
    };
  },

  // =========================
  // VERIFY EMAIL  
  // =========================
  async verifyEmail({ email, code }) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error("Usuario no encontrado");

    if (
      user.verificationCode !== code ||
      user.verificationCodeExpiresAt < new Date()
    ) {
      throw new Error("Código inválido o expirado");
    }

    await userRepository.verifyEmail(user._id);

    return true;
  },

  // =========================
  // LOGIN
  // =========================
  async login({ email, password }) {
    const user = await userRepository.findByEmailWithPassword(email);
    if (!user) throw new Error("Credenciales inválidas");

    if (user.status !== "ACTIVE") {
      throw new Error("La cuenta no está activa");
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);   

    if (!isValid) throw new Error("Credenciales inválidas");

    const token = jwt.sign(
      {
        sub: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return user;
  },

  // =========================
  // FORGOT PASSWORD
  // =========================
  async forgotPassword(email) {
    const user = await userRepository.findByEmail(email);
    if (!user) return true; // no revelar existencia

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await userRepository.setResetPasswordToken(
      user._id,
      token,
      expiresAt
    );

    await sendResetPasswordEmail(email, token);
    return true;
  },

  // =========================
  // RESET PASSWORD
  // =========================
  async resetPassword({ token, newPassword }) {
    const user = await userRepository.findByResetToken(token);
    if (!user || user.resetPasswordExpiresAt < new Date()) {
      throw new Error("Token inválido o expirado");
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    await userRepository.updatePassword(user._id, passwordHash);
    return true;
  },
};
