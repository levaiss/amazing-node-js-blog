// Core
import { Request, Response, NextFunction } from 'express';

// Models
import CategoryModel from '../service/database/model/category.model';

// Helpers
import { RequestStatusCodes } from '../const/request-status-codes';

export async function getAllCategories(req: Request, res: Response, next: NextFunction) {
  try {
    const categories = await CategoryModel.find();
    res.status(RequestStatusCodes.Success).json({ categories });
  } catch (e) {
    next(e);
  }
}

export async function createCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const { name } = req.body;

    const category = await CategoryModel.create({ name: name.toLowerCase() });

    res.status(RequestStatusCodes.Created).json({ category });
  } catch (error) {
    next(error);
  }
}

export async function updateCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await CategoryModel.findByIdAndUpdate(id, { name: name.toLowerCase() }, { new: true });

    res.status(RequestStatusCodes.Success).json({ category });
  } catch (error) {
    next(error);
  }
}

export async function deleteCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    await CategoryModel.deleteOne({ _id: id });

    res.status(RequestStatusCodes.Success).json({ message: 'Category deleted' });
  } catch (error) {
    next(error);
  }
}
