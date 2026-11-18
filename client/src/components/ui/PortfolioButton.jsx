import Arrow from './Arrow'
import { PORTFOLIO_URL } from '../../data/site'

/**
 * Signature CTA linking to the external portfolio website (opens in a new tab).
 * Black pill, white type, sage disc with a diagonal arrow that loops on hover.
 */
const PortfolioButton = ({ label = 'Explore Our Creative Universe', className = '', id }) => (
  <a
    id={id}
    href={PORTFOLIO_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`${label} — opens portfolio in a new tab`}
    className={`group relative inline-flex items-center justify-between gap-5 sm:gap-8 rounded-full bg-ink text-white
      pl-6 sm:pl-9 pr-2 py-2 min-h-[64px] sm:min-h-[80px] w-full sm:w-auto overflow-hidden isolate
      transition-[background-color,transform] duration-500 ease-out-expo hover:bg-[#1A1A1A] active:scale-[0.99] ${className}`}
  >
    {/* soft sage sweep on hover */}
    <span aria-hidden="true"
      className="absolute inset-y-0 right-0 w-full -z-10 origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out-expo"
      style={{ background: 'linear-gradient(90deg, rgba(184,198,165,0) 0%, rgba(184,198,165,0.14) 100%)' }} />
    <span className="font-display text-[15px] sm:text-xl font-medium tracking-tight text-left leading-snug
      transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
      {label}
    </span>
    <span className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-sage text-ink flex items-center justify-center
      text-lg sm:text-2xl transition-transform duration-500 ease-out-expo group-hover:scale-[1.08]">
      <Arrow />
    </span>
  </a>
)

export default PortfolioButton
