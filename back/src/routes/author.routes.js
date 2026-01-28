import { Router } from "express";
import {
  createAuthor,
  getAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} from "../controllers/author.controller.js";

const router = Router();

// =========================
// Autores
// =========================
router.post("/", createAuthor);       // Crear autor
router.get("/", getAuthors);           // Listar autores activos
router.get("/:id", getAuthorById);     // Obtener autor por ID
router.put("/:id", updateAuthor);      // Actualizar autor
router.delete("/:id", deleteAuthor);   // Soft delete

export default router;
