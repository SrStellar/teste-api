import { Router } from 'express';
import { login, register, logout, refresh } from './auth.controller';
import { validate } from '../../middleware/validate';
import { loginSchema, registerSchema, logoutSchema, refreshSchema } from '../../schemas/auth';
export const authRouter = Router();
authRouter.post('/register', validate(registerSchema), register);
authRouter.post('/login', validate(loginSchema), login);
authRouter.post('/logout', validate(logoutSchema), logout);
authRouter.post('/refresh', validate(refreshSchema), refresh);