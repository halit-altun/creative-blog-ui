import { Router } from 'express';
import * as blogController from '../controllers/blog.controller.js';

const router = Router();

router.get('/', blogController.getBlogs);
router.get('/:category', blogController.getBlogByCategory);

export default router;
