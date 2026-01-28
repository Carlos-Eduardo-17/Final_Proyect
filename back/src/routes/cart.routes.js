import { Router } from "express";
import {
  getMyCart,
  addItem,
  removeItem,
  clearCart,
} from "../controllers/cart.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getMyCart);
router.post("/items", addItem);
router.delete("/items/:itemId", removeItem);
router.delete("/:cartId", clearCart);

export default router;
