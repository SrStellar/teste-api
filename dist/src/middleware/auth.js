import { verifyToken } from '../domain/auth/jwt';
export function authMiddleware(req, res, next) { const header = req.headers.authorization; if (!header?.startsWith('Bearer '))
    return res.status(401).json({ message: 'Token ausente.' }); const token = header.split(' ')[1]; try {
    const decoded = verifyToken(token);
    req.user = { id: decoded.sub, role: decoded.role };
    return next();
}
catch {
    return res.status(401).json({ message: 'Token inválido ou expirado.' });
} }
