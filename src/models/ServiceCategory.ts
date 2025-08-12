import mongoose, { Schema } from 'mongoose';
import { BaseDocument, transformId } from './common';

export interface IServiceCategory extends BaseDocument {
  name: string;
}

const serviceCategorySchema = new Schema<IServiceCategory>({
  name: { type: String, required: true }
}, {
  timestamps: true,
  versionKey: false,
  toJSON: { transform: transformId }
});

export const ServiceCategoryModel = mongoose.model<IServiceCategory>('ServiceCategory', serviceCategorySchema);