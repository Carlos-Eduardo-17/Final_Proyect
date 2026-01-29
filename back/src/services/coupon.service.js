/*
crear cupones
validar fechas y límites
aplicar cupón a un pedido (reglas, no pago)
desactivar / soft delete
 No pagos
 No carrito
 No HTTP
*/

import { couponRepository } from "../repositories/coupon.repository.js";

export const couponService = {
  async create(data) {
    const {
      code,
      discountType,
      discountValue,
      maxUses,
      expiresAt
    } = data;

    if (!code || !discountType || !discountValue || !maxUses || !expiresAt) {
      throw new Error("Datos del cupón incompletos");
    }

    if (discountValue <= 0) {
      throw new Error("El valor de descuento debe ser mayor a 0");
    }

    const exists = await couponRepository.findByCode(code.toUpperCase());
    if (exists) {
      throw new Error("El cupón ya existe");
    }

    return couponRepository.create({
      ...data,
      code: code.toUpperCase(),
    });
  },

  async getValidCoupon(code) {
    const coupon = await couponRepository.findByCode(code.toUpperCase());

    if (!coupon || !coupon.isActive || coupon.deletedAt) {
      throw new Error("Cupón inválido");
    }

    if (coupon.expiresAt < new Date()) {
      throw new Error("El cupón ha expirado");
    }

    if (coupon.usedCount >= coupon.maxUses) {
      throw new Error("El cupón alcanzó su límite de usos");
    }

    return coupon;
  },

  applyDiscount(coupon, subtotal) {
    let discount = 0;

    if (coupon.discountType === "PERCENTAGE") {
      discount = subtotal * (coupon.discountValue / 100);
    }

    if (coupon.discountType === "FIXED") {
      discount = coupon.discountValue;
    }

    return Math.min(discount, subtotal);
  },

  async incrementUsage(id) {
    return couponRepository.incrementUsage(id);
  },

  async findAll() {
    return couponRepository.findAll();
  },

  async remove(id) {
    const coupon = await couponRepository.findById(id);
    if (!coupon) {
      throw new Error("Cupón no encontrado");
    }

    return couponRepository.softDelete(id);
  },
};