import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Reveal, LineReveal } from '../components/ui/Motion'
import Arrow from '../components/ui/Arrow'

const categories = ['All', 'Marketing', 'Strategy', 'Social Media', 'Branding', 'Business']

const posts = [
  { title: '10 Influencer Marketing Trends Dominating 2024', slug: 'influencer-marketing-trends-2024', excerpt: 'From nano-influencers to AI-driven campaigns, discover the trends reshaping the influencer marketing landscape this year.', category: 'Marketing', readTime: '6 min read', image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=700&q=80', date: 'Mar 15, 2024', author: 'Yash Mandale' },
  { title: 'How to Calculate Real ROI from Influencer Campaigns', slug: 'influencer-campaign-roi-calculation', excerpt: 'Beyond likes and followers — learn the metrics that actually matter for measuring influencer marketing success.', category: 'Strategy', readTime: '8 min read', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80', date: 'Apr 2, 2024', author: 'Yash Mandale' },
  { title: 'Instagram Reels vs YouTube Shorts: Which Wins for Brands?', slug: 'instagram-reels-vs-youtube-shorts', excerpt: 'A data-driven comparison of short-form video platforms and where brands should invest their marketing budget.', category: 'Social Media', readTime: '5 min read', image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=700&q=80', date: 'Apr 18, 2024', author: 'Yash Mandale' },
  { title: 'Building a Personal Brand as an Influencer in 2024', slug: 'building-personal-brand-influencer', excerpt: 'From niche selection to content consistency — the complete blueprint for establishing your unique influencer identity.', category: 'Branding', readTime: '7 min read', image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=700&q=80', date: 'May 1, 2024', author: 'Yash Mandale' },
  { title: 'The Art of Brand Deals: Negotiation Tips for Creators', slug: 'brand-deals-negotiation-tips-creators', excerpt: 'Know your worth and negotiate smarter. Expert tips on landing premium brand deals and long-term partnerships.', category: 'Business', readTime: '9 min read', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=700&q=80', date: 'May 12, 2024', author: 'Yash Mandale' },
  { title: 'Social Media Algorithm Hacks That Actually Work in 2024', slug: 'social-media-algorithm-hacks-2024', excerpt: 'Cut through the noise with proven, ethical techniques to boost your content visibility across major platforms.', category: 'Social Media', readTime: '6 min read', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80', date: 'May 20, 2024', author: 'Yash Mandale' },
]

const Blog = () => {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? posts : posts.filter(p => p.category === active)

  return (
    <>
      <Helmet>
        <title>Journal &amp; Insights — Young Media Marketing</title>
        <meta name="description" content="Read Young Media Marketing's journal for digital marketing insights, social media strategies, and brand growth perspectives." />
      </Helmet>

      <section className="ym-section bg-white border-b border-line pt-16 md:pt-24">
        <div className="ym-container">
          <Reveal><span className="ym-label">JOURNAL</span></Reveal>
          <LineReveal
            as="h1"
            animateOnMount
            className="ym-h1 mt-6 max-w-4xl"
            lines={[
              'Perspectives on',
              <span key="l2" className="ym-muted-word">brands &amp; digital culture.</span>,
            ]}
          />

          {/* Category filter */}
          <div className="mt-12 flex flex-wrap gap-2 border-y border-line py-5">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                  active === cat
                    ? 'bg-ink text-white'
                    : 'bg-stone text-muted hover:text-ink'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filtered.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 0.06}>
                <Link to={`/blog/${post.slug}`} className="group block">
                  <div className="ym-frame aspect-[16/10] border border-line">
                    <img src={post.image} alt={post.title} loading="lazy" />
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-muted">
                    <span className="uppercase tracking-[0.15em] text-ink font-medium">{post.category}</span>
                    <span>{post.date} · {post.readTime}</span>
                  </div>
                  <h2 className="mt-2 font-display text-xl font-medium text-ink leading-snug group-hover:translate-x-1 transition-transform duration-500">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-2">{post.excerpt}</p>
                  <span className="mt-4 ym-link text-xs uppercase tracking-[0.14em]">
                    Read Article <Arrow />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Blog
