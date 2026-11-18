import { Outlet } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'

const PublicLayout = () => (
  <MotionConfig reducedMotion="user">
    <Navbar />
    <main className="overflow-x-clip" style={{ paddingTop: 'var(--ym-nav-h)' }}>
      <Outlet />
    </main>
    <Footer />
    <WhatsAppButton />
  </MotionConfig>
)

export default PublicLayout
