import { Helmet } from 'react-helmet-async'
import { useParams, Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import Arrow from '../components/ui/Arrow'

const postContent = {
  'influencer-marketing-trends-2024': {
    title: '10 Influencer Marketing Trends Dominating 2024',
    category: 'Marketing', readTime: '6 min read', date: 'Mar 15, 2024',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&q=80',
    content: `
## The Creator Economy Is Evolving Fast

Influencer marketing has matured far beyond simple sponsored posts. In 2024, brands and creators are rethinking how they collaborate, measure success, and build lasting audience relationships.

Here are the 10 trends defining the space this year:

### 1. Nano & Micro Influencers Dominate ROI
Brands are increasingly partnering with influencers who have 1K–100K followers. Why? Higher engagement rates (often 10–20%), better niche targeting, and more authentic connections with their audiences.

### 2. Long-Form Content Makes a Comeback
YouTube's algorithm is rewarding longer, more educational content. Brands that invest in 10–20 minute integrations are seeing much better recall and purchase intent than quick shoutouts.

### 3. Performance-Based Partnerships
The era of flat-fee influencer deals is giving way to performance-based models where creators earn based on actual conversions, not just reach.

### 4. AI-Powered Campaign Management
Brands are now using AI to match with influencers, predict campaign performance, and even generate creative briefs — dramatically cutting campaign setup time.

### 5. UGC (User-Generated Content) at Scale
Beyond traditional influencers, brands are building armies of everyday customers who create authentic content in exchange for products or small commissions.

### 6. Live Commerce Takes Off
Live shopping integrations on Instagram and YouTube are driving impulse purchases like never before. Creators who master live commerce are commanding premium brand deals.

### 7. Creator Funds & Revenue Sharing
Platforms are betting big on keeping creators loyal through enhanced monetization. This is shifting where creators invest their content time.

### 8. B2B Influencer Marketing Grows
LinkedIn and professional creators are now serious channels for B2B brands, with thought leadership content driving real business decisions.

### 9. Sustainability & Values-Driven Collaborations
Audiences are holding both brands and creators accountable for the values they represent. Authentic alignment between brand and creator is no longer optional.

### 10. First-Party Data Partnerships
With cookie deprecation looming, brands are partnering with creators to build first-party audience data through newsletters, communities, and exclusive offers.

## Key Takeaway

The brands winning at influencer marketing in 2024 are those treating creators as true partners — investing in authentic relationships, long-term contracts, and meaningful content — not just reach metrics.
    `,
  },
}

const BlogPost = () => {
  const { slug } = useParams()
  const post = postContent[slug] || {
    title: 'Marketing Insights by Young Media',
    category: 'Marketing',
    readTime: '5 min read',
    date: 'May 2024',
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1200&q=80',
    content: '## Coming Soon\n\nThis article is being prepared by our editorial team. Check back soon for the full post.',
  }

  return (
    <>
      <Helmet>
        <title>{post.title} — Young Media Marketing</title>
        <meta name="description" content={post.title} />
      </Helmet>

      <article className="ym-section bg-white pt-16 md:pt-24">
        <div className="ym-container max-w-4xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-muted hover:text-ink mb-8">
            <FiArrowLeft /> Back to Journal
          </Link>

          <div className="flex items-center gap-4 text-xs text-muted mb-4">
            <span className="uppercase tracking-[0.16em] text-ink font-medium">{post.category}</span>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="ym-h2 text-balance">{post.title}</h1>

          <div className="mt-10 ym-frame aspect-[16/9] border border-line">
            <img src={post.image} alt={post.title} />
          </div>

          <div className="mt-12 space-y-5 text-ink/85 leading-relaxed">
            {post.content.split('\n').map((line, i) => {
              if (line.startsWith('## ')) return <h2 key={i} className="font-display text-2xl md:text-3xl font-medium text-ink pt-6">{line.replace('## ', '')}</h2>
              if (line.startsWith('### ')) return <h3 key={i} className="font-display text-xl font-medium text-ink pt-4">{line.replace('### ', '')}</h3>
              if (line.trim() === '') return null
              return <p key={i} className="text-muted leading-relaxed">{line}</p>
            })}
          </div>

          <div className="mt-16 pt-10 border-t border-line flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-display font-medium text-ink">Yash Mandale</p>
              <p className="text-xs text-muted">Founder, Young Media Marketing</p>
            </div>
            <Link to="/contact" className="ym-btn ym-btn-dark">Start a Conversation <Arrow /></Link>
          </div>
        </div>
      </article>
    </>
  )
}

export default BlogPost
