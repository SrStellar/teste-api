import { createApp } from './app';
import { env } from './config/env';
const app = createApp();
app.listen(env.port, () => { console.log(`API rodando na porta ${env.port}`); });