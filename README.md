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
    board.ts      current board (with photos & emails) + previous boards
    challenge.ts  Engineering Challenge editions
    courses.ts    BEST Course in Summer (BCS) editions & participant resources
    partners.ts   partners & event sponsors
  index.css     Design tokens (BEST colors, fonts, radius…) + global utilities
public/
  images/       Logos, photos, board pictures, partner logos
```

Styling uses plain CSS: global tokens and utility classes in `src/index.css`, and
component-scoped styles in `*.module.css` files (CSS Modules).

## Common updates

- **New board**: move `currentBoard` into `previousBoards` (keep name/role only), fill in the
  new `currentBoard` and add photos in `public/images/board/` (portrait, ~640×720 WebP).
  Contacts shown on activity pages are looked up by role, so they update automatically.
- **New Engineering Challenge / BCS edition**: add an entry at the top of
  `challengeEditions` / `courseEditions`. The page and the menu entry are generated.
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
