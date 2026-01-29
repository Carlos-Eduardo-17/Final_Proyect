import { Router } from "express";
import {
  createAuthor,
  getAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} from "../controllers/author.controller.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = Router();
router.post("/", roleMiddleware, createAuthor);       // Crear autor
router.get("/", getAuthors);           // Listar autores activos
router.get("/:id", getAuthorById);     // Obtener autor por ID
router.put("/:id", roleMiddleware, updateAuthor);      // Actualizar autor
router.delete("/:id", roleMiddleware, deleteAuthor);   // Soft delete

export default router;
