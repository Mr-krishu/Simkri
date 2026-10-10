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
- Interactive sky-lantern wishes with browser-local persistence and an optional permanent, shared Supabase counter.
- Calendar download containing both ceremonies, native sharing (where supported), and copy-link controls.
- Responsive styling, reduced-motion support, and a shareable Open Graph SVG card.

## Keep the lantern count after refresh and redeployment

The **Release a lantern** button now stores a local count in `localStorage`, so
refreshing the same browser or redeploying the site does not reset that device's
count. **For one shared total across every guest's phone, the following one-time
Supabase setup is required.** A static Render website cannot save a shared
counter by itself.

1. Create a Supabase project at https://supabase.com/dashboard (the free tier
   is generally sufficient for a small wedding invitation).
2. In Supabase's **SQL Editor**, paste and run
   [`supabase/wedding-wishes.sql`](supabase/wedding-wishes.sql). This creates
   the single count row plus secure, atomic `get_wedding_wishes` and
   `release_wedding_lantern` functions. No writable table permissions are
   granted to anonymous guests.
3. In **Project Settings → API** (or the **Connect** dialog, depending on the
   current Supabase UI), copy the **Project URL** and **publishable** API key
   (or the legacy **anon** key). **Never use a secret/service-role key.**
4. In your Render **Static Site → Environment**, add:

   ```ini
   VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
   ```

   Trigger **Deploy latest commit** or a fresh build, because Vite embeds
   `VITE_` variables at build time. The values are intentionally public;
   database safety comes from the SQL function permissions.
5. Visit the invitation, release a lantern, and refresh. Open it on a second
   device to confirm both see the same count. While the page remains open it
   checks the total approximately every 30 seconds, and on returning to the tab.

For local testing, copy `.env.example` to `.env.local` and replace its
placeholder values, then restart `npm run dev`. The count starts at **0**
when you first configure the shared database; existing local-only clicks are
not imported because they cannot be verified as distinct wishes.

**If database settings are missing:** the page says how many wishes were
saved **on this device**, and the number survives refresh and redeploy there,
but it is **not a global count**. Clearing site data or switching devices
resets the local-only number. If the shared database is unavailable, the
button reports a save failure rather than pretending a wish was recorded.

**Security note:** an anonymous wedding invitation does not know who clicked
the button. The increment endpoint can be called repeatedly by any visitor.
For strict rate-limiting or one wish per guest, add a server-side endpoint
with abuse protection and/or authentication.

## Personalization notes

**Music:** The optional Kudmayi background-music player is included. To enable it, add a legally obtained, properly licensed MP3 at `public/audio/kudmayi.mp3` and deploy the site. The floating play/pause control only appears when the file exists. Playback starts only after the guest taps Play; mobile browsers generally block unprompted audio autoplay. The website does not include or download the copyrighted recording.

**Photos:** No photos were supplied. The site uses hand-authored vector illustrations rather than unrelated stock pictures. A couple photo gallery can be introduced later.

**Venue:** The provided Maps link points to Sohi Banquets, near Zirakpur; this invitation displays the name exactly as requested, **Sohi Banquet · Palm Resorts**. Confirm the venue labeling and that both ceremonies take place at the linked location before sharing invitations.

**Date:** The year was inferred to be **2026**, since the invitation is for the upcoming 9 December. Change the `WEDDING.date`, countdown `TARGET`, calendar DTSTARTs, and static meta information together if the intended year differs.

**Share button:** When opened as a local file or without HTTPS, browser sharing may not work; a deployed HTTPS site is recommended.

## Before sharing the URL

The source code is not yet a public website. Deploy it to Vercel / Netlify and replace the default preview URL in the shared invitation. It is useful to test on an iPhone/Android device before sending to guests.
