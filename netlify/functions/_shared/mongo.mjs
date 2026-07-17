import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'blog-journey';

let cachedClient = null;
let cachedPromise = null;

export const json = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  },
  body: JSON.stringify(body),
});

export const getBlogsCollection = async () => {
  if (!uri) {
    throw new Error(
      'MONGODB_URI is missing. Add it in Netlify Site settings → Environment variables, then redeploy.',
    );
  }

  if (!cachedPromise) {
    cachedClient = new MongoClient(uri, {
      serverSelectionTimeoutMS: 15000,
      maxPoolSize: 5,
    });
    cachedPromise = cachedClient.connect().catch((error) => {
      cachedPromise = null;
      cachedClient = null;
      throw error;
    });
  }

  await cachedPromise;
  return cachedClient.db(dbName).collection('blogs');
};
