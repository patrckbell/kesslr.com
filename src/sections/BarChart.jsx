import { useRef, useImperativeHandle, forwardRef } from 'react'

const BOTTOM = 80
const BAR_W = 17
const AX1 = 0
const AX2 = 100

const BARS = [
  { x: 1,  h: 10, color: '#4d4d4d' },
  { x: 22, h: 16, color: '#4d4d4d' },
  { x: 42, h: 28, color: '#4d4d4d' },
  { x: 62, h: 42, color: '#4d4d4d' },
  { x: 82, h: 70, color: '#4c0065' },
]

function animEase(from, to, dur, onUpdate, onDone) {
  const t0 = performance.now()
  function step(now) {
    const p = Math.min((now - t0) / dur, 1)
    const e = p < 0.5 ? 4 * p * p * p : (p - 1) * (2 * p - 2) * (2 * p - 2) + 1
    onUpdate(from + (to - from) * e)
    if (p < 1) requestAnimationFrame(step)
    else onDone?.()
  }
  requestAnimationFrame(step)
}

function animEaseOut(from, to, dur, onUpdate, onDone) {
  const t0 = performance.now()
  function step(now) {
    const p = Math.min((now - t0) / dur, 1)
    const e = 1 - Math.pow(1 - p, 3)
    onUpdate(from + (to - from) * e)
    if (p < 1) requestAnimationFrame(step)
    else onDone?.()
  }
  requestAnimationFrame(step)
}

export const BarChart = forwardRef(function BarChart(_, ref) {
  const svgRef = useRef(null)

  useImperativeHandle(ref, () => ({
    start(onDone) {
      const svg = svgRef.current
      if (!svg) return

      const axis = svg.querySelector('[data-axis]')
      const barEls = BARS.map((_, i) => svg.querySelector(`[data-bar="${i}"]`))

      animEase(AX1, AX2, 60, v => axis.setAttribute('x2', v), () => {
        let i = 0
        const next = () => {
          if (i >= BARS.length) { onDone?.(); return }
          const el = barEls[i]
          const h = BARS[i].h
          animEaseOut(0, h, 288, v => {
            el.setAttribute('height', v)
            el.setAttribute('y', BOTTOM - v)
          }, () => { i++; next() })
        }
        next()
      })
    },
  }))

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 80"
      style={{ width: '85%', height: 'auto', display: 'block' }}
    >
      {BARS.map((bar, i) => (
        <rect
          key={i}
          data-bar={i}
          x={bar.x} y={BOTTOM}
          width={BAR_W} height={0}
          fill={bar.color}
        />
      ))}
      <line
        data-axis="1"
        x1={AX1} y1={BOTTOM}
        x2={AX1} y2={BOTTOM}
        stroke="#727272" strokeWidth="1"
      />
    </svg>
  )
})
