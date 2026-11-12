// Collects every board file of this folder and exposes helpers for the pages.
//
//   ➜ To add a board: create `src/data/boards/<years>.ts` (copy an existing one)
//     and put the photos in `src/assets/boards/<years>/`:
//       - one photo per member, named after them: "lena-aroud.webp"
//       - an optional group photo: "group.webp" (or .jpg / .png)
//     Nothing else to change: the newest board becomes the current one everywhere.

import type { Contact } from '../types.ts'
import type { BoardInput } from './define.ts'
import { roleOrder, type Role } from './roles.ts'

export type { Role } from './roles.ts'

export interface BoardMember {
  name: string
  role: Role
  slug: string
  email?: string
  /** Resolved image URL, if a photo exists */
  photo?: string
}

export interface Board {
  years: string
  name: string
  /** First calendar year of the academic year (2025 for "2025-2026") */
  startYear: number
  members: BoardMember[]
  groupPhoto?: string
}

// ---------------------------------------------------------------------------
// Loading
// ---------------------------------------------------------------------------

const boardFiles = import.meta.glob<BoardInput>(['./*.ts', '!./index.ts', '!./define.ts', '!./roles.ts'], {
  eager: true,
  import: 'default',
})

const photoFiles = import.meta.glob<string>('../../assets/boards/*/*.{webp,jpg,jpeg,png}', {
  eager: true,
  import: 'default',
})

/** "Simon "Greg" Garot" → "simon-garot", "Léa Kayser" → "lea-kayser" */
export function slugify(name: string) {
  return name
    .replace(/["“”].*?["“”]/g, ' ')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function findPhoto(years: string, slug: string) {
  const prefix = `../../assets/boards/${years}/${slug}.`
  const key = Object.keys(photoFiles).find((k) => k.startsWith(prefix))
  return key ? photoFiles[key] : undefined
}

function emailFor(slug: string) {
  // "lena-aroud" → "lena.aroud", "charles-henri-bertrand" → "charles-henri.bertrand"
  const i = slug.lastIndexOf('-')
  return i === -1 ? `${slug}@best-eu.org` : `${slug.slice(0, i)}.${slug.slice(i + 1)}@best-eu.org`
}

function resolve(input: BoardInput, file: string): Board {
  if (!file.endsWith(`/${input.years}.ts`)) {
    throw new Error(`Board file ${file} declares years "${input.years}" — they must match`)
  }
  return {
    years: input.years,
    name: input.name,
    startYear: Number(input.years.slice(0, 4)),
    groupPhoto: findPhoto(input.years, 'group'),
    members: [...input.members]
      .sort((a, b) => roleOrder(a.role) - roleOrder(b.role))
      .map((m) => {
        const slug = slugify(m.name)
        return {
          name: m.name,
          role: m.role,
          slug,
          email: m.email === null ? undefined : (m.email ?? emailFor(slug)),
          photo: findPhoto(input.years, slug),
        }
      }),
  }
}

/** All boards, newest first. */
export const boards: Board[] = Object.entries(boardFiles)
  .map(([file, input]) => resolve(input, file))
  .sort((a, b) => b.startYear - a.startYear)

/** The board currently in office (the newest one). */
export const currentBoard: Board = boards[0]

export const previousBoards: Board[] = boards.slice(1)

export function boardByYears(years: string): Board | undefined {
  return boards.find((b) => b.years === years)
}

// ---------------------------------------------------------------------------
// Dates → board
// ---------------------------------------------------------------------------

/** Month (1-12) when a new board takes office. */
const NEW_BOARD_MONTH = 9

/**
 * Board in office at a given date.
 * Accepts "2025-03-01", "2025-03" or "2025" (a bare year is read as July).
 */
export function boardAt(date: string): Board | undefined {
  const [y, m = '7'] = date.split('-')
  const year = Number(y)
  const startYear = Number(m) >= NEW_BOARD_MONTH ? year : year - 1
  return boards.find((b) => b.startYear === startYear)
}

// ---------------------------------------------------------------------------
// Contacts
// ---------------------------------------------------------------------------

/**
 * People holding the given roles, in the order of `roles`.
 * Roles nobody holds are skipped; a role held by two people returns both.
 */
export function membersWithRoles(roles: Role[], board: Board = currentBoard): BoardMember[] {
  return roles.flatMap((role) => board.members.filter((m) => m.role === role))
}

/** Same as membersWithRoles, as contact cards (only members with an email). */
export function contactsFor(roles: Role[], board: Board = currentBoard): Contact[] {
  return membersWithRoles(roles, board)
    .filter((m) => m.email)
    .map((m) => ({ name: m.name, role: m.role, email: m.email!, photo: m.photo }))
}
