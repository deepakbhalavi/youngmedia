# Young Media Marketing — Creative Digital Agency

> **Independent Creative & Digital Agency**  
> We build brands, create digital experiences, and craft content that helps businesses connect, communicate, and grow.

A full-stack web application for **Young Media Marketing**, designed with a **Minimalist Modern Creative Agency** aesthetic inspired by international design studios, high-end editorial portfolios, and digital production companies.

---

## ✦ Design System

- **Design Philosophy**: Minimalist Modern Creative Agency — generous whitespace, oversized editorial typography, hairline borders (`1px`), clean asymmetrical grid layouts, and subtle micro-interactions.
- **Color Palette**:
  - Primary Background: `#FFFFFF`
  - Secondary Background: `#F5F5F2`
  - Primary Text: `#111111`
  - Secondary Text: `#666666`
  - Hairline Borders: `#E5E5E5`
  - Studio Accent: `#B8C6A5` (Sage)
- **Typography**:
  - Headings & Display: **Space Grotesk**
  - Body & UI: **Inter**
- **Motion & Transitions**: Fluid cubic-bezier reveals powered by Framer Motion, diagonal sliding arrows on hover, and custom video autoplay drivers.

---

## ✦ Key Features & Sections

### 1. Navigation Bar
- Sticky header with white frosted glass backdrop and hairline bottom border.
- Smooth hash-scrolling directly to the `#portfolio` section from any route.
- Interactive full-screen mobile drawer with numbered editorial links.
- High-contrast cropped logo mark for dark and light surfaces.

### 2. Homepage Sections
- **Hero Section**: Editorial statement (*"Creative Ideas. Meaningful Impact."*), studio metrics, and interactive featured showreel.
- **01 — Who We Are**: Two-column studio narrative with video production preview and core pillars.
- **02 — What We Do**: Hairline-grid showcasing core capabilities:
  1. Digital Marketing
  2. Social Media Management
  3. Branding & Identity
  4. Content Creation
  5. Video Production & Reels
  6. Creative Strategy
- **03 — Our Portfolio**:
  - Asymmetrical editorial layout with campaign previews and vertical 9:16 social reels.
  - Interactive video lightbox supporting audio playback, metadata, and full-screen preview.
  - **Featured Portfolio Website CTA**: High-contrast pill button (*"Explore Our Creative Universe ↗"*) linking directly to the live deployed portfolio.
- **04 — Selected Work**: Curated client productions (Kanrivo Brand Film, CAT Exam Guide, Podcast Production, Study Strategy Masterclass) with thumbnail integration.
- **05 — Trusted By**: Balanced client roster featuring genuine brand partners:
  - SS Collection *(Branding & Social Media)*
  - Dolly Mobile *(Digital Marketing)*
  - Kanrivo *(Branding & Strategy)*
  - Sunsy Solar *(Performance Marketing & Leads)*
  - Zhamad Dental Clinic *(Social Media & Branding)*
- **06 — How We Work**: Minimal horizontal workflow:
  - `01 — Discover` → `02 — Strategize` → `03 — Create` → `04 — Grow`
- **Why Choose Us**: Studio values highlighting creative-first thinking, visual storytelling, and results-driven strategy.
- **07 — Client Stories**: Genuine client testimonials in clean card layouts.
- **Contact Section**: Clean editorial form connected to the backend API (`POST /api/contact`) alongside direct studio email, phone, location, and WhatsApp shortcuts.

### 3. Additional Pages & Features
- **/about**: Studio vision, journey timeline (2020–present), mission, and core values.
- **/services**: Detailed 10-discipline catalogue with specific deliverables and interactive FAQ accordion.
- **/portfolio**: Comprehensive production archive with Google Drive preview integrations.
- **/testimonials**: Full client review archive.
- **/blog & /blog/:slug**: Clean editorial journal with category filtering and article reader.
- **/admin**: Protected full-featured CMS dashboard to manage services, portfolio items, testimonials, blog articles, incoming contact messages, and site settings.

---

## ✦ Tech Stack

### Frontend (`/client`)
- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS + custom design system tokens
- **Animations**: Framer Motion
- **Icons**: React Icons (Feather Icons, FontAwesome)
- **Routing**: React Router DOM v7
- **Toasts**: React Hot Toast
- **SEO & Meta**: React Helmet Async

### Backend (`/server`)
- **Runtime**: Node.js + Express 5
- **Database**: MongoDB + Mongoose 9
- **Authentication**: JWT (JSON Web Tokens) + bcryptjs
- **Security**: Helmet, CORS
- **Email Notifications**: Nodemailer

---

## ✦ Project Structure

```
YM/
├── client/                     # Frontend Application
│   ├── public/
│   │   ├── reels/              # Production reels & video assets
│   │   ├── logo-dark.png       # Dark logo mark
│   │   └── logo-light.png      # Light logo mark
│   ├── src/
│   │   ├── admin/              # Admin CMS components & layout
│   │   ├── components/         # Reusable UI components & layouts
│   │   │   ├── ui/             # Motion, Arrow, AutoVideo, Lightbox
│   │   │   ├── Navbar.jsx      # Sticky navigation bar
│   │   │   └── Footer.jsx      # Minimal dark editorial footer
│   │   ├── context/            # Auth and theme contexts
│   │   ├── data/site.js        # Centralized agency content & configuration
│   │   ├── pages/              # Public pages (Home, About, Services, etc.)
│   │   ├── App.jsx             # Router and route configurations
│   │   └── index.css           # Design system tokens and Tailwind base
│   ├── index.html
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                     # Backend API & CMS Server
│   ├── middleware/             # JWT auth guards
│   ├── models/                 # Mongoose schemas (User, Contact, Portfolio, etc.)
│   ├── routes/                 # REST API endpoints (/api/*)
│   ├── .env.example            # Environment variables template
│   ├── create-admin.js         # Admin account bootstrap script
│   ├── seed.js                 # Initial database seeder
│   └── server.js               # Express application entrypoint
│
├── .gitignore                  # Git ignore rules for node_modules, env, dist
└── README.md                   # Project documentation
```

---

## ✦ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) running locally on port `27017` or a MongoDB Atlas URI

---

### 1. Backend Setup

```bash
cd server
npm install
```

Configure your environment variables in `server/.env` (refer to `server/.env.example`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ymmarketing
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=30d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

Seed the database and create the initial admin account:
```bash
node create-admin.js
```

Start the backend server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```
The API will run at `http://localhost:5000`.

---

### 2. Frontend Setup

```bash
cd client
npm install
```

Start the Vite development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser. All `/api` requests are automatically proxied to `http://localhost:5000`.

To create an optimized production build:
```bash
npm run build
```

---

## ✦ Admin Panel Access

- **URL**: `http://localhost:5173/admin/login`
- **Default Email**: `admin@ymmarketing.com`
- **Default Password**: `ymmarketing@2024`

*(Credentials can be reset or updated via `server/create-admin.js` or directly from the Admin Settings tab).*

---

## ✦ External Portfolio

The agency's dedicated interactive portfolio universe is deployed at:  
👉 **[https://young-media-portfolio.vercel.app/](https://young-media-portfolio.vercel.app/)**

---

## ✦ License

© 2026 **Young Media Marketing**. All rights reserved.
