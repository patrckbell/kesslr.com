import { useEffect, useState } from 'react'
import { HeroDiagram } from './HeroDiagram'
import { Cell } from '../Cell'

const TYPE_PREFIX = '> Build with '
const TYPE_WORDS = ['Speed.', 'Assurance.', 'Determinism.', 'Kronus.']
const TYPE_SPEED_MIN = 45
const TYPE_SPEED_MAX = 95
const BACKSPACE_SPEED_MIN = 28
const BACKSPACE_SPEED_MAX = 55
const PAUSE_AFTER_WORD_MS = 950
const PAUSE_AFTER_CLEAR_MS = 220

const randomBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min

const B = '1px solid #202020'
const CELL = { background: '#171717', borderRight: B, borderBottom: B, boxSizing: 'border-box' }
const OUTER = { background: 'rgba(23, 23, 23, 0.85)', borderRight: B, borderBottom: B, boxSizing: 'border-box' }

function useTypingHeadline() {
  const [headline, setHeadline] = useState(TYPE_PREFIX)
  useEffect(() => {
    let timeoutId
    let wordIndex = 0
    let charIndex = 0
    let isDeleting = false

    const tick = () => {
      const activeWord = TYPE_WORDS[wordIndex]
      const isFinalWord = wordIndex === TYPE_WORDS.length - 1
      const nextCharIndex = isDeleting ? charIndex - 1 : charIndex + 1
      const nextSuffix = activeWord.slice(0, nextCharIndex)
      setHeadline(`${TYPE_PREFIX}${nextSuffix}`)
      charIndex = nextCharIndex

      if (!isDeleting && charIndex === activeWord.length) {
        if (isFinalWord) return
        isDeleting = true
        timeoutId = setTimeout(tick, PAUSE_AFTER_WORD_MS)
        return
      }

      if (isDeleting && charIndex === 0) {
        isDeleting = false
        wordIndex = (wordIndex + 1) % TYPE_WORDS.length
        timeoutId = setTimeout(tick, PAUSE_AFTER_CLEAR_MS)
        return
      }

      timeoutId = setTimeout(
        tick,
        isDeleting
          ? randomBetween(BACKSPACE_SPEED_MIN, BACKSPACE_SPEED_MAX)
          : randomBetween(TYPE_SPEED_MIN, TYPE_SPEED_MAX),
      )
    }

    timeoutId = setTimeout(tick, 500)
    return () => clearTimeout(timeoutId)
  }, [])
  return headline
}

function HeroSectionMobile() {
  const headline = useTypingHeadline()
  return (
    <section style={{
      minHeight: '100vh',
      background: 'rgba(23, 23, 23, 0.92)',
      borderBottom: B,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 24px',
        borderBottom: B,
      }}>
        <img
          src="/Group%2070.svg"
          alt="Kronus"
          style={{ height: '22px', width: 'auto', display: 'block' }}
        />
        <a
          href="mailto:info@kronus.io"
          style={{
            fontFamily: "'Science Gothic', sans-serif",
            fontSize: '13px',
            letterSpacing: '0.08em',
            color: '#AFAFAF',
            textDecoration: 'none',
          }}
        >
          /CONTACT
        </a>
      </div>

      <div style={{
        flex: 1,
        padding: '48px 24px 32px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <h1 style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '20px',
          fontWeight: 400,
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          color: '#AFAFAF',
          margin: 0,
        }}>
          {headline}
          <span className="typing-cursor" style={{ color: '#AFAFAF' }}>|</span>
        </h1>
        <p style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '14px',
          lineHeight: 1.55,
          color: '#828282',
          fontWeight: 300,
          marginTop: '20px',
          marginBottom: 0,
        }}>
          Kronus ingests engineering documentation and automatically generates system software, tests, and certifiable artifacts.
        </p>
      </div>

      <div style={{
        padding: '24px 24px 48px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderTop: B,
      }}>
        <p style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '13px',
          letterSpacing: '0.06em',
          color: '#828282',
          margin: 0,
          fontWeight: 400,
          alignSelf: 'flex-start',
        }}>
          Backed by:
        </p>
        <img
          src="/logos.png"
          alt="Partner logos"
          style={{ marginTop: '20px', width: '85%', maxWidth: '320px', display: 'block' }}
        />
      </div>
    </section>
  )
}

function HeroSectionDesktop() {
  const headline = useTypingHeadline()
  return (
    <section style={{
      height: '100vh',
      display: 'grid',
      gridTemplateColumns: 'clamp(60px, 13.2vw, 280px) 220fr 1100fr 220fr clamp(60px, 13.2vw, 280px)',
      gridTemplateRows: '100fr 240fr 420fr 210fr',
      gap: 0,
      background: 'transparent',
      position: 'relative',
    }}>

      {/* ── Row 1: Header bar ── */}
      <Cell style={CELL} />

      <Cell style={{ ...CELL, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 12%' }}>
        <img
          src="/Group%2070.svg"
          alt="Kronus"
          style={{ height: 'calc(var(--header-ht) * 0.22)', width: 'auto', display: 'block' }}
        />
      </Cell>

      <Cell style={CELL} />

      <Cell style={{ ...CELL, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 12%' }}>
        <a
          href="mailto:info@kronus.io"
          style={{
            fontFamily: "'Science Gothic', sans-serif",
            fontSize: 'calc(var(--header-ht) * 0.15)',
            letterSpacing: '0.08em',
            color: '#AFAFAF',
            textDecoration: 'none',
          }}
        >
          /CONTACT
        </a>
      </Cell>

      <Cell style={CELL} />

      {/* ── Outer left: spans rows 2–4 ── */}
      <Cell style={{ ...OUTER, gridRow: 'span 3' }} />

      {/* ── Row 2: Hero text ── */}
      <Cell style={CELL} />

      <Cell style={{ ...CELL, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '5% 5%' }}>
        <h1 style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 'calc(var(--hero-text-ht) * 0.18)',
          fontWeight: 400,
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          color: '#AFAFAF',
          margin: 0,
        }}>
          {headline}
          <span className="typing-cursor" style={{ color: '#AFAFAF' }}>|</span>
        </h1>
        <p style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 'calc(var(--hero-text-ht) * 0.07)',
          lineHeight: 1.6,
          color: '#828282',
          fontWeight: 300,
          marginTop: 'calc(var(--hero-text-ht) * 0.08)',
          marginBottom: 0,
          marginLeft: '7%',
          marginRight: 0,
        }}>
          Kronus ingests engineering documentation and automatically <br />generates system software, tests, and certifiable artifacts.
        </p>
      </Cell>

      <Cell style={CELL} />

      {/* ── Row 3: Diagram ── */}
      <Cell style={CELL} />

      <Cell style={{ ...OUTER, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0%' }}>
        <HeroDiagram style={{ width: '100%', height: 'auto', display: 'block' }} />
      </Cell>

      <Cell style={CELL} />

      {/* ── Row 4: Backed by ── */}
      <Cell style={CELL} />

      <Cell style={{ ...CELL, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 'calc(var(--hero-backed-ht) * 0.075)',
          letterSpacing: '0.06em',
          color: '#828282',
          margin: 0,
          fontWeight: 400,
        }}>
          Backed by:
        </p>
        <div style={{ marginTop: 'calc(var(--hero-backed-ht) * 0.14)', width: '70%' }}>
          <img
            src="/logos.png"
            alt="Partner logos"
            style={{ width: '100%', display: 'block' }}
          />
        </div>
      </Cell>

      <Cell style={CELL} />

      {/* ── Outer right: col 5, rows 2–4 ── */}
      <Cell style={{ ...OUTER, gridColumn: 5, gridRow: '2 / 5' }} />

    </section>
  )
}

export function HeroSection({ isMobile = false }) {
  return isMobile ? <HeroSectionMobile /> : <HeroSectionDesktop />
}
