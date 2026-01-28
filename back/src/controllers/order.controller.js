import { orderService } from "../services/order.service.js";

export async function createOrder(req, res) {
      
  //const order = await orderService.createOrderFromCart(req.user.id);
  const order = await orderService.createOrderFromCart(req.user.id, req.body.couponCode);
  res.status(201).json(order);
}

export async function getMyOrders(req, res) {
  const orders = await orderService.getOrdersByUser(req.user.id);
  res.json(orders);
}

export async function getOrderById(req, res) {  
  const order = await orderService.getOrderById(req.params.id);
  res.json(order);
}



/*
Marcar pedido como listo
PATCH /orders/:id/ready
*/
export async function markOrderAsReady(req, res) {
  try {
    const { id } = req.params;

    const order = await orderService.markAsReady(id);

    res.json({
      message: "Pedido marcado como listo",
      order,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
}

/*
Cancelar pedido
PATCH /orders/:id/cancel
*/
export async function cancelOrder(req, res) {
  try {
    const { id } = req.params;

    const order = await orderService.cancelOrder(id);

    res.json({
      message: "Pedido cancelado",
      order,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
}