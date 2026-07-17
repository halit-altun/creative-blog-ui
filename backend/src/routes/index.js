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
      smtp_configured: !!(process.env.SMTP_USER && process.env.SMTP_PASS),
      smtp_host: process.env.SMTP_HOST || 'not set',
      smtp_port: process.env.SMTP_PORT || 'not set',
    }
  });
});

router.use('/blogs', blogRoutes);
router.use('/mail', mailRoutes);

export default router;
