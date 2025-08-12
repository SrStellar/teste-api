import { Request, Response } from 'express';
import { prisma } from '../../db/prisma';
export async function listGallery(_req: Request, res: Response) { const items = await prisma.galleryItem.findMany(); res.json(items); }
export async function createGalleryItem(req: Request, res: Response) { const item = await prisma.galleryItem.create({ data: req.body }); res.status(201).json(item); }
export async function updateGalleryItem(req: Request, res: Response) { const id = parseInt(req.params.id, 10); const item = await prisma.galleryItem.update({ where: { id }, data: req.body }); res.json(item); }
export async function deleteGalleryItem(req: Request, res: Response) { const id = parseInt(req.params.id, 10); await prisma.galleryItem.delete({ where: { id } }); res.status(204).send(); }