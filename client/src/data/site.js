/* ═══════════════════════════════════════════════════════════════
   Young Media Marketing — shared site content
   All content below is taken from the existing website (no invented
   clients, projects or reviews). Edit here to update every page.
═══════════════════════════════════════════════════════════════ */

/* External portfolio website (deployed on Vercel) */
export const PORTFOLIO_URL = 'https://young-media-portfolio.vercel.app/'
export const PORTFOLIO_DOMAIN = 'Interactive Experience'

export const BRAND = {
  name: 'Young Media Marketing',
  short: 'Young Media',
  statement: 'We build brands, create digital experiences, and craft content that helps businesses connect, communicate, and grow.',
  since: '2026',
}

export const CONTACT = {
  email: 'hello@youngmedia.in',
  emailHref: 'mailto:hello@youngmedia.in',
  phone: '+91 70583 22541',
  phoneHref: 'tel:+917058322541',
  whatsapp: 'https://wa.me/917058322541',
  whatsappChat: 'https://wa.me/917058322541?text=Hi YoungMedia! I want to discuss a project.',
  location: 'Nagpur, Maharashtra, India',
  mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119080.23492340531!2d79.00126497691167!3d21.142154681343573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0a5a31faf13%3A0x19b37d06d0bb3e2b!2sNagpur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1779556756471!5m2!1sen!2sin',
}

export const SOCIALS = {
  instagram: 'https://www.instagram.com/youngmedia7/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D',
  linkedin:  'https://www.linkedin.com/in/yash-mandale-45093528a/',
  youtube:   'https://youtube.com/@youngmedia',
  whatsapp:  'https://wa.me/917058322541',
}

/* Primary navigation. `hash` items scroll to a section on the homepage. */
export const NAV_LINKS = [
  { label: 'Home',      to: '/' },
  { label: 'About',     to: '/about' },
  { label: 'Services',  to: '/services' },
  { label: 'Portfolio', to: '/#portfolio', hash: 'portfolio' },
  { label: 'Our Work',  to: '/portfolio' },
  { label: 'Contact',   to: '/contact' },
]

/* Homepage services (02 — What we do) */
export const HOME_SERVICES = [
  { n: '01', title: 'Digital Marketing',        desc: 'Performance marketing, Meta Ads, lead generation, and growth campaigns focused on measurable business growth.' },
  { n: '02', title: 'Social Media Management',  desc: 'Complete handling of content posting, audience engagement, DM management, stories, and platform growth strategies.' },
  { n: '03', title: 'Branding & Identity',      desc: 'From logo design and visual identity to messaging and positioning — a brand people recognize and trust.' },
  { n: '04', title: 'Content Creation',         desc: 'Social-first content, product visuals, and professional shoots designed to capture attention and build trust.' },
  { n: '05', title: 'Video Production & Reels', desc: 'Cinematic reels, product videos, brand films, podcasts, and interviews built for engagement and retention.' },
  { n: '06', title: 'Creative Strategy',        desc: 'Storytelling, creativity, and marketing strategy combined — every campaign is built with a clear objective.' },
]

/* Full service catalogue (Services page) */
export const ALL_SERVICES = [
  { title: 'Social Media Marketing', desc: 'Strategic campaigns designed to increase engagement, reach, and brand visibility across Instagram, YouTube, and beyond.', features: ['Content calendar management', 'Audience growth tactics', 'Hashtag & trend strategy', 'Analytics & reporting'] },
  { title: 'Video Editing', desc: 'Professional short-form and long-form edits optimized for audience retention, platform algorithms, and maximum engagement.', features: ['Reel & short-form editing', 'Color grading', 'Motion graphics & text overlays', 'Platform-optimized exports'] },
  { title: 'Content Strategy', desc: 'Creative planning focused on trends, branding, and audience psychology to position your brand for consistent growth.', features: ['Content audit & planning', 'Trend research', 'Brand voice development', 'Competitor analysis'] },
  { title: 'Influencer Marketing', desc: 'Collaborations that help brands reach targeted audiences organically through authentic creator partnerships.', features: ['Influencer sourcing & vetting', 'Campaign management', 'ROI tracking', 'Long-term partnerships'] },
  { title: 'Branding', desc: 'Build a strong visual identity that makes your business instantly recognizable and memorable in a crowded market.', features: ['Logo & visual identity', 'Brand guidelines', 'Color & typography system', 'Brand messaging'] },
  { title: 'Meta Ads', desc: 'Performance-based Facebook & Instagram advertising campaigns designed for conversions, sales, and maximum ROI.', features: ['Ad creative & copy', 'Audience targeting', 'A/B testing & optimization', 'ROAS reporting'] },
  { title: 'Reel Production', desc: 'High-quality cinematic reels created for maximum engagement, virality, and brand storytelling on social media.', features: ['Concept & scripting', 'On-location production', 'Cinematic editing', 'Music & sound design'] },
  { title: 'Creative Direction', desc: 'Visual storytelling and content execution tailored to your brand aesthetic, target audience, and campaign objectives.', features: ['Visual concept development', 'Shot planning & storyboards', 'Set direction & styling', 'Brand consistency'] },
  { title: 'Social Media Management', desc: 'Complete handling of content posting, audience engagement, DM management, stories, and platform growth strategies.', features: ['Daily posting & scheduling', 'Community engagement', 'DM management', 'Monthly growth reports'] },
  { title: 'Professional Shoots', desc: 'Premium photography and videography sessions for businesses, creators, and brands — cinematic quality guaranteed.', features: ['Product photography', 'Business & brand shoots', 'Lifestyle & model shoots', 'Event photography'] },
]

export const FOOTER_SERVICES = ['Digital Marketing', 'Social Media Management', 'Branding & Identity', 'Content Creation', 'Video Production & Reels', 'Creative Strategy']

/* Existing studio stats */
export const STATS = [
  { value: '100+', label: 'Videos produced',     desc: 'Reels, edits & campaigns' },
  { value: '25+',  label: 'Brands worked with',  desc: 'Across categories' },
  { value: '10M+', label: 'Total reel views',    desc: 'Organic reach generated' },
  { value: '95%',  label: 'Client satisfaction', desc: 'Retention rate' },
]

/* Portfolio showcase — real campaign & reel videos from /public/reels */
export const SHOWCASE = [
  { id: 'camp1', title: 'Brand Campaign',  category: 'Campaign Reel', src: '/reels/camp1.mp4' },
  { id: 'camp2', title: 'Creative Shoot',  category: 'Campaign Reel', src: '/reels/camp2.mp4' },
  { id: 'camp3', title: 'Social Media Ad', category: 'Campaign Reel', src: '/reels/camp3.mp4' },
  { id: 'camp4', title: 'Product Launch',  category: 'Campaign Reel', src: '/reels/camp4.mp4' },
  { id: 'reel4', title: 'Brand Highlight', category: 'Reel',          src: '/reels/reel4.mp4' },
  { id: 'reel2', title: 'Creative Reel',   category: 'Reel',          src: '/reels/reel2.mp4' },
  { id: 'reel3', title: 'Social Media Reel', category: 'Reel',        src: '/reels/reel3.mp4' },
]

/* Selected work — real projects from the existing portfolio */
export const SELECTED_WORK = [
  {
    id: 'kanrivo-film',
    title: 'Kanrivo Brand Film',
    client: 'Kanrivo',
    category: 'Brand Film',
    description: 'A brand film produced for Kanrivo, crafted to strengthen its brand identity and online visibility.',
    type: 'video',
    src: '/reels/kanrivo.mp4',
  },
  {
    id: 'edu-1',
    title: 'CAT Exam Guide',
    client: 'Educational Content',
    category: 'Educational Video',
    description: 'Engaging educational content designed to simplify complex CAT exam concepts for aspirants.',
    type: 'drive',
    fileId: '1r5BGHOkkhhnJMLmpMnLUcvZTNkZIbHTl',
    tags: ['Education', 'Tutorial'],
  },
  {
    id: 'edu-2',
    title: 'Podcast Production',
    client: 'Podcast Series',
    category: 'Podcast Video',
    description: 'High-production podcast video content — professional studio-grade quality with dynamic editing.',
    type: 'drive',
    fileId: '1uaeo3tKPYfW9gn-CnOjRR69q_dIZsHs8',
    tags: ['Podcast', 'Interview'],
  },
  {
    id: 'edu-3',
    title: 'Study Strategy Masterclass',
    client: 'Educational Content',
    category: 'Educational Video',
    description: 'A compelling masterclass-style video breaking down effective study strategies for competitive exam aspirants.',
    type: 'drive',
    fileId: '1MszftCWBmKQ9Ub1qevj2WMxbaB6COixT',
    tags: ['Education', 'Masterclass'],
  },
]

export const driveThumb = (fileId, w = 1200) => `https://drive.google.com/thumbnail?id=${fileId}&sz=w${w}`
export const driveEmbed = fileId => `https://drive.google.com/file/d/${fileId}/preview`
export const driveView  = fileId => `https://drive.google.com/file/d/${fileId}/view`

/* Clients (from genuine testimonials) */
export const CLIENTS = [
  { name: 'SS Collection',        work: 'Branding & Social Media' },
  { name: 'Dolly Mobile',         work: 'Digital Marketing' },
  { name: 'Kanrivo',              work: 'Branding & Strategy' },
  { name: 'Sunsy Solar',          work: 'Performance Marketing & Leads' },
  { name: 'Zhamad Dental Clinic', work: 'Social Media & Branding' },
]

export const AUDIENCES = ['Startups', 'Local Businesses', 'Personal Brands', 'Creators', 'Established Companies']

/* Genuine client testimonials (existing) */
export const TESTIMONIALS = [
  { name: 'SS Collection', role: 'Client', service: 'Branding & Social Media', rating: 5,
    quote: 'Young Media transformed our online presence with creative branding and engaging social media campaigns. Their team understood our vision and delivered outstanding results that helped us connect with more customers.' },
  { name: 'Dolly Mobile', role: 'Client', service: 'Digital Marketing', rating: 5,
    quote: 'The team at Young Media provided exceptional digital marketing and website solutions for our business. Their creativity, professionalism, and timely execution exceeded our expectations. We highly recommend their services.' },
  { name: 'Kanrivo', role: 'Client', service: 'Branding & Strategy', rating: 5,
    quote: 'Working with Young Media was a seamless experience. From branding to digital strategy, every detail was handled with expertise. Their innovative approach helped strengthen our brand identity and online visibility.' },
]

export const PROCESS = [
  { n: '01', title: 'Discover',   desc: 'We understand your brand, audience, competitors, and business goals.' },
  { n: '02', title: 'Strategize', desc: 'We shape the creative direction, channels, and content plan around clear business objectives.' },
  { n: '03', title: 'Create',     desc: 'We plan, shoot, design, and edit content that reflects your brand and captures attention.' },
  { n: '04', title: 'Grow',       desc: 'We publish, analyze performance, optimize campaigns, and continuously improve to help your business grow.' },
]

export const WHY_US = [
  { title: 'Creative-first thinking',          desc: 'Every idea starts with a story worth telling — content that looks premium and feels original.' },
  { title: 'Strategic execution',              desc: 'Creativity backed by marketing strategy, so every reel, campaign, and ad has a clear objective.' },
  { title: 'Visual storytelling',              desc: 'Cinematic visuals and thoughtful editing that make audiences stop, watch, and remember.' },
  { title: 'Audience-focused content',         desc: 'Built around the people you want to reach — their platforms, their language, their attention.' },
  { title: 'Consistent brand communication',   desc: 'One voice and one visual identity across every channel and every touchpoint.' },
  { title: 'Results-driven approach',          desc: 'Focused on visibility, trust, leads, and sales — results that move the needle for your business.' },
]

export const FAQS = [
  { q: 'How long does content delivery take?', a: 'Typically 3–5 business days for reels and short-form edits. For full campaigns and shoots, we plan a timeline during the discovery call based on your requirements.' },
  { q: 'Do you manage Instagram accounts?', a: 'Yes! Our Social Media Management service covers full account handling — content posting, audience engagement, DM management, stories, and monthly growth reporting.' },
  { q: 'Can we customize marketing packages?', a: 'Absolutely. Every brand has unique needs. We build custom packages combining the services that make most sense for your goals and budget.' },
  { q: 'Do you provide Meta Ads management?', a: 'Yes, we run performance-based Meta (Facebook & Instagram) ad campaigns — from creative and copy to targeting, optimization, and detailed ROI reports.' },
  { q: 'What industries do you work with?', a: 'Restaurants, cafes, fashion, fitness, lifestyle, e-commerce, D2C brands, influencers, corporate businesses, and more. If you have a brand story, we can tell it.' },
  { q: 'How often do you shoot content?', a: 'This depends on your package. Most clients do monthly shoots (1–2 days per month), but we also offer weekly shoots for high-frequency content brands.' },
  { q: 'Do you travel for shoots?', a: "Yes! We're based in Nagpur and travel across India for shoots. Travel charges may apply for out-of-city assignments. Contact us for a custom quote." },
]
