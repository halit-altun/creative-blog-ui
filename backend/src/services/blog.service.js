import Blog from '../models/Blog.js';
import { escapeRegex } from '../utils/escapeRegex.js';

export const listBlogs = async () =>
  Blog.find()
    .sort({ createdAt: -1 })
    .select('-content -author -createdAt -updatedAt')
    .lean();

export const getBlogByCategory = async (category) => {
  const escaped = escapeRegex(category);
  return Blog.findOne({
    category: new RegExp(`^${escaped}$`, 'i'),
  }).lean();
};
