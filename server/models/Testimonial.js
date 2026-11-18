const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  clientName:  { type: String, required: true },
  company:     { type: String, default: '' },
  role:        { type: String, default: '' },
  photo:       { type: String, default: '' },
  rating:      { type: Number, min: 1, max: 5, default: 5 },
  quote:       { type: String, required: true },
  platform:    { type: String, default: '' },
  isActive:    { type: Boolean, default: true },
  featured:    { type: Boolean, default: false },
  createdAt:   { type: Date, default: Date.now },
});

module.exports = mongoose.model('Testimonial', TestimonialSchema);
