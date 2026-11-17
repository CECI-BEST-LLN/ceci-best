// Tomato-throwing easter egg. Plain DOM + Web Animations + Web Audio: no React state needed.
// The tomato is thrown "from the camera": huge and blurry at first, it shrinks and sharpens
// as it flies into the screen, then splats with a silly sound.
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

const targets = new Set(tomatoTargets.map(slugify))
export const isTomatoTarget = (slug: string) => targets.has(slug)

/* ---------------------------------------------------------------- sound */

let audio: AudioContext | undefined

function noise(ctx: AudioContext, seconds: number) {
  const buffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
  const src = ctx.createBufferSource()
  src.buffer = buffer
  return src
}

/** Short "whoosh" when the tomato is thrown. */
function playWhoosh(ctx: AudioContext, duration: number) {
  const t = ctx.currentTime
  const src = noise(ctx, duration)
  const band = ctx.createBiquadFilter()
  band.type = 'bandpass'
  band.Q.value = 1.2
  band.frequency.setValueAtTime(400, t)
  band.frequency.exponentialRampToValueAtTime(2500, t + duration)
  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0.0001, t)
  gain.gain.exponentialRampToValueAtTime(0.25, t + duration * 0.6)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + duration)
  src.connect(band).connect(gain).connect(ctx.destination)
  src.start(t)
}

/** Wet "SPLOTCH" + a dumb descending "bwoooop". */
function playSplat(ctx: AudioContext) {
  const t = ctx.currentTime

  // squelch: low-passed noise burst
  const src = noise(ctx, 0.35)
  const low = ctx.createBiquadFilter()
  low.type = 'lowpass'
  low.frequency.setValueAtTime(1800, t)
  low.frequency.exponentialRampToValueAtTime(200, t + 0.3)
  const g1 = ctx.createGain()
  g1.gain.setValueAtTime(0.9, t)
  g1.gain.exponentialRampToValueAtTime(0.0001, t + 0.32)
  src.connect(low).connect(g1).connect(ctx.destination)
  src.start(t)

  // thump
  const thump = ctx.createOscillator()
  thump.frequency.setValueAtTime(140, t)
  thump.frequency.exponentialRampToValueAtTime(45, t + 0.15)
  const g2 = ctx.createGain()
  g2.gain.setValueAtTime(0.7, t)
  g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.18)
  thump.connect(g2).connect(ctx.destination)
  thump.start(t)
  thump.stop(t + 0.2)

  // the silly part: a wobbly sliding "bwoooop"
  const slide = ctx.createOscillator()
  slide.type = 'square'
  slide.frequency.setValueAtTime(620, t + 0.08)
  slide.frequency.exponentialRampToValueAtTime(110, t + 0.7)
  const wobble = ctx.createOscillator()
  wobble.frequency.value = 14
  const wobbleDepth = ctx.createGain()
  wobbleDepth.gain.value = 25
  wobble.connect(wobbleDepth).connect(slide.frequency)
  const soft = ctx.createBiquadFilter()
  soft.type = 'lowpass'
  soft.frequency.value = 1400
  const g3 = ctx.createGain()
  g3.gain.setValueAtTime(0.0001, t + 0.08)
  g3.gain.exponentialRampToValueAtTime(0.12, t + 0.12)
  g3.gain.exponentialRampToValueAtTime(0.0001, t + 0.72)
  slide.connect(soft).connect(g3).connect(ctx.destination)
  slide.start(t + 0.08)
  wobble.start(t + 0.08)
  slide.stop(t + 0.75)
  wobble.stop(t + 0.75)
}

function sound(): AudioContext | undefined {
  try {
    audio ??= new AudioContext()
    if (audio.state === 'suspended') void audio.resume()
    return audio
  } catch {
    return undefined // no Web Audio: silent tomatoes
  }
}

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

const FLIGHT_MS = 480

/** Throw a tomato at the clicked point, as if thrown by the person behind the screen. */
export function throwTomato(e: ReactMouseEvent) {
  const x = e.pageX
  const y = e.pageY
  const ctx = sound()
  if (ctx) playWhoosh(ctx, FLIGHT_MS / 1000)

  // Start near the viewer: lower-centre of the screen, slightly random.
  const fromX = window.scrollX + window.innerWidth * (0.5 + (Math.random() - 0.5) * 0.4)
  const fromY = window.scrollY + window.innerHeight * 0.85
  const dx = fromX - x
  const dy = fromY - y

  const tomato = sprite(TOMATO, 70, x, y)
  const spin = (Math.random() > 0.5 ? 1 : -1) * (200 + Math.random() * 160)
  tomato.animate(
    [
      { transform: `translate(${dx}px, ${dy}px) scale(9) rotate(0deg)`, filter: 'blur(14px)', opacity: 0.9 },
      { transform: `translate(${dx * 0.35}px, ${dy * 0.35 - 40}px) scale(2.6) rotate(${spin * 0.6}deg)`, filter: 'blur(5px)', opacity: 1, offset: 0.45 },
      { transform: `translate(0, 0) scale(1) rotate(${spin}deg)`, filter: 'blur(0px)', opacity: 1 },
    ],
    // ease-out: fast near the camera, slowing down as it gets "far"
    { duration: FLIGHT_MS, easing: 'cubic-bezier(0.2, 0.7, 0.4, 1)' },
  ).onfinish = () => {
    tomato.remove()
    if (ctx) playSplat(ctx)
    const splat = sprite(SPLAT, 130, x, y)
    const rot = Math.round(Math.random() * 360)
    splat.animate(
      [
        { transform: `rotate(${rot}deg) scale(0.3)` },
        { transform: `rotate(${rot}deg) scale(1.2)`, offset: 0.12 },
        { transform: `rotate(${rot}deg) scale(1)`, offset: 0.22 },
        { transform: `rotate(${rot}deg) scale(1) translateY(8px)`, opacity: 1, offset: 0.8 },
        { transform: `rotate(${rot}deg) scale(1) translateY(18px)`, opacity: 0 },
      ],
      { duration: 3400, easing: 'ease-out' },
    ).onfinish = () => splat.remove()
  }
}
