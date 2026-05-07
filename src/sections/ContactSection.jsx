import { Cell } from '../Cell'

const CELL = { background: '#171717' }
const OUTER = { background: 'rgba(23, 23, 23, 0.85)' }
const BORDER = { position: 'absolute', bottom: -1, left: 0, right: 0, height: '1px', background: '#202020', zIndex: 9989, pointerEvents: 'none' }
const GAP_BG = 'linear-gradient(to right, transparent clamp(60px, 13.2vw, 280px), #202020 clamp(60px, 13.2vw, 280px), #202020 calc(100% - clamp(60px, 13.2vw, 280px)), transparent calc(100% - clamp(60px, 13.2vw, 280px)))'

export function ContactSection() {
  return (
    <section style={{
      height: '25vh',
      display: 'grid',
      gridTemplateColumns: 'clamp(60px, 13.2vw, 280px) 1fr clamp(60px, 13.2vw, 280px)',
      gap: '1px',
      background: GAP_BG,
      position: 'relative',
    }}>

      {/* Outer left margin */}
      <Cell style={OUTER} />

      {/* Center content */}
      <Cell style={{
        ...CELL,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 5%',
      }}>
        <div>
          <h2 style={{
            fontFamily: "'Science Gothic', sans-serif",
            fontVariationSettings: '"wdth" 110, "wght" 400',
            fontSize: 'calc(var(--contact-ht) * 0.15)',
            lineHeight: 1.05,
            color: '#AFAFAF',
            margin: 0,
          }}>WORK WITH KRONUS</h2>
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 'calc(var(--contact-ht) * 0.05)',
            lineHeight: 1.5,
            color: '#5a5a5a',
            marginTop: '1%',
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
          }}>
            We&apos;re working with a select few design partners
          </p>
        </div>
        <a
          href="mailto:info@kronus.io"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            width: 'calc(var(--contact-ht) * 0.7)',
            height: 'calc(var(--contact-ht) * 0.2)',
            border: '1px solid #3a3a3a',
            background: 'transparent',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 'calc(var(--contact-ht) * 0.05)',
            letterSpacing: '0.06em',
            color: '#c2c2c2',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          REACH OUT
        </a>
      </Cell>

      {/* Outer right margin */}
      <Cell style={OUTER} />

      {/* Bottom border */}
      <div style={BORDER} />

    </section>
  )
}
