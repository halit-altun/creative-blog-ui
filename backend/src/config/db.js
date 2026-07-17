import mongoose from 'mongoose';
import dns from 'node:dns';
import { env } from './env.js';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
  dns.setDefaultResultOrder('ipv4first');
} catch {
  // Some runtimes (serverless) may restrict DNS overrides.
}

let connectionPromise = null;

export const connectDB = async (uri = env.mongoUri) => {
  if (!uri) {
    throw new Error('MONGODB_URI is missing. Set it in backend/.env or root .env');
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!connectionPromise) {
    mongoose.set('strictQuery', true);
    connectionPromise = mongoose
      .connect(uri, {
        dbName: env.mongoDb,
        serverSelectionTimeoutMS: 30000,
        bufferCommands: false,
      })
      .then((conn) => {
        console.log(`MongoDB connected (${env.mongoDb})`);
        return conn.connection;
      })
      .catch((error) => {
        connectionPromise = null;
        throw error;
      });
  }

  return connectionPromise;
};
