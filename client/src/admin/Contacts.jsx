import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { FiTrash2, FiMail, FiPhone, FiCheck } from 'react-icons/fi'

const statusColors = { new: 'text-green-400 border-green-500/30 bg-green-500/10', read: 'text-blue-400 border-blue-500/30 bg-blue-500/10', replied: 'text-gray-400 border-gray-500/30 bg-gray-500/10' }

const AdminContacts = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(null)

  const fetch = async () => {
    try { const r = await axios.get(`${API_URL}/contact`); setItems(r.data.data || []) }
    catch { toast.error('Failed to load') } finally { setLoading(false) }
  }
  useEffect(() => { fetch() }, [])

  const updateStatus = async (id, status) => {
    try { await axios.put(`${API_URL}/contact/${id}`, { status }); fetch() }
    catch { toast.error('Update failed') }
  }

  const handleDelete = async id => {
    if (!confirm('Delete message?')) return
    try { await axios.delete(`${API_URL}/contact/${id}`); toast.success('Deleted'); fetch() }
    catch { toast.error('Delete failed') }
  }

  const newCount = items.filter(i => i.status === 'new').length

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Messages</h1>
          <p className="text-gray-400">{newCount} new message{newCount !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {loading ? <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="card h-20 shimmer-bg rounded-2xl" />)}</div> :
        items.length === 0 ? <div className="text-center py-16 text-gray-500">No messages yet</div> :
        <div className="space-y-3">
          {items.map(item => (
            <div key={item._id} className={`card overflow-hidden transition-all duration-300 ${item.status === 'new' ? 'border-gold-500/20' : ''}`}>
              <div className="p-5 flex items-start gap-4 cursor-pointer" onClick={() => setExpanded(expanded === item._id ? null : item._id)}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-dark-50">
                  <span className="text-gold-500 font-bold text-sm">{item.name?.[0]?.toUpperCase()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <p className="text-white font-semibold text-sm">{item.name}</p>
                    {item.subject && <span className="text-gray-500 text-xs">· {item.subject}</span>}
                  </div>
                  <p className="text-gray-400 text-xs mt-0.5">{item.email} {item.phone && `· ${item.phone}`}</p>
                  <p className="text-gray-500 text-xs mt-1 truncate">{item.message}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className={`badge text-xs ${statusColors[item.status]}`}>{item.status}</span>
                  <span className="text-gray-600 text-xs">{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {expanded === item._id && (
                <div className="px-5 pb-5 border-t border-dark-50 pt-4">
                  <p className="text-gray-300 text-sm leading-relaxed mb-4 bg-dark-300 rounded-xl p-4">{item.message}</p>
                  <div className="flex items-center gap-3 flex-wrap">
                    <a href={`mailto:${item.email}`} className="btn-ghost text-xs border border-dark-50 px-3 py-1.5 flex items-center gap-1">
                      <FiMail size={12} /> Reply via Email
                    </a>
                    {item.phone && (
                      <a href={`tel:${item.phone}`} className="btn-ghost text-xs border border-dark-50 px-3 py-1.5 flex items-center gap-1">
                        <FiPhone size={12} /> Call
                      </a>
                    )}
                    {item.status !== 'read' && (
                      <button onClick={() => updateStatus(item._id, 'read')} className="btn-ghost text-xs border border-dark-50 px-3 py-1.5 flex items-center gap-1 text-blue-400">
                        <FiCheck size={12} /> Mark Read
                      </button>
                    )}
                    {item.status !== 'replied' && (
                      <button onClick={() => updateStatus(item._id, 'replied')} className="btn-ghost text-xs border border-dark-50 px-3 py-1.5 flex items-center gap-1 text-green-400">
                        <FiCheck size={12} /> Mark Replied
                      </button>
                    )}
                    <button onClick={() => handleDelete(item._id)} className="btn-ghost text-xs border border-dark-50 px-3 py-1.5 flex items-center gap-1 text-red-400">
                      <FiTrash2 size={12} /> Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      }
    </div>
  )
}

export default AdminContacts
