import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['subtitle', 'paragraph', 'code', 'image']
  },
  text: String,
  code: String,
  language: String,
  imageUrl: String,
  caption: String
});

const blogSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    default: function() {
      const firstParagraph = this.content.find(item => item.type === 'paragraph');
      if (firstParagraph && firstParagraph.text) {
        const firstSentence = firstParagraph.text.split('.')[0];
        return firstSentence ? firstSentence + '.' : '';
      }
      return '';
    }
  },
  author: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  tags: [{
    type: String
  }],
  content: [contentSchema],
  category: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Blog', blogSchema);
