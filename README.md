# DriveWin — Competition Mockup

Front-end demo of a car/motorbike prize competition site, built to show a prospective
client the concept before a bespoke build is quoted.

No real backend, payments, or authentication — everything runs client-side with
in-memory/session state (React + Vite + Tailwind CSS v4 + React Router).

**Live demo:** https://drivewin-competition-mockup.vercel.app

## What's included

- Homepage with a flagship competition hero, live competitions grid, recent winners,
  and a trust-signal bar
- Competition listing with filters (car/bike/cash) and sorting
- Competition detail page with an image gallery and ticket quantity selector
- Mocked checkout (format-only card validation, no real payment processor) and a
  confirmation screen with generated ticket numbers
- "My Tickets" page reflecting purchases made in the current demo session
- Admin panel (`/admin`) for creating/editing competitions and running live draws

## Running locally

```bash
npm install
npm run dev
```

## Notes

- All data is seeded in `src/data/` and mutated in memory via a React Context +
  reducer (`src/store/AppContext.jsx`); nothing is persisted beyond `sessionStorage`.
- Several `// Future:` comments throughout the codebase mark polish items intentionally
  left out of this demo (hero video, draw footage, empty-state illustrations, etc.).
