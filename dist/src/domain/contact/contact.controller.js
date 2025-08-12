import { ContactInfoModel } from '../../models/ContactInfo';
export async function getContactInfo(_req, res) { const info = await ContactInfoModel.findOne(); res.json(info); }
export async function updateContactInfo(req, res) { let info = await ContactInfoModel.findOne(); if (!info) {
    info = await ContactInfoModel.create(req.body);
}
else {
    info = await ContactInfoModel.findByIdAndUpdate(info.id, req.body, { new: true });
} res.json(info); }
