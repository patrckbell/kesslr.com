import { useEffect, useRef } from 'react'

const GLYPHS = ['△', '▽', '○', '◌', '0', '1']
const BG = '#141414'
const FG = '#454545'

// ~1/3 of cells are permanently off (never animated, never drawn)
const ALWAYS_OFF_RATE = 0.40
// at any moment ~2/3 of active cells show a glyph, ~1/3 are in off state
const ON_PROBABILITY = 0.70

function pickState() {
  return Math.random() < ON_PROBABILITY
    ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
    : null
}

// glyphSize tuned so density / per-cell footprint feels consistent across
// viewports: ~10 CSS px on 1440-wide desktops, smaller on phones so they read
// as a *background pattern* rather than legible text crowding the layout.
function chooseGlyphSize(width) {
  if (width <= 600) return 7
  if (width <= 900) return 8
  return 10
}

export function GlyphCanvas({ flipRate = 0.01, isMobile = false }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    let timer
    let cleanup = () => {}

    const init = () => {
      cleanup()

      const cssW = wrap.clientWidth
      const cssH = wrap.clientHeight
      if (cssW === 0 || cssH === 0) return

      const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2))
      const glyphSize = chooseGlyphSize(window.innerWidth)

      // Match drawing buffer to (CSS px * DPR) so glyphs render crisply on
      // high-density displays. ctx.scale lets us continue drawing in CSS px.
      canvas.width = Math.floor(cssW * dpr)
      canvas.height = Math.floor(cssH * dpr)
      canvas.style.width = `${cssW}px`
      canvas.style.height = `${cssH}px`
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)

      ctx.font = `${glyphSize}px "IBM Plex Mono", monospace`
      const cellW = Math.ceil(ctx.measureText('M').width)
      const cols = Math.floor(cssW / cellW)
      const rows = Math.floor(cssH / glyphSize)
      const total = cols * rows

      const state = new Array(total)
      const activeIndices = []

      ctx.fillStyle = BG
      ctx.fillRect(0, 0, cssW, cssH)
      ctx.textBaseline = 'top'
      ctx.fillStyle = FG

      for (let i = 0; i < total; i++) {
        if (Math.random() < ALWAYS_OFF_RATE) continue
        activeIndices.push(i)
        const s = pickState()
        state[i] = s
        if (s) ctx.fillText(s, (i % cols) * cellW, Math.floor(i / cols) * glyphSize)
      }

      const activeCount = activeIndices.length
      if (activeCount === 0) return
      const flipsPerTick = Math.max(1, Math.floor(activeCount * flipRate))

      const tick = () => {
        ctx.font = `${glyphSize}px "IBM Plex Mono", monospace`
        ctx.textBaseline = 'top'
        for (let i = 0; i < flipsPerTick; i++) {
          const idx = activeIndices[Math.floor(Math.random() * activeCount)]
          const next = pickState()
          if (next === state[idx]) continue
          const c = idx % cols
          const r = Math.floor(idx / cols)
          ctx.fillStyle = BG
          ctx.fillRect(c * cellW, r * glyphSize, cellW, glyphSize)
          if (next) {
            ctx.fillStyle = FG
            ctx.fillText(next, c * cellW, r * glyphSize)
          }
          state[idx] = next
        }
        timer = setTimeout(tick, 5)
      }
      timer = setTimeout(tick, 5)
      cleanup = () => clearTimeout(timer)
    }

    init()

    // Re-render only on coarse layout changes; ignore tiny rounding deltas
    // and the iOS URL bar growing/shrinking during scroll.
    let lastW = wrap.clientWidth
    let lastH = wrap.clientHeight
    const ro = new ResizeObserver(() => {
      const w = wrap.clientWidth
      const h = wrap.clientHeight
      if (Math.abs(w - lastW) < 4 && Math.abs(h - lastH) < 80) return
      lastW = w
      lastH = h
      init()
    })
    ro.observe(wrap)

    return () => {
      ro.disconnect()
      cleanup()
    }
  }, [flipRate, isMobile])

  return (
    <div ref={wrapRef} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </div>
  )
}
