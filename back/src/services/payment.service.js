import { stripe } from "../config/stripe.js";
import { orderRepository } from "../repositories/order.repository.js";

export const paymentService = {
  async createPaymentIntent(orderId, userId) {
    const order = await orderRepository.findById(orderId);

    if (!order) {
      throw new Error("Pedido no encontrado");
    }
    
    if (order.user._id.toString() !== userId.toString()) {
      throw new Error("No autorizado");
    }

    if (order.status !== "PENDING") {
      throw new Error("El pedido no puede ser pagado");
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.total * 100), // Stripe usa centavos
      currency: "pen",
      metadata: {
        orderId: order._id.toString(),
        userId,
      },
    });

    
    //TODO registrar intento de pago

    return paymentIntent;
  },

  async confirmPayment(orderId, paymentIntentId) {
    const order = await orderRepository.findById(orderId);

    if (!order) {
      throw new Error("Pedido no encontrado");
    }

    await orderRepository.updateById(orderId, {
      status: "PAID",
      payment: {
        provider: "STRIPE",
        paymentIntentId,
        paidAt: new Date(),
      },
    });

    //TODO registrar pago

    return order;
  },
};
