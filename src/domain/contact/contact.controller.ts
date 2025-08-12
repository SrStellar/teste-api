import { Request, Response } from 'express';
import { ContactInfoModel } from '../../models/ContactInfo';
export async function getContactInfo(_req: Request, res: Response) { const info = await ContactInfoModel.findOne(); res.json(info); }
export async function updateContactInfo(req: Request, res: Response) { let info = await ContactInfoModel.findOne(); if (!info) { info = await ContactInfoModel.create(req.body); } else { info = await ContactInfoModel.findByIdAndUpdate(info.id, req.body, { new: true }); } res.json(info); }