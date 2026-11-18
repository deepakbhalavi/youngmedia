import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSave, FiStar } from 'react-icons/fi'
import { FaStar } from 'react-icons/fa'

const empty = { clientName: '', company: '', role: '', photo: '', rating: 5, quote: '', platform: '', featured: false, isActive: true }

const AdminTestimonials = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(empty)

  const fetch = async () => {
    try { const r = await axios.get(`${API_URL}/testimonials/all`); setItems(r.data.data || []) }
    catch { toast.error('Failed to load') } finally { setLoading(false) }
  }
  useEffect(() => { fetch() }, [])

  const openAdd = () => { setEditing(null); setForm(empty); setModal(true) }
  const openEdit = item => { setEditing(item._id); setForm(item); setModal(true) }
  const handleSave = async () => {
    try {
      if (editing) { await axios.put(`${API_URL}/testimonials/${editing}`, form); toast.success('Updated') }
      else { await axios.post(`${API_URL}/testimonials`, form); toast.success('Created') }
      setModal(false); fetch()
    } catch { toast.error('Save failed') }
  }
  const handleDelete = async id => {
    if (!confirm('Delete?')) return
    try { await axios.delete(`${API_URL}/testimonials/${id}`); toast.success('Deleted'); fetch() }
    catch { toast.error('Delete failed') }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="font-display text-3xl font-bold text-white">Testimonials</h1><p className="text-gray-400">Manage client reviews</p></div>
        <button onClick={openAdd} className="btn-primary"><FiPlus /> Add Review</button>
      </div>

      {loading ? <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="card h-24 shimmer-bg rounded-2xl" />)}</div> :
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map(item => (
            <div key={item._id} className="card p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  {item.photo && <img src={item.photo} alt={item.clientName} className="w-10 h-10 rounded-full object-cover border border-gold-500/30" />}
                  <div>
                    <p className="text-white font-semibold text-sm">{item.clientName}</p>
                    <p className="text-gray-400 text-xs">{item.role} — {item.company}</p>
                  </div>
                </div>
                <div className="flex gap-1">{[...Array(item.rating)].map((_, i) => <FaStar key={i} className="text-gold-400 text-xs" />)}</div>
              </div>
              <p className="text-gray-400 text-xs line-clamp-2 italic mb-3">"{item.quote}"</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {item.featured && <span className="badge text-xs text-gold-400">Featured</span>}
                  <span className={`badge text-xs ${item.isActive ? 'text-green-400 border-green-500/30 bg-green-500/10' : 'text-gray-500'}`}>{item.isActive ? 'Active' : 'Hidden'}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(item)} className="w-8 h-8 rounded-lg border border-dark-50 flex items-center justify-center text-gray-400 hover:text-gold-500 hover:border-gold-500 transition-all"><FiEdit2 size={13} /></button>
                  <button onClick={() => handleDelete(item._id)} className="w-8 h-8 rounded-lg border border-dark-50 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500 transition-all"><FiTrash2 size={13} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      }

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="card p-7 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-white text-xl">{editing ? 'Edit' : 'Add'} Testimonial</h2>
              <button onClick={() => setModal(false)}><FiX size={20} className="text-gray-400" /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-gray-400 text-xs uppercase tracking-wider mb-1 block">Client Name</label><input value={form.clientName} onChange={e => setForm(p => ({ ...p, clientName: e.target.value }))} className="input-field" /></div>
                <div><label className="text-gray-400 text-xs uppercase tracking-wider mb-1 block">Company</label><input value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} className="input-field" /></div>
                <div><label className="text-gray-400 text-xs uppercase tracking-wider mb-1 block">Role</label><input value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))} className="input-field" /></div>
                <div><label className="text-gray-400 text-xs uppercase tracking-wider mb-1 block">Rating (1-5)</label>
                  <input type="number" min="1" max="5" value={form.rating} onChange={e => setForm(p => ({ ...p, rating: +e.target.value }))} className="input-field" />
                </div>
              </div>
              <div><label className="text-gray-400 text-xs uppercase tracking-wider mb-1 block">Photo URL</label><input value={form.photo} onChange={e => setForm(p => ({ ...p, photo: e.target.value }))} className="input-field" /></div>
              <div><label className="text-gray-400 text-xs uppercase tracking-wider mb-1 block">Platform</label><input value={form.platform} onChange={e => setForm(p => ({ ...p, platform: e.target.value }))} placeholder="e.g. Instagram Campaign" className="input-field" /></div>
              <div><label className="text-gray-400 text-xs uppercase tracking-wider mb-1 block">Quote</label><textarea value={form.quote} onChange={e => setForm(p => ({ ...p, quote: e.target.value }))} className="input-field resize-none" rows={4} /></div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-gray-300 text-sm cursor-pointer"><input type="checkbox" checked={form.featured} onChange={e => setForm(p => ({ ...p, featured: e.target.checked }))} className="accent-yellow-500" /> Featured</label>
                <label className="flex items-center gap-2 text-gray-300 text-sm cursor-pointer"><input type="checkbox" checked={form.isActive} onChange={e => setForm(p => ({ ...p, isActive: e.target.checked }))} className="accent-yellow-500" /> Active</label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSave} className="btn-primary flex-1 justify-center"><FiSave /> Save</button>
              <button onClick={() => setModal(false)} className="btn-ghost border border-dark-50 flex-1 justify-center">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminTestimonials
