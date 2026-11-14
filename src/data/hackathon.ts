// Latest hackathon (2026: Game Jam, 24h edition).
// Photos: every image in src/assets/hackathon/2026/ (sorted by file name).

export const jamPhotos: string[] = Object.entries(
  import.meta.glob<string>('../assets/hackathon/2026/*.{webp,jpg,png}', { eager: true, import: 'default' }),
)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, url]) => url)
