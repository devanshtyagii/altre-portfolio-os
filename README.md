# Altre Portfolio OS

Real-estate **lease intelligence** for a sample commercial portfolio: abstraction, city-level outflow, WALE, vacancy, and expiry triggers in one workspace.

This repository is a front-end prototype. **All numbers, leases, and charts are sample data** in `src/data/`. Nothing is saved to a server.

## Live demo

https://altre-portfolio-cuq7ombia-devansh-tyagis-projects-b7be4a4e.vercel.app?_vercel_share=jQV8YWevCqXnzmBUudsu9bb2YMlTgRtv

## Tech stack

- **React** — UI and routing views
- **Vite** — dev server and production build
- **Tailwind CSS** — design tokens and layout utilities
- **Recharts** — bar and donut charts
- **react-router-dom** — client routes
- **lucide-react** — icons

Dark mode follows `prefers-color-scheme`. The sidebar collapses to icons below 900px.

## Features

- **Workspace** — tool cards for abstraction, portfolio, and benchmarks, plus a snapshot and review callout
- **Upload** — document-type pills, drag-and-drop (PDF / DOC / DOCX, 25 MB), simulated queue
- **Dashboard** — KPIs, area donut, city outflow and presence charts, attention tiles
- **Lease Data** — searchable, filterable table with View / Edit / Download
- **Triggers** — critical / high / medium counts and an upcoming expiry timeline
- **Benchmarking** — drifting hero banner, city filter, cost and vacancy analysis, insight tiles

## Folder structure

```
altre-portfolio-os/
├── docs/                  Screenshot placeholders
├── public/                Favicon
├── src/
│   ├── components/        Sidebar, TopBar, charts, KPI cards
│   ├── data/              Sample leases, portfolio, and benchmarks
│   ├── lib/               Number and city helpers
│   ├── pages/             Route screens
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css          Tokens, layout, motion
├── index.html
├── package.json
└── vite.config.js
```

## Setup

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

```bash
npm run build
```

Optional local preview of the production bundle:

```bash
npm run preview
```

## Sample data

Every KPI, chart series, lease row, and insight is static demo content. Upload progress stays in the browser and is not persisted. Do not treat figures as live portfolio facts.
