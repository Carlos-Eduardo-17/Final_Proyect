import { Router } from "express";
import {
  createBook,
  getPublicBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/book.controller.js";

const router = Router();

// =========================
// Libros
// =========================

// Crear libro
router.post("/", createBook);

// Listar libros públicos
router.get("/", getPublicBooks);

// Obtener libro por ID
router.get("/:id", getBookById);

// Actualizar libro
router.put("/:id", updateBook);

// Soft delete
router.delete("/:id", deleteBook);

export default router;
