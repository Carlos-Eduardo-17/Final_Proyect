/*
crear libros
actualizar libros
soft delete
listar libros públicos
validar reglas de negocio del catálogo
No hace HTTP, no valida JWT.
*/

import { bookRepository } from "../repositories/book.repository.js";
import { authorRepository } from "../repositories/author.repository.js";
import { tagRepository } from "../repositories/tag.repository.js";

export const bookService = {
  // =========================
  // Crear libro (admin)
  // =========================
  async create(data) {
    const { author, tags } = data;

    // 1️⃣ Validar autor
    const authorExists = await authorRepository.findById(author);
    if (!authorExists) {
      throw new Error("Autor no encontrado");
    }

    // 2️⃣ Validar tags (si vienen)
    if (tags && tags.length > 0) {
      const existingTags = await tagRepository.findByIds(tags);
      if (existingTags.length !== tags.length) {
        throw new Error("Uno o más tags no existen");
      }
    }

    // 3️⃣ Crear libro
    return bookRepository.create(data);
  },

  // =========================
  // Obtener libros públicos
  // =========================
  async getPublicBooks() {
    return bookRepository.findActive();
  },

  // =========================
  // Obtener libro por id
  // =========================
  async getById(id) {
    const book = await bookRepository.findById(id);
    if (!book) {
      throw new Error("Libro no encontrado");
    }
    return book;
  },

  // =========================
  // Actualizar libro
  // =========================
  async update(id, data) {
    const book = await bookRepository.findById(id);
    if (!book) {
      throw new Error("Libro no encontrado");
    }

    return bookRepository.updateById(id, data);
  },

  // =========================
  // Soft delete
  // =========================
  async remove(id) {
    const book = await bookRepository.findById(id);
    if (!book) {
      throw new Error("Libro no encontrado");
    }

    return bookRepository.softDelete(id);
  },
};
