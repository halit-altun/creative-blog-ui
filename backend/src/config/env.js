import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// backend/.env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const toBool = (value, fallback = false) => {
  if (value === undefined || value === null || value === '') return fallback;
  return String(value).toLowerCase() === 'true';
};

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
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: toBool(process.env.SMTP_SECURE, false),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.MAIL_FROM || process.env.SMTP_USER || '',
    to: process.env.MAIL_TO || 'halitaltun002@gmail.com',
  },
};
