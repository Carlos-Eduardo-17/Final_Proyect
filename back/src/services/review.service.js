/*
crear reseña
evitar reseñas duplicadas por usuario/libro
validar rating
listar reseñas por libro
ocultar / eliminar reseñas (admin)
 No HTTP
 No permisos (eso luego en middleware)
 No lógica de libros ni pedidos
*/

import { reviewRepository } from "../repositories/review.repository.js";
import { bookRepository } from "../repositories/book.repository.js";
import { userRepository } from "../repositories/user.repository.js";

export const reviewService = {
  async create({ userId, bookId, rating, comment }) {
    // Validar usuario
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error("Usuario no válido");
    }

    // Validar libro
    const book = await bookRepository.findById(bookId);
    if (!book) {
      throw new Error("Libro no encontrado");
    }

    // Validar rating
    if (!rating || rating < 1 || rating > 5) {
      throw new Error("El rating debe estar entre 1 y 5");
    }

    // Evitar reseña duplicada
    const existing = await reviewRepository.findByUserAndBook(
      userId,
      bookId
    );
    if (existing) {
      throw new Error("Ya reseñaste este libro");
    }

    // Crear reseña
    return reviewRepository.create({
      user: userId,
      book: bookId,
      rating,
      comment,
    });
  },

  async findByBook(bookId) {
    return reviewRepository.findByBook(bookId);
  },

  async hide(id) {
    const review = await reviewRepository.findById(id);
    if (!review) {
      throw new Error("Reseña no encontrada");
    }

    return reviewRepository.hideById(id);
  },
};
