import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../domain/auth/jwt';
export interface AuthUser { id: number; role: string; }
export interface AuthRequest extends Request { user?: AuthUser; }
export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) { const header = req.headers.authorization; if (!header?.startsWith('Bearer ')) return res.status(401).json({ message: 'Token ausente.' }); const token = header.split(' ')[1]; try { const decoded = verifyToken<{ sub: number; role: string }>(token); req.user = { id: decoded.sub, role: decoded.role }; return next(); } catch { return res.status(401).json({ message: 'Token inválido ou expirado.' }); } }