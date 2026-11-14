import type { ExternalLink } from './types.ts'

export interface ChallengeEdition {
  /** URL segment: /challenge/<slug> */
  slug: string
  menuLabel: string
  title: string
  /** ISO date ("2025-03-01" or "2025-03") — used to find the board that organised it */
  date: string
  dateLabel: string
  location: string
  /** Company that proposed the case */
  casePartner?: string
  language?: string
  intro: string[]
  /** Schedule / practical info */
  details?: string[]
  links: ExternalLink[]
  /** Path inside /public */
  poster?: string
  /** Partner ids, see partners.ts */
  sponsors?: string[]
  participants?: number
}

// Newest first. Photos of an edition: src/assets/challenge/<slug>/ (shown as a gallery).
export const challengeEditions: ChallengeEdition[] = [
  {
    slug: '2026',
    menuLabel: 'September 2026',
    title: 'Tectonic Hackathon — First Round',
    date: '2026-09-30',
    dateLabel: 'September 30, 2026 · 18:00–22:00',
    location: 'UCLouvain, Louvain-la-Neuve',
    casePartner: 'Tectonic',
    participants: 65,
    intro: [
      'On September 30, BEST Louvain-la-Neuve hosted the first round of the Tectonic Hackathon: 65 participants worked in teams to imagine new systems answering the challenge set by Tectonic.',
      'After a kick-off in the auditorium, teams had four hours to brainstorm, build and refine their ideas before pitching them — and the evening ended with a drink with everyone.',
    ],
    links: [],
    sponsors: ['tectonic'],
  },
  {
    slug: '2025',
    menuLabel: 'March 2025',
    title: 'Engineering Challenge 2025',
    date: '2025-03-01',
    dateLabel: 'Saturday, March 1st, 2025',
    location: 'Hall Sainte-Barbe, Louvain-la-Neuve',
    casePartner: 'Sweco',
    language: 'French & English',
    intro: [
      'On March 1st, 2025, BEST Louvain-la-Neuve hosted the annual Engineering Challenge at the Hall Sainte-Barbe, bringing together students passionate about science, technology and problem-solving.',
      'Open to all students in engineering, computer science, bioengineering, business engineering and related fields, this completely free event welcomed teams of 4 to tackle a real-life challenge proposed by our partner company Sweco.',
      'Each team worked all day on solving the practical problem presented by Sweco, then pitched their solution to a professional jury.',
    ],
    links: [
      {
        label: 'Download the case study',
        href: 'https://drive.google.com/uc?export=download&id=1YV8A2_u51QMgbR7Zr2en-6YEYNUTnV5F',
        description: 'The Engineering Challenge 2025 case, by Sweco',
      },
      { label: 'Facebook event', href: 'https://fb.me/e/2QEWRxh6U' },
    ],
    poster: 'images/ec-2025-poster.webp',
    sponsors: ['sweco', 'wolfram', 'packo'],
  },
  {
    slug: '2024',
    menuLabel: 'March 2024',
    title: 'Engineering Challenge 2024',
    date: '2024-03',
    dateLabel: 'March 2024',
    location: 'Hall Sainte-Barbe, Louvain-la-Neuve',
    intro: [
      "BEST Louvain-la-Neuve's annual engineering competition — part of THE biggest engineering competition in Europe!",
      'Open to students in civil engineering, INSET, management engineering or bioengineering, and to anyone interested in science and technology. Teams of four — no team yet? Contact us on Facebook or Instagram and we will find you one.',
      'A partner company proposes a problem. Teams have six hours, split in two parts around a lunch break, to solve it and defend their solution in front of a jury of teachers, company representatives and professionals.',
    ],
    details: [
      'One-day, in-person event — with prizes to win',
      'Breakfast served at 8am',
      'The day ends around 7pm with a drink while the jury deliberates',
      'Completely free',
    ],
    links: [{ label: 'Facebook event', href: 'https://fb.me/e/aC8MkaXUV' }],
  },
]

const photoFiles = import.meta.glob<string>('../assets/challenge/*/*.{webp,jpg,png}', { eager: true, import: 'default' })

/** Photos of an edition, sorted by file name. */
export function challengePhotos(slug: string): string[] {
  return Object.keys(photoFiles)
    .filter((k) => k.includes(`/challenge/${slug}/`))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((k) => photoFiles[k])
}
