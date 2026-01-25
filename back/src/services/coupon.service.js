/*
crear cupones
validar fechas y límites
aplicar cupón a un pedido (reglas, no pago)
desactivar / soft delete
❌ No pagos
❌ No carrito
❌ No HTTP
*/

import { couponRepository } from "../repositories/coupon.repository.js";

export const couponService = {
  // =========================
  // Crear cupón
  // =========================
  async create(data) {
    const { code, discountPercent, expiresAt, maxUses } = data;

    if (!code || !discountPercent) {
      throw new Error("Código y descuento son obligatorios");
    }

    if (discountPercent <= 0 || discountPercent > 100) {
      throw new Error("El descuento debe estar entre 1 y 100");
    }

    const exists = await couponRepository.findByCode(code);
    if (exists) {
      throw new Error("El cupón ya existe");
    }

    return couponRepository.create({
      ...data,
      code: code.toUpperCase(),
    });
  },

  // =========================
  // Obtener cupón válido
  // =========================
  async getValidCoupon(code) {
    const coupon = await couponRepository.findByCode(code);

    if (!coupon) {
      throw new Error("Cupón inválido");
    }

    if (coupon.expiresAt && coupon.expiresAt < new Date()) {
      throw new Error("El cupón ha expirado");
    }

    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
      throw new Error("El cupón alcanzó su límite de usos");
    }

    return coupon;
  },

  // =========================
  // Incrementar uso
  // =========================
  async incrementUsage(id) {
    return couponRepository.incrementUsage(id);
  },

  // =========================
  // Obtener todos
  // =========================
  async findAll() {
    return couponRepository.findAll();
  },

  // =========================
  // Soft delete
  // =========================
  async remove(id) {
    const coupon = await couponRepository.findById(id);
    if (!coupon) {
      throw new Error("Cupón no encontrado");
    }

    return couponRepository.softDeleteById(id);
  },
};
