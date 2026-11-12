// Every board position, in display order.
// Add a role here if a new position is created — TypeScript will then accept it everywhere.

export const ROLES = [
  'President',
  'Secretary',
  'Treasurer',
  'FR Responsible',
  'HR Responsible',
  'PR Responsible',
  'Competitions Coordinator',
  'EBEC Coordinator', // old name of "Competitions Coordinator"
  'BCS Main Organiser',
  'Vivaldi',
  'IT Responsible',
] as const

export type Role = (typeof ROLES)[number]

export const roleOrder = (role: Role) => ROLES.indexOf(role)
