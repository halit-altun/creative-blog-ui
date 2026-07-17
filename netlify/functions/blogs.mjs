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
    await connectDB();
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .select('-content -author -createdAt -updatedAt')
      .lean();

    return json(200, blogs);
  } catch (error) {
    console.error('GET /api/blogs error:', error);
    return json(500, { message: 'Failed to fetch blogs' });
  }
};
