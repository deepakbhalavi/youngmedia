import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import {
  FiGrid, FiBriefcase, FiImage, FiMessageSquare, FiFileText,
  FiMail, FiSettings, FiLogOut, FiMenu, FiX, FiExternalLink
} from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: FiGrid, end: true },
  { to: '/admin/services', label: 'Services', icon: FiBriefcase },
  { to: '/admin/portfolio', label: 'Portfolio', icon: FiImage },
  { to: '/admin/testimonials', label: 'Testimonials', icon: FiMessageSquare },
  { to: '/admin/blog', label: 'Blog', icon: FiFileText },
  { to: '/admin/contacts', label: 'Messages', icon: FiMail },
  { to: '/admin/settings', label: 'Settings', icon: FiSettings },
]

const AdminLayout = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = () => {
    logout()
    toast.success('Logged out')
    navigate('/admin/login')
  }

  return (
    <div className="admin-root min-h-screen bg-dark-500 flex">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 bottom-0 w-64 bg-dark-300 border-r border-dark-50 z-40 flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-dark-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #D4AF37, #F5C518)' }}>
                  <span className="font-display font-black text-xs text-dark-500">YM</span>
                </div>
                <span className="font-display font-bold text-white">Admin Panel</span>
              </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {navItems.map(item => (
                <NavLink key={item.to} to={item.to} end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                    ${isActive ? 'bg-gold-500/20 text-gold-400 border border-gold-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`
                  }>
                  <item.icon size={16} />
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Bottom */}
            <div className="p-4 border-t border-dark-50 space-y-2">
              <a href="/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                <FiExternalLink size={16} /> View Site
              </a>
              <button onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all">
                <FiLogOut size={16} /> Logout
              </button>
              <div className="px-4 py-3 border-t border-dark-50 mt-2">
                <p className="text-white text-sm font-medium">{user?.name}</p>
                <p className="text-gray-500 text-xs">{user?.email}</p>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Top bar */}
        <header className="h-14 bg-dark-300 border-b border-dark-50 flex items-center px-4 gap-4 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(p => !p)} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all">
            {sidebarOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
          <span className="text-gray-400 text-sm">Welcome back, <span className="text-gold-400 font-medium">{user?.name}</span></span>
        </header>

        {/* Page */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
