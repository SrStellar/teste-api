import { ServiceModel } from '../../models/Service';
export async function createService(req, res) { const { categoryId, name, price } = req.body; const svc = await ServiceModel.create({ categoryId, name, price }); res.status(201).json(svc); }
export async function updateService(req, res) { const id = req.params.id; const svc = await ServiceModel.findByIdAndUpdate(id, req.body, { new: true }); res.json(svc); }
export async function deleteService(req, res) { const id = req.params.id; await ServiceModel.findByIdAndDelete(id); res.status(204).send(); }
