import { cartService } from "../services/cart.service.js";

export async function getMyCart(req, res) {  
  const cart = await cartService.getActualCart(req.user.id);
  res.json(cart);
}

export async function addItem(req, res) {
  const { bookId, quantity } = req.body;
  const cart = await cartService.addItem(req.user.id, bookId, quantity);
  res.json(cart);
}

export async function removeItem(req, res) {
  const { itemId } = req.params;
  const cart = await cartService.removeItem(req.user.id, itemId);
  res.json(cart);
}

export async function clearCart(req, res) {
  const { cartId } = req.params;
  const cart = await cartService.clear(req.user.id, cartId);
  res.json(cart);
}
