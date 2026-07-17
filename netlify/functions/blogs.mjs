import { getBlogsCollection, json } from './_shared/mongo.mjs';

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return json(204, {});
  }

  if (event.httpMethod !== 'GET') {
    return json(405, { message: 'Method not allowed' });
  }

  try {
    const blogs = await getBlogsCollection();
    const docs = await blogs
      .find(
        {},
        {
          projection: {
            content: 0,
            author: 0,
            createdAt: 0,
            updatedAt: 0,
            __v: 0,
          },
        },
      )
      .sort({ createdAt: -1 })
      .toArray();

    return json(200, docs);
  } catch (error) {
    console.error('GET /api/blogs error:', error);
    return json(500, {
      message: 'Failed to fetch blogs',
      error: error?.message || String(error),
    });
  }
};
