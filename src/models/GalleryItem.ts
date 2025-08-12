import mongoose, { Schema } from 'mongoose';
import { BaseDocument, transformId } from './common';

export interface IGalleryItem extends BaseDocument {
  title: string;
  description?: string;
  imageUrl: string;
}

const galleryItemSchema = new Schema<IGalleryItem>({
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String, required: true }
}, {
  timestamps: true,
  versionKey: false,
  toJSON: { transform: transformId }
});

export const GalleryItemModel = mongoose.model<IGalleryItem>('GalleryItem', galleryItemSchema);