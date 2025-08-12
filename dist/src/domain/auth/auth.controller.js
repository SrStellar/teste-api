import { prisma } from '../../db/prisma';
import { verifyPassword, hashPassword } from '../../utils/password';
import { signAccessToken, signRefreshToken } from './jwt';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env';
function serializeUser(u) { return { id: u.id, name: u.name, email: u.email, role: u.role }; }
async function issueTokens(userId, role) { const accessToken = signAccessToken({ sub: userId, role }); const refreshToken = signRefreshToken({ sub: userId, role }); const decoded = jwt.decode(refreshToken); const expiresAt = new Date(decoded.exp * 1000); await prisma.refreshToken.create({ data: { userId, token: refreshToken, expiresAt } }); return { accessToken, refreshToken }; }
export async function register(req, res) { const { name, email, password } = req.body; const exists = await prisma.user.findUnique({ where: { email } }); if (exists)
    return res.status(400).json({ message: 'Este email já está em uso.' }); const passwordHash = await hashPassword(password); const user = await prisma.user.create({ data: { name, email, passwordHash, role: 'customer' } }); const tokens = await issueTokens(user.id, user.role); res.status(201).json({ user: serializeUser(user), tokens }); }
export async function login(req, res) { const { email, password } = req.body; const user = await prisma.user.findUnique({ where: { email } }); if (!user)
    return res.status(401).json({ message: 'Credenciais inválidas.' }); const valid = await verifyPassword(password, user.passwordHash); if (!valid)
    return res.status(401).json({ message: 'Credenciais inválidas.' }); const tokens = await issueTokens(user.id, user.role); res.json({ user: serializeUser(user), tokens }); }
export async function logout(req, res) { const { refreshToken } = req.body; if (refreshToken) {
    await prisma.refreshToken.updateMany({ where: { token: refreshToken }, data: { revoked: true } });
} res.status(204).send(); }
export async function refresh(req, res) { const { refreshToken } = req.body; if (!refreshToken)
    return res.status(400).json({ message: 'Refresh token requerido.' }); try {
    const decoded = jwt.verify(refreshToken, env.jwtSecret);
    const stored = await prisma.refreshToken.findUnique({ where: { token: refreshToken } });
    if (!stored || stored.revoked || stored.expiresAt < new Date())
        return res.status(401).json({ message: 'Refresh token inválido.' });
    await prisma.refreshToken.update({ where: { token: refreshToken }, data: { revoked: true } });
    const tokens = await issueTokens(decoded.sub, decoded.role);
    res.json(tokens);
}
catch {
    return res.status(401).json({ message: 'Refresh token inválido.' });
} }
