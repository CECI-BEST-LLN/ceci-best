import type { Contact } from './types.ts'

export interface BoardMember {
  name: string
  role: string
  email?: string
  /** Path inside /public */
  photo?: string
}

export interface Board {
  years: string
  /** Every board picks a pun name */
  name: string
  groupPhoto?: string
  members: BoardMember[]
}

const photo = (slug: string) => `images/board/${slug}.webp`

export const currentBoard: Board = {
  years: '2025-2026',
  name: 'Philippe EtcheBEST',
  groupPhoto: 'images/board/group.webp',
  members: [
    { name: 'Lena Aroud', role: 'President', email: 'lena.aroud@best-eu.org', photo: photo('lena-aroud') },
    { name: 'Constan Colinet', role: 'Secretary', email: 'constan.colinet@best-eu.org', photo: photo('constan-colinet') },
    { name: 'Edouard Packo', role: 'Treasurer', email: 'edouard.packo@best-eu.org', photo: photo('edouard-packo') },
    { name: 'Elodie Ozzano', role: 'FR Responsible', email: 'elodie.ozzano@best-eu.org', photo: photo('elodie-ozzano') },
    { name: 'Marie Gilot', role: 'HR Responsible', email: 'marie.gilot@best-eu.org', photo: photo('marie-gilot') },
    { name: 'Lizzy Nguyen', role: 'PR Responsible', email: 'lizzy.nguyen@best-eu.org', photo: photo('lizzy-nguyen') },
    { name: 'Maxime Lapaille', role: 'Competitions Coordinator', email: 'maxime.lapaille@best-eu.org', photo: photo('maxime-lapaille') },
    { name: 'Alexander Dimitrov', role: 'BCS Main Organiser', email: 'alexander.dimitrov@best-eu.org', photo: photo('alexander-dimitrov') },
    { name: 'Simon "Greg" Garot', role: 'Vivaldi', email: 'simon.garot@best-eu.org', photo: photo('simon-garot') },
    { name: 'Mateo Desmette', role: 'IT Responsible', email: 'mateo.desmette@best-eu.org', photo: photo('mateo-desmette') },
  ],
}

const m = (name: string, role: string): BoardMember => ({ name, role })

export const previousBoards: Board[] = [
  {
    years: '2024-2025',
    name: 'BESTial',
    members: [
      m('Cindie Scheuren', 'President'),
      m('Constan Colinet', 'PR Responsible'),
      m('Andrea Barrera', 'Secretary'),
      m('Guillaume Keus', 'Competitions Coordinator'),
      m('Guillaume Dupont', 'Treasurer'),
      m('Madeleine Vanderschelden', 'BCS Main Organiser'),
      m('Edouard Packo', 'FR Responsible'),
      m('Pierre Joris', 'Vivaldi'),
      m('Lena Aroud', 'HR Responsible'),
      m('Victor Waeytens', 'IT Responsible'),
    ],
  },
  {
    years: '2023-2024',
    name: 'DéBOARDement',
    members: [
      m('Sacha Defrère', 'President'),
      m('Andrea Barrera', 'PR Responsible'),
      m('Léa Kayser', 'Secretary'),
      m('Simon François', 'Competitions Coordinator'),
      m('Thomas Hautier', 'Treasurer'),
      m('Pierre Joris', 'BCS Main Organiser'),
      m('Alexandre Pirot', 'FR Responsible'),
      m('Mathéo Ketels', 'Vivaldi'),
      m('Cindie Scheuren', 'HR Responsible'),
      m('Guillaume Dupont', 'IT Responsible'),
    ],
  },
  {
    years: '2022-2023',
    name: 'BOARDerline',
    members: [
      m('Guillaume Mévisse', 'President'),
      m('Emma Witry', 'PR Responsible'),
      m('Farah Aroud', 'Secretary'),
      m('Mathéo Ketels', 'Competitions Coordinator'),
      m('Francisco Kessler', 'Treasurer'),
      m('Alexandre Pirot', 'BCS Main Organiser'),
      m('Sacha Defrère', 'FR Responsible'),
      m('Cédric Ponsard', 'Vivaldi'),
      m('Thomas Hautier', 'HR Responsible'),
      m('Jacques Hogge', 'IT Responsible'),
    ],
  },
  {
    years: '2021-2022',
    name: 'Le KEKI',
    members: [
      m('Pierre Huljev', 'President'),
      m('Charles-Henri Bertrand', 'PR Responsible'),
      m('Alice Giot', 'Secretary'),
      m('Cédric Ponsard', 'EBEC Coordinator'),
      m('Guillaume Mévisse', 'Treasurer'),
      m('Catherine Echezuria Podolecki', 'BCS Main Organiser'),
      m('Florent Rousseau', 'FR Responsible'),
      m('Benjamin Desseveaux', 'Vivaldi'),
      m('Farah Aroud', 'HR Responsible'),
      m('Valentin Bailleux', 'IT Responsible'),
    ],
  },
  {
    years: '2020-2021',
    name: "The BOARD'el",
    members: [
      m('Louis Sartenaer', 'President'),
      m('Roxanne Fritschké', 'PR Responsible'),
      m('Benjamin Desseveaux', 'Secretary'),
      m('Tom Bary', 'Competitions Coordinator'),
      m('Alice Giot', 'Treasurer'),
      m('Catherine Echezuria Podolecki', 'BCS Main Organiser'),
      m('Pierre Huljev', 'FR Responsible'),
      m('Jérome Leclère', 'Vivaldi'),
      m('Guillaume Poncin', 'HR Responsible'),
      m('Louis Delbrouck', 'IT Responsible'),
    ],
  },
  { years: '2019-2020', name: 'The Pongists', members: [] },
  { years: '2012-2013', name: 'The estafetters', members: [] },
]

/** Current board member as a Contact, looked up by role. */
export function contactByRole(role: string): Contact {
  const member = currentBoard.members.find((x) => x.role === role)
  if (!member?.email) throw new Error(`No current board member with role "${role}" and an email`)
  return { name: member.name, role: member.role, email: member.email, photo: member.photo }
}
