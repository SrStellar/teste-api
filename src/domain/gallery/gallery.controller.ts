import { Request, Response } from 'express';
import { GalleryItemModel } from '../../models/GalleryItem';
export async function listGallery(_req: Request, res: Response) { const items = await GalleryItemModel.find(); res.json(items); }
export async function createGalleryItem(req: Request, res: Response) { const item = await GalleryItemModel.create(req.body); res.status(201).json(item); }
export async function updateGalleryItem(req: Request, res: Response) { const id = req.params.id; const item = await GalleryItemModel.findByIdAndUpdate(id, req.body, { new: true }); res.json(item); }
export async function deleteGalleryItem(req: Request, res: Response) { const id = req.params.id; await GalleryItemModel.findByIdAndDelete(id); res.status(204).send(); }