import { authorService } from "../services/author.service.js";

// =========================
// Crear autor
// POST /authors
// =========================
export async function createAuthor(req, res, next) {
  try {
    const author = await authorService.create(req.body);
    res.status(201).json(author);
  } catch (error) {
    next(error);
  }
}

// =========================
// Listar autores activos
// GET /authors
// =========================
export async function getAuthors(req, res, next) {
  try {
    const authors = await authorService.findAll();
    res.json(authors);
  } catch (error) {
    next(error);
  }
}

// =========================
// Obtener autor por ID
// GET /authors/:id
// =========================
export async function getAuthorById(req, res, next) {
  try {
    const { id } = req.params;
    const author = await authorService.findById(id);
    res.json(author);
  } catch (error) {
    next(error);
  }
}

// =========================
// Actualizar autor
// PUT /authors/:id
// =========================
export async function updateAuthor(req, res, next) {
  try {
    const { id } = req.params;
    const author = await authorService.update(id, req.body);
    res.json(author);
  } catch (error) {
    next(error);
  }
}

// =========================
// Soft delete autor
// DELETE /authors/:id
// =========================
export async function deleteAuthor(req, res, next) {
  try {
    const { id } = req.params;
    const author = await authorService.remove(id);
    res.json(author);
  } catch (error) {
    next(error);
  }
}
