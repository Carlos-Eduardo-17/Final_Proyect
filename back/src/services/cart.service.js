/*
el usuario interactúa primero con el carrito

aquí se validan:
- libro existe
- libro activo
- duplicados
- cantidades

de aquí sale el pedido

Esta versión no crea pedidos, solo maneja el carrito.
*/

import { cartRepository } from "../repositories/cart.repository.js";
import { itemCartRepository } from "../repositories/itemCart.repository.js";
import { bookRepository } from "../repositories/book.repository.js";

export const cartService = {

  async getOrCreateCart(userId) {
    let cart = await cartRepository.findActiveByUser(userId);

    if (!cart) {
      cart = await cartRepository.create({
        user: userId,
        status: "ACTIVE",
      });
    }

    return cart;
  },

  async addItem(userId, bookId, quantity = 1) {
    if (quantity <= 0) {
      throw new Error("La cantidad debe ser mayor a cero");
    }

    const book = await bookRepository.findById(bookId);
    if (!book || book.deletedAt) {
      throw new Error("Libro no disponible");
    }

    const cart = await this.getOrCreateCart(userId);

    const existingItem = await itemCartRepository.findByCartAndBook(
      cart._id,
      bookId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
      return existingItem.save();
    }

    return itemCartRepository.create({
      cart: cart._id,
      book: bookId,
      price: book.price, // se guarda snapshot
      quantity,
    });
  },

  async getCart(userId) {
    const cart = await cartRepository.findActiveByUser(userId);
    if (!cart) return null;

    const items = await itemCartRepository.findByCart(cart._id);

    return {
      cart,
      items,
    };
  },

  async clearCart(userId) {
    const cart = await cartRepository.findActiveByUser(userId);
    if (!cart) return;

    await itemCartRepository.deleteByCart(cart._id);
  },
};
