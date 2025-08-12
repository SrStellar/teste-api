import jwt from 'jsonwebtoken';
import { env } from '../../config/env';
export interface JwtPayload { sub: number; role: string; }
export function signAccessToken(payload: JwtPayload) { return jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtAccessTtl }); }
export function signRefreshToken(payload: JwtPayload) { return jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtRefreshTtl }); }
export function verifyToken<T = any>(token: string): T { return jwt.verify(token, env.jwtSecret) as T; }