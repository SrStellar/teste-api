import { createApp } from './app';
import { env } from './config/env';
import { connectMongoDB } from './db/mongo';

async function startServer() {
  await connectMongoDB();
  const app = createApp();
  app.listen(env.port, () => { 
    console.log(`API rodando na porta ${env.port}`);
  });
}

startServer().catch(error => {
  console.error('Erro ao iniciar servidor:', error);
  process.exit(1);
});