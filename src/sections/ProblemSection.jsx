import { useRef, useEffect } from 'react'
import { Cell } from '../Cell'
import { SpinArrows } from './SpinArrows'
import { GanttChart } from './GanttChart'
import { BarChart } from './BarChart'

const problemCards = [
  {
    title: 'Teams rebuild dev infrastructure.',
    body: 'Frameworks, testing, and assurance are reimplemented every time.',
  },
  {
    title: 'Certification is slow and costly.',
    body: 'Proving systems are safe dominates development time and cost.',
  },
  {
    title: 'Software complexity is exploding.',
    body: 'Modern systems are defined in software, but behave unpredictably.',
  },
]

const B = '1px solid #202020'
const CELL = { background: '#171717', borderRight: B, borderBottom: B, boxSizing: 'border-box' }
const OUTER = { background: 'rgba(23, 23, 23, 0.85)', borderRight: B, borderBottom: B, boxSizing: 'border-box' }

export function ProblemSection() {
  const sectionRef = useRef(null)
  const spinsRef = useRef(null)
  const ganttRef = useRef(null)
  const barRef = useRef(null)
  const fired = useRef(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || fired.current) return
      fired.current = true
      obs.disconnect()
      spinsRef.current?.start(() =>
        ganttRef.current?.start(() =>
          barRef.current?.start()
        )
      )
    }, { threshold: 0.4 })
    obs.observe(section)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={sectionRef} style={{
      height: '100vh',
      display: 'grid',
      gridTemplateColumns: 'clamp(60px, 13.2vw, 280px) 110fr 440fr 440fr 440fr 110fr clamp(60px, 13.2vw, 280px)',
      gridTemplateRows: '190fr 130fr 440fr 210fr',
      gap: 0,
      background: 'transparent',
      position: 'relative',
    }}>

      {/* Outer left: col 1, all rows */}
      <Cell style={{ ...OUTER, gridColumn: 1, gridRow: '1 / 5' }} />

      {/* Heading: cols 2–6, row 1 */}
      <Cell style={{
        ...CELL,
        gridColumn: '2 / 7',
        gridRow: 1,
        display: 'flex',
        alignItems: 'center',
        padding: '0 0 0 calc(var(--grid-head-ht) * 0.18)',
      }}>
        <h2 style={{
          fontFamily: "'Science Gothic', sans-serif",
          fontVariationSettings: '"wdth" 110, "wght" 400',
          fontSize: 'calc(var(--grid-head-ht) * 0.3)',
          lineHeight: 1,
          color: '#AFAFAF',
          margin: 0,
        }}>PROBLEM</h2>
      </Cell>

      {/* Inner left: col 2, rows 2–4 */}
      <Cell style={{ ...CELL, gridColumn: 2, gridRow: '2 / 5' }} />

      {/* Card titles: cols 3–5, row 2 */}
      {problemCards.map((card, i) => (
        <Cell key={`t-${i}`} style={{
          ...CELL,
          gridColumn: i + 3,
          gridRow: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 8%',
        }}>
          <h3 style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 'calc(var(--prob-title-ht) * 0.15)',
            lineHeight: 1.25,
            color: '#AFAFAF',
            margin: 0,
            fontWeight: 300,
          }}>{card.title}</h3>
        </Cell>
      ))}

      {/* Visual squares: cols 3–5, row 3 */}
      {problemCards.map((_, i) => (
        <Cell key={`sq-${i}`} style={{
          ...OUTER,
          gridColumn: i + 3,
          gridRow: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {i === 0 && <SpinArrows ref={spinsRef} />}
          {i === 1 && <GanttChart ref={ganttRef} />}
          {i === 2 && <BarChart ref={barRef} />}
        </Cell>
      ))}

      {/* Body text: cols 3–5, row 4 */}
      {problemCards.map((card, i) => (
        <Cell key={`b-${i}`} style={{
          ...CELL,
          gridColumn: i + 3,
          gridRow: 4,
          padding: 'calc(var(--prob-body-ht) * 0.1) 8% 0',
        }}>
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 'calc(var(--prob-body-ht) * 0.075)',
            lineHeight: 1.5,
            color: '#5a5a5a',
            margin: 0,
            fontWeight: 300,
          }}>{card.body}</p>
        </Cell>
      ))}

      {/* Inner right: col 6, rows 2–4 */}
      <Cell style={{ ...CELL, gridColumn: 6, gridRow: '2 / 5' }} />

      {/* Outer right: col 7, all rows */}
      <Cell style={{ ...OUTER, gridColumn: 7, gridRow: '1 / 5' }} />

    </section>
  )
}
