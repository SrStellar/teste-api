import { BarberModel } from '../../models/Barber';
import { UserModel } from '../../models/User';
import { hashPassword } from '../../utils/password';
export async function listBarbers(_req, res) { const data = await BarberModel.find(); res.json(data); }
export async function createBarber(req, res) { const { name, email, password, specialty, experience, imageUrl } = req.body; const exists = await UserModel.findOne({ email }); if (exists)
    return res.status(400).json({ message: 'Email já em uso.' }); const passwordHash = await hashPassword(password); const user = await UserModel.create({ name, email, passwordHash, role: 'barber' }); const barber = await BarberModel.create({ name, specialty, experience, imageUrl, userId: user.id }); res.status(201).json(barber); }
export async function updateBarber(req, res) { const id = req.params.id; const barber = await BarberModel.findByIdAndUpdate(id, req.body, { new: true }); res.json(barber); }
export async function deleteBarber(req, res) { const id = req.params.id; const b = await BarberModel.findById(id); if (!b)
    return res.status(404).json({ message: 'Barbeiro não encontrado.' }); if (b.userId) {
    await UserModel.findByIdAndDelete(b.userId);
}
else {
    await BarberModel.findByIdAndDelete(id);
} res.status(204).send(); }
