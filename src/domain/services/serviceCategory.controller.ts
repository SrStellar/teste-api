import { Request, Response } from 'express';
import { ServiceCategoryModel } from '../../models/ServiceCategory';
import { ServiceModel } from '../../models/Service';

export async function listServiceCategories(_req: Request, res: Response) {
  const categories = await ServiceCategoryModel.find();
  const result = [];
  
  for (const category of categories) {
    const services = await ServiceModel.find({ categoryId: category.id });
    result.push({
      ...category.toJSON(),
      services: services
    });
  }
  
  res.json(result);
}

export async function createCategory(req: Request, res: Response) {
  const category = await ServiceCategoryModel.create(req.body);
  res.status(201).json(category);
}

export async function updateCategory(req: Request, res: Response) {
  const id = req.params.id;
  const category = await ServiceCategoryModel.findByIdAndUpdate(id, req.body, { new: true });
  res.json(category);
}

export async function deleteCategory(req: Request, res: Response) {
  const id = req.params.id;
  await ServiceCategoryModel.findByIdAndDelete(id);
  res.status(204).send();
}