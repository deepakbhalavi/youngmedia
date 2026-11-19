import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import ScrollToTop from './components/ScrollToTop'
import Loader from './components/Loader'
import { useState, useCallback } from 'react'

// Public Pages
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import Testimonials from './pages/Testimonials'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'

// Admin
import AdminLogin from './admin/Login'
import AdminLayout from './admin/AdminLayout'
import Dashboard from './admin/Dashboard'
import AdminServices from './admin/Services'
import AdminPortfolio from './admin/Portfolio'
import AdminTestimonials from './admin/Testimonials'
import AdminBlog from './admin/Blog'
import AdminContacts from './admin/Contacts'
import AdminSettings from './admin/Settings'
import ProtectedRoute from './admin/ProtectedRoute'

// Layout
import PublicLayout from './components/PublicLayout'

function App() {
  // 'intro' → logo animation only | 'reveal' → site mounts under splitting panels | 'done'
  const [stage, setStage] = useState('intro')
  const handleReveal = useCallback(() => setStage('reveal'), [])
  const handleFinish = useCallback(() => setStage('done'), [])

  return (
    <>
      {stage !== 'done' && <Loader onReveal={handleReveal} onFinish={handleFinish} />}
      {stage !== 'intro' && <Site />}
    </>
  )
}

function Site() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <ScrollToTop />
            <Toaster
              position="top-right"
              toastOptions={{ style: { background: '#111111', color: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: '999px', padding: '12px 20px', fontSize: '14px' } }}
            />
            <Routes>
              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
                <Route index element={<Dashboard />} />
                <Route path="services" element={<AdminServices />} />
                <Route path="portfolio" element={<AdminPortfolio />} />
                <Route path="testimonials" element={<AdminTestimonials />} />
                <Route path="blog" element={<AdminBlog />} />
                <Route path="contacts" element={<AdminContacts />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>

              {/* Public routes with shared layout */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/contact" element={<Contact />} />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
