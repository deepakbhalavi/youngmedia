/** Diagonal arrow (↗) that slides out/in on hover of a parent `.group` or `.ym-btn`. */
const Arrow = ({ className = '' }) => (
  <span className={`ym-arrow ${className}`} aria-hidden="true">
    <span>↗</span>
    <span>↗</span>
  </span>
)

export default Arrow
