import 'dotenv/config';
import { connectDB } from '../config/db.js';
import Blog from '../models/Blog.js';
import { sampleBlogs } from '../data/sampleBlogs.js';
import mongoose from 'mongoose';

const seedBlogs = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);

    await Blog.deleteMany({});
    const inserted = await Blog.insertMany(sampleBlogs);

    console.log(`Seeded ${inserted.length} blog posts`);
    inserted.forEach((blog) => {
      console.log(`- ${blog.category}: ${blog.title}`);
    });
  } catch (error) {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

seedBlogs();
