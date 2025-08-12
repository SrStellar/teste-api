import mongoose, { Schema } from 'mongoose';
import { BaseDocument, transformId } from './common';

export interface IContactInfo extends BaseDocument {
  phone?: string;
  email?: string;
  address?: string;
  instagram?: string;
  twitter?: string;
  facebook?: string;
}

const contactInfoSchema = new Schema<IContactInfo>({
  phone: { type: String },
  email: { type: String },
  address: { type: String },
  instagram: { type: String },
  twitter: { type: String },
  facebook: { type: String }
}, {
  timestamps: true,
  versionKey: false,
  toJSON: { transform: transformId }
});

export const ContactInfoModel = mongoose.model<IContactInfo>('ContactInfo', contactInfoSchema);