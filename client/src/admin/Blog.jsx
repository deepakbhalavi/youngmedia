import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSave } from 'react-icons/fi'

const slugify = t => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
const empty = { title: '', slug: '', excerpt: '', content: '', coverImage: '', tags: '', category: 'Marketing', readTime: '5 min read', author: 'Yash Mandale', isPublished: false }

const AdminBlog = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(empty)

  const fetch = async () => {
    try { const r = await axios.get(`${API_URL}/blog/all`); setItems(r.data.data || []) }
    catch { toast.error('Failed to load') } finally { setLoading(false) }
  }
  useEffect(() => { fetch() }, [])

  const openAdd = () => { setEditing(null); setForm(empty); setModal(true) }
  const openEdit = item => { setEditing(item._id); setForm({ ...item, tags: item.tags?.join(', ') || '' }); setModal(true) }

  const handleTitleChange = e => {
    const title = e.target.value
    setForm(p => ({ ...p, title, slug: editing ? p.slug : slugify(title) }))
  }

  const handleSave = async () => {
    const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) }
    try {
      if (editing) { await axios.put(`${API_URL}/blog/${editing}`, payload); toast.success('Updated') }
      else { await axios.post(`${API_URL}/blog`, payload); toast.success('Created') }
      setModal(false); fetch()
    } catch (err) { toast.error(err.response?.data?.message || 'Save failed') }
  }

  const handleDelete = async id => {
    if (!confirm('Delete?')) return
    try { await axios.delete(`${API_URL}/blog/${id}`); toast.success('Deleted'); fetch() }
    catch { toast.error('Delete failed') }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="font-display text-3xl font-bold text-white">Blog</h1><p className="text-gray-400">Manage blog posts and articles</p></div>
        <button onClick={openAdd} className="btn-primary"><FiPlus /> New Post</button>
      </div>

      {loading ? <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="card h-20 shimmer-bg rounded-2xl" />)}</div> :
        <div className="space-y-3">
          {items.map(item => (
            <div key={item._id} className="card p-5 flex items-center gap-4">
              {item.coverImage && <img src={item.coverImage} alt={item.title} className="w-16 h-12 rounded-xl object-cover flex-shrink-0" />}
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm truncate">{item.title}</p>
                <p className="text-gray-400 text-xs">{item.category} · {item.readTime} · {item.author}</p>
              </div>
              <div className="flex gap-2">
                <span className={`badge text-xs ${item.isPublished ? 'text-green-400 border-green-500/30 bg-green-500/10' : 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10'}`}>{item.isPublished ? 'Published' : 'Draft'}</span>
                <button onClick={() => openEdit(item)} className="w-8 h-8 rounded-lg border border-dark-50 flex items-center justify-center text-gray-400 hover:text-gold-500 hover:border-gold-500 transition-all"><FiEdit2 size={13} /></button>
                <button onClick={() => handleDelete(item._id)} className="w-8 h-8 rounded-lg border border-dark-50 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500 transition-all"><FiTrash2 size={13} /></button>
              </div>
            </div>
          ))}
        </div>
      }

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="card p-7 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-white text-xl">{editing ? 'Edit' : 'New'} Blog Post</h2>
              <button onClick={() => setModal(false)}><FiX size={20} className="text-gray-400" /></button>
            </div>
            <div className="space-y-4">
              <div><label className="text-gray-400 text-xs uppercase tracking-wider mb-1 block">Title</label><input value={form.title} onChange={handleTitleChange} className="input-field" /></div>
              <div><label className="text-gray-400 text-xs uppercase tracking-wider mb-1 block">Slug</label><input value={form.slug} onChange={e => setForm(p => ({ ...p, slug: e.target.value }))} className="input-field font-mono text-xs" /></div>
              <div className="grid grid-cols-3 gap-3">
                <div><label className="text-gray-400 text-xs uppercase tracking-wider mb-1 block">Category</label><input value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="input-field" /></div>
                <div><label className="text-gray-400 text-xs uppercase tracking-wider mb-1 block">Read Time</label><input value={form.readTime} onChange={e => setForm(p => ({ ...p, readTime: e.target.value }))} className="input-field" /></div>
                <div><label className="text-gray-400 text-xs uppercase tracking-wider mb-1 block">Author</label><input value={form.author} onChange={e => setForm(p => ({ ...p, author: e.target.value }))} className="input-field" /></div>
              </div>
              <div><label className="text-gray-400 text-xs uppercase tracking-wider mb-1 block">Cover Image URL</label><input value={form.coverImage} onChange={e => setForm(p => ({ ...p, coverImage: e.target.value }))} className="input-field" /></div>
              <div><label className="text-gray-400 text-xs uppercase tracking-wider mb-1 block">Tags (comma-separated)</label><input value={form.tags} onChange={e => setForm(p => ({ ...p, tags: e.target.value }))} className="input-field" /></div>
              <div><label className="text-gray-400 text-xs uppercase tracking-wider mb-1 block">Excerpt</label><textarea value={form.excerpt} onChange={e => setForm(p => ({ ...p, excerpt: e.target.value }))} className="input-field resize-none" rows={2} /></div>
              <div><label className="text-gray-400 text-xs uppercase tracking-wider mb-1 block">Content (Markdown supported)</label><textarea value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} className="input-field resize-none font-mono text-xs" rows={8} /></div>
              <label className="flex items-center gap-2 text-gray-300 text-sm cursor-pointer"><input type="checkbox" checked={form.isPublished} onChange={e => setForm(p => ({ ...p, isPublished: e.target.checked }))} className="accent-yellow-500" /> Publish immediately</label>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSave} className="btn-primary flex-1 justify-center"><FiSave /> {form.isPublished ? 'Publish' : 'Save Draft'}</button>
              <button onClick={() => setModal(false)} className="btn-ghost border border-dark-50 flex-1 justify-center">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminBlog
