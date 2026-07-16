import mongoose from 'mongoose';
import dns from 'node:dns';

dns.setServers(['8.8.8.8', '1.1.1.1']);
dns.setDefaultResultOrder('ipv4first');

export const connectDB = async (uri) => {
  if (!uri) {
    throw new Error('MONGODB_URI is missing. Set it in .env');
  }

  mongoose.set('strictQuery', true);
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 30000,
  });
  console.log('MongoDB connected');
};
