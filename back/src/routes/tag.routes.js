import { Router } from "express";
import {
  createTag,
  getTags,
  getTagById,
  updateTag,
  deleteTag,
} from "../controllers/tag.controller.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = Router();

// =========================
// Tags
// =========================

// Crear tag
router.post("/", roleMiddleware, createTag);

// Listar tags activos
router.get("/", getTags);

// Obtener tag por ID
router.get("/:id", getTagById);

// Actualizar tag
router.put("/:id", roleMiddleware, updateTag);

// Soft delete
router.delete("/:id", roleMiddleware, deleteTag);

export default router;
