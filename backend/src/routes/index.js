import { Router } from 'express';
import blogRoutes from './blog.routes.js';
import mailRoutes from './mail.routes.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'creative-blog-backend',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    env: {
      gmail_api_configured: !!(
        process.env.GMAIL_CLIENT_ID &&
        process.env.GMAIL_CLIENT_SECRET &&
        process.env.GMAIL_REFRESH_TOKEN
      ),
    }
  });
});

router.use('/blogs', blogRoutes);
router.use('/mail', mailRoutes);

export default router;
