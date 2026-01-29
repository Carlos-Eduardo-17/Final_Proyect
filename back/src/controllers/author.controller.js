import { authorService } from "../services/author.service.js";

export async function createAuthor(req, res, next) {
  try {
    const author = await authorService.create(req.body);
    res.status(201).json(author);
  } catch (error) {
    next(error);
  }
}

export async function getAuthors(req, res, next) {
  try {
    const authors = await authorService.findAll();
    res.json(authors);
  } catch (error) {
    next(error);
  }
}

export async function getAuthorById(req, res, next) {
  try {
    const { id } = req.params;
    const author = await authorService.findById(id);
    res.json(author);
  } catch (error) {
    next(error);
  }
}

export async function updateAuthor(req, res, next) {
  try {
    const { id } = req.params;
    const author = await authorService.update(id, req.body);
    res.json(author);
  } catch (error) {
    next(error);
  }
}

export async function deleteAuthor(req, res, next) {
  try {
    const { id } = req.params;
    const author = await authorService.remove(id);
    res.json(author);
  } catch (error) {
    next(error);
  }
}
