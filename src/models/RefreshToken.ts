import mongoose, { Schema, Types } from 'mongoose';
import { BaseDocument, transformId } from './common';

export interface IRefreshToken extends BaseDocument {
  userId: Types.ObjectId;
  token: string;
  expiresAt: Date;
  revoked: boolean;
}

const refreshTokenSchema = new Schema<IRefreshToken>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
  revoked: { type: Boolean, default: false, required: true }
}, {
  timestamps: true,
  versionKey: false,
  toJSON: { transform: transformId }
});

// Create unique index on token
refreshTokenSchema.index({ token: 1 }, { unique: true });

export const RefreshTokenModel = mongoose.model<IRefreshToken>('RefreshToken', refreshTokenSchema);