import { Router } from "express";
import {
  createPaymentIntent,
  confirmPayment,
} from "../controllers/payment.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.post("/intent", createPaymentIntent);
router.post("/confirm", confirmPayment);

export default router;
