/*
Convertir carrito → pedido
Congelar precios
Calcular totales
Cambiar estados
Limpiar carrito

 No maneja pagos
 No aplica cupones
 No valida stock
 No verifica roles
 No maneja JWT
 No usa req/res
*/

import { cartRepository } from "../repositories/cart.repository.js";
import { itemCartRepository } from "../repositories/itemCart.repository.js";
import { orderRepository } from "../repositories/order.repository.js";
import { couponService } from "../services/coupon.service.js";
import { orderDetailService } from "../services/orderDetail.service.js";


export const orderService = {

  async createOrderFromCart(userId, couponCode) {
    // Obtener carrito activo    
    const cart = await cartRepository.findActiveByUser(userId);
    if (!cart) {
      throw new Error("El usuario no tiene un carrito activo");
    }

    // Obtener items del carrito
    const items = await itemCartRepository.findByCart(cart._id);
    if (!items.length) {
      throw new Error("El carrito está vacío");
    }

    // Calcular total
    let subtotal = 0;

    for (const item of items) {
      subtotal += item.book.price * item.quantity; // Evita que cambios futuros en libros afecten pedidos pasados.
    }
    
    let coupon = await couponService.getValidCoupon(couponCode);
    let discountTotal = couponService.applyDiscount(coupon, subtotal);
    
    let total = subtotal - discountTotal
    // Crear pedido
    const order = await orderRepository.create({
      user: userId,
      status: "PENDING",
      coupon: coupon,
      subtotal,
      discountTotal,
      total
    });


    // Crear detalles del pedido (snapshot)
    await orderDetailService.createFromCart(order._id, cart._id);

    // Cerrar carrito
    await cartRepository.markAsConverted(cart._id); // Evita reutilización del mismo carrito.

    // Limpiar items del carrito
    await itemCartRepository.deleteByCart(cart._id);

    return order;
  },

  async getOrdersByUser(userId) {
    return orderRepository.findByUser(userId);
  },

  async getOrderById(orderId) {
    return orderRepository.findById(orderId);
  },

  async markAsReady(orderId) {
    return orderRepository.updateStatus(orderId, "READY");
  },

  async cancelOrder(orderId) {
    return orderRepository.updateStatus(orderId, "CANCELLED");
  },
};
