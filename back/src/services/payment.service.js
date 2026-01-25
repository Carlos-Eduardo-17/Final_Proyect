/*
Crear un pago para un pedido
Validar estado del pedido
Cambiar estado del pedido según resultado del pago
NO integra Stripe todavía (solo dejamos el flujo listo)

❌ No usa req / res
❌ No valida JWT
❌ No crea pedidos
*/

/*
✔ Pago nace como PENDING
✔ Pedido solo puede pagarse si está PENDING
✔ Pago nace como PENDING
*/

import { paymentRepository } from "../repositories/payment.repository.js";
import { orderRepository } from "../repositories/order.repository.js";

export const paymentService = {

  async createPayment({ orderId, provider = "STRIPE" }) {
    // Obtener pedido
    const order = await orderRepository.findById(orderId);

    if (!order) {
      throw new Error("Pedido no encontrado");
    }

    if (order.status !== "PENDING") {
      throw new Error("El pedido no está disponible para pago");
    }

    // Crear pago (estado inicial)
    const payment = await paymentRepository.create({
      order: orderId,
      amount: order.total,
      provider,
      status: "PENDING",
    });

    return payment;
  },

  async markPaymentSuccess(paymentId) {
    // Obtener pago
    const payment = await paymentRepository.findById(paymentId);

    if (!payment) {
      throw new Error("Pago no encontrado");
    }

    // Marcar pago como exitoso
    await paymentRepository.updateStatus(paymentId, "SUCCESS");

    // Marcar pedido como pagado
    await orderRepository.updateStatus(payment.order, "PAID");

    return true;
  },

  async markPaymentFailed(paymentId) {
    // Obtener pago
    const payment = await paymentRepository.findById(paymentId);

    if (!payment) {
      throw new Error("Pago no encontrado");
    }

    // Marcar pago como fallido
    await paymentRepository.updateStatus(paymentId, "FAILED");

    return true;
  },
};
