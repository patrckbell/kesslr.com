import { useEffect, useRef, useState } from 'react'

// Wave-based timeline. Each arrow is one SVG path; stroke-dashoffset animates
// from 1 → 0 (pathLength is normalized to 1) so the line "grows" in the
// direction it is written. Start-dots / arrowheads fade in alongside/after
// their shaft. Boxes fade in once their wave arrives.
const SPEED = 300 // SVG user units per second (tune to change overall pace)
const BOX_FADE = 0.25
const MARK_FADE = 0.15

// Per-arrow shaft duration (seconds) = Manhattan path length ÷ SPEED.
// Values in the comments are the Manhattan lengths (height + width summed
// across every segment of each arrow path) so you can sanity-check them
// against the `d` strings below.
const SHAFT_DURATION = {
  a1:  53.74  / SPEED, // ≈ 0.134s
  a2:  227.41 / SPEED, // ≈ 0.569s
  a3:  43.03  / SPEED, // ≈ 0.108s
  a4:  261.02 / SPEED, // ≈ 0.653s
  a5:  152.85 / SPEED, // ≈ 0.382s
  a6:  64.09  / SPEED, // ≈ 0.160s
  a7:  198.75 / SPEED, // ≈ 0.497s
  a8:  50.69  / SPEED, // ≈ 0.127s
  a9:  227.64 / SPEED, // ≈ 0.569s
  a10: 164.23 / SPEED, // ≈ 0.411s
  a11: 168.56 / SPEED, // ≈ 0.421s
  a14: 43.98  / SPEED, // ≈ 0.110s
  a15: 43.98  / SPEED, // ≈ 0.110s
}

// Waves (recomputed from SHAFT_DURATION). A wave starts once the previous
// wave's boxes are fully faded in; a box appears the moment its last
// incoming arrow finishes drawing.
const W1 = 0
const B1 = W1 + Math.min(SHAFT_DURATION.a1, SHAFT_DURATION.a2)
const W2 = B1 + BOX_FADE
const B2 = W2 + Math.min(SHAFT_DURATION.a3, SHAFT_DURATION.a6) // only a3→R2, a6→R5 create boxes
const W3 = B2 + BOX_FADE
const B3 = Math.min(
  W2 + SHAFT_DURATION.a7,  // a7 → R4 (still in flight from wave 2)
  W3 + SHAFT_DURATION.a5,  // a5 → R4
  W3 + SHAFT_DURATION.a8,  // a8 → R4
  W3 + SHAFT_DURATION.a11, // a11 → R7
)
const W4 = B3 + BOX_FADE
const B4 = W4 + SHAFT_DURATION.a9 // a9 → R6 is the only wave-4 arrow that spawns a box
const W5 = B4 + BOX_FADE

const ARROWS = [
  // A1: offscreen → R1 (arrowhead into R1 left)
  {
    id: 'a1',
    d: 'M1.5 30.34 L55.24 30.34',
    shaftStart: W1,
    head: {
      points: '68.7405,30.3429 53.7405,21.6829 53.7405,39.0029',
      delay: W1 + SHAFT_DURATION.a1 - 0.05,
    },
  },
  // A2: offscreen → R3 (arrowhead into R3 left)
  {
    id: 'a2',
    d: 'M1.5 246.22 L228.91 246.22',
    shaftStart: W1,
    head: {
      points: '242.409,246.211 227.398,237.57 227.42,254.89',
      delay: W1 + SHAFT_DURATION.a2 - 0.05,
    },
  },

  // A3: R1 → R2
  {
    id: 'a3',
    d: 'M185.88 30.34 L228.91 30.34',
    shaftStart: W2,
    head: {
      points: '242.409,30.1877 227.396,21.5493 227.421,38.8698',
      delay: W2 + SHAFT_DURATION.a3 - 0.05,
    },
  },
  // A4: R1 bottom → R3 left
  {
    id: 'a4',
    d: 'M124.04 60.68 L124.04 216.74 L229 216.74',
    shaftStart: W2,
    startDot: { cx: 124.0437, cy: 60.6836, delay: W2 - 0.05 },
    head: {
      points: '242.509,216.735 227.509,208.075 227.509,225.395',
      delay: W2 + SHAFT_DURATION.a4 - 0.05,
    },
  },
  // A6: R3 → R5
  {
    id: 'a6',
    d: 'M357.59 231.24 L421.68 231.24',
    shaftStart: W2,
    startDot: { cx: 357.593, cy: 231.235, delay: W2 - 0.05 },
    head: {
      points: '435.175,231.235 420.175,222.575 420.175,239.895',
      delay: W2 + SHAFT_DURATION.a6 - 0.05,
    },
  },
  // A7: R3 top → up → R4 left
  {
    id: 'a7',
    d: 'M302.74 202.75 L302.74 123.18 L421.92 123.18',
    shaftStart: W2,
    startDot: { cx: 302.737, cy: 202.752, delay: W2 - 0.05 },
    head: {
      points: '435.415,123.176 420.415,114.515 420.415,131.836',
      delay: W2 + SHAFT_DURATION.a7 - 0.05,
    },
  },

  // A5: R2 bottom → down → R4 left
  {
    id: 'a5',
    d: 'M301.46 62.41 L301.46 94.13 L421.47 95.25',
    shaftStart: W3,
    startDot: { cx: 301.461, cy: 62.4116, delay: W3 - 0.05 },
    head: {
      points: '434.97,95.3714 419.897,103.892 420.043,86.5726',
      delay: W3 + SHAFT_DURATION.a5 - 0.05,
    },
  },
  // A8: R5 top → up → R4 bottom
  {
    id: 'a8',
    d: 'M492.32 202.75 L492.32 152.06',
    shaftStart: W3,
    startDot: { cx: 492.321, cy: 202.751, delay: W3 - 0.05 },
    head: {
      points: '492.321,138.557 483.661,153.557 500.981,153.557',
      delay: W3 + SHAFT_DURATION.a8 - 0.05,
    },
  },
  // A11: R5 right → trunk → R7 left (lower)
  {
    id: 'a11',
    d: 'M550.27 231.47 L606 231.47 L606 187.26 L674.62 187.26',
    shaftStart: W3,
    startDot: { cx: 550.273, cy: 231.473, delay: W3 - 0.05 },
    head: {
      points: '688.116,187.259 673.116,178.599 673.116,195.919',
      delay: W3 + SHAFT_DURATION.a11 - 0.05,
    },
  },

  // A9: R4 top → up → R6 left
  {
    id: 'a9',
    d: 'M492.19 77.16 L492.19 32.08 L674.63 31.96',
    shaftStart: W4,
    startDot: { cx: 492.188, cy: 77.1576, delay: W4 - 0.05 },
    head: {
      points: '688.116,30.3429 673.04,21.8157 673.193,39.1356',
      delay: W4 + SHAFT_DURATION.a9 - 0.05,
    },
  },
  // A10: R4 right → trunk → R7 left (upper)
  {
    id: 'a10',
    d: 'M550.27 122.24 L606 122.24 L606 162.12 L674.62 162.12',
    shaftStart: W4,
    startDot: { cx: 550.273, cy: 122.238, delay: W4 - 0.05 },
    head: {
      points: '688.116,162.118 673.116,153.457 673.116,170.778',
      delay: W4 + SHAFT_DURATION.a10 - 0.05,
    },
  },

  // A14: R6 → offscreen right
  {
    id: 'a14',
    d: 'M806.02 32.08 L850 32.08',
    shaftStart: W5,
    startDot: { cx: 806.02, cy: 32.0768, delay: W5 - 0.05 },
  },
  // A15: R7 → offscreen right
  {
    id: 'a15',
    d: 'M806.02 170.79 L850 170.79',
    shaftStart: W5,
    startDot: { cx: 806.02, cy: 170.787, delay: W5 - 0.05 },
  },
]

const BOXES = [
  { id: 'r1', x: 68.7405, y: 0, width: 117.548, height: 61.0375, delay: B1 },
  { id: 'r3', x: 242.396, y: 201.123, width: 117.548, height: 61.0375, delay: B1 },
  { id: 'r2', x: 242.396, y: 1.73389, width: 117.548, height: 61.0375, delay: B2 },
  { id: 'r5', x: 435.175, y: 201.123, width: 117.548, height: 61.0375, delay: B2 },
  { id: 'r4', x: 435.175, y: 77.4205, width: 117.548, height: 61.0375, delay: B3 },
  { id: 'r7', x: 688.116, y: 142.178, width: 117.548, height: 61.0375, delay: B3 },
  { id: 'r6', x: 688.116, y: 1.73389, width: 117.548, height: 61.0375, delay: B4 },
]

export function HeroDiagram({ className = '', style = {} }) {
  const svgRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const el = svgRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlaying(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 850 263"
      xmlns="http://www.w3.org/2000/svg"
      className={`hero-diagram ${className} ${playing ? 'is-playing' : ''}`}
      style={style}
      aria-hidden
    >
      <style>{`
        .hero-diagram .shaft {
          stroke: #4c0065;
          stroke-width: 3;
          fill: none;
          stroke-linecap: butt;
          stroke-linejoin: miter;
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
        }
        .hero-diagram .head,
        .hero-diagram .dot,
        .hero-diagram .box { opacity: 0; }

        .hero-diagram.is-playing .shaft {
          /* Fallback duration; each shaft overrides via inline animationDuration. */
          animation: hd-draw 0.5s linear forwards;
          animation-delay: var(--delay, 0s);
        }
        .hero-diagram.is-playing .head,
        .hero-diagram.is-playing .dot {
          animation: hd-fade ${MARK_FADE}s ease-out forwards;
          animation-delay: var(--delay, 0s);
        }
        .hero-diagram.is-playing .box {
          animation: hd-fade ${BOX_FADE}s ease-out forwards;
          animation-delay: var(--delay, 0s);
        }

        @keyframes hd-draw { to { stroke-dashoffset: 0; } }
        @keyframes hd-fade { to { opacity: 1; } }

        @media (prefers-reduced-motion: reduce) {
          .hero-diagram .shaft { stroke-dashoffset: 0; }
          .hero-diagram .head,
          .hero-diagram .dot,
          .hero-diagram .box { opacity: 1; }
          .hero-diagram.is-playing .shaft,
          .hero-diagram.is-playing .head,
          .hero-diagram.is-playing .dot,
          .hero-diagram.is-playing .box { animation: none; }
        }
      `}</style>

      {ARROWS.map((a) => (
        <g key={a.id}>
          <path
            className="shaft"
            d={a.d}
            pathLength="1"
            style={{
              '--delay': `${a.shaftStart}s`,
              animationDuration: `${SHAFT_DURATION[a.id]}s`,
            }}
          />
          {a.startDot && (
            <circle
              className="dot"
              r="8"
              cx={a.startDot.cx}
              cy={a.startDot.cy}
              fill="#4c0065"
              style={{ '--delay': `${Math.max(0, a.startDot.delay)}s` }}
            />
          )}
          {a.endDot && (
            <circle
              className="dot"
              r="8"
              cx={a.endDot.cx}
              cy={a.endDot.cy}
              fill="#4c0065"
              style={{ '--delay': `${a.endDot.delay}s` }}
            />
          )}
          {a.head && (
            <polygon
              className="head"
              points={a.head.points}
              fill="#4c0065"
              style={{ '--delay': `${a.head.delay}s` }}
            />
          )}
        </g>
      ))}

      {BOXES.map((b) => (
        <rect
          key={b.id}
          className="box"
          x={b.x}
          y={b.y}
          width={b.width}
          height={b.height}
          fill="#202020"
          stroke="#4b4b4b"
          strokeWidth="1.5"
          style={{ '--delay': `${b.delay}s` }}
        />
      ))}
    </svg>
  )
}
