// Tomato-throwing easter egg. Plain DOM + Web Animations: no React state needed.
import type { MouseEvent as ReactMouseEvent } from 'react'
import { slugify } from '../data/boards/index.ts'
import { tomatoTargets } from '../data/tomatoes.ts'

const files = import.meta.glob<string>('../assets/easter/*.png', { eager: true, import: 'default' })
const file = (name: string) => Object.entries(files).find(([k]) => k.endsWith(`/${name}`))?.[1]

const svg = (body: string) => `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${body}</svg>`)}`

// Fallback drawings, used until the PNGs are added.
const TOMATO =
  file('tomato.png') ??
  svg('<circle cx="50" cy="56" r="38" fill="#e53935"/><ellipse cx="36" cy="44" rx="10" ry="6" fill="#ff8a80" opacity=".7"/><path d="M50 22l6-10M50 22l-14 2 10 6-8 10 12-6 12 6-8-10 10-6z" stroke="#2e7d32" stroke-width="4" fill="#43a047" stroke-linejoin="round"/>')
const SPLAT =
  file('tomato-splat.png') ??
  svg('<path d="M50 18c6 10 14 2 18 12s16 4 12 16 10 14-2 18 2 16-12 14-10 12-18 4-16 6-14-6-14-4-12-16-10-10 0-16-6-14 6-14 0-16 14-8 8-16 14 2 18-10z" fill="#d32f2f"/><circle cx="18" cy="20" r="5" fill="#d32f2f"/><circle cx="86" cy="82" r="6" fill="#d32f2f"/><circle cx="84" cy="16" r="4" fill="#d32f2f"/><circle cx="50" cy="52" r="10" fill="#ffcdd2" opacity=".5"/>')

const targets = new Set(tomatoTargets.map(slugify))

export const isTomatoTarget = (slug: string) => targets.has(slug)

function sprite(src: string, size: number, x: number, y: number) {
  const img = document.createElement('img')
  img.src = src
  img.alt = ''
  img.setAttribute('aria-hidden', 'true')
  Object.assign(img.style, {
    position: 'absolute',
    left: `${x - size / 2}px`,
    top: `${y - size / 2}px`,
    width: `${size}px`,
    height: `${size}px`,
    pointerEvents: 'none',
    zIndex: '90',
  })
  document.body.appendChild(img)
  return img
}

/** Throw a tomato at the clicked point. */
export function throwTomato(e: ReactMouseEvent) {
  const x = e.pageX
  const y = e.pageY
  const fromX = x + (Math.random() - 0.5) * 500
  const fromY = window.scrollY + window.innerHeight + 80

  const tomato = sprite(TOMATO, 56, fromX, fromY)
  const dx = x - fromX
  const dy = y - fromY
  const flight = tomato.animate(
    [
      { transform: 'translate(0, 0) rotate(0deg) scale(1.2)' },
      { transform: `translate(${dx * 0.5}px, ${dy * 0.5 - 120}px) rotate(260deg) scale(1)` },
      { transform: `translate(${dx}px, ${dy}px) rotate(540deg) scale(0.9)` },
    ],
    { duration: 520, easing: 'ease-in' },
  )

  flight.onfinish = () => {
    tomato.remove()
    const splat = sprite(SPLAT, 110, x, y)
    const rot = Math.round(Math.random() * 360)
    splat.animate(
      [
        { transform: `rotate(${rot}deg) scale(0.3)` },
        { transform: `rotate(${rot}deg) scale(1.15)`, offset: 0.25 },
        { transform: `rotate(${rot}deg) scale(1)`, offset: 0.4 },
        { transform: `rotate(${rot}deg) scale(1) translateY(6px)`, opacity: 1, offset: 0.8 },
        { transform: `rotate(${rot}deg) scale(1) translateY(14px)`, opacity: 0 },
      ],
      { duration: 3200, easing: 'ease-out' },
    ).onfinish = () => splat.remove()
  }
}
