import { Router } from 'express';
import Blog from '../models/Blog.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .select('-content -author -createdAt -updatedAt');
    res.json(blogs);
  } catch (error) {
    console.error('GET /api/blogs error:', error);
    res.status(500).json({ message: 'Failed to fetch blogs' });
  }
});

router.get('/:category', async (req, res) => {
  try {
    const category = decodeURIComponent(req.params.category || '').trim();
    const escaped = category.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const blog = await Blog.findOne({
      category: new RegExp(`^${escaped}$`, 'i'),
    });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json(blog);
  } catch (error) {
    console.error('GET /api/blogs/:category error:', error);
    res.status(500).json({ message: 'Failed to fetch blog detail' });
  }
});

export default router;
