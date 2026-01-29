import { Router } from "express";
import {
  createBook,
  getPublicBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/book.controller.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = Router();

// Crear libro
router.post("/", roleMiddleware,createBook);

// Listar libros públicos
router.get("/", getPublicBooks);

// Obtener libro por ID
router.get("/:id", getBookById);

// Actualizar libro
router.put("/:id", roleMiddleware, updateBook);

// Soft delete
router.delete("/:id", roleMiddleware, deleteBook);

export default router;
