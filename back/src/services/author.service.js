/*
crear autor
evitar duplicados
actualizar datos
soft delete
obtener autores activos
 No HTTP
No permisos
No lógica de libros
*/

import { authorRepository } from "../repositories/author.repository.js";

export const authorService = {
  async create(data) {
    const { name } = data;

    const exists = await authorRepository.findByName(name);
    if (exists) {
      throw new Error("El autor ya existe");
    }

    return authorRepository.create(data);
  },

  async findAll() {
    return authorRepository.findAll();
  },

  async findById(id) {
    const author = await authorRepository.findById(id);
    if (!author) {
      throw new Error("Autor no encontrado");
    }
    return author;
  },

  async update(id, data) {
    const author = await authorRepository.findById(id);
    if (!author) {
      throw new Error("Autor no encontrado");
    }

    return authorRepository.updateById(id, data);
  },

  async remove(id) {
    const author = await authorRepository.findById(id);
    if (!author) {
      throw new Error("Autor no encontrado");
    }

    return authorRepository.softDeleteById(id);
  },
};
