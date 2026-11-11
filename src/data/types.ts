// Shared content types.

/** An external link (form, drive file, social event…). */
export interface ExternalLink {
  label: string
  href: string
  /** Optional short description shown under the label */
  description?: string
}

/** A person to contact about a specific activity. */
export interface Contact {
  name: string
  role: string
  email: string
  /** Path inside /public, e.g. "images/board/lena-aroud.webp" */
  photo?: string
}
