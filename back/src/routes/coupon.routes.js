import { Router } from "express";
import {createCoupon, getCouponDetails, deleteCoupon} from "../controllers/coupon.controller.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = Router();

router.post("/", roleMiddleware, createCoupon);
router.get("/:couponCode",getCouponDetails)
router.delete("/:couponId",deleteCoupon)


export default router;