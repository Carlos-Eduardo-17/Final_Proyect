/*
crear tag
evitar duplicados (case-insensitive)
listar tags activos
soft delete
❌ No HTTP
❌ No lógica de libros
❌ No permisos
*/

import { tagRepository } from "../repositories/tag.repository.js";

export const tagService = {
  // =========================
  // Crear tag
  // =========================
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

  // =========================
  // Obtener tags activos
  // =========================
  async findAll() {
    return tagRepository.findAll();
  },

  // =========================
  // Obtener tag por ID
  // =========================
  async findById(id) {
    const tag = await tagRepository.findById(id);
    if (!tag) {
      throw new Error("Tag no encontrado");
    }
    return tag;
  },

  // =========================
  // Actualizar tag
  // =========================
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

  // =========================
  // Soft delete
  // =========================
  async remove(id) {
    const tag = await tagRepository.findById(id);
    if (!tag) {
      throw new Error("Tag no encontrado");
    }

    return tagRepository.softDelete(id);
  },
};
