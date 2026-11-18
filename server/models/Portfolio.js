const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  brand:       { type: String, required: true },
  category:    { type: String, enum: ['Instagram', 'YouTube', 'Campaign', 'Collab', 'Reel', 'Other'], default: 'Campaign' },
  description: { type: String, default: '' },
  imageUrl:    { type: String, default: '' },
  videoUrl:    { type: String, default: '' },
  metrics: {
    reach:       { type: String, default: '0' },
    engagement:  { type: String, default: '0%' },
    impressions: { type: String, default: '0' },
    clicks:      { type: String, default: '0' },
  },
  tags:       [{ type: String }],
  date:        { type: Date, default: Date.now },
  featured:    { type: Boolean, default: false },
  isActive:    { type: Boolean, default: true },
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
