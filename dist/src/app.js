import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { apiRouter } from './routes';
import { errorHandler } from './middleware/error';
export function createApp() { const app = express(); app.use(cors()); app.use(helmet()); app.use(express.json()); app.use(morgan('dev')); app.use('/api/v1', apiRouter); app.use(errorHandler); return app; }
