// Every board position: short key (used in code) → label (shown on the site).
// The order here is the display order on the site.
// New position? Add a line here — it is then available everywhere with autocompletion.

export const ROLES = {
  president: 'President',
  vicePresident: 'Vice-President',
  secretary: 'Secretary',
  treasurer: 'Treasurer',
  fr: 'FR Responsible',
  hr: 'HR Responsible',
  pr: 'PR Responsible',
  competitions: 'Competitions Coordinator',
  ebec: 'EBEC Coordinator', // old name of "competitions"
  ebecBenelux: 'EBEC Benelux Main Organiser',
  events: 'Event Responsible',
  bcs: 'BCS Main Organiser',
  vivaldi: 'Vivaldi',
  it: 'IT Responsible',
  webmaster: 'Webmaster',
  member: 'Board member', // when the exact position is unknown
} as const

export type Role = keyof typeof ROLES

const order = Object.keys(ROLES) as Role[]
export const roleOrder = (role: Role) => order.indexOf(role)
export const roleLabel = (role: Role) => ROLES[role]
