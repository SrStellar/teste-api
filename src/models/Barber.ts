import mongoose, { Schema, Types } from 'mongoose';
import { BaseDocument, transformId } from './common';

export interface IBarber extends BaseDocument {
  userId?: Types.ObjectId;
  name: string;
  specialty?: string;
  experience?: string;
  imageUrl?: string;
}

const barberSchema = new Schema<IBarber>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', unique: true, sparse: true },
  name: { type: String, required: true },
  specialty: { type: String },
  experience: { type: String },
  imageUrl: { type: String }
}, {
  timestamps: true,
  versionKey: false,
  toJSON: { transform: transformId }
});

export const BarberModel = mongoose.model<IBarber>('Barber', barberSchema);