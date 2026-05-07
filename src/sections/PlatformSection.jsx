import { Cell } from '../Cell'

const textBlocks = [
  {
    heading: 'From requirements to running systems.',
    body: 'Kronus ingests system requirements and engineering context, and generates software implementations, tests, and certification artefacts from a single source of truth.',
  },
  {
    heading: 'Compliance is baked in.',
    body: 'The platform constrains what can be expressed and generated, enforcing certification alignment throughout development.',
  },
  {
    heading: 'Determinism at the execution layer.',
    body: 'Kronus defines a fixed, statically scheduled execution model enforced at the hardware level. Operations are time-bounded, and every behaviour is known and repeatable before deployment.',
  },
]

const steps = [
  { label: '1. Intent', sub: 'Capture engineering context.' },
  { label: '2. Definition', sub: 'Generate a model of the system.' },
  { label: '3. Generation', sub: 'Generate software, tests, certification.' },
  { label: '4. Execution Model', sub: 'Fully deterministic execution.' },
  { label: '5. Hardware', sub: 'Exact, repeatable execution.' },
]

const B = '1px solid #202020'
const CELL = { background: '#171717', borderRight: B, borderBottom: B, boxSizing: 'border-box' }
const OUTER = { background: 'rgba(23, 23, 23, 0.85)', borderRight: B, borderBottom: B, boxSizing: 'border-box' }

function PlatformSectionMobile() {
  return (
    <section style={{
      background: 'rgba(23, 23, 23, 0.92)',
      borderBottom: B,
      position: 'relative',
      padding: '48px 0',
    }}>
      <div style={{ padding: '0 24px 32px', borderBottom: B }}>
        <h2 style={{
          fontFamily: "'Science Gothic', sans-serif",
          fontVariationSettings: '"wdth" 110, "wght" 400',
          fontSize: '36px',
          lineHeight: 1,
          color: '#AFAFAF',
          margin: 0,
        }}>KRONUS<br />PLATFORM</h2>
      </div>

      {textBlocks.map((block, i) => (
        <div
          key={`tb-${i}`}
          style={{
            padding: '32px 24px',
            borderBottom: B,
          }}
        >
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '17px',
            fontWeight: 300,
            lineHeight: 1.35,
            color: '#AFAFAF',
            margin: 0,
          }}>{block.heading}</p>
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '14px',
            lineHeight: 1.55,
            color: '#828282',
            fontWeight: 300,
            margin: '14px 0 0',
          }}>{block.body}</p>
        </div>
      ))}

      <div style={{ padding: '32px 24px 0' }}>
        {steps.map((step, i) => (
          <div
            key={step.label}
            style={{
              padding: '14px 0',
              borderBottom: i === steps.length - 1 ? 'none' : '1px solid #1d1d1d',
            }}
          >
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '15px',
              lineHeight: 1.3,
              color: '#c2c2c2',
            }}>{step.label}</div>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '13px',
              lineHeight: 1.4,
              color: '#5a5a5a',
              marginTop: '4px',
            }}>{step.sub}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function PlatformSectionDesktop() {
  return (
    <section style={{
      height: '100vh',
      display: 'grid',
      gridTemplateColumns: 'clamp(60px, 13.2vw, 280px) 110fr 660fr 660fr 110fr clamp(60px, 13.2vw, 280px)',
      gridTemplateRows: '190fr 260fr 260fr 260fr',
      gap: 0,
      background: 'transparent',
      position: 'relative',
    }}>

      <Cell style={{ ...OUTER, gridColumn: 1, gridRow: '1 / 5' }} />

      <Cell style={{
        ...CELL,
        gridColumn: '2 / 6',
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
        }}>KRONUS PLATFORM</h2>
      </Cell>

      <Cell style={{ ...OUTER, gridColumn: 6, gridRow: '1 / 5' }} />

      <Cell style={{ ...CELL, gridColumn: 2, gridRow: 2 }} />
      <Cell style={{ ...CELL, gridColumn: 2, gridRow: 3 }} />
      <Cell style={{ ...CELL, gridColumn: 2, gridRow: 4 }} />

      {textBlocks.map((block, i) => (
        <Cell key={`tb-${i}`} style={{
          ...CELL,
          gridColumn: 3,
          gridRow: i + 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 8%',
        }}>
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 'calc(var(--plat-row-ht) * 0.075)',
            fontWeight: 300,
            lineHeight: 1.4,
            color: '#AFAFAF',
            margin: 0,
          }}>{block.heading}</p>
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 'calc(var(--plat-row-ht) * 0.06)',
            lineHeight: 1.55,
            color: '#5a5a5a',
            fontWeight: 300,
            marginTop: 'calc(var(--plat-row-ht) * 0.05)',
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
          }}>{block.body}</p>
        </Cell>
      ))}

      <Cell style={{
        ...CELL,
        gridColumn: 4,
        gridRow: '2 / 5',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        padding: '5% 8%',
      }}>
        {steps.map((step) => (
          <div key={step.label}>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 'calc(var(--plat-row-ht) * 0.07)',
              lineHeight: 1.3,
              color: '#c2c2c2',
            }}>{step.label}</div>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 'calc(var(--plat-row-ht) * 0.06)',
              lineHeight: 1.4,
              color: '#4b4b4b',
              marginTop: 'calc(var(--plat-row-ht) * 0.02)',
            }}>{step.sub}</div>
          </div>
        ))}
      </Cell>

      <Cell style={{ ...CELL, gridColumn: 5, gridRow: '2 / 5' }} />

    </section>
  )
}

export function PlatformSection({ isMobile = false }) {
  return isMobile ? <PlatformSectionMobile /> : <PlatformSectionDesktop />
}
