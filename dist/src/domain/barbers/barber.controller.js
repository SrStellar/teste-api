import { prisma } from '../../db/prisma';
import { hashPassword } from '../../utils/password';
export async function listBarbers(_req, res) { const data = await prisma.barber.findMany(); res.json(data); }
export async function createBarber(req, res) { const { name, email, password, specialty, experience, imageUrl } = req.body; const exists = await prisma.user.findUnique({ where: { email } }); if (exists)
    return res.status(400).json({ message: 'Email já em uso.' }); const passwordHash = await hashPassword(password); const user = await prisma.user.create({ data: { name, email, passwordHash, role: 'barber' } }); const barber = await prisma.barber.create({ data: { name, specialty, experience, imageUrl, userId: user.id } }); res.status(201).json(barber); }
export async function updateBarber(req, res) { const id = parseInt(req.params.id, 10); const barber = await prisma.barber.update({ where: { id }, data: req.body }); res.json(barber); }
export async function deleteBarber(req, res) { const id = parseInt(req.params.id, 10); const b = await prisma.barber.findUnique({ where: { id } }); if (!b)
    return res.status(404).json({ message: 'Barbeiro não encontrado.' }); if (b.userId) {
    await prisma.user.delete({ where: { id: b.userId } });
}
else {
    await prisma.barber.delete({ where: { id } });
} res.status(204).send(); }
