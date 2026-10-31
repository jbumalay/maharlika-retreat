# Maharlika Retreat

A fictional tropical retreat concept designed as a polished editorial hospitality website built with React, TypeScript, and Vite.

> Maharlika Retreat is a concept project for portfolio and design exploration. It does not represent a real hotel or booking experience.

## Overview

Maharlika Retreat is a design-forward, hospitality-inspired experience that explores how a small coastal getaway might feel online: warm, tactile, calm, and immersive. The project focuses on atmosphere and storytelling rather than conversion tactics, using layered typography, large landscape photography, and a restrained editorial layout.

This project was built to showcase:

- a luxury-but-minimal visual identity
- strong editorial composition and spacing systems
- immersive room storytelling for a boutique retreat concept
- responsive, accessible UI patterns in a multi-page experience
- a front-end portfolio sample without a real booking backend

## Project goals

- Design a calm, premium hospitality experience rooted in natural textures and coastal living
- Present three distinct room concepts with clear identity and storytelling
- Build a smooth front-end experience with strong information hierarchy and modular layout patterns
- Keep the interface accessible, responsive, and focused on atmosphere over sales pressure

## Features

- Multi-page experience for home, rooms, room details, and inquiry
- Editorial visual style with warm earth tones and botanical accents
- Three room studies with distinct characteristics and amenities
- Interactive photo gallery with keyboard support and focus management
- Demo inquiry form integrated into the retreat brand narrative
- Accessible navigation, semantic structure, and reduced-motion transitions

## Tech stack

- [React 19](https://react.dev/)
- [Vite 8](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Playfair Display](https://fonts.google.com/specimen/Playfair+Display)
- [Source Sans 3](https://fonts.google.com/specimen/Source+Sans+3)

## Getting started

```bash
npm install
npm run dev
```

The app runs on the port defined by the `PORT` environment variable, with a default of `8443`.

## Available scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the project for production |
| `npm run preview` | Preview the built app locally |
| `npm run format` | Format the project with `oxfmt` |

## Project structure

```text
.
├── .gitignore
├── LICENSE
├── README.md
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
├── public/
│   ├── favicon.svg
│   └── images/
│       ├── canopy-room.jpg
│       ├── coast.jpg
│       ├── garden-exterior.jpg
│       ├── garden-light.jpg
│       ├── garden-path.jpg
│       ├── garden-room.jpg
│       ├── hero.jpg
│       ├── interior-detail.jpg
│       ├── open-air-villa.jpg
│       └── water-courtyard.jpg
└── src/
    ├── App.tsx
    ├── index.css
    ├── main.tsx
    ├── vite-env.d.ts
    ├── components/
    │   ├── ImageGallery.tsx
    │   ├── InquiryForm.tsx
    │   └── Layout.tsx
    ├── data/
    │   └── rooms.ts
    └── pages/
        ├── ContactPage.tsx
        ├── HomePage.tsx
        ├── RoomDetailPage.tsx
        └── RoomsPage.tsx
```

## Design direction

The design language is intentionally restrained and atmospheric:

- limestone and warm neutral surfaces
- deep canopy greens and natural wood textures
- large editorial headings with quiet support typography
- balanced asymmetry and generous whitespace
- content-driven storytelling without noisy sales messaging

## Accessibility notes

- semantic landmark structure and clear reading order
- visible keyboard focus styling
- labeled form controls and validation feedback
- keyboard-friendly gallery and navigation behavior
- reduced-motion support for transitions and animations

## License

[MIT](./LICENSE) © 2026 Jerome Andrei Abumalay

## Notes

This project is best understood as a curated front-end concept and design exercise. It demonstrates how a boutique retreat brand can be translated into a responsive web experience while emphasizing editorial craft, tone, and minimal interaction design.