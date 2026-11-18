const mongoose = require('mongoose');

const SiteSettingsSchema = new mongoose.Schema({
  siteName:    { type: String, default: 'YMMarketing' },
  tagline:     { type: String, default: 'Elevate Your Brand. Amplify Your Reach.' },
  about:       { type: String, default: '' },
  email:       { type: String, default: 'yash@ymmarketing.com' },
  phone:       { type: String, default: '+91 98765 43210' },
  whatsapp:    { type: String, default: '+919876543210' },
  address:     { type: String, default: 'Mumbai, Maharashtra, India' },
  mapEmbedUrl: { type: String, default: '' },
  socials: {
    instagram:  { type: String, default: 'https://instagram.com/ymmarketing' },
    youtube:    { type: String, default: 'https://youtube.com/@ymmarketing' },
    linkedin:   { type: String, default: 'https://linkedin.com/in/yashmandale' },
    facebook:   { type: String, default: 'https://facebook.com/ymmarketing' },
    twitter:    { type: String, default: 'https://twitter.com/ymmarketing' },
  },
  stats: {
    followers:   { type: String, default: '500K+' },
    engagement:  { type: String, default: '8.5%' },
    campaigns:   { type: String, default: '200+' },
    brands:      { type: String, default: '80+' },
  },
  metaTitle:       { type: String, default: 'YMMarketing — Premium Influencer & Digital Marketing' },
  metaDescription: { type: String, default: 'YMMarketing by Yash Mandale — Premium influencer marketing, brand collaborations, content creation and social media campaigns.' },
}, { timestamps: true });

module.exports = mongoose.model('SiteSettings', SiteSettingsSchema);
