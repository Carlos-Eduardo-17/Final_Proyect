/*
crear tag
evitar duplicados (case-insensitive)
listar tags activos
soft delete
 No HTTP
 No lógica de libros
 No permisos
*/

import { tagRepository } from "../repositories/tag.repository.js";

export const tagService = {
  async create(name) {
    if (!name || !name.trim()) {
      throw new Error("El nombre del tag es obligatorio");
    }

    const normalizedName = name.trim();

    const exists = await tagRepository.findByName(normalizedName);
    if (exists) {
      throw new Error("El tag ya existe");
    }

    return tagRepository.create({ name: normalizedName });
  },

  async findAll() {
    return tagRepository.findAll();
  },

  async findById(id) {
    const tag = await tagRepository.findById(id);
    if (!tag) {
      throw new Error("Tag no encontrado");
    }
    return tag;
  },

  async update(id, name) {
    if (!name || !name.trim()) {
      throw new Error("El nombre del tag es obligatorio");
    }

    const tag = await tagRepository.findById(id);
    if (!tag) {
      throw new Error("Tag no encontrado");
    }

    return tagRepository.update(id, { name: name.trim() });
  },

  async remove(id) {
    const tag = await tagRepository.findById(id);
    if (!tag) {
      throw new Error("Tag no encontrado");
    }

    return tagRepository.softDelete(id);
  },
};
