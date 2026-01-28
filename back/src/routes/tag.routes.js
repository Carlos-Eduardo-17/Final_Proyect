import { Router } from "express";
import {
  createTag,
  getTags,
  getTagById,
  updateTag,
  deleteTag,
} from "../controllers/tag.controller.js";

const router = Router();

// =========================
// Tags
// =========================

// Crear tag
router.post("/", createTag);

// Listar tags activos
router.get("/", getTags);

// Obtener tag por ID
router.get("/:id", getTagById);

// Actualizar tag
router.put("/:id", updateTag);

// Soft delete
router.delete("/:id", deleteTag);

export default router;
