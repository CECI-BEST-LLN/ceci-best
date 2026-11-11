export interface Partner {
  id: string
  name: string
  url?: string
  /** Path inside /public */
  logo: string
  description?: string
}

/** Main partners, shown on the Partners page and the home page. */
export const partners: Partner[] = [
  {
    id: 'sweco',
    name: 'Sweco',
    url: 'https://www.swecobelgium.be',
    logo: 'images/partners/sweco.png',
    description:
      "Europe's leading engineering, architecture, consultancy and design company. Sweco works on public and private engineering projects and is always looking for young, emerging talent — guided by its mission: Transforming Society Together.",
  },
  {
    id: 'odoo',
    name: 'Odoo',
    url: 'https://www.odoo.com',
    logo: 'images/partners/odoo.png',
    description:
      'A Belgian company offering an open-source suite of integrated business applications — sales, CRM, accounting, inventory, manufacturing, HR and more. Its modular design lets businesses of every size tailor their operations.',
  },
]

/** Event sponsors (not listed as main partners). */
export const sponsors: Partner[] = [
  { id: 'wolfram', name: 'Wolfram', url: 'https://www.wolfram.com', logo: 'images/partners/wolfram.png' },
  { id: 'packo', name: 'Packo', logo: 'images/partners/packo.png' },
]

const all = [...partners, ...sponsors]

export function partnerById(id: string): Partner {
  const p = all.find((x) => x.id === id)
  if (!p) throw new Error(`Unknown partner "${id}"`)
  return p
}
