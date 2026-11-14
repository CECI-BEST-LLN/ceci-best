// BEST Course in Summer (BCS) organised in Louvain-la-Neuve.
// Newest first: the first edition is featured on the Summer Course page,
// the others are only mentioned under "Previous editions".

export interface CourseEdition {
  year: string
  /** Course theme, if known */
  theme?: string
  teacher?: string
  /** Paragraphs about the edition */
  intro?: string[]
  /** Group photo, path inside /public */
  photo?: string
  /** Text above the participants' projects gallery (photos: src/assets/courses/<year>/) */
  highlightsIntro?: string
}

export const courseEditions: CourseEdition[] = [
  {
    year: '2026',
    theme: 'Giving shape to the unknown: Machine design and rapid prototyping',
    teacher: 'Prof. Renaud Ronsse',
    intro: [
      'In summer 2026, 20 students from all over Europe came to Louvain-la-Neuve. Guided by a university-level course taught by Prof. Renaud Ronsse, they analysed the needs of a client, conceptualised a solution and rapidly prototyped it.',
      'Between lectures and workshops, they also discovered Belgium and Louvain-la-Neuve.',
    ],
    photo: 'images/bcs-2026-group.webp',
    highlightsIntro: 'From a client brief to working prototypes in a few days — here is some of what the participants designed and built.',
  },
  { year: '2025', photo: 'images/bcs-2025-group.webp' },
  { year: '2024' },
]

// Photos of what participants built: drop them in src/assets/courses/<year>/ (sorted by file name).
const highlightFiles = import.meta.glob<string>('../assets/courses/*/*.{webp,jpg,jpeg,png}', { eager: true, import: 'default' })

export function courseHighlights(year: string): string[] {
  return Object.keys(highlightFiles)
    .filter((k) => k.includes(`/courses/${year}/`))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((k) => highlightFiles[k])
}
