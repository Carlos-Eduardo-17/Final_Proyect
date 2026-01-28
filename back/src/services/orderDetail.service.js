import { orderDetailRepository } from "../repositories/orderDetail.repository.js";
import { itemCartRepository } from "../repositories/itemCart.repository.js";

export const orderDetailService = {
  /**
   * Crea los OrderDetails a partir del carrito
   * Esto es un SNAPSHOT: precio, cantidad y libro quedan congelados
   */
  async createFromCart(orderId, cartId) {
    const items = await itemCartRepository.findByCart(cartId);

    if (!items || items.length === 0) {
      throw new Error("El carrito está vacío");
    }

    const details = items.map(item => ({
      order: orderId,
      book: item.book,
      titleSnapshot: item.book.title,
      priceSnapshot: item.book.price,     // snapshot
      quantity: item.quantity,
    }));

    return orderDetailRepository.createMany(details);
  },

  async getByOrder(orderId) {    
    return orderDetailRepository.findByOrder(orderId);
  },
};
