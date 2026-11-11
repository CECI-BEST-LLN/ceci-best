import { challengeEditions } from './challenge.ts'
import { courseEditions } from './courses.ts'

export const site = {
  name: 'BEST Louvain-la-Neuve',
  tagline: 'Board of European Students of Technology',
  legalName: 'CECI — Contact Europe Cercle Industriel',
  email: 'louvain-la-neuve@best-eu.org',
  internationalUrl: 'https://www.best.eu.org/',
  socials: {
    facebook: 'https://www.facebook.com/ceci.best.lln/',
    instagram: 'https://www.instagram.com/best_lln/',
    linkedin: 'https://www.linkedin.com/company/best-louvain-la-neuve/',
  },
} as const

export interface NavLeaf {
  label: string
  to: string
}

export interface NavItem {
  label: string
  /** Direct link (no dropdown) */
  to?: string
  /** Dropdown entries */
  children?: NavLeaf[]
}

// Dropdown entries for editions are generated from the data files,
// so adding an edition there automatically adds it to the menu.
export const navItems: NavItem[] = [
  { label: 'BEST', to: '/best' },
  {
    label: 'Challenge',
    children: [
      { label: 'Presentation', to: '/challenge' },
      ...challengeEditions.map((e) => ({ label: e.menuLabel, to: `/challenge/${e.slug}` })),
    ],
  },
  { label: 'Hackathon', to: '/hackathon' },
  {
    label: 'Summer Course',
    children: [
      { label: 'Presentation', to: '/summer-course' },
      ...courseEditions.map((e) => ({ label: `BCS ${e.year}`, to: `/summer-course/${e.year}` })),
    ],
  },
  {
    label: 'Board',
    children: [
      { label: 'Current Board', to: '/board' },
      { label: 'Previous Boards', to: '/board/previous' },
    ],
  },
  { label: 'Partners', to: '/partners' },
]
