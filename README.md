# Atlas

A solo travel planner web app. Plan trips, track bookings and expenses, and keep documents organised in one place.

**Live:** https://atlas-omega-dusky.vercel.app

## Stack

- **React 19** + **TypeScript 6**
- **Vite 8** — dev server and build
- **React Router v7** — client-side routing
- **CSS Modules** — scoped styles, no CSS-in-JS
- No UI library, no charting library — everything is custom

## Getting started

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`.

```bash
npm run build   # production build
npm run preview # preview the production build locally
```

## Project structure

```
src/
├── App.tsx               # Router definition
├── data/
│   └── mock.ts           # All mock data and TypeScript types
├── components/
│   └── layout/
│       ├── AppLayout.tsx # Shell with sidebar + main outlet
│       └── Sidebar.tsx   # Nav, upcoming trips, user footer
└── pages/
    ├── Landing.tsx        # /
    ├── Dashboard.tsx      # /dashboard
    ├── Trips.tsx          # /trips
    ├── NewTrip.tsx        # /trips/new
    ├── Documents.tsx      # /documents
    ├── Settings.tsx       # /settings
    └── trip/
        ├── TripDetail.tsx     # /trips/:id  (tab chrome)
        ├── TripOverview.tsx   # index tab
        ├── TripItinerary.tsx  # /itinerary
        ├── TripBookings.tsx   # /bookings
        ├── TripExpenses.tsx   # /expenses
        └── TripDocuments.tsx  # /documents
```

## Routes

| Path | Page |
|------|------|
| `/` | Landing |
| `/dashboard` | Dashboard |
| `/trips` | Trip list |
| `/trips/new` | New trip form |
| `/trips/:id` | Trip overview |
| `/trips/:id/itinerary` | Itinerary |
| `/trips/:id/bookings` | Bookings |
| `/trips/:id/expenses` | Expenses |
| `/trips/:id/documents` | Trip documents |
| `/documents` | Personal documents |
| `/settings` | Settings |

## Design tokens

Global CSS variables are defined in `src/index.css`:

```css
--bg: #0a0a0a
--bg-elevated: #111111
--bg-card: #181818
--border: #222222
--accent: #f05535
--text: #ffffff
--text-muted: #606060
```
