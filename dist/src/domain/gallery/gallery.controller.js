import { prisma } from '../../db/prisma';
export async function listGallery(_req, res) { const items = await prisma.galleryItem.findMany(); res.json(items); }
export async function createGalleryItem(req, res) { const item = await prisma.galleryItem.create({ data: req.body }); res.status(201).json(item); }
export async function updateGalleryItem(req, res) { const id = parseInt(req.params.id, 10); const item = await prisma.galleryItem.update({ where: { id }, data: req.body }); res.json(item); }
export async function deleteGalleryItem(req, res) { const id = parseInt(req.params.id, 10); await prisma.galleryItem.delete({ where: { id } }); res.status(204).send(); }
