# Padilha Barbershop API

## Stack
Node.js + TypeScript + Express + Prisma + PostgreSQL + JWT (access/refresh) + Zod

## Scripts
- Dev: `npm run dev`
- Build: `npm run build`
- Start: `npm start`
- Migrate: `npm run migrate`
- Seed: `npm run seed`

## Setup
1. Copiar `.env.example` para `.env` e ajustar valores.
2. `npm install`
3. `npx prisma migrate dev --name init`
4. `npx prisma db seed`
5. `npm run dev`

## Endpoints Principais
Ver documentação original fornecida (rotas prefixadas por /api/v1).

## Autenticação
- Login: POST /api/v1/login
- Registrar: POST /api/v1/register
- Refresh: POST /api/v1/refresh
- Logout: POST /api/v1/logout

Enviar Authorization: Bearer <accessToken> nas rotas protegidas.

## Gerar ZIP
```
zip -r padilha-barbershop-api.zip .
```