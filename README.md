# Simran & Krishna — Wedding Invitation

A luxury, mobile-first wedding invitation created with React, TypeScript, Vite, Tailwind CSS, Framer Motion and Lucide React. The original temple-style SVG artwork and decorative illustrated sections are included with the project. No API keys are required.

## Run locally

```bash
npm install
npm run dev
```

Open the address shown by Vite (normally http://localhost:5173).

## Make a deployable production build

```bash
npm run build
npm run preview
```

Upload the `dist/` folder to Netlify or connect this repository to Vercel (framework preset: Vite; build: `npm run build`; output: `dist`). All wedding information is inside `src/App.tsx` in the `WEDDING` constant. The countdown and downloadable calendar use the event date **9 December 2026** in Indian Standard Time.

## What is included

- Sky-blue cover with illustrated heritage gateway and scroll-driven opening doors.
- Invitation introducing Simran Jabbal & Krishna Kant and both families.
- Live wedding countdown.
- Anand Karaj (Sikh wedding), 10:00–11:00 AM, and Hindu wedding, 4:00 PM onwards.
- Illustrated venue card and the Google Maps link supplied by the couple.
- Interactive sky-lantern wishes (visual effect; not stored online).
- Calendar download containing both ceremonies, native sharing (where supported), and copy-link controls.
- Responsive styling, reduced-motion support, and a shareable Open Graph SVG card.

## Personalization notes

**Music:** No song was supplied, so no background audio has been enabled. (Autoplay is often blocked on phones.) Music can be added later with an opt-in play/pause control.

**Photos:** No photos were supplied. The site uses hand-authored vector illustrations rather than unrelated stock pictures. A couple photo gallery can be introduced later.

**Venue:** The provided Maps link points to Sohi Banquets, near Zirakpur; this invitation displays the name exactly as requested, **Sohi Banquet · Palm Resorts**. Confirm the venue labeling and that both ceremonies take place at the linked location before sharing invitations.

**Date:** The year was inferred to be **2026**, since the invitation is for the upcoming 9 December. Change the `WEDDING.date`, countdown `TARGET`, calendar DTSTARTs, and static meta information together if the intended year differs.

**Share button:** When opened as a local file or without HTTPS, browser sharing may not work; a deployed HTTPS site is recommended.

## Before sharing the URL

The source code is not yet a public website. Deploy it to Vercel / Netlify and replace the default preview URL in the shared invitation. It is useful to test on an iPhone/Android device before sending to guests.
