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

function useReveal(refs) {
  const sectionRef = useRef(null)
  const fired = useRef(false)
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || fired.current) return
      fired.current = true
      obs.disconnect()
      refs.spinsRef.current?.start(() =>
        refs.ganttRef.current?.start(() =>
          refs.barRef.current?.start()
        )
      )
    }, { threshold: 0.4 })
    obs.observe(section)
    return () => obs.disconnect()
  }, [refs])
  return sectionRef
}

function ProblemSectionMobile() {
  const spinsRef = useRef(null)
  const ganttRef = useRef(null)
  const barRef = useRef(null)
  const sectionRef = useReveal({ spinsRef, ganttRef, barRef })

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'rgba(23, 23, 23, 0.92)',
        borderTop: B,
        borderBottom: B,
        position: 'relative',
        padding: '48px 0',
      }}
    >
      <div style={{ padding: '0 24px 32px', borderBottom: B }}>
        <h2 style={{
          fontFamily: "'Science Gothic', sans-serif",
          fontVariationSettings: '"wdth" 110, "wght" 400',
          fontSize: '40px',
          lineHeight: 1,
          color: '#AFAFAF',
          margin: 0,
        }}>PROBLEM</h2>
      </div>

      {problemCards.map((card, i) => (
        <article
          key={i}
          style={{
            borderBottom: i === problemCards.length - 1 ? 'none' : B,
            padding: '32px 24px',
          }}
        >
          <h3 style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '18px',
            lineHeight: 1.3,
            color: '#AFAFAF',
            margin: 0,
            fontWeight: 300,
          }}>{card.title}</h3>
          <div style={{
            background: 'rgba(23, 23, 23, 0.6)',
            border: B,
            marginTop: '24px',
            padding: '24px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            aspectRatio: '1 / 1',
            maxHeight: '280px',
          }}>
            {i === 0 && <SpinArrows ref={spinsRef} />}
            {i === 1 && <GanttChart ref={ganttRef} />}
            {i === 2 && <BarChart ref={barRef} />}
          </div>
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '14px',
            lineHeight: 1.5,
            color: '#828282',
            margin: '20px 0 0',
            fontWeight: 300,
          }}>{card.body}</p>
        </article>
      ))}
    </section>
  )
}

function ProblemSectionDesktop() {
  const spinsRef = useRef(null)
  const ganttRef = useRef(null)
  const barRef = useRef(null)
  const sectionRef = useReveal({ spinsRef, ganttRef, barRef })

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

      <Cell style={{ ...OUTER, gridColumn: 1, gridRow: '1 / 5' }} />

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

      <Cell style={{ ...CELL, gridColumn: 2, gridRow: '2 / 5' }} />

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

      <Cell style={{ ...CELL, gridColumn: 6, gridRow: '2 / 5' }} />
      <Cell style={{ ...OUTER, gridColumn: 7, gridRow: '1 / 5' }} />

    </section>
  )
}

export function ProblemSection({ isMobile = false }) {
  return isMobile ? <ProblemSectionMobile /> : <ProblemSectionDesktop />
}
