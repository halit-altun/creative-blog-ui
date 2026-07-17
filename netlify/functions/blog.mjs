import { connectDB } from '../../server/config/db.js';
import Blog from '../../server/models/Blog.js';

const json = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  },
  body: JSON.stringify(body),
});

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return json(204, {});
  }

  if (event.httpMethod !== 'GET') {
    return json(405, { message: 'Method not allowed' });
  }

  try {
    const category =
      event.queryStringParameters?.category ||
      decodeURIComponent((event.path || '').split('/').filter(Boolean).pop() || '').trim();

    if (!category || category === 'blog') {
      return json(400, { message: 'Category is required' });
    }

    await connectDB();
    const escaped = category.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const blog = await Blog.findOne({
      category: new RegExp(`^${escaped}$`, 'i'),
    }).lean();

    if (!blog) {
      return json(404, { message: 'Blog not found' });
    }

    return json(200, blog);
  } catch (error) {
    console.error('GET /api/blogs/:category error:', error);
    return json(500, { message: 'Failed to fetch blog detail' });
  }
};
