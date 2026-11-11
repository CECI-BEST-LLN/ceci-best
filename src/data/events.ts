// Events list. Add / edit entries here — they show up on Home and Events pages.
// TODO: placeholder content.

export type EventCategory = 'course' | 'competition' | 'workshop' | 'social'

export interface BestEvent {
  id: string
  title: string
  /** ISO date, e.g. "2027-03-14" */
  date: string
  /** Optional end date for multi-day events */
  endDate?: string
  location: string
  category: EventCategory
  description: string
  link?: string
}

export const categoryLabels: Record<EventCategory, string> = {
  course: 'Course',
  competition: 'Competition',
  workshop: 'Workshop',
  social: 'Social',
}

export const events: BestEvent[] = [
  {
    id: 'ebec-2027',
    title: 'EBEC Louvain-la-Neuve',
    date: '2027-02-24',
    location: 'UCLouvain, Louvain-la-Neuve',
    category: 'competition',
    description:
      'The local round of the European BEST Engineering Competition. Solve real engineering challenges in teams of four.',
  },
  {
    id: 'spring-course-2027',
    title: 'Spring Course: AI for Sustainable Cities',
    date: '2027-04-10',
    endDate: '2027-04-19',
    location: 'Louvain-la-Neuve',
    category: 'course',
    description:
      'Ten days of lectures, company visits and cultural activities with 22 students from all over Europe.',
  },
  {
    id: 'cv-workshop-2026',
    title: 'CV & LinkedIn Workshop',
    date: '2026-12-02',
    location: 'Place des Sciences',
    category: 'workshop',
    description: 'Learn how to make your profile stand out to recruiters, with feedback from our partners.',
  },
  {
    id: 'welcome-drink-2026',
    title: 'Welcome Drink',
    date: '2026-09-25',
    location: 'Louvain-la-Neuve',
    category: 'social',
    description: 'Meet the team, discover BEST and grab a drink with us to kick off the year.',
  },
]

/** Events sorted by date, split into upcoming and past. */
export function splitEvents(list: BestEvent[], now = new Date()) {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const end = (e: BestEvent) => new Date(e.endDate ?? e.date)
  const sorted = [...list].sort((a, b) => a.date.localeCompare(b.date))
  return {
    upcoming: sorted.filter((e) => end(e) >= today),
    past: sorted.filter((e) => end(e) < today).reverse(),
  }
}
