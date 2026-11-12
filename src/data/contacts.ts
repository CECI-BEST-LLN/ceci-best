import type { Role } from './boards/index.ts'

// Which board positions to show as contacts on each page (keys from boards/roles.ts).
// People are looked up in the current board, so this never changes when a new board arrives.
// A role nobody holds is simply skipped (e.g. the old "ebec").
export const pageContacts = {
  challenge: ['competitions', 'ebec', 'president', 'pr'],
  hackathon: ['competitions', 'president', 'pr'],
  summerCourse: ['bcs', 'president', 'vivaldi'],
  partners: ['fr', 'competitions', 'bcs'],
} satisfies Record<string, Role[]>
