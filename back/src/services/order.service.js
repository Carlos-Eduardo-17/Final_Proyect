/*
Convertir carrito → pedido
Congelar precios
Calcular totales
Cambiar estados
Limpiar carrito

❌ No maneja pagos
❌ No aplica cupones
❌ No valida stock
❌ No verifica roles
❌ No maneja JWT
❌ No usa req/res
*/

import { cartRepository } from "../repositories/cart.repository.js";
import { itemCartRepository } from "../repositories/itemCart.repository.js";
import { orderRepository } from "../repositories/order.repository.js";
import { orderDetailRepository } from "../repositories/orderDetail.repository.js";

export const orderService = {

  async createOrderFromCart(userId) {
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
    let total = 0;
    for (const item of items) {
      total += item.price * item.quantity; // Evita que cambios futuros en libros afecten pedidos pasados.
    }

    // Crear pedido
    const order = await orderRepository.create({
      user: userId,
      status: "PENDING",
      total,
    });

    // Crear detalles del pedido (snapshot)
    for (const item of items) {
      await orderDetailRepository.create({
        order: order._id,
        book: item.book,
        price: item.price,
        quantity: item.quantity,
      });
    }

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
