# ✦ Lumina PWA

A polished Progressive Web App built with **React + Vite** featuring:

- 🔐 Login / Sign Up authentication flow
- 📲 PWA install prompt (Add to Home Screen)
- 🖼 Photo upload with preview
- 🎬 Video upload with preview
- 💬 Remarks / comments per post
- ❤️ Like system
- 🖼 Media gallery view
- 👤 User profile with stats
- 📱 Mobile-first responsive design
- 🌙 Dark theme with noise texture
- ⚡ Offline-ready via Service Worker (Workbox)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed

### Install & Run

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📲 PWA Install

- **Chrome/Edge (Desktop/Android)**: Install button appears in the address bar or the in-app banner after a few seconds
- **Safari (iOS)**: Tap Share → "Add to Home Screen"
- The app works offline after first visit thanks to Workbox caching

---

## 🗂 Project Structure

```
lumina/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx          # Main app component
│   ├── App.module.css   # All styles (CSS Modules)
│   └── main.jsx         # React entry point
├── index.html
├── vite.config.js       # Vite + PWA plugin config
└── package.json
```

---

## 🎨 Demo Credentials

Any email + password (4+ characters) will work. No backend required.

---

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite 5 | Build tool |
| vite-plugin-pwa | Service Worker + Manifest |
| Workbox | Offline caching |
| CSS Modules | Scoped styling |
| Google Fonts | Syne + DM Sans |
