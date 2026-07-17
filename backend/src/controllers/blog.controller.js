import * as blogService from '../services/blog.service.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

export const getBlogs = asyncHandler(async (_req, res) => {
  const blogs = await blogService.listBlogs();
  res.json(blogs);
});

export const getBlogByCategory = asyncHandler(async (req, res) => {
  const category = decodeURIComponent(req.params.category || '').trim();
  const blog = await blogService.getBlogByCategory(category);

  if (!blog) {
    return res.status(404).json({ message: 'Blog not found' });
  }

  return res.json(blog);
});
