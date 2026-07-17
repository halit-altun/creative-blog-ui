import { getBlogsCollection, json } from './_shared/mongo.mjs';

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return json(204, {});
  }

  if (event.httpMethod !== 'GET') {
    return json(405, { message: 'Method not allowed' });
  }

  try {
    const category = (event.queryStringParameters?.category || '').trim();

    if (!category) {
      return json(400, { message: 'Category is required' });
    }

    const blogs = await getBlogsCollection();
    const escaped = category.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const blog = await blogs.findOne({
      category: { $regex: `^${escaped}$`, $options: 'i' },
    });

    if (!blog) {
      return json(404, { message: 'Blog not found' });
    }

    return json(200, blog);
  } catch (error) {
    console.error('GET /api/blogs/:category error:', error);
    return json(500, {
      message: 'Failed to fetch blog detail',
      error: error?.message || String(error),
    });
  }
};
