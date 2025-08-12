import { prisma } from '../../db/prisma';
export async function listUsers(_req, res) { const users = await prisma.user.findMany({ select: { id: true, name: true, email: true, role: true, createdAt: true } }); res.json(users); }
export async function deleteUser(req, res) { const id = parseInt(req.params.id, 10); await prisma.user.delete({ where: { id } }); res.status(204).send(); }
