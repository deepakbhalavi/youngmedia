const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  icon:        { type: String, default: 'star' },
  features:    [{ type: String }],
  order:       { type: Number, default: 0 },
  isActive:    { type: Boolean, default: true },
  color:       { type: String, default: '#D4AF37' },
  createdAt:   { type: Date, default: Date.now },
});

module.exports = mongoose.model('Service', ServiceSchema);
