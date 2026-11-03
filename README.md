# K Explore — Independent Event Discovery Platform

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

**K Explore** is a handcrafted, responsive event discovery and registration platform designed with an editorial aesthetic inspired by independent cultural publications, archival exhibition registers, and modern festival journals.

It rejects algorithmic marketing clutter and generic "AI-slop" design tropes (such as purple-blue gradient overlays, fake testimonials, floating glass blobs, and repetitive rounded cards) in favor of high-contrast typography, an intentional broadsheet grid, and authentic event curation.

---

## 🏛 Design Philosophy & Anti-AI Slop

- **Typography First:** Paired editorial display serif (*Playfair Display*) with readable grotesque sans (*Plus Jakarta Sans*) and monospaced data stamps (*JetBrains Mono*).
- **Restrained Color Palette:** Warm gallery paper off-white (`#FAF8F5`) or deep obsidian dark mode (`#0F1012`), paired with near-black ink (`#121316`) and one deliberate accent color: **Electric Vermilion** (`#E83D1B`).
- **Asymmetric Grid System:** Dynamic compositions with varied visual hierarchy, featured centerpiece cards, and distinct listing presentations.
- **Craft & Motion:** Subtle hairline borders (`1px solid #E6E1D7`), responsive image treatments, and transitions that respect `prefers-reduced-motion`.
- **Honest Data Architecture:** Completely client-side with full transparency. No phantom servers, no marketing tracking; passes are stored locally in the user's browser.

---

## ⚡ Core Features

1. **Editorial Hero Section:**
   - Asymmetric visual composition with date badges, active issue indicators, and live metro coverage statistics.
   - Quick navigation into the discovery ledger and centerpiece feature.

2. **Dynamic Discovery Engine:**
   - **Real-Time Keyword Search:** Instant search across titles, descriptions, venues, cities, and tags.
   - **Categorical Filtering:** Quick switching between *Technology*, *Music*, *Workshops*, *Cultural*, *Sports*, and *Community*.
   - **Metro Filter:** Filter by host metro (*Bengaluru*, *Mumbai*, *Hyderabad*, *New Delhi*).
   - **Chronological Sorting:** Sort by earliest date, latest date, available spots, or alphabetical title.
   - **Active State Summary & Reset:** Live counters showing visible versus total entries with a one-click filter reset.

3. **Centerpiece Feature & Chronological Index:**
   - Centerpiece spotlight layout for primary cultural events with curator notes.
   - Responsive multi-column grid for upcoming listings.

4. **Event Dossier Detail View (`/event/:id`):**
   - Full event dossier with high-resolution photography.
   - Program timeline / schedule breakdown.
   - Admission details, venue address, and host information.
   - Native link sharing with clipboard confirmation.
   - Clean breadcrumb navigation back to discovery.

5. **Client-Side Registration Experience:**
   - Interactive modal with real-time field validation (Full Name, Email format, Phone number 10–15 digits, Ticket count, Accessibility notes).
   - Inline error states and preservation of valid inputs on failure.
   - Anti-duplicate submission protection with simulated processing feedback.
   - **Digital Ticket Pass Generation:** Renders a pass card with an authentic reference code (`KX-####-CITY`), attendee breakdown, and barcode graphic.
   - **Add to Calendar (.ics):** Generates and downloads native `.ics` calendar invitation files.
   - **Local Storage Persistence:** Keeps bookings safe between browser sessions.

6. **My Passes Drawer:**
   - Global side panel displaying all active RSVPs.
   - Option to review passes, download calendar files, or cancel reservations.

7. **Theming & Accessibility:**
   - Light and Dark mode toggle with `localStorage` persistence and system preference detection.
   - Keyboard accessible navigation with clear focus outlines (`:focus-visible`).
   - Custom 404 page for unmatched routes.

---

## 🛠 Technology Stack

- **Framework:** React 18
- **Language:** TypeScript 5.6
- **Build Tool:** Vite 5.4
- **Routing:** React Router DOM 6.28
- **Styling:** Tailwind CSS 3.4 & PostCSS
- **Icons:** Lucide React
- **Celebration Feedback:** Canvas Confetti

---

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm or pnpm

### Installation

1. Clone or extract the repository:
   ```bash
   git clone <repository-url>
   cd "peanut site"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch development server:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

4. Build for production:
   ```bash
   npm run build
   ```
   The compiled static assets will be located in the `dist/` directory.

5. Preview the production build locally:
   ```bash
   npm run preview
   ```

---

## 🚢 Deployment

The project builds to a completely static single-page application (SPA) in `dist/`.

### Deploying to Vercel
1. Install the Vercel CLI: `npm i -g vercel`
2. Run `vercel` from the root directory.
3. For client-side routing on Vercel, ensure `vercel.json` rewrites are configured:
   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   }
   ```

### Deploying to Netlify
1. Drag and drop the `dist/` folder into the Netlify app dashboard, or connect via Git.
2. In the Netlify build settings, set:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Add a `public/_redirects` file with `/*  /index.html  200` to support client-side routing.

---

## 📄 License

Independent project released under the MIT License.
