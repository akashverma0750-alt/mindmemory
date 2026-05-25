# 🎨 MoodCanvas

A creative mood journal & aesthetic memory board. Capture feelings, songs and small joys in beautiful visual cards — Pinterest-meets-Notion energy, all soft pastels and glassmorphism.

![MoodCanvas](public/favicon.png)

## ✨ Features

- 🌸 **Mood entry system** – pick from 8 emoji moods, each with its own gradient theme
- 🖼️ **Pinterest-style memory board** – masonry grid of glassmorphic cards
- 🔎 **Search & filter** – by mood, by date range, by free text
- 💌 **Memory details modal** – full view with image, song, note, favorite/delete
- 📊 **Mood palette stats** – a soft horizontal chart of how you've been feeling
- ⭐ **Favorites section** – pin the ones you love
- 🌅 **Quote of the day** – a daily affirmation
- 🫧 **Animated gradient blobs** background, floating chips, smooth transitions
- 📱 Fully responsive

## 🧱 Tech stack

- **React 19 + TanStack Start** (file-based routing, SSR-ready)
- **Tailwind CSS v4** with a custom pastel design system (oklch tokens)
- **TypeScript**, **Lucide icons**, **Sonner** toasts, **Radix** dialogs
- **LocalStorage** for client-side persistence (zero config, no auth required)

> 💡 **About the backend:** the project ships with a fully working client-side
> store (`src/lib/moodcanvas.ts`) so you can run it instantly with no setup.
> The data shape mirrors what a Mongo collection would store, so swapping in an
> Express + MongoDB REST backend later is a 1-file change. A reference
> schema is included below.

## 🚀 Getting started

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`.

## 🧩 Project analysis

This is a **TanStack Start + React 19** app with a fully client-side memory
journal flow. The current implementation stores memories in `localStorage`
through `src/lib/moodcanvas.ts`, while TanStack Start provides the app shell,
routing, and SSR entry points.

Core areas:

- `src/routes` contains the three main pages: landing, explore board, and add
  memory form.
- `src/components` holds the UI building blocks such as the floating navbar,
  memory cards, modal, and decorative background elements.
- `src/lib/moodcanvas.ts` contains the mood catalog, seed data, quotes, and the
  browser persistence helpers.
- `src/server.ts` and `src/start.ts` provide TanStack Start server/startup
  wiring plus the custom SSR error fallback.

## 🗂️ Project structure

```
src/
  routes/
    __root.tsx        – shell + fonts + favicon
    index.tsx         – landing page
    explore.tsx       – memory board + search & filter
    add.tsx           – new memory form
  components/
    Nav.tsx           – floating glass navbar
    Blobs.tsx         – animated gradient background
    MemoryCard.tsx    – glass memory card
    MemoryModal.tsx   – detail dialog
  lib/
    moodcanvas.ts     – mood catalog, storage, seed data, quotes
  styles.css          – design tokens, gradients, keyframes
```

## 📦 Memory schema

```ts
type Memory = {
  id: string;
  moodId: "joyful" | "calm" | "dreamy" | "cozy" | "energetic" | "melancholy" | "loved" | "curious";
  title: string;
  note: string;
  imageUrl?: string;
  song?: string;
  date: string;       // ISO date
  favorite?: boolean;
};
```

### Optional Mongo schema (Mongoose)

```js
const MemorySchema = new mongoose.Schema({
  moodId:   { type: String, required: true },
  title:    { type: String, required: true, maxlength: 80 },
  note:     { type: String, maxlength: 2000 },
  imageUrl: { type: String },
  song:     { type: String },
  favorite: { type: Boolean, default: false },
  date:     { type: Date, default: Date.now },
});
```

### Optional REST endpoints

```
GET    /api/memories            list all
POST   /api/memories            create
GET    /api/memories/:id        read one
PATCH  /api/memories/:id        update (e.g. favorite)
DELETE /api/memories/:id        delete
```

## 🔐 Sample .env

```env
# Frontend
VITE_API_URL=http://localhost:4000

# Backend (only needed if you wire up the Express + Mongo reference server)
PORT=4000
MONGODB_URI=mongodb://localhost:27017/moodcanvas
CORS_ORIGIN=http://localhost:5173
```

## 🌐 Deploy on Netlify

### Option 1: Connect the Git repository in Netlify

1. Push the project to GitHub, GitLab, or Bitbucket.
2. In Netlify, choose **Add new site** -> **Import an existing project**.
3. Use these build settings:

```txt
Build command: npm run build
Publish directory: dist/client
```

4. If Netlify asks for a Node version, use a current LTS release.
5. Add any required environment variables in **Site configuration** ->
   **Environment variables**.
6. Trigger the first deploy.

### Option 2: Deploy with the Netlify CLI

```bash
npm install
npm run build
npx netlify deploy
```

For a production deploy:

```bash
npx netlify deploy --prod
```

### Notes

- If you later add server-side features that must run on Netlify, install and
  configure `@netlify/vite-plugin-tanstack-start` as recommended by the
  TanStack Start hosting docs.
- For the current localStorage-based app, the standard frontend build output in
  `dist/client` is the main artifact Netlify needs.

## 🖋️ Design notes

- **Typography:** Fraunces (display, italic accents) + Plus Jakarta Sans (body)
- **Palette:** blush, lavender, peach, mint, butter, sky — soft oklch tokens
- **Surfaces:** glassmorphic cards (`backdrop-filter: blur(20px) saturate(140%)`)
- **Motion:** animated background blobs, floating mood chips, hover lift on cards
- **No dark corporate dashboards, no purple-on-white gradients.** Just soft light.

---

Made with soft light, slow mornings, and a little ♡
