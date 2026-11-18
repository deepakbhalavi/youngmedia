import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../context/AuthContext'
import { FiBriefcase, FiImage, FiMessageSquare, FiFileText, FiMail, FiUsers, FiArrowRight } from 'react-icons/fi'

const StatCard = ({ label, value, icon: Icon, color, to }) => (
  <Link to={to} className="card p-6 flex items-center gap-5 hover-glow group">
    <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}20`, border: `1px solid ${color}40` }}>
      <Icon size={24} style={{ color }} />
    </div>
    <div className="flex-1">
      <p className="text-3xl font-display font-bold text-white">{value}</p>
      <p className="text-gray-400 text-sm">{label}</p>
    </div>
    <FiArrowRight className="text-gray-600 group-hover:text-gold-500 transition-colors" />
  </Link>
)

const Dashboard = () => {
  const [stats, setStats] = useState({ services: 0, portfolio: 0, testimonials: 0, blog: 0, contacts: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [svc, port, test, blog, contacts] = await Promise.all([
          axios.get(`${API_URL}/services/all`),
          axios.get(`${API_URL}/portfolio/all`),
          axios.get(`${API_URL}/testimonials/all`),
          axios.get(`${API_URL}/blog/all`),
          axios.get(`${API_URL}/contact`),
        ])
        setStats({
          services: svc.data.data?.length || 0,
          portfolio: port.data.data?.length || 0,
          testimonials: test.data.data?.length || 0,
          blog: blog.data.data?.length || 0,
          contacts: contacts.data.data?.length || 0,
          newContacts: contacts.data.data?.filter(c => c.status === 'new').length || 0,
        })
      } catch { } finally { setLoading(false) }
    }
    fetchAll()
  }, [])

  const cards = [
    { label: 'Services', value: stats.services, icon: FiBriefcase, color: '#D4AF37', to: '/admin/services' },
    { label: 'Portfolio Items', value: stats.portfolio, icon: FiImage, color: '#F5C518', to: '/admin/portfolio' },
    { label: 'Testimonials', value: stats.testimonials, icon: FiMessageSquare, color: '#B8960C', to: '/admin/testimonials' },
    { label: 'Blog Posts', value: stats.blog, icon: FiFileText, color: '#D4AF37', to: '/admin/blog' },
    { label: 'Total Messages', value: stats.contacts, icon: FiMail, color: '#F5C518', to: '/admin/contacts' },
    { label: 'New Messages', value: stats.newContacts || 0, icon: FiUsers, color: '#22C55E', to: '/admin/contacts' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white mb-1">Dashboard</h1>
        <p className="text-gray-400">Overview of your YMMarketing website content</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => <div key={i} className="card h-24 shimmer-bg rounded-2xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card, i) => <StatCard key={i} {...card} />)}
        </div>
      )}

      <div className="mt-10 card p-6">
        <h2 className="font-display font-semibold text-white text-lg mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Add Service', to: '/admin/services' },
            { label: 'Add Portfolio', to: '/admin/portfolio' },
            { label: 'Add Testimonial', to: '/admin/testimonials' },
            { label: 'Write Blog Post', to: '/admin/blog' },
            { label: 'View Messages', to: '/admin/contacts' },
            { label: 'Update Settings', to: '/admin/settings' },
          ].map(btn => (
            <Link key={btn.label} to={btn.to} className="btn-outline text-xs px-4 py-2">{btn.label}</Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
