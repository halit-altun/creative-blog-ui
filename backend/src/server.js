import app from './app.js';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';

const start = async () => {
  await connectDB();
  app.listen(env.port, () => {
    console.log(`API running on http://localhost:${env.port}`);
  });
};

start().catch((error) => {
  console.error('Failed to start backend:', error);
  process.exit(1);
});
