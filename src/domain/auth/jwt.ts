import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../../config/env';
export interface JwtPayload { sub: string; role: string; }
export function signAccessToken(payload: JwtPayload) { return jwt.sign(payload as any, env.jwtSecret, { expiresIn: env.jwtAccessTtl } as SignOptions); }
export function signRefreshToken(payload: JwtPayload) { return jwt.sign(payload as any, env.jwtSecret, { expiresIn: env.jwtRefreshTtl } as SignOptions); }
export function verifyToken<T = any>(token: string): T { return jwt.verify(token, env.jwtSecret) as T; }