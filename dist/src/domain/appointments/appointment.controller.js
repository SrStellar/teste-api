import { createAppointment, listUserAppointments, cancelAppointment } from './appointment.service';
export async function getMyAppointments(req, res) { const list = await listUserAppointments(req.user.id); res.json(list); }
export async function postAppointment(req, res, next) { try {
    const { barberId, serviceIds, date, time, notes } = req.body;
    const created = await createAppointment({ userId: req.user.id, clientName: req.user.id.toString(), barberId, serviceIds, date, time, notes });
    res.status(201).json(created);
}
catch (e) {
    next(e);
} }
export async function deleteAppointment(req, res, next) { try {
    const id = parseInt(req.params.id, 10);
    await cancelAppointment(id, req.user.id);
    res.status(204).send();
}
catch (e) {
    next(e);
} }
