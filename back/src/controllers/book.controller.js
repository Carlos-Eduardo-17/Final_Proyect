import { bookService } from "../services/book.service.js";

export async function createBook(req, res, next) {
  try {
    const book = await bookService.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
}

export async function getPublicBooks(req, res, next) {
  try {
    const books = await bookService.getPublicBooks();
    res.json(books);
  } catch (error) {
    next(error);
  }
}

export async function getBookById(req, res, next) {
  try {
    const book = await bookService.getById(req.params.id);
    res.json(book);
  } catch (error) {
    next(error);
  }
}

export async function updateBook(req, res, next) {
  try {
    const book = await bookService.update(req.params.id, req.body);
    res.json(book);
  } catch (error) {
    next(error);
  }
}

export async function deleteBook(req, res, next) {
  try {
    const book = await bookService.remove(req.params.id);
    res.json(book);
  } catch (error) {
    next(error);
  }
}
