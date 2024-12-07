import express from 'express';
import { getBlogByCategory, getAllBlogs, createBlog } from '../controllers/blogController.js';

const router = express.Router();

router.get('/:category', getBlogByCategory);
router.get('/', getAllBlogs);
router.post('/', createBlog);

export default router;
