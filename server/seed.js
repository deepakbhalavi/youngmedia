const User = require('./models/User');
const Service = require('./models/Service');
const Portfolio = require('./models/Portfolio');
const Testimonial = require('./models/Testimonial');
const Blog = require('./models/Blog');
const SiteSettings = require('./models/SiteSettings');

const seed = async () => {
  try {
    // Admin user
    const existing = await User.findOne({ email: 'admin@ymmarketing.com' });
    if (!existing) {
      await User.create({ name: 'Yash Mandale', email: 'admin@ymmarketing.com', password: 'ymmarketing@2024', role: 'admin' });
      console.log('✅ Admin user created: admin@ymmarketing.com / ymmarketing@2024');
    }

    // Site settings
    const settingsExist = await SiteSettings.findOne();
    if (!settingsExist) {
      await SiteSettings.create({});
      console.log('✅ Default site settings created');
    }

    // Services
    const svcCount = await Service.countDocuments();
    if (svcCount === 0) {
      await Service.insertMany([
        { title: 'Influencer Marketing', description: 'Strategic influencer campaigns that connect your brand with authentic audiences across Instagram, YouTube, and beyond.', icon: 'FaBullhorn', features: ['Micro & Macro influencers', 'ROI tracking', 'Content approval workflow', 'Multi-platform reach'], order: 1, color: '#D4AF37' },
        { title: 'Social Media Promotions', description: 'Data-driven social media strategies that boost engagement, grow followers, and convert audiences into loyal customers.', icon: 'FaHashtag', features: ['Instagram & Reels strategy', 'YouTube promotion', 'Story campaigns', 'Paid + organic mix'], order: 2, color: '#F5C518' },
        { title: 'Brand Collaborations', description: 'Exclusive brand partnerships and co-creation opportunities that deliver authentic value to both brands and audiences.', icon: 'FaHandshake', features: ['Brand deal negotiation', 'Long-term partnerships', 'Product integrations', 'Revenue sharing'], order: 3, color: '#B8960C' },
        { title: 'Content Creation', description: 'Premium visual content — photos, reels, videos, and stories — crafted to elevate your brand aesthetic and drive engagement.', icon: 'FaCamera', features: ['Professional photography', 'Reel & video production', 'Story templates', 'Script writing'], order: 4, color: '#D4AF37' },
        { title: 'Campaign Management', description: 'End-to-end management of influencer marketing campaigns — from strategy to execution to performance reporting.', icon: 'FaChartLine', features: ['Campaign planning', 'Influencer sourcing', 'Performance analytics', 'Detailed reports'], order: 5, color: '#F5C518' },
        { title: 'Marketing Consulting', description: 'Expert consulting to audit your current marketing strategy and build a roadmap for sustained digital growth.', icon: 'FaLightbulb', features: ['Brand audit', 'Strategy roadmap', '1-on-1 sessions', 'Competitor analysis'], order: 6, color: '#B8960C' },
      ]);
      console.log('✅ Services seeded');
    }

    // Portfolio
    const portCount = await Portfolio.countDocuments();
    if (portCount === 0) {
      await Portfolio.insertMany([
        { title: 'Nike Air Max Launch', brand: 'Nike India', category: 'Instagram', description: 'Exclusive product launch campaign with 15 influencers across India, driving massive footwear sales.', imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800', metrics: { reach: '2.4M', engagement: '9.2%', impressions: '5.1M', clicks: '85K' }, tags: ['Fashion', 'Lifestyle', 'Sport'], featured: true },
        { title: 'Mamaearth Skincare', brand: 'Mamaearth', category: 'YouTube', description: 'Long-form review series for organic skincare products, targeting conscious beauty consumers.', imageUrl: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800', metrics: { reach: '800K', engagement: '11.5%', impressions: '1.8M', clicks: '42K' }, tags: ['Beauty', 'Skincare', 'Organic'], featured: true },
        { title: 'Zomato Food Campaign', brand: 'Zomato', category: 'Reel', description: 'Viral reel campaign showcasing food delivery experience with behind-the-scenes storytelling.', imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800', metrics: { reach: '3.2M', engagement: '13.7%', impressions: '7M', clicks: '120K' }, tags: ['Food', 'Lifestyle', 'Entertainment'], featured: true },
        { title: 'boAt Audio Campaign', brand: 'boAt', category: 'Collab', description: 'Lifestyle-driven audio product integration across music and fitness content verticals.', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800', metrics: { reach: '1.5M', engagement: '8.9%', impressions: '3.2M', clicks: '67K' }, tags: ['Tech', 'Music', 'Lifestyle'] },
        { title: 'Myntra Fashion Week', brand: 'Myntra', category: 'Campaign', description: 'Mega fashion event coverage and product hauls generating massive brand awareness.', imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800', metrics: { reach: '4.1M', engagement: '10.2%', impressions: '9.5M', clicks: '200K' }, tags: ['Fashion', 'Shopping', 'Trending'], featured: true },
        { title: 'Nykaa Beauty Reel', brand: 'Nykaa', category: 'Instagram', description: 'Series of beauty tutorials and unboxing reels driving sales during festive season.', imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800', metrics: { reach: '1.1M', engagement: '12.4%', impressions: '2.4M', clicks: '55K' }, tags: ['Beauty', 'Makeup', 'Festive'] },
      ]);
      console.log('✅ Portfolio items seeded');
    }

    // Testimonials
    const testCount = await Testimonial.countDocuments();
    if (testCount === 0) {
      await Testimonial.insertMany([
        { clientName: 'Priya Sharma', company: 'Nike India', role: 'Marketing Manager', photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b0ab?w=200', rating: 5, quote: 'Yash delivered an absolutely phenomenal campaign for our Air Max launch. The engagement numbers surpassed every KPI we set. The content was authentic, creative, and perfectly aligned with our brand voice.', platform: 'Instagram Campaign', featured: true },
        { clientName: 'Rahul Mehta', company: 'Mamaearth', role: 'Brand Head', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200', rating: 5, quote: 'Working with YMMarketing transformed our digital presence. The YouTube campaign had incredible retention rates and the audience trust Yash has built is genuinely reflected in conversions.', platform: 'YouTube Partnership', featured: true },
        { clientName: 'Ananya Singh', company: 'Zomato', role: 'Digital Marketing Lead', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200', rating: 5, quote: 'The viral reel series Yash created for us was pure gold. 3.2 million reach on a single campaign — we had to scale up our delivery team! Highly recommend YMMarketing for any food brand.', platform: 'Reel Campaign', featured: true },
        { clientName: 'Vikram Gupta', company: 'boAt Lifestyle', role: 'Partnerships Manager', photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200', rating: 5, quote: 'Yash understands the pulse of the youth audience like no one else. Our headphone drops always sell out within hours of his posts. The ROI is exceptional and communication is always professional.', platform: 'Brand Collaboration' },
        { clientName: 'Divya Nair', company: 'Myntra', role: 'Influencer Relations', photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200', rating: 5, quote: 'Fashion Week coverage with YMMarketing was a game-changer. The storytelling, the aesthetics, the reach — everything was top-notch. We saw a 40% spike in app downloads during the campaign week.', platform: 'Campaign Management' },
        { clientName: 'Karan Malhotra', company: 'Nykaa', role: 'Beauty Brand Manager', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200', rating: 4, quote: 'The festive season reels were creative and drove real sales. Yash\'s audience is genuinely engaged — not inflated numbers. Our ROAS was 5x during the collaboration period.', platform: 'Instagram Reels' },
      ]);
      console.log('✅ Testimonials seeded');
    }

    // Blog posts
    const blogCount = await Blog.countDocuments();
    if (blogCount === 0) {
      await Blog.insertMany([
        { title: '10 Influencer Marketing Trends Dominating 2024', slug: 'influencer-marketing-trends-2024', excerpt: 'From nano-influencers to AI-driven campaigns, discover the trends reshaping the influencer marketing landscape this year.', content: 'Full article content here...', coverImage: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800', tags: ['Trends', 'Influencer Marketing', '2024'], category: 'Marketing', readTime: '6 min read', isPublished: true, publishedAt: new Date('2024-03-15') },
        { title: 'How to Calculate Real ROI from Influencer Campaigns', slug: 'influencer-campaign-roi-calculation', excerpt: 'Beyond likes and followers — learn the metrics that actually matter for measuring influencer marketing success.', content: 'Full article content here...', coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800', tags: ['ROI', 'Analytics', 'Strategy'], category: 'Strategy', readTime: '8 min read', isPublished: true, publishedAt: new Date('2024-04-02') },
        { title: 'Instagram Reels vs YouTube Shorts: Which Wins for Brands?', slug: 'instagram-reels-vs-youtube-shorts', excerpt: 'A data-driven comparison of short-form video platforms and where brands should invest their marketing budget.', content: 'Full article content here...', coverImage: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800', tags: ['Instagram', 'YouTube', 'Reels', 'Shorts'], category: 'Social Media', readTime: '5 min read', isPublished: true, publishedAt: new Date('2024-04-18') },
        { title: 'Building a Personal Brand as an Influencer in 2024', slug: 'building-personal-brand-influencer', excerpt: 'From niche selection to content consistency — the complete blueprint for establishing your unique influencer identity.', content: 'Full article content here...', coverImage: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800', tags: ['Personal Brand', 'Influencer', 'Growth'], category: 'Branding', readTime: '7 min read', isPublished: true, publishedAt: new Date('2024-05-01') },
        { title: 'The Art of Brand Deals: Negotiation Tips for Creators', slug: 'brand-deals-negotiation-tips-creators', excerpt: 'Know your worth and negotiate smarter. Expert tips on landing premium brand deals and long-term partnerships.', content: 'Full article content here...', coverImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800', tags: ['Brand Deals', 'Negotiation', 'Creator Economy'], category: 'Business', readTime: '9 min read', isPublished: true, publishedAt: new Date('2024-05-12') },
        { title: 'Social Media Algorithm Hacks That Actually Work in 2024', slug: 'social-media-algorithm-hacks-2024', excerpt: 'Cut through the noise with proven, ethical techniques to boost your content visibility across major platforms.', content: 'Full article content here...', coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', tags: ['Algorithm', 'Growth Hacks', 'Social Media'], category: 'Social Media', readTime: '6 min read', isPublished: true, publishedAt: new Date('2024-05-20') },
      ]);
      console.log('✅ Blog posts seeded');
    }

  } catch (err) {
    console.error('Seed error:', err.message);
  }
};

module.exports = seed;
