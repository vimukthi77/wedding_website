# Madushika & Sachithra — Wedding Invitation

A modern, animated wedding invitation built with **Next.js (App Router)**, **React 19**,
**Tailwind CSS v4**, and **Framer Motion**.

📅 23 July 2026 · Hotel Sesatha, Matale, Sri Lanka

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Build & run production:

```bash
npm run build
npm start
```

> **Note on the folder name:** this folder contains an `&` (`M&s wedding`).
> Windows `cmd` treats `&` as a command separator, which breaks the default
> npm binary shims. The `package.json` scripts therefore call Next.js via
> `node node_modules/next/dist/bin/next ...` so `npm run dev/build/start`
> work regardless. (Renaming the folder to remove `&` also works.)

## RSVP → Google Sheet

RSVP submissions POST to the secure route handler at `src/app/api/rsvp/route.ts`,
which forwards them server-side (no browser CORS issues) to a Google Apps Script
web app that appends a row to your Google Sheet.

The web-app URL is baked into the route; override it via `.env.local` if you
redeploy the script:

```
GOOGLE_SHEET_WEBAPP_URL=https://script.google.com/macros/s/XXXX/exec
```

The route sends these fields (use them as your sheet columns):
`name`, `guests`, `attendance`, `message`, `timestamp`.

Matching Apps Script (`doPost`):

```js
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const p = e.parameter;
  sheet.appendRow([p.timestamp, p.name, p.guests, p.attendance, p.message]);
  return ContentService.createTextOutput("ok");
}
```

## Highlights

- **Modern preloader** — animated circular progress ring around the monogram with an elegant curtain reveal.
- **Background music** — uses `public/images/bgsound.mpeg`, with reliable mobile autoplay-unlock (plays on first tap/scroll) and an animated equalizer toggle.
- **Couple photo** — `public/images/couple.jpeg`, served through `next/image` (9.6 MB original → ~64 KB optimized).
- **Mobile-first animations** — particle/petal counts scale down on phones; scroll-progress bar; reduced-motion support.
- **Video section removed**; consistent, generous modern spacing throughout.

## Structure

```
src/
├── app/
│   ├── layout.tsx          # fonts, metadata, viewport
│   ├── page.tsx            # page composition + preloader gate
│   ├── globals.css         # tokens, animations, utilities
│   └── api/rsvp/route.ts   # server-side RSVP handler
├── components/             # all sections (client components)
├── hooks/useIsMobile.ts    # tunes animation load on mobile
├── api/rsvp.ts             # client → /api/rsvp helper
└── utils/cn.ts
```
