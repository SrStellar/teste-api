# Padilha Barbershop API

## Stack
Node.js + TypeScript + Express + MongoDB + Mongoose + JWT (access/refresh) + Zod

## Scripts
- Dev: `npm run dev`
- Build: `npm run build`
- Start: `npm start`
- Seed: `npm run seed`

## Setup
1. Copiar `.env.example` para `.env` e ajustar valores.
2. `npm install`
3. Configurar MONGODB_URI no .env (ex: `mongodb://localhost:27017/padilha`)
4. `npm run seed`
5. `npm run dev`

## Endpoints Principais
Ver documentação original fornecida (rotas prefixadas por /api/v1).

## Autenticação
- Login: POST /api/v1/login
- Registrar: POST /api/v1/register
- Refresh: POST /api/v1/refresh
- Logout: POST /api/v1/logout

Enviar Authorization: Bearer <accessToken> nas rotas protegidas.

## Banco de Dados
A aplicação utiliza MongoDB com Mongoose. Os IDs são ObjectIds do MongoDB (strings) em vez de inteiros incrementais.

## Gerar ZIP
```
zip -r padilha-barbershop-api.zip .
```