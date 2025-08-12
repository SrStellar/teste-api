import mongoose, { Schema, Types } from 'mongoose';
import { BaseDocument, AppointmentStatus, transformId } from './common';

export interface IAppointmentService {
  serviceId: Types.ObjectId;
  name: string;
  price: number;
}

export interface IAppointment extends BaseDocument {
  userId: Types.ObjectId;
  clientName: string;
  barberId: Types.ObjectId;
  date: Date;
  time: string;
  status: AppointmentStatus;
  totalPrice: number;
  notes?: string;
  services: IAppointmentService[];
}

const appointmentServiceSchema = new Schema<IAppointmentService>({
  serviceId: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true }
}, { _id: false });

const appointmentSchema = new Schema<IAppointment>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  clientName: { type: String, required: true },
  barberId: { type: Schema.Types.ObjectId, ref: 'Barber', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: {
    type: String,
    enum: Object.values(AppointmentStatus),
    default: AppointmentStatus.SCHEDULED,
    required: true
  },
  totalPrice: { type: Number, required: true },
  notes: { type: String },
  services: [appointmentServiceSchema]
}, {
  timestamps: true,
  versionKey: false,
  toJSON: { transform: transformId }
});

// Create compound unique index for barberId, date, time with partial filter for non-cancelled appointments
appointmentSchema.index(
  { barberId: 1, date: 1, time: 1 },
  { 
    unique: true,
    partialFilterExpression: { status: { $ne: AppointmentStatus.CANCELLED } }
  }
);

export const AppointmentModel = mongoose.model<IAppointment>('Appointment', appointmentSchema);