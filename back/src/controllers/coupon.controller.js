import { couponService } from "../services/coupon.service.js";

export async function getCouponDetails(req, res) {
    const { couponCode } = req.params;
    const coupon = await couponService.getValidCoupon(couponCode);
    res.json(coupon);    
}

export async function createCoupon(req, res) {
    const {code, discountType, discountValue, maxUses,expiresAt} = req.body;    
    const coupon = await couponService.create({code, discountType, discountValue, maxUses, expiresAt});
    res.status(201).json(coupon);
}

export async function deleteCoupon(req, res) {
    const { couponId } = req.params;    
    const coupon = await couponService.remove(couponId);
    res.json(coupon);
}