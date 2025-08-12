import { UserModel } from '../../models/User';
export async function listUsers(_req, res) { const users = await UserModel.find({}, { id: 1, name: 1, email: 1, role: 1, createdAt: 1 }); res.json(users); }
export async function deleteUser(req, res) { const id = req.params.id; await UserModel.findByIdAndDelete(id); res.status(204).send(); }
