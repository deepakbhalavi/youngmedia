import { motion } from 'framer-motion'

export const EASE = [0.22, 1, 0.36, 1]
const VIEWPORT = { once: true, margin: '0px 0px -8% 0px' }

/** Fade + rise on scroll into view */
export const Reveal = ({ children, delay = 0, y = 18, className = '', as = 'div', ...rest }) => {
  const Tag = motion[as] ?? motion.div
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.42, ease: EASE, delay: delay * 0.45 }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Masked line-by-line text reveal. `lines` is an array of strings / nodes. */
export const LineReveal = ({ lines, as = 'h2', className = '', delay = 0, stagger = 0.04, animateOnMount = false, lineClassName = '' }) => {
  const Tag = as

  // On page mount (e.g. Hero headlines), render solid typography so it transitions
  // in perfect unison with the page slide without any clashing delays or mask clipping.
  if (animateOnMount) {
    return (
      <Tag className={className}>
        {lines.map((line, i) => (
          <span key={i} className={`block ${lineClassName}`}>
            {line}
          </span>
        ))}
      </Tag>
    )
  }

  // On scroll into view, use masked line-by-line reveal for lower content sections
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="line-mask">
          <motion.span
            className={`block ${lineClassName}`}
            initial={{ y: '105%' }}
            whileInView={{ y: '0%' }}
            viewport={VIEWPORT}
            transition={{ duration: 0.48, ease: EASE, delay: delay * 0.45 + i * stagger }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

/** Image / video reveal: smooth GPU transform on mount, bottom-clip on scroll */
export const MediaReveal = ({ children, className = '', delay = 0, animateOnMount = false }) => {
  if (animateOnMount) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EASE, delay: delay * 0.35 }}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={className}
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={VIEWPORT}
      transition={{ duration: 0.55, ease: EASE, delay: delay * 0.45 }}
    >
      {children}
    </motion.div>
  )
}

/** Section heading block: label + headline (+ optional aside text) */
export const SectionHead = ({ label, title, aside, className = '' }) => (
  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end ${className}`}>
    <div className="lg:col-span-8">
      <Reveal><span className="ym-label">{label}</span></Reveal>
      <LineReveal as="h2" className="ym-h2 mt-6 md:mt-8 text-balance" lines={Array.isArray(title) ? title : [title]} />
    </div>
    {aside && (
      <Reveal delay={0.1} className="lg:col-span-4 lg:pb-3">
        <p className="ym-lead max-w-md">{aside}</p>
      </Reveal>
    )}
  </div>
)
