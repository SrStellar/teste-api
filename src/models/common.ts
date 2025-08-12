import { Document } from 'mongoose';

// Enums
export enum UserRole {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
  BARBER = 'barber'
}

export enum AppointmentStatus {
  SCHEDULED = 'SCHEDULED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

// Base interface for all models with timestamps
export interface BaseDocument extends Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Transform function to expose id instead of _id in JSON responses
export function transformId(doc: any, ret: any) {
  ret.id = ret._id.toString();
  delete ret._id;
  delete ret.__v;
  return ret;
}