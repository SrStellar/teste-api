import { Router } from 'express';
import { listUsers, deleteUser } from './user.controller';
import { authMiddleware } from '../../middleware/auth';
import { requireRole } from '../../middleware/role';
export const userRouter = Router();
userRouter.get('/admin/users', authMiddleware, requireRole('admin'), listUsers);
userRouter.delete('/admin/users/:id', authMiddleware, requireRole('admin'), deleteUser);