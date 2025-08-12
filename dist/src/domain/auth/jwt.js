import jwt from 'jsonwebtoken';
import { env } from '../../config/env';
export function signAccessToken(payload) { return jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtAccessTtl }); }
export function signRefreshToken(payload) { return jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtRefreshTtl }); }
export function verifyToken(token) { return jwt.verify(token, env.jwtSecret); }
