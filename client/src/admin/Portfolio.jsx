import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSave } from 'react-icons/fi'

const cats = ['Instagram', 'YouTube', 'Campaign', 'Collab', 'Reel', 'Other']
const empty = { title: '', brand: '', category: 'Campaign', description: '', imageUrl: '', videoUrl: '', metrics: { reach: '', engagement: '', impressions: '', clicks: '' }, tags: '', featured: false, isActive: true }

const AdminPortfolio = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(empty)

  const fetch = async () => {
    try { const r = await axios.get(`${API_URL}/portfolio/all`); setItems(r.data.data || []) }
    catch { toast.error('Failed to load') } finally { setLoading(false) }
  }
  useEffect(() => { fetch() }, [])

  const openAdd = () => { setEditing(null); setForm(empty); setModal(true) }
  const openEdit = item => { setEditing(item._id); setForm({ ...item, tags: item.tags?.join(', ') || '' }); setModal(true) }

  const handleSave = async () => {
    const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) }
    try {
      if (editing) { await axios.put(`${API_URL}/portfolio/${editing}`, payload); toast.success('Updated') }
      else { await axios.post(`${API_URL}/portfolio`, payload); toast.success('Created') }
      setModal(false); fetch()
    } catch { toast.error('Save failed') }
  }

  const handleDelete = async id => {
    if (!confirm('Delete?')) return
    try { await axios.delete(`${API_URL}/portfolio/${id}`); toast.success('Deleted'); fetch() }
    catch { toast.error('Delete failed') }
  }

  const setMet = (k, v) => setForm(p => ({ ...p, metrics: { ...p.metrics, [k]: v } }))

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="font-display text-3xl font-bold text-white">Portfolio</h1><p className="text-gray-400">Manage campaign portfolio items</p></div>
        <button onClick={openAdd} className="btn-primary"><FiPlus /> Add Item</button>
      </div>

      {loading ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{[...Array(6)].map((_, i) => <div key={i} className="card h-40 shimmer-bg rounded-2xl" />)}</div> :
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(item => (
            <div key={item._id} className="card overflow-hidden group">
              {item.imageUrl && <div className="aspect-video overflow-hidden"><img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /></div>}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <p className="text-white font-semibold text-sm">{item.title}</p>
                    <p className="text-gray-400 text-xs">{item.brand}</p>
                  </div>
                  <span className="badge text-xs flex-shrink-0">{item.category}</span>
                </div>
                <div className="flex gap-2 text-xs text-gray-500 mb-3">
                  <span>Reach: <span className="text-gold-400">{item.metrics?.reach}</span></span>
                  <span>Eng: <span className="text-gold-400">{item.metrics?.engagement}</span></span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(item)} className="flex-1 py-1.5 rounded-lg border border-dark-50 text-gray-400 hover:text-gold-500 hover:border-gold-500 transition-all text-xs flex items-center justify-center gap-1"><FiEdit2 size={12} /> Edit</button>
                  <button onClick={() => handleDelete(item._id)} className="flex-1 py-1.5 rounded-lg border border-dark-50 text-gray-400 hover:text-red-500 hover:border-red-500 transition-all text-xs flex items-center justify-center gap-1"><FiTrash2 size={12} /> Del</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      }

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="card p-7 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-white text-xl">{editing ? 'Edit' : 'Add'} Portfolio Item</h2>
              <button onClick={() => setModal(false)}><FiX size={20} className="text-gray-400 hover:text-white" /></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="text-gray-400 text-xs uppercase tracking-wider mb-1 block">Title</label><input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="input-field" /></div>
              <div><label className="text-gray-400 text-xs uppercase tracking-wider mb-1 block">Brand</label><input value={form.brand} onChange={e => setForm(p => ({ ...p, brand: e.target.value }))} className="input-field" /></div>
              <div><label className="text-gray-400 text-xs uppercase tracking-wider mb-1 block">Category</label>
                <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="input-field">
                  {cats.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div><label className="text-gray-400 text-xs uppercase tracking-wider mb-1 block">Tags (comma-sep)</label><input value={form.tags} onChange={e => setForm(p => ({ ...p, tags: e.target.value }))} className="input-field" /></div>
              <div className="sm:col-span-2"><label className="text-gray-400 text-xs uppercase tracking-wider mb-1 block">Image URL</label><input value={form.imageUrl} onChange={e => setForm(p => ({ ...p, imageUrl: e.target.value }))} className="input-field" /></div>
              <div className="sm:col-span-2"><label className="text-gray-400 text-xs uppercase tracking-wider mb-1 block">Video URL (YouTube embed)</label><input value={form.videoUrl} onChange={e => setForm(p => ({ ...p, videoUrl: e.target.value }))} className="input-field" /></div>
              <div className="sm:col-span-2"><label className="text-gray-400 text-xs uppercase tracking-wider mb-1 block">Description</label><textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} className="input-field resize-none" rows={2} /></div>
              <div><label className="text-gray-400 text-xs uppercase tracking-wider mb-1 block">Reach</label><input value={form.metrics.reach} onChange={e => setMet('reach', e.target.value)} placeholder="e.g. 2.4M" className="input-field" /></div>
              <div><label className="text-gray-400 text-xs uppercase tracking-wider mb-1 block">Engagement</label><input value={form.metrics.engagement} onChange={e => setMet('engagement', e.target.value)} placeholder="e.g. 9.2%" className="input-field" /></div>
              <div><label className="text-gray-400 text-xs uppercase tracking-wider mb-1 block">Impressions</label><input value={form.metrics.impressions} onChange={e => setMet('impressions', e.target.value)} className="input-field" /></div>
              <div><label className="text-gray-400 text-xs uppercase tracking-wider mb-1 block">Clicks</label><input value={form.metrics.clicks} onChange={e => setMet('clicks', e.target.value)} className="input-field" /></div>
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

export default AdminPortfolio
