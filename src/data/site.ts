// Global site info. TODO: replace placeholders with the real values.

export const site = {
  name: 'BEST Louvain-la-Neuve',
  shortName: 'BEST LLN',
  tagline: 'Board of European Students of Technology',
  university: 'UCLouvain',
  email: 'contact@best-lln.be', // placeholder
  address: 'Louvain-la-Neuve, Belgium',
  socials: {
    instagram: 'https://www.instagram.com/', // placeholder
    linkedin: 'https://www.linkedin.com/', // placeholder
    facebook: 'https://www.facebook.com/', // placeholder
  },
} as const

export interface NavLinkItem {
  label: string
  to: string
}

export const navLinks: NavLinkItem[] = [
  { label: 'About', to: '/about' },
  { label: 'Events', to: '/events' },
  { label: 'Team', to: '/team' },
  { label: 'Partners', to: '/partners' },
]
