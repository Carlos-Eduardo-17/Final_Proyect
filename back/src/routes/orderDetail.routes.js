import { Router } from "express";
import { getOrderDetails } from "../controllers/orderDetail.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// Todo order detail requiere usuario autenticado
router.use(authMiddleware);

// GET /orders/:id/details
router.get("/:id", getOrderDetails);

export default router;
