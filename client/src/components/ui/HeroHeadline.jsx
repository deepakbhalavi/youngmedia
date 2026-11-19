import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]
const HOVER_SPRING = { type: 'spring', stiffness: 650, damping: 18 }

const AnimatedLine = ({ text, startDelay = 0, charDelay = 0.015, className = '', shimmer = false, baseColor, hoverColor }) => {
  const words = text.split(' ')
  let charIndex = 0

  return (
    <span className={`relative block ${className}`}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap align-bottom pb-[0.08em] pt-[0.2em] -mt-[0.2em]">
          {word.split('').map((ch, ci) => {
            const delay = startDelay + charIndex++ * charDelay
            return (
              <motion.span
                key={ci}
                className="inline-block cursor-default"
                style={{ color: baseColor }}
                initial={{ y: '25%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.32, ease: EASE, delay }}
                whileHover={{ y: '-14%', scale: 1.07, color: hoverColor, transition: HOVER_SPRING }}
              >
                {ch}
              </motion.span>
            )
          })}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}

      {shimmer && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.85) 50%, transparent 70%)',
            mixBlendMode: 'overlay',
          }}
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: '100%', opacity: [0, 1, 0] }}
          transition={{ duration: 0.7, ease: 'easeInOut', delay: startDelay + text.length * charDelay + 0.05 }}
        />
      )}
    </span>
  )
}

const HeroHeadline = ({ className = '' }) => {
  const line1 = 'Creative Ideas.'
  const line2 = 'Meaningful Impact.'
  const charDelay = 0.015
  const line2Start = 0.05 + line1.length * charDelay * 0.55

  return (
    <h1 className={className} aria-label={`${line1} ${line2}`}>
      <span aria-hidden="true">
        <AnimatedLine text={line1} startDelay={0.05} charDelay={charDelay} baseColor="#111111" hoverColor="#8FA37A" />
        <AnimatedLine text={line2} startDelay={line2Start} charDelay={charDelay} baseColor="#9A9A96" hoverColor="#111111" shimmer />
      </span>
    </h1>
  )
}

export default HeroHeadline
