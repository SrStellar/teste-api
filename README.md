# Padilha Barbershop API

## Stack
Node.js + TypeScript + Express + MongoDB + Mongoose + JWT (access/refresh) + Zod

*Migration from Prisma/PostgreSQL to MongoDB is complete.*

## Requirements
- Node.js >= 18 (recommended)
- MongoDB database

## Setup
1. Copy `.env.example` to `.env` and configure your environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A secure secret key for JWT signing
   - `JWT_EXPIRES_IN`: Access token expiration (default: 15m)
   - `REFRESH_EXPIRES_IN`: Refresh token expiration (default: 7d)
   - `PORT`: Server port (default: 3000)

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

## Scripts
- **Development**: `npm run dev` - Start development server with hot reload
- **Build**: `npm run build` - Compile TypeScript to JavaScript
- **Start**: `npm start` - Start production server
- **Lint**: `npm run lint` - Run ESLint code analysis
- **Test**: `npm run test` - Run test suite

## ESLint Configuration
The project uses ESLint 8.57.0 for code linting with TypeScript support. All peer dependency conflicts have been resolved.

## API Endpoints
All routes are prefixed with `/api/v1`.

### Authentication
- **Login**: `POST /api/v1/login`
- **Register**: `POST /api/v1/register`
- **Refresh Token**: `POST /api/v1/refresh`
- **Logout**: `POST /api/v1/logout`

For protected routes, include the authorization header:
```
Authorization: Bearer <accessToken>
```

## Development
The API is production-ready and fully migrated to MongoDB with Mongoose ODM.