import { Request, Response } from 'express';
import { prisma } from '../../db/prisma';
export async function getContactInfo(_req: Request, res: Response) { const info = await prisma.contactInfo.findFirst(); res.json(info); }
export async function updateContactInfo(req: Request, res: Response) { let info = await prisma.contactInfo.findFirst(); if (!info) { info = await prisma.contactInfo.create({ data: req.body }); } else { info = await prisma.contactInfo.update({ where: { id: info.id }, data: req.body }); } res.json(info); }