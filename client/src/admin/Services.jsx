import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSave } from 'react-icons/fi'

const empty = { title: '', description: '', icon: 'FaBullhorn', color: '#D4AF37', features: '', order: 0, isActive: true }

const AdminServices = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(empty)

  const fetch = async () => {
    try { const r = await axios.get(`${API_URL}/services/all`); setItems(r.data.data || []) }
    catch { toast.error('Failed to load services') } finally { setLoading(false) }
  }

  useEffect(() => { fetch() }, [])

  const openAdd = () => { setEditing(null); setForm(empty); setModal(true) }
  const openEdit = item => { setEditing(item._id); setForm({ ...item, features: item.features?.join(', ') || '' }); setModal(true) }

  const handleSave = async () => {
    const payload = { ...form, features: form.features.split(',').map(f => f.trim()).filter(Boolean) }
    try {
      if (editing) { await axios.put(`${API_URL}/services/${editing}`, payload); toast.success('Service updated') }
      else { await axios.post(`${API_URL}/services`, payload); toast.success('Service created') }
      setModal(false); fetch()
    } catch { toast.error('Save failed') }
  }

  const handleDelete = async id => {
    if (!confirm('Delete this service?')) return
    try { await axios.delete(`${API_URL}/services/${id}`); toast.success('Deleted'); fetch() }
    catch { toast.error('Delete failed') }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="font-display text-3xl font-bold text-white">Services</h1><p className="text-gray-400">Manage your marketing services</p></div>
        <button onClick={openAdd} className="btn-primary"><FiPlus /> Add Service</button>
      </div>

      {loading ? <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="card h-20 shimmer-bg rounded-2xl" />)}</div> :
        <div className="space-y-3">
          {items.map(item => (
            <div key={item._id} className="card p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${item.color}20`, border: `1px solid ${item.color}40` }}>
                <span className="text-xs font-bold" style={{ color: item.color }}>{item.order}</span>
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold">{item.title}</p>
                <p className="text-gray-400 text-sm line-clamp-1">{item.description}</p>
              </div>
              <span className={`badge text-xs ${item.isActive ? 'text-green-400 border-green-500/30 bg-green-500/10' : 'text-gray-500'}`}>{item.isActive ? 'Active' : 'Hidden'}</span>
              <div className="flex gap-2">
                <button onClick={() => openEdit(item)} className="w-8 h-8 rounded-lg flex items-center justify-center border border-dark-50 text-gray-400 hover:text-gold-500 hover:border-gold-500 transition-all"><FiEdit2 size={14} /></button>
                <button onClick={() => handleDelete(item._id)} className="w-8 h-8 rounded-lg flex items-center justify-center border border-dark-50 text-gray-400 hover:text-red-500 hover:border-red-500 transition-all"><FiTrash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      }

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="card p-7 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-white text-xl">{editing ? 'Edit' : 'Add'} Service</h2>
              <button onClick={() => setModal(false)} className="text-gray-400 hover:text-white"><FiX size={20} /></button>
            </div>
            <div className="space-y-4">
              <div><label className="text-gray-400 text-xs uppercase tracking-wider mb-1 block">Title</label><input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="input-field" /></div>
              <div><label className="text-gray-400 text-xs uppercase tracking-wider mb-1 block">Description</label><textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} className="input-field resize-none" rows={3} /></div>
              <div><label className="text-gray-400 text-xs uppercase tracking-wider mb-1 block">Icon Name (e.g. FaBullhorn)</label><input value={form.icon} onChange={e => setForm(p => ({ ...p, icon: e.target.value }))} className="input-field" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-gray-400 text-xs uppercase tracking-wider mb-1 block">Color</label><input type="color" value={form.color} onChange={e => setForm(p => ({ ...p, color: e.target.value }))} className="input-field h-11 p-1 cursor-pointer" /></div>
                <div><label className="text-gray-400 text-xs uppercase tracking-wider mb-1 block">Order</label><input type="number" value={form.order} onChange={e => setForm(p => ({ ...p, order: +e.target.value }))} className="input-field" /></div>
              </div>
              <div><label className="text-gray-400 text-xs uppercase tracking-wider mb-1 block">Features (comma-separated)</label><textarea value={form.features} onChange={e => setForm(p => ({ ...p, features: e.target.value }))} className="input-field resize-none" rows={2} /></div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="svc-active" checked={form.isActive} onChange={e => setForm(p => ({ ...p, isActive: e.target.checked }))} className="w-4 h-4 accent-yellow-500" />
                <label htmlFor="svc-active" className="text-gray-300 text-sm">Active (visible on site)</label>
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

export default AdminServices
