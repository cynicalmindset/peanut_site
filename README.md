# peanut_site

# atmosphere — Curated Event Discovery Platform

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

**atmosphere** is a responsive, soft-curated event discovery and registration platform. Inspired by calm, airy aesthetics, organic landscapes, and independent cultural journals, it connects curious minds to intimate modular synthesis symposia, risograph print labs, systems unconferences, and outdoor night gravel rides.

---

## ☁️ Design System & Aesthetic

- **Soft Atmospheric Palette:** Soft sky blues (`#3B82F6`, `#60A5FA`, `#DBEAFE`), cloud whites (`#F8FAFC`), and dark velvet obsidian (`#0B0F19` for night mode).
- **Inspo-Aligned Hero Canvas:** Framed rounded canvas (`rounded-3xl` / `rounded-[36px]`) featuring the high-fidelity `hero.png` landscape, clean white pill controls, floating search bar, and partner/collaborator banner.
- **Pill Geometry:** Tactile `rounded-full` controls for category tags, navigation tabs, filter selectors, and primary action buttons.
- **Card Craft:** Generous `rounded-3xl` corners, subtle hairline borders (`border-slate-200/80`), soft shadows (`shadow-soft` and `shadow-float`), and gentle hover micro-interactions.
- **Human-Centric Typography:** Paired [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) for expressive headings with [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) for legible body text.

---

## ⚡ Key Features

1. **Atmosphere Hero Showcase:**
   - Framed panorama with `hero.png` as the hero centerpiece.
   - Clean floating search pill bar enabling instant topic and city filtering.
   - Inspo-style pill action buttons (*"Explore Events"*, *"Curated Feature"*).
   - Live gathering ticker and metro coverage indicators.

2. **Event Discovery Engine:**
   - **Real-Time Search:** Search across title, tags, description, venue, and city.
   - **Pill Category Filter:** Instant filtering between *Technology*, *Music*, *Workshops*, *Cultural*, *Sports*, and *Community*.
   - **Metro & Date Sorting:** Sort by date, available capacity, or alphabetical title.
   - **Featured Centerpiece:** Editorial broadsheet card highlighting the monthly feature.

3. **Event Dossier Route (`/event/:id`):**
   - High-resolution hero banner, full program overview, and assembly timeline.
   - Sticky admission sidebar with direct reservation CTA.
   - One-click share action with clipboard confirmation.

4. **Client-Side Registration Experience:**
   - Soft modal dialog with full field validation (Name, Email format, Phone number 10–15 digits, Ticket count).
   - Prevents duplicate submissions with processing loader state.
   - Digital pass card with authentic reference code (`ATM-####-CITY`), barcode graphic, and calendar invite (`.ics`) download.
   - **Local Storage:** Stores all bookings locally in the browser with full privacy.

5. **My Passes Drawer:**
   - Slide-out panel to view all registered bookings, download `.ics` calendar files, or cancel reservations.

6. **Accessibility & Dark/Light Mode:**
   - Seamless dark mode toggle with persistent local preference.
   - Responsive across mobile (320px+), tablet, and desktop viewports.

---

## 🚀 Running the Project

```bash
# 1. Install dependencies
npm install

# 2. Start Vite development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build locally
npm run preview
```
