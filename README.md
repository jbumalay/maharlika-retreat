# Casa Amihan

A fictional tropical retreat concept — an editorial hospitality website built as a **portfolio sample project**.

> **Note:** Casa Amihan is an imagined property. No real hotel, booking service, or reservation system is represented. All room specifications, amenities, photography, and inquiry flows are illustrative content for demonstration purposes.

## Overview

Casa Amihan explores how a small coastal retreat might feel online: tactile, generous, and close to the elements. The site's job is to make the atmosphere tangible, clarify the difference between three room studies, and lead to a transparent demo inquiry flow.

The design follows an **Architectural Editorial Frame** — a broad landscape image intersected by a narrow canopy-green stay-planning panel — with flat, measured, quiet supporting layouts and no ratings, rates, awards, urgency, or fake contact details.

## Tech stack

- [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/vite`
- TypeScript
- Playfair Display (editorial headings) + Source Sans 3 (body / UI)
- No runtime dependencies beyond React

## Getting started

```bash
npm install
npm run dev
```

The dev server runs on the port set by the `PORT` environment variable (default `8443`).

### Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run format` | Format with oxfmt |

## Project structure

```
src/
├── main.tsx              # React entrypoint
├── App.tsx               # Client-side router and page shell
├── index.css             # Global styles and Tailwind v4 design tokens
├── components/
│   ├── Layout.tsx        # AppLink, ButtonLink, SiteHeader, Breadcrumb, Footer, PageShell
│   ├── ImageGallery.tsx  # Room gallery with lightbox
│   └── InquiryForm.tsx   # Demo inquiry form
├── pages/
│   ├── HomePage.tsx
│   ├── RoomsPage.tsx
│   ├── RoomDetailPage.tsx
│   └── ContactPage.tsx
└── data/
    └── rooms.ts          # Room data (3 room studies)
public/
└── images/               # Editorial photography
```

## Design direction

- **Colors:** Limestone `#F3F0E7` (ground) · Canopy `#253D32` (anchors) · Sage `#B5C3A2` · Timber `#C38D62` · Charcoal `#30352F`
- **Type:** Playfair Display for editorial headings; Source Sans 3 for navigation, body copy, labels, and controls
- **Shape:** 4px radius on controls; square image corners; borders and spacing do the separating
- **Layout:** left-aligned, asymmetric editorial grids; prose kept between 45–70 characters

## Accessibility

- Skip-to-content link, semantic landmarks, and breadcrumb navigation
- Visible `:focus-visible` indicators (3px)
- Form labels, `aria-invalid`, and `aria-describedby` error messaging
- Keyboard-operable gallery (Escape, arrow keys) and mobile menu (Escape, focus trap)
- `prefers-reduced-motion` handling for all transitions

## License

[MIT](./LICENSE) © 2026 Jerome Andrei Abumalay