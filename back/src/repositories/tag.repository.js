import { Tag } from "../schemas/tag.schema.js";

export const tagRepository = {
  // Crear tag
  create(data) {
    return Tag.create(data);
  },

  // Buscar por ID (solo activos)
  findById(id) {
    return Tag.findOne({ _id: id, deletedAt: null });
  },

  // Buscar por nombre (case-insensitive) y solo activos
  findByName(name) {
    return Tag.findOne({
      name: new RegExp(`^${name}$`, "i"), // Busca un match exacto por nombre, ignorando mayúsculas y minúsculas.
      deletedAt: null,
    });
  },

  // Listar todos los tags activos
  findAll() {
    return Tag.find({ deletedAt: null }).sort({ name: 1 });
  },

  // Actualizar tag
  update(id, data) {
    return Tag.findOneAndUpdate(
      { _id: id, deletedAt: null },
      data,
      { new: true }
    );
  },

  // Soft delete
  softDelete(id) {
    return Tag.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { deletedAt: new Date() },
      { new: true }
    );
  },

  findByIds(ids) {
    return Tag.find({
      _id: { $in: ids },
      deletedAt: null,
    });
  },

};
