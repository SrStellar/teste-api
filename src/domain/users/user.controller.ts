import { Request, Response } from 'express';
import { prisma } from '../../db/prisma';
export async function listUsers(_req: Request, res: Response) { const users = await prisma.user.findMany({ select: { id: true, name: true, email: true, role: true, createdAt: true } }); res.json(users); }
export async function deleteUser(req: Request, res: Response) { const id = parseInt(req.params.id, 10); await prisma.user.delete({ where: { id } }); res.status(204).send(); }