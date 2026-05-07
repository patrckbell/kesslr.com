import { useRef, useImperativeHandle, forwardRef } from 'react'

const AX_Y = 77
const AX_X1 = 0
const AX_X2 = 95
const BAR_H = 6

const ROWS = [
  { y: 12, gx1: 3,  gx2: 36, px2: 46 },
  { y: 26, gx1: 15, gx2: 53, px2: 63 },
  { y: 40, gx1: 28, gx2: 66, px2: 76 },
  { y: 54, gx1: 40, gx2: 79, px2: 89 },
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

export const GanttChart = forwardRef(function GanttChart(_, ref) {
  const svgRef = useRef(null)

  useImperativeHandle(ref, () => ({
    start(onDone) {
      const svg = svgRef.current
      if (!svg) return

      const axis = svg.querySelector('[data-axis]')
      const rowEls = ROWS.map((_, i) => ({
        gray: svg.querySelector(`[data-gray="${i}"]`),
        purple: svg.querySelector(`[data-purple="${i}"]`),
        purpleR: svg.querySelector(`[data-purple-r="${i}"]`),
      }))

      animEase(AX_X1, AX_X2, 60, v => axis.setAttribute('x2', v), () => {
        let i = 0
        const nextRow = () => {
          if (i >= ROWS.length) { onDone?.(); return }
          const { gray, purple, purpleR } = rowEls[i]
          const row = ROWS[i]
          animEaseOut(0, row.gx2 - row.gx1, 250, v => gray.setAttribute('width', v), () => {
            const lx = row.gx2
            const ry = row.y
            animEaseOut(0, row.px2 - row.gx2, 110, v => {
              purple.setAttribute('d',
                `M ${lx},${ry + 0.5} L ${lx + v},${ry + 0.5} M ${lx},${ry + BAR_H - 0.5} L ${lx + v},${ry + BAR_H - 0.5}`)
            }, () => {
              purpleR.setAttribute('opacity', '1')
              i++
              nextRow()
            })
          })
        }
        nextRow()
      })
    },
  }))

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 80"
      style={{ width: '90%', height: 'auto', display: 'block' }}
    >
      <defs>
        <marker
          id="gc-arw"
          viewBox="0 0 10 10"
          refX="0" refY="5"
          markerWidth="7" markerHeight="4"
          markerUnits="userSpaceOnUse"
          orient="auto"
        >
          <path d="M 0 2 L 8 5 L 0 8 Z" fill="#727272" />
        </marker>
      </defs>

      {ROWS.map((row, i) => (
        <g key={i}>
          <rect
            data-gray={i}
            x={row.gx1} y={row.y}
            width={0} height={BAR_H}
            fill="#4d4d4d"
          />
          <path
            data-purple={i}
            d=""
            fill="none"
            stroke="#4c0065"
            strokeWidth="1"
            strokeDasharray="1.5 1.5"
          />
          <line
            data-purple-r={i}
            x1={row.px2 - 0.5} y1={row.y + 2}
            x2={row.px2 - 0.5} y2={row.y + BAR_H - 2}
            stroke="#4c0065"
            strokeWidth="1"
            opacity="0"
          />
        </g>
      ))}

      <line
        data-axis="1"
        x1={AX_X1} y1={AX_Y}
        x2={AX_X1} y2={AX_Y}
        stroke="#727272" strokeWidth="0.8"
        markerEnd="url(#gc-arw)"
      />
    </svg>
  )
})
