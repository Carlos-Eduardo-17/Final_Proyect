import { orderDetailService } from "../services/orderDetail.service.js";

export async function getOrderDetails(req, res, next) {
    
  try {
    
    const { id } = req.params;
        const details = await orderDetailService.getByOrder(id);

    res.json({
      id,
      items: details,
    });
    
  } catch (error) {
    next(error);
  }
}
