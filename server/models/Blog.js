const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  slug:        { type: String, required: true, unique: true },
  excerpt:     { type: String, default: '' },
  content:     { type: String, default: '' },
  coverImage:  { type: String, default: '' },
  tags:        [{ type: String }],
  category:    { type: String, default: 'Marketing' },
  author:      { type: String, default: 'Yash Mandale' },
  readTime:    { type: String, default: '5 min read' },
  isPublished: { type: Boolean, default: false },
  publishedAt: { type: Date },
  createdAt:   { type: Date, default: Date.now },
  updatedAt:   { type: Date, default: Date.now },
  views:       { type: Number, default: 0 },
});

BlogSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  if (this.isPublished && !this.publishedAt) this.publishedAt = Date.now();
  next();
});

module.exports = mongoose.model('Blog', BlogSchema);
