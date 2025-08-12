import mongoose, { Schema, Types } from 'mongoose';
import { BaseDocument, transformId } from './common';

export interface IService extends BaseDocument {
  categoryId: Types.ObjectId;
  name: string;
  price: number;
}

const serviceSchema = new Schema<IService>({
  categoryId: { type: Schema.Types.ObjectId, ref: 'ServiceCategory', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true }
}, {
  timestamps: true,
  versionKey: false,
  toJSON: { transform: transformId }
});

export const ServiceModel = mongoose.model<IService>('Service', serviceSchema);