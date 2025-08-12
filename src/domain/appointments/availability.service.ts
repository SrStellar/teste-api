import { AppointmentModel } from '../../models/Appointment';

export async function getUnavailableSlots(barberId: string, date: string): Promise<string[]> {
  const appointments = await AppointmentModel.find({
    barberId,
    date: new Date(date),
    status: { $ne: 'CANCELLED' }
  }, { time: 1 });

  return appointments.map(appt => appt.time);
}