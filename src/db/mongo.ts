import mongoose from 'mongoose';
import { env } from '../config/env';

let isConnected = false;

export async function connectMongoDB() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(env.mongodbUri);
    isConnected = true;
    console.log('Conectado ao MongoDB');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
}

export async function disconnectMongoDB() {
  if (isConnected) {
    await mongoose.disconnect();
    isConnected = false;
    console.log('Desconectado do MongoDB');
  }
}

// Handle connection events
mongoose.connection.on('error', (error) => {
  console.error('Erro na conexão MongoDB:', error);
});

mongoose.connection.on('disconnected', () => {
  isConnected = false;
  console.log('MongoDB desconectado');
});