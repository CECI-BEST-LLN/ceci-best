# BEST Louvain-la-Neuve — website

Official website of BEST Louvain-la-Neuve, built with **React + TypeScript + Vite** and deployed on **GitHub Pages**.

## Getting started

Requires Node.js 22+.

```bash
npm install     # install dependencies
npm run dev     # dev server on http://localhost:5173
npm run build   # type-check + production build in dist/
npm run preview # preview the production build
npm run lint    # lint with oxlint
```

## Project structure

```
src/
  components/   Reusable UI (Header, Footer, PageHero, ContactBlock, LinkList, Icons…)
  pages/        One file per route (Home, Best, Challenge, Hackathon, SummerCourse, Board…)
  data/         Site content as typed TS files — edit these to update the site
    site.ts       name, email, socials, navigation menu
    boards/       one file per board: 2025-2026.ts, 2024-2025.ts…
      roles.ts      list of board positions
    contacts.ts   which positions are shown as contacts on each page
    challenge.ts  Engineering Challenge editions
    courses.ts    BEST Course in Summer (BCS) editions & participant resources
    partners.ts   partners & event sponsors
  assets/boards/<years>/   board photos (one per member + group.webp)
  index.css     Design tokens (BEST colors, fonts, radius…) + global utilities
public/
  images/       Logos, photos, partner logos
```

Styling uses plain CSS: global tokens and utility classes in `src/index.css`, and
component-scoped styles in `*.module.css` files (CSS Modules).

## New board (every year)

1. Copy `src/data/boards/2025-2026.ts` to `src/data/boards/2026-2027.ts` and fill in the
   years, the board name and the members:

   ```ts
   export default defineBoard({
     years: '2026-2027',
     name: 'Board pun name',
     members: [
       { name: 'Firstname Lastname', role: 'President' },
       // ...
     ],
   })
   ```

2. Add the photos in `src/assets/boards/2026-2027/`, named after each member
   (`firstname-lastname.webp`, accents removed, e.g. `lea-kayser.webp`) plus an optional
   `group.webp`. Portraits around 640×720 work best.

That's it — the newest board automatically becomes the current one everywhere:
Board page, contact blocks of every page, and the previous board moves to "Previous boards"
(with its own page at `/board/<years>`). Past Challenge/BCS editions show the board that was in
office at their date (a new board starts in September).

Good to know:
- Emails default to `firstname.lastname@best-eu.org`; set `email: '...'` to override or
  `email: null` if someone has no BEST address.
- `role` only accepts positions listed in `boards/roles.ts` — a typo breaks the build instead
  of silently showing nobody. Add a new position there if needed.
- To change who is shown as contact on a page, edit `data/contacts.ts` (positions, not names).

## Other common updates

- **New Engineering Challenge / BCS edition**: add an entry at the top of
  `challengeEditions` / `courseEditions` (with its `date` / `year`). The page, the menu entry
  and the "Organised by" credits are generated.
- **New partner**: add it to `partners` (main partners) or `sponsors` (event sponsors) with a
  logo in `public/images/partners/`.

## Adding a page

1. Create `src/pages/MyPage.tsx`.
2. Add a `<Route path="my-page" element={<MyPage />} />` in `src/App.tsx`.
3. Add it to `navItems` in `src/data/site.ts` if it should appear in the menu.

## Deployment

Every push to `main` builds and deploys the site via GitHub Actions
(`.github/workflows/deploy.yml`).

One-time setup on GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
