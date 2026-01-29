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
  async create(data) {
    const { author, tags } = data;

    // Validar autor
    const authorExists = await authorRepository.findById(author);
    if (!authorExists) {
      throw new Error("Autor no encontrado");
    }

    // Validar tags (si vienen)
    if (tags && tags.length > 0) {
      const existingTags = await tagRepository.findByIds(tags);
      if (existingTags.length !== tags.length) {
        throw new Error("Uno o más tags no existen");
      }
    }

    // Crear libro
    return bookRepository.create(data);
  },

  async getPublicBooks() {
    return bookRepository.findAll();
  },

  async getById(id) {
    const book = await bookRepository.findById(id);
    if (!book) {
      throw new Error("Libro no encontrado");
    }
    return book;
  },

  async update(id, data) {
    const book = await bookRepository.findById(id);
    if (!book) {
      throw new Error("Libro no encontrado");
    }

    return bookRepository.updateById(id, data);
  },

  async remove(id) {
    const book = await bookRepository.findById(id);
    if (!book) {
      throw new Error("Libro no encontrado");
    }

    return bookRepository.softDelete(id);
  },
};
