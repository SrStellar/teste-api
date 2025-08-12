import { prisma } from '../../db/prisma';
export async function getContactInfo(_req, res) { const info = await prisma.contactInfo.findFirst(); res.json(info); }
export async function updateContactInfo(req, res) { let info = await prisma.contactInfo.findFirst(); if (!info) {
    info = await prisma.contactInfo.create({ data: req.body });
}
else {
    info = await prisma.contactInfo.update({ where: { id: info.id }, data: req.body });
} res.json(info); }
