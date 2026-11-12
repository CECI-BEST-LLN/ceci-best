import type { Role } from './roles.ts'

/** What you write in a board file. */
export interface BoardInput {
  /** Academic year, e.g. "2025-2026" — must match the file name and the photo folder */
  years: string
  /** The board's pun name */
  name: string
  members: MemberInput[]
}

export interface MemberInput {
  name: string
  role: Role
  /**
   * Defaults to firstname.lastname@best-eu.org (accents and "nicknames" removed).
   * Set it to override, or to `null` if the person has no BEST address.
   */
  email?: string | null
}

/** Helper giving autocompletion + type checking in board files. */
export function defineBoard(board: BoardInput): BoardInput {
  if (!/^\d{4}-\d{4}$/.test(board.years)) {
    throw new Error(`Board "${board.name}": years must look like "2025-2026", got "${board.years}"`)
  }
  return board
}
