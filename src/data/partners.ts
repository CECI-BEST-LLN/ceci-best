export interface Partner {
  id: string
  name: string
  url?: string
  /** Path inside /public — without a logo, the name is shown instead */
  logo?: string
  description?: string
}

/** Main partners, shown on the Partners page and the home page. */
export const partners: Partner[] = [
  {
    id: 'epl',
    name: 'EPL — Louvain School of Engineering',
    url: 'https://uclouvain.be/fr/facultes/epl',
    description: "UCLouvain's engineering faculty, where most of our members study.",
  },
  {
    id: 'westmalle',
    name: 'Westmalle',
    url: 'https://www.trappistwestmalle.be',
    description: 'The Trappist brewery of the Abbey of Westmalle, in Belgium.',
  },
  { id: 'guido', name: 'Guido' },
  { id: 'the-vex', name: 'The Vex' },
]

/** Event sponsors (credited on the events they supported, not listed as main partners). */
export const sponsors: Partner[] = [
  { id: 'sweco', name: 'Sweco', url: 'https://www.swecobelgium.be', logo: 'images/partners/sweco.png' },
  { id: 'wolfram', name: 'Wolfram', url: 'https://www.wolfram.com', logo: 'images/partners/wolfram.png' },
  { id: 'packo', name: 'Packo', logo: 'images/partners/packo.png' },
]

const all = [...partners, ...sponsors]

export function partnerById(id: string): Partner {
  const p = all.find((x) => x.id === id)
  if (!p) throw new Error(`Unknown partner "${id}"`)
  return p
}
