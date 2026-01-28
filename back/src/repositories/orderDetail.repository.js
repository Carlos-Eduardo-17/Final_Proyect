/*
Manejar los items congelados del pedido
Cada registro representa un libro comprado
Snapshot del libro comprado
Precio congelado
Cantidad
Relación directa con Order
*/

import { OrderDetail } from "../schemas/orderDetail.schema.js";

export const orderDetailRepository = {
  // Crear un detalle de orden
  create(data) {
    return OrderDetail.create(data);
  },

  // Crear múltiples detalles (cuando conviertes el carrito)
  createMany(details) {
    return OrderDetail.insertMany(details);
  },

  // Obtener detalles por orden
  findByOrder(orderId) {    
    return OrderDetail.find({ order: orderId }).populate("book");
  },

};