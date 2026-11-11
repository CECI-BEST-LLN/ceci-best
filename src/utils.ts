/** Resolve a file from /public, taking the deploy base path into account. */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
