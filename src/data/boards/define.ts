import type { Role } from './roles.ts'

/**
 * A person: just their name, or an object to override the email.
 * Emails default to firstname.lastname@best-eu.org — use `email: null` if there is none.
 */
export type Person = string | { name: string; email?: string | null }

/** One person per role — or several, as an array: `bcs: ['Alice Doe', 'Bob Doe']`. */
export type BoardRoles = Partial<Record<Role, Person | Person[]>>

export interface BoardDefinition {
  name?: string
  roles: BoardRoles
}

/**
 * Declare a board. The academic year comes from the file name (e.g. `2025-2026.ts`).
 *
 *   export default defineBoard('Philippe EtcheBEST', {
 *     president: 'Lena Aroud',
 *     secretary: 'Constan Colinet',
 *   })
 *
 * The board name is optional: `defineBoard({ member: ['Jane Doe', 'John Doe'] })`.
 */
export function defineBoard(roles: BoardRoles): BoardDefinition
export function defineBoard(name: string, roles: BoardRoles): BoardDefinition
export function defineBoard(a: string | BoardRoles, b?: BoardRoles): BoardDefinition {
  return typeof a === 'string' ? { name: a, roles: b ?? {} } : { roles: a }
}
