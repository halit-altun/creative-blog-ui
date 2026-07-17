import { Router } from 'express';
import blogRoutes from './blog.routes.js';
import mailRoutes from './mail.routes.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'creative-blog-backend' });
});

router.use('/blogs', blogRoutes);
router.use('/mail', mailRoutes);

export default router;
