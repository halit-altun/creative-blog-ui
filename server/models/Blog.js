import mongoose from 'mongoose';

const contentBlockSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['paragraph', 'subtitle'],
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const blogSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    date: {
      type: String,
      required: true,
    },
    readTime: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
      default: 'Halit Altun',
    },
    content: {
      type: [contentBlockSchema],
      required: true,
      validate: {
        validator: (blocks) => Array.isArray(blocks) && blocks.length > 0,
        message: 'content must contain at least one block',
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

blogSchema.index({ createdAt: -1 });

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
