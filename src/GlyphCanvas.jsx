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

export function GlyphCanvas({ glyphSize = 10, flipRate = 0.01 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let timer

    canvas.width = window.innerWidth
    canvas.height = Math.round(window.innerHeight * 10 / 3)

    ctx.font = `${glyphSize}px "IBM Plex Mono", monospace`
    const cellW = Math.ceil(ctx.measureText('M').width)
    const cols = Math.floor(canvas.width / cellW)
    const rows = Math.floor(canvas.height / glyphSize)
    const total = cols * rows

    // state[i] = glyph string or null (off); undefined = always off (never touched)
    const state = new Array(total)
    const activeIndices = []

    ctx.fillStyle = BG
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.textBaseline = 'top'
    ctx.fillStyle = FG

    for (let i = 0; i < total; i++) {
      if (Math.random() < ALWAYS_OFF_RATE) {
        // leave state[i] undefined — permanently blank, skipped in tick
        continue
      }
      activeIndices.push(i)
      const s = pickState()
      state[i] = s
      if (s) ctx.fillText(s, (i % cols) * cellW, Math.floor(i / cols) * glyphSize)
    }

    const activeCount = activeIndices.length
    const flipsPerTick = Math.max(1, Math.floor(activeCount * flipRate))

    function tick() {
      ctx.font = `${glyphSize}px "IBM Plex Mono", monospace`
      ctx.textBaseline = 'top'

      for (let i = 0; i < flipsPerTick; i++) {
        const idx = activeIndices[Math.floor(Math.random() * activeCount)]
        const next = pickState()
        if (next === state[idx]) continue  // no change, skip draw
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
    return () => clearTimeout(timer)
  }, [glyphSize, flipRate])

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  )
}
