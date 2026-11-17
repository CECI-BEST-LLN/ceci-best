// Tomato-throwing easter egg. Plain DOM + Web Animations + Web Audio: no React state needed.
// The tomato is thrown "from the camera": huge and blurry at first, it shrinks and sharpens
// as it flies into the screen, then splats (with the splat sound).
import type { MouseEvent as ReactMouseEvent } from 'react'
import { slugify } from '../data/boards/index.ts'
import { tomatoTargets } from '../data/tomatoes.ts'

const files = import.meta.glob<string>('../assets/easter/*.{png,webp}', { eager: true, import: 'default' })
const file = (base: string) => Object.entries(files).find(([k]) => new RegExp(`/${base}\\.(png|webp)$`).test(k))?.[1]

const svg = (body: string) => `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${body}</svg>`)}`

// Fallback drawings, used if the images are missing.
const TOMATO =
  file('tomato') ??
  svg('<circle cx="50" cy="56" r="38" fill="#e53935"/><path d="M50 22l-14 2 10 6-8 10 12-6 12 6-8-10 10-6z" fill="#43a047"/>')
const SPLAT = file('tomato-splat') ?? svg('<circle cx="50" cy="50" r="40" fill="#d32f2f"/>')

// Impact sound: src/assets/easter/splat.(mp3|ogg|wav). No file = silent.
const sounds = import.meta.glob<string>('../assets/easter/*.{mp3,ogg,wav}', { eager: true, import: 'default', query: '?url' })
const SPLAT_SOUND = Object.entries(sounds).find(([k]) => /\/splat\.(mp3|ogg|wav)$/.test(k))?.[1]

const targets = new Set(tomatoTargets.map(slugify))
export const isTomatoTarget = (slug: string) => targets.has(slug)

/* ------------------------------------------------------------- visuals */

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
    objectFit: 'contain',
    pointerEvents: 'none',
    zIndex: '90',
    willChange: 'transform, filter',
  })
  document.body.appendChild(img)
  return img
}

const FLIGHT_MS = 320
const START_SCALE = 9 // size near the camera
const STEPS = 10

/** Throw a tomato at the clicked point, as if thrown by the person behind the screen. */
export function throwTomato(e: ReactMouseEvent) {
  const x = e.pageX
  const y = e.pageY

  // Start near the viewer: lower-centre of the screen, slightly random.
  const fromX = window.scrollX + window.innerWidth * (0.5 + (Math.random() - 0.5) * 0.4)
  const fromY = window.scrollY + window.innerHeight * 0.85
  const dx = fromX - x
  const dy = fromY - y

  const tomato = sprite(TOMATO, 70, x, y)
  const spin = (Math.random() > 0.5 ? 1 : -1) * (200 + Math.random() * 160)
  // Constant speed away from the camera: apparent size = 1 / distance, so it shrinks fast at
  // first and less later — real perspective, no artificial easing.
  const frames = Array.from({ length: STEPS + 1 }, (_, i) => {
    const t = i / STEPS
    const scale = START_SCALE / (1 + (START_SCALE - 1) * t)
    const k = (scale - 1) / (START_SCALE - 1) // 1 at the camera → 0 on the photo
    return {
      offset: t,
      transform: `translate(${dx * k}px, ${dy * k}px) scale(${scale}) rotate(${spin * t}deg)`,
      filter: `blur(${(14 * k).toFixed(1)}px)`,
    }
  })
  tomato.animate(frames, { duration: FLIGHT_MS, easing: 'linear' }).onfinish = () => {
    tomato.remove()
    if (SPLAT_SOUND) {
      const a = new Audio(SPLAT_SOUND)
      a.volume = 0.8
      void a.play().catch(() => {})
    }

    // Cartoon impact: one hard squash, then it just sticks there, dead still, and vanishes.
    const splat = sprite(SPLAT, 130, x, y)
    const rot = Math.round(Math.random() * 360)
    splat.style.transform = `rotate(${rot}deg)`
    splat.animate(
      [
        { transform: `rotate(${rot}deg) scale(1.6, 0.45)` },
        { transform: `rotate(${rot}deg) scale(0.9, 1.15)`, offset: 0.5 },
        { transform: `rotate(${rot}deg) scale(1, 1)` },
      ],
      { duration: 140, easing: 'steps(3, end)' },
    )
    setTimeout(() => {
      splat.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 250, fill: 'forwards' }).onfinish = () => splat.remove()
    }, 4000)
  }
}
