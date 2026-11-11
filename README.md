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
  components/   Reusable UI (Header, Footer, EventCard, PageHero, Icons…)
  pages/        One file per route (Home, About, Events, Team, Partners, Contact)
  data/         Site content as typed TS files — edit these to update the site
    site.ts       name, email, socials, navigation
    events.ts     events list (auto-split into upcoming / past)
    team.ts       board members
    partners.ts   partners / sponsors
  index.css     Design tokens (colors, fonts, radius…) + global utilities
public/         Static files served as-is (favicon, team photos, partner logos)
```

Styling uses plain CSS: global tokens and utility classes in `src/index.css`, and
component-scoped styles in `*.module.css` files (CSS Modules).

## Adding a page

1. Create `src/pages/MyPage.tsx`.
2. Add a `<Route path="my-page" element={<MyPage />} />` in `src/App.tsx`.
3. Add it to `navLinks` in `src/data/site.ts` if it should appear in the menu.

## Deployment

Every push to `main` builds and deploys the site via GitHub Actions
(`.github/workflows/deploy.yml`).

One-time setup on GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
