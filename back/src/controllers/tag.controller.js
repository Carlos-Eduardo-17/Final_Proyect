import { tagService } from "../services/tag.service.js";

export async function createTag(req, res, next) {
  try {
    const { name } = req.body;
    const tag = await tagService.create(name);
    res.status(201).json(tag);
  } catch (error) {
    next(error);
  }
}

export async function getTags(req, res, next) {
  try {
    const tags = await tagService.findAll();
    res.json(tags);
  } catch (error) {
    next(error);
  }
}

export async function getTagById(req, res, next) {
  try {
    const { id } = req.params;
    const tag = await tagService.findById(id);
    res.json(tag);
  } catch (error) {
    next(error);
  }
}

export async function updateTag(req, res, next) {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const tag = await tagService.update(id, name);
    res.json(tag);
  } catch (error) {
    next(error);
  }
}

export async function deleteTag(req, res, next) {
  try {
    const { id } = req.params;
    const tag = await tagService.remove(id);
    res.json(tag);
  } catch (error) {
    next(error);
  }
}
