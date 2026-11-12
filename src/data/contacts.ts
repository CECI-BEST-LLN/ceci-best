import type { Role } from './boards/index.ts'

// Which board positions to show as contacts on each page.
// People are looked up in the current board, so this never needs to change when a new board
// arrives. A role nobody holds is simply skipped (e.g. old "EBEC Coordinator").
export const pageContacts = {
  challenge: ['Competitions Coordinator', 'EBEC Coordinator', 'President', 'PR Responsible'],
  hackathon: ['Competitions Coordinator', 'President', 'PR Responsible'],
  summerCourse: ['BCS Main Organiser', 'President', 'Vivaldi'],
  partners: ['FR Responsible', 'Competitions Coordinator', 'BCS Main Organiser'],
} satisfies Record<string, Role[]>
