import mongoose, { Schema } from 'mongoose';
import { BaseDocument, UserRole, transformId } from './common';

export interface IUser extends BaseDocument {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { 
    type: String, 
    enum: Object.values(UserRole),
    required: true 
  }
}, {
  timestamps: true,
  versionKey: false,
  toJSON: { transform: transformId }
});

// Create unique index on email
userSchema.index({ email: 1 }, { unique: true });

export const UserModel = mongoose.model<IUser>('User', userSchema);