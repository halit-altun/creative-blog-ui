import Blog from '../models/Blog.js';
import logger from '../utils/logger.js';

export const getBlogByCategory = async (req, res) => {
  try {
    logger.info(`Fetching blog for category: ${req.params.category}`);
    const blog = await Blog.findOne({ category: req.params.category });
    
    if (!blog) {
      logger.warn(`Blog not found for category: ${req.params.category}`);
      return res.status(404).json({ message: 'Blog not found' });
    }

    logger.info(`Successfully retrieved blog for category: ${req.params.category}`);
    res.json(blog);
  } catch (error) {
    logger.error('Error in getBlogByCategory:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    logger.info('Fetching all blogs');
    const blogs = await Blog.find().sort({ createdAt: -1 });
    logger.info(`Successfully retrieved ${blogs.length} blogs`);
    res.json(blogs);
  } catch (error) {
    logger.error('Error in getAllBlogs:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createBlog = async (req, res) => {
  try {
    logger.info('Creating new blog', { title: req.body.title });
    const blog = new Blog(req.body);
    await blog.save();
    logger.info('Successfully created new blog', { id: blog._id });
    res.status(201).json(blog);
  } catch (error) {
    logger.error('Error in createBlog:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
