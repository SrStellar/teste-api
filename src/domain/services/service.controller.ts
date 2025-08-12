import { Request, Response } from 'express';
import { prisma } from '../../db/prisma';
export async function createService(req: Request, res: Response) { const { categoryId, name, price } = req.body; const svc = await prisma.service.create({ data: { categoryId, name, price } }); res.status(201).json(svc); }
export async function updateService(req: Request, res: Response) { const id = parseInt(req.params.id, 10); const svc = await prisma.service.update({ where: { id }, data: req.body }); res.json(svc); }
export async function deleteService(req: Request, res: Response) { const id = parseInt(req.params.id, 10); await prisma.service.delete({ where: { id } }); res.status(204).send(); }