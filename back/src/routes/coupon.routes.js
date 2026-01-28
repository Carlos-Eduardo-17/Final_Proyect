import { Router } from "express";
import {createCoupon, getCouponDetails, deleteCoupon} from "../controllers/coupon.controller.js"

const router = Router();

router.post("/", createCoupon);
router.get("/:couponCode",getCouponDetails)
router.delete("/:couponId",deleteCoupon)


export default router;