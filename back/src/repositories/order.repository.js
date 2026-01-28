/*
Crear y consultar pedidos
Cambiar estado del pedido
NO calcula totales
NO valida pagos
Información general del pedido
Usuario
Estado
Total
Cupón aplicado (si existe)
*/

import { Order } from "../schemas/order.schema.js";

export const orderRepository = {
  // Crear pedido
  create(data) {
    return Order.create(data);
  },

  // Buscar pedido por ID
  findById(id) {
    return Order.findById(id)
      .populate("user", "firstName lastName email")
      //TODO .populate("coupon", "code discountType discountValue");
  },

  // Listar pedidos por usuario
  findByUser(userId) {
    return Order.find({ user: userId }).sort({ createdAt: -1 });
  },

  // Listar todos los pedidos (admin)
  findAll() {
    return Order.find()
      .populate("user", "firstName lastName email")
      .sort({ createdAt: -1 });
  },

  // Cambiar estado del pedido
  updateStatus(orderId, status) {
    return Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
  },

  //PARCHE
  updateById(id, data) {
    return Order.findByIdAndUpdate(
      id,
      data,
      { new: true } // devuelve el documento actualizado
    );
  },

};
