import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { SHOWCASE, SELECTED_WORK, PORTFOLIO_URL, PORTFOLIO_DOMAIN, driveThumb } from '../data/site'
import { Reveal, LineReveal, SectionHead } from '../components/ui/Motion'
import Arrow from '../components/ui/Arrow'
import AutoVideo from '../components/ui/AutoVideo'
import VideoLightbox from '../components/ui/VideoLightbox'
import PortfolioButton from '../components/ui/PortfolioButton'

const WorkCard = ({ item, index, onSelect }) => {
  const [imgErr, setImgErr] = useState(false)

  return (
    <Reveal delay={(index % 2) * 0.08}>
      <article
        onClick={() => onSelect(item)}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onSelect(item)}
        role="button"
        tabIndex={0}
        className="group cursor-pointer border-t border-line pt-6"
      >
        <div className="flex items-center justify-between text-xs text-muted mb-4">
          <span className="uppercase tracking-[0.16em] text-ink font-medium">{item.client}</span>
          <span>{item.category}</span>
        </div>

        <div className="ym-frame aspect-[16/10] w-full border border-line">
          {item.type === 'video' ? (
            <AutoVideo src={item.src} label={item.title} />
          ) : !imgErr ? (
            <img src={driveThumb(item.fileId, 1200)} alt={item.title} loading="lazy" onError={() => setImgErr(true)} />
          ) : (
            <div className="absolute inset-0 bg-stone flex items-center justify-center p-8">
              <p className="font-display text-2xl text-ink">{item.title}</p>
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
          <div className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-white text-ink flex items-center justify-center
            opacity-90 group-hover:bg-sage transition-all duration-500">
            <Arrow />
          </div>
        </div>

        <div className="mt-6 flex items-start justify-between gap-6">
          <div>
            <h2 className="ym-h3 group-hover:translate-x-1 transition-transform duration-500">{item.title}</h2>
            <p className="mt-2 text-sm text-muted leading-relaxed max-w-xl">{item.description}</p>
          </div>
          <span className="ym-link text-sm flex-shrink-0 mt-1">Watch <Arrow /></span>
        </div>
      </article>
    </Reveal>
  )
}

const Portfolio = () => {
  const [modalItem, setModalItem] = useState(null)

  return (
    <>
      <Helmet>
        <title>Our Work — Young Media Marketing</title>
        <meta name="description" content="Explore Young Media Marketing's real work portfolio — brand films, educational productions, and campaign reels." />
      </Helmet>

      {/* Hero */}
      <section className="ym-section bg-white border-b border-line pt-16 md:pt-24">
        <div className="ym-container">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Reveal><span className="ym-label">04 — OUR WORK</span></Reveal>
            <a href={PORTFOLIO_URL} target="_blank" rel="noopener noreferrer" className="ym-link text-xs uppercase tracking-[0.16em] group">
              Full Portfolio Experience <Arrow />
            </a>
          </div>

          <LineReveal
            as="h1"
            animateOnMount
            className="ym-h1 mt-6 max-w-5xl"
            lines={[
              'Creativity you can see.',
              <span key="l2" className="ym-muted-word">Results you can feel.</span>,
            ]}
          />

          <Reveal delay={0.2} className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <p className="ym-lead max-w-2xl">
              Every brand has a story. We bring those stories to life through creative campaigns, impactful visuals, strategic branding, and digital experiences.
            </p>
            <PortfolioButton label="Explore Our Creative Universe" />
          </Reveal>
        </div>
      </section>

      {/* Selected Work (Google Drive + Kanrivo brand film) */}
      <section className="ym-section bg-stone border-b border-line">
        <div className="ym-container">
          <SectionHead
            label="SELECTED PRODUCTIONS"
            title="Ideas made tangible."
            aside="Brand films, podcast productions, and educational video series produced by Young Media."
          />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
            {SELECTED_WORK.map((item, i) => (
              <WorkCard key={item.id} item={item} index={i} onSelect={setModalItem} />
            ))}
          </div>
        </div>
      </section>

      {/* Campaign & Social Reels archive */}
      <section className="ym-section bg-white border-b border-line">
        <div className="ym-container">
          <SectionHead
            label="CAMPAIGN & REEL ARCHIVE"
            title="Short-form & campaign reels."
            aside="Click any reel to open the player with full audio."
          />

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {SHOWCASE.map((item, i) => (
              <Reveal key={item.id} delay={(i % 3) * 0.06}>
                <article
                  onClick={() => setModalItem({ ...item, type: 'video' })}
                  onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setModalItem({ ...item, type: 'video' })}
                  role="button"
                  tabIndex={0}
                  className="group cursor-pointer"
                >
                  <div className="ym-frame aspect-[4/5] border border-line">
                    <AutoVideo src={item.src} label={item.title} />
                    <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white text-ink flex items-center justify-center group-hover:bg-sage transition-colors">
                      <Arrow />
                    </div>
                  </div>
                  <div className="mt-4 flex items-baseline justify-between border-b border-line pb-4">
                    <div>
                      <h3 className="font-display text-lg font-medium text-ink">{item.title}</h3>
                      <p className="text-xs text-muted mt-0.5">{item.category}</p>
                    </div>
                    <span className="font-mono text-xs text-muted">0{i + 1}</span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* External portfolio CTA */}
          <Reveal className="mt-20 bg-stone border border-line p-8 sm:p-12 md:p-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="ym-label">EXTERNAL PORTFOLIO</span>
              <h3 className="font-display text-2xl sm:text-3xl font-medium text-ink mt-4">
                Discover our projects, creative campaigns, and the work behind the brands we build.
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <PortfolioButton label="Explore Our Creative Universe" />
              <Link to="/contact" className="ym-btn ym-btn-light py-4 px-7">Start a Project <Arrow /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      <VideoLightbox item={modalItem} onClose={() => setModalItem(null)} />
    </>
  )
}

export default Portfolio
