import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'

const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(email, password)
      toast.success('Welcome back, Admin!')
      navigate('/admin')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-root min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{ background: '#050510' }}>
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="orb orb-purple w-80 h-80 top-0 right-0 opacity-20 animate-glow-pulse" />
      <div className="orb orb-orange w-64 h-64 bottom-0 left-0 opacity-10 animate-glow-pulse" />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="card p-10 w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-5">
            <img src="/logo.png" alt="YoungMedia" className="h-16 w-auto object-contain"
              style={{ filter: 'brightness(1.2) drop-shadow(0 0 10px rgba(108,39,255,0.5))' }} />
          </div>
          <h1 className="font-display text-2xl font-bold text-white">Admin Panel</h1>
          <p className="text-gray-500 text-sm mt-1">YoungMedia Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-gray-400 text-xs uppercase tracking-wider mb-2 block">Email</label>
            <div className="relative">
              <FiMail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input id="admin-email" type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="admin@ymmarketing.com" className="input-field pl-11" required />
            </div>
          </div>
          <div>
            <label className="text-gray-400 text-xs uppercase tracking-wider mb-2 block">Password</label>
            <div className="relative">
              <FiLock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input id="admin-password" type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" className="input-field pl-11 pr-11" required />
              <button type="button" onClick={() => setShowPass(p => !p)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gold-500">
                {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>
          <button id="admin-login-btn" type="submit" disabled={loading}
            className="btn-primary w-full justify-center py-4 text-base disabled:opacity-60 mt-2">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-gray-600 text-xs mt-6">Default: admin@ymmarketing.com / ymmarketing@2024</p>
      </motion.div>
    </div>
  )
}

export default AdminLogin
