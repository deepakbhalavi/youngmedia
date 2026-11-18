const mongoose = require('mongoose');
require('dotenv').config();

async function reseed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected');

  const Service = require('./models/Service');
  const Portfolio = require('./models/Portfolio');
  const Testimonial = require('./models/Testimonial');
  const SiteSettings = require('./models/SiteSettings');

  // Clear and re-seed services
  await Service.deleteMany({});
  await Service.insertMany([
    { title: 'Social Media Marketing',    description: 'Strategic campaigns to increase engagement, reach, and brand visibility across all platforms.', icon: 'FiTrendingUp',  color: '#6C27FF', features: ['Content calendar management','Audience growth tactics','Hashtag strategy','Analytics reporting'], order: 1 },
    { title: 'Video Editing',             description: 'Professional short-form and long-form edits optimized for audience retention and platform algorithms.', icon: 'FiFilm',       color: '#9B5FFF', features: ['Reel & short-form editing','Color grading','Motion graphics','Platform-optimized exports'], order: 2 },
    { title: 'Content Strategy',          description: 'Creative planning focused on trends, branding, and audience psychology for consistent growth.', icon: 'FiTarget',      color: '#FF6B35', features: ['Content audit & planning','Trend research','Brand voice development','Competitor analysis'], order: 3 },
    { title: 'Influencer Marketing',      description: 'Collaborations connecting brands with targeted audiences organically through authentic creators.', icon: 'FiUsers',       color: '#6C27FF', features: ['Influencer sourcing','Campaign management','ROI tracking','Long-term partnerships'], order: 4 },
    { title: 'Branding',                  description: 'Build a strong visual identity that makes your business instantly recognizable and memorable.', icon: 'FiLayers',      color: '#FF8C5A', features: ['Logo & visual identity','Brand guidelines','Color & typography system','Brand messaging'], order: 5 },
    { title: 'Meta Ads',                  description: 'Performance-based Facebook & Instagram ad campaigns designed for conversions and maximum ROI.', icon: 'FiBullseye',    color: '#8B4FFF', features: ['Ad creative & copy','Audience targeting','A/B testing','ROAS reporting'], order: 6 },
    { title: 'Reel Production',           description: 'High-quality cinematic reels created for maximum engagement and brand storytelling on social media.', icon: 'FiVideo',       color: '#6C27FF', features: ['Concept & scripting','On-location production','Cinematic editing','Music & sound design'], order: 7 },
    { title: 'Creative Direction',        description: 'Visual storytelling and content execution tailored to your brand aesthetic and campaign objectives.', icon: 'FiEye',         color: '#FF6B35', features: ['Visual concept development','Shot planning','Set direction & styling','Brand consistency'], order: 8 },
    { title: 'Social Media Management',   description: 'Complete handling of posting, audience engagement, DM management, and platform growth.', icon: 'FiGrid',        color: '#9B5FFF', features: ['Daily posting & scheduling','Community engagement','DM management','Monthly growth reports'], order: 9 },
    { title: 'Professional Shoots',       description: 'Premium photography and videography sessions for businesses, creators, and brands.', icon: 'FiCamera',      color: '#FF8C5A', features: ['Product photography','Business & brand shoots','Lifestyle shoots','Event photography'], order: 10 },
  ]);
  console.log('Services re-seeded (10)');

  await Portfolio.deleteMany({});
  await Portfolio.insertMany([
    { title: 'Nike Air Max Launch',      brand: 'Nike India',        category: 'Instagram', description: 'Viral reel campaign for Air Max launch driving massive footwear sales.', imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800', metrics: { reach: '2.4M', engagement: '9.2%', impressions: '5.1M', clicks: '85K' }, tags: ['Fashion','Lifestyle'], featured: true },
    { title: 'Mamaearth Skincare',       brand: 'Mamaearth',         category: 'YouTube',   description: 'Long-form review series for organic skincare, high retention rates.', imageUrl: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800', metrics: { reach: '800K', engagement: '11.5%', impressions: '1.8M', clicks: '42K' }, tags: ['Beauty','Skincare'], featured: true },
    { title: 'Zomato Food Viral Reel',   brand: 'Zomato',            category: 'Reel',      description: 'Viral reel campaign showcasing food delivery experience across cities.', imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800', metrics: { reach: '3.2M', engagement: '13.7%', impressions: '7M', clicks: '120K' }, tags: ['Food','Lifestyle'], featured: true },
    { title: 'Myntra Fashion Week',      brand: 'Myntra',            category: 'Campaign',  description: 'Mega fashion event coverage generating 4.1M reach and app download spike.', imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800', metrics: { reach: '4.1M', engagement: '10.2%', impressions: '9.5M', clicks: '200K' }, tags: ['Fashion','Shopping'], featured: true },
    { title: 'boAt Audio Campaign',      brand: 'boAt Lifestyle',    category: 'Collab',    description: 'Lifestyle-driven audio product collaboration for youth audience.', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800', metrics: { reach: '1.5M', engagement: '8.9%', impressions: '3.2M', clicks: '67K' }, tags: ['Tech','Music'] },
    { title: 'Nykaa Festive Reels',      brand: 'Nykaa',             category: 'Instagram', description: 'Festive beauty tutorials generating 5x ROAS during campaign period.', imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800', metrics: { reach: '1.1M', engagement: '12.4%', impressions: '2.4M', clicks: '55K' }, tags: ['Beauty','Makeup'] },
    { title: 'FitFlex Gym Campaign',     brand: 'FitFlex Studios',   category: 'Campaign',  description: 'Fitness brand campaign targeting Mumbai youth with transformation content.', imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800', metrics: { reach: '620K', engagement: '14.1%', impressions: '1.4M', clicks: '38K' }, tags: ['Fitness','Health'] },
    { title: 'Cafe Aroma Brand Shoot',   brand: 'Cafe Aroma',        category: 'Other',     description: 'Premium restaurant photography and cinematic reel for local cafe brand.', imageUrl: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800', metrics: { reach: '280K', engagement: '16.3%', impressions: '600K', clicks: '22K' }, tags: ['Restaurant','Food'] },
  ]);
  console.log('Portfolio re-seeded (8)');

  await Testimonial.deleteMany({});
  await Testimonial.insertMany([
    { clientName: 'Priya Sharma',   company: 'Nike India',      role: 'Marketing Manager', photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b0ab?w=200', rating: 5, quote: 'YoungMedia delivered a phenomenal campaign. 2.4M reel views — every KPI smashed. Cinematic quality is unmatched.', platform: 'Instagram Campaign', featured: true },
    { clientName: 'Rahul Mehta',    company: 'Mamaearth',       role: 'Brand Head', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200', rating: 5, quote: 'YoungMedia transformed our digital presence. YouTube retention was exceptional — real content that converts.', platform: 'YouTube Partnership', featured: true },
    { clientName: 'Ananya Singh',   company: 'Zomato',          role: 'Digital Lead', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200', rating: 5, quote: '3.2M reach in one campaign. We had to scale operations just to keep up with demand. Real results!', platform: 'Viral Reel', featured: true },
    { clientName: 'Vikram Gupta',   company: 'boAt Lifestyle',  role: 'Partnerships Manager', photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200', rating: 5, quote: 'Product drops sell out hours after YoungMedia posts go live. The youth audience trust is incredible.', platform: 'Brand Collaboration' },
    { clientName: 'Divya Nair',     company: 'Myntra',          role: 'Influencer Relations', photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200', rating: 5, quote: 'Fashion Week coverage was extraordinary. 40% spike in app downloads that week. Highly recommended!', platform: 'Campaign Management' },
    { clientName: 'Karan Malhotra', company: 'Nykaa',           role: 'Beauty Brand Manager', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200', rating: 5, quote: 'ROAS was 5x during our collaboration. YoungMedia audience is genuinely engaged, not inflated metrics.', platform: 'Instagram Reels' },
  ]);
  console.log('Testimonials re-seeded');

  await SiteSettings.deleteMany({});
  await SiteSettings.create({
    siteName: 'YoungMedia',
    tagline: 'Grow Your Brand Through Creative Content & Digital Marketing',
    about: 'YoungMedia is a creative digital marketing and content production agency focused on helping businesses grow online through strategic branding, cinematic storytelling, and engaging social media content.',
    email: 'hello@youngmedia.in',
    phone: '+91 98765 43210',
    whatsapp: '+919876543210',
    address: 'Mumbai, Maharashtra, India',
    socials: { instagram: 'https://instagram.com/youngmedia', youtube: 'https://youtube.com/@youngmedia', linkedin: 'https://linkedin.com/in/youngmedia' },
    stats: { followers: '500K+', engagement: '12.4%', campaigns: '100+', brands: '25+' },
    metaTitle: 'YoungMedia — Creative Content & Digital Marketing Agency',
    metaDescription: 'YoungMedia helps brands grow through cinematic content, viral reels, social media strategy, and performance-driven digital marketing across India.',
  });
  console.log('Site settings seeded (YoungMedia)');

  console.log('✅ All done!');
  await mongoose.disconnect();
}

reseed().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
