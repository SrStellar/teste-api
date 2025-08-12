import { z } from 'zod';
export const registerSchema = z.object({ body: z.object({ name: z.string().min(2), email: z.string().email(), password: z.string().min(6) }) });
export const loginSchema = z.object({ body: z.object({ email: z.string().email(), password: z.string().min(6) }) });
export const refreshSchema = z.object({ body: z.object({ refreshToken: z.string() }) });
export const logoutSchema = z.object({ body: z.object({ refreshToken: z.string().optional() }) });
