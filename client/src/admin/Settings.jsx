import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { FiSave } from 'react-icons/fi'

const AdminSettings = () => {
  const [form, setForm] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    axios.get(`${API_URL}/settings`)
      .then(r => setForm(r.data.data))
      .catch(() => toast.error('Failed to load settings'))
      .finally(() => setLoading(false))
  }, [])

  const set = (key, val) => setForm(p => ({ ...p, [key]: val }))
  const setSocial = (key, val) => setForm(p => ({ ...p, socials: { ...p.socials, [key]: val } }))
  const setStat = (key, val) => setForm(p => ({ ...p, stats: { ...p.stats, [key]: val } }))

  const handleSave = async () => {
    setSaving(true)
    try {
      await axios.put(`${API_URL}/settings`, form)
      toast.success('Settings saved!')
    } catch { toast.error('Save failed') }
    finally { setSaving(false) }
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" /></div>
  if (!form) return null

  const Field = ({ label, value, onChange, type = 'text', placeholder = '' }) => (
    <div>
      <label className="text-gray-400 text-xs uppercase tracking-wider mb-1 block">{label}</label>
      <input type={type} value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="input-field" />
    </div>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="font-display text-3xl font-bold text-white">Site Settings</h1><p className="text-gray-400">Update your website information</p></div>
        <button onClick={handleSave} disabled={saving} className="btn-primary disabled:opacity-60">
          <FiSave /> {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-6">
        {/* General */}
        <div className="card p-6">
          <h2 className="font-display font-semibold text-white text-lg mb-5">General Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Site Name" value={form.siteName} onChange={v => set('siteName', v)} />
            <Field label="Tagline" value={form.tagline} onChange={v => set('tagline', v)} />
            <div className="md:col-span-2">
              <label className="text-gray-400 text-xs uppercase tracking-wider mb-1 block">About Bio</label>
              <textarea value={form.about || ''} onChange={e => set('about', e.target.value)} className="input-field resize-none" rows={3} />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="card p-6">
          <h2 className="font-display font-semibold text-white text-lg mb-5">Contact Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Email" value={form.email} onChange={v => set('email', v)} type="email" />
            <Field label="Phone" value={form.phone} onChange={v => set('phone', v)} placeholder="+91 XXXXX XXXXX" />
            <Field label="WhatsApp Number (with country code)" value={form.whatsapp} onChange={v => set('whatsapp', v)} placeholder="+919876543210" />
            <Field label="Address" value={form.address} onChange={v => set('address', v)} />
            <div className="md:col-span-2">
              <Field label="Google Maps Embed URL" value={form.mapEmbedUrl} onChange={v => set('mapEmbedUrl', v)} placeholder="https://www.google.com/maps/embed?..." />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="card p-6">
          <h2 className="font-display font-semibold text-white text-lg mb-5">Social Media Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['instagram', 'youtube', 'linkedin', 'facebook', 'twitter'].map(s => (
              <Field key={s} label={s.charAt(0).toUpperCase() + s.slice(1)} value={form.socials?.[s]} onChange={v => setSocial(s, v)} placeholder={`https://${s}.com/...`} />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="card p-6">
          <h2 className="font-display font-semibold text-white text-lg mb-5">Statistics (shown in Hero & About)</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Field label="Followers" value={form.stats?.followers} onChange={v => setStat('followers', v)} placeholder="500K+" />
            <Field label="Engagement Rate" value={form.stats?.engagement} onChange={v => setStat('engagement', v)} placeholder="8.5%" />
            <Field label="Campaigns" value={form.stats?.campaigns} onChange={v => setStat('campaigns', v)} placeholder="200+" />
            <Field label="Brand Partners" value={form.stats?.brands} onChange={v => setStat('brands', v)} placeholder="80+" />
          </div>
        </div>

        {/* SEO */}
        <div className="card p-6">
          <h2 className="font-display font-semibold text-white text-lg mb-5">SEO Settings</h2>
          <div className="space-y-4">
            <Field label="Meta Title" value={form.metaTitle} onChange={v => set('metaTitle', v)} />
            <div>
              <label className="text-gray-400 text-xs uppercase tracking-wider mb-1 block">Meta Description</label>
              <textarea value={form.metaDescription || ''} onChange={e => set('metaDescription', e.target.value)} className="input-field resize-none" rows={2} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button onClick={handleSave} disabled={saving} className="btn-primary disabled:opacity-60">
          <FiSave /> {saving ? 'Saving...' : 'Save All Settings'}
        </button>
      </div>
    </div>
  )
}

export default AdminSettings
