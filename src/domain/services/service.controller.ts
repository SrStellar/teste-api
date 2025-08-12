import { Request, Response } from 'express';
import { ServiceModel } from '../../models/Service';
export async function createService(req: Request, res: Response) { const { categoryId, name, price } = req.body; const svc = await ServiceModel.create({ categoryId, name, price }); res.status(201).json(svc); }
export async function updateService(req: Request, res: Response) { const id = req.params.id; const svc = await ServiceModel.findByIdAndUpdate(id, req.body, { new: true }); res.json(svc); }
export async function deleteService(req: Request, res: Response) { const id = req.params.id; await ServiceModel.findByIdAndDelete(id); res.status(204).send(); }