import { Cart } from "../schemas/cart.schema.js";

export const cartRepository = {
  // Crear carrito
  create(data) {
    return Cart.create(data);
  },

  // Obtener carrito activo del usuario
  findActiveByUser(userId) {
    
    return Cart.findOne({
      user: userId,
      status: "ACTIVE",
    });
  },

  // Buscar carrito por ID
  findById(id) {
    return Cart.findById(id);
  },

  findByIdUser(userId){
     return Cart.findOne({
      user: userId});
  },

  // Marcar carrito como convertido en pedido
  markAsConverted(cartId) {
    return Cart.findByIdAndUpdate(
      cartId,
      { status: "CONVERTED" },
      { new: true }
    );
  },

  // Cancelar carrito (opcional)
  cancel(cartId) {
    return Cart.findByIdAndUpdate(
      cartId,
      { status: "CANCELLED" },
      { new: true }
    );
  },

  //PARCHE //TODO
  getOrCreateByUser(userId) {
    return Cart.findOneAndUpdate(
      { user: userId, isConverted: false },
      { $setOnInsert: { user: userId } },
      { new: true, upsert: true }
    ).populate("items.book");
  },
  findByUser(userId) {
    return Cart.findOne({ user: userId, isConverted: false })
      .populate("items.book");
  },
  save(cart) {
    return cart.save();
  }

};
