import { paymentService } from "../services/payment.service.js";

export async function createPaymentIntent(req, res) {
  try {
    const { orderId } = req.body;
    const userId = req.user.id;

    const paymentIntent = await paymentService.createPaymentIntent(
      orderId,
      userId
    );

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function confirmPayment(req, res) {
  try {
    const { orderId, paymentIntentId } = req.body;

    const order = await paymentService.confirmPayment(
      orderId,
      paymentIntentId
    );    

    res.json({
      message: "Pago confirmado",
      order,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
