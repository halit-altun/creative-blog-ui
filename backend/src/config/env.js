import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// backend/.env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const parseCorsOrigin = (value) => {
  if (value === undefined || value === null || value === '' || value === 'true') {
    return true;
  }
  if (value === 'false') return false;
  const list = String(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
  if (list.length === 0) return true;
  return list.length === 1 ? list[0] : list;
};

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGODB_URI,
  mongoDb: process.env.MONGODB_DB || 'blog-journey',
  corsOrigin: parseCorsOrigin(process.env.CORS_ORIGIN),
  // Gmail API (OAuth2, HTTPS) - Render'ın SMTP port engelini bypass etmek için
  gmail: {
    clientId: process.env.GMAIL_CLIENT_ID || '',
    clientSecret: process.env.GMAIL_CLIENT_SECRET || '',
    refreshToken: process.env.GMAIL_REFRESH_TOKEN || '',
    from: process.env.MAIL_FROM || '',
    to: process.env.MAIL_TO || 'halitaltun002@gmail.com',
  },
};
