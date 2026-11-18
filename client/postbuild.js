import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dist = path.join(__dirname, 'dist')
const indexHtml = path.join(dist, 'index.html')

if (fs.existsSync(indexHtml)) {
  // 1. Create 404.html for Vercel fallback
  fs.copyFileSync(indexHtml, path.join(dist, '404.html'))

  // 2. Pre-generate static route index.html files so any direct URL or refresh works 100%
  const routes = [
    'about',
    'services',
    'portfolio',
    'testimonials',
    'blog',
    'contact',
    'admin',
    'admin/login',
  ]

  for (const r of routes) {
    const targetDir = path.join(dist, r)
    fs.mkdirSync(targetDir, { recursive: true })
    fs.copyFileSync(indexHtml, path.join(targetDir, 'index.html'))
  }

  console.log('✅ Generated static route pages and 404.html fallback!')
}
