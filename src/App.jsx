import { useEffect, useLayoutEffect, useState } from 'react'
import { GlyphCanvas } from './GlyphCanvas'
import { HeroSection } from './sections/HeroSection'
import { ProblemSection } from './sections/ProblemSection'
import { PlatformSection } from './sections/PlatformSection'
import { ContactSection } from './sections/ContactSection'
import { Footer } from './sections/Footer'

const MOBILE_BREAKPOINT_PX = 900

function useIsMobile() {
  const get = () =>
    typeof window !== 'undefined' &&
    window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT_PX}px)`).matches
  const [isMobile, setIsMobile] = useState(get)
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT_PX}px)`)
    const onChange = () => setIsMobile(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])
  return isMobile
}

function useSectionHeight(isMobile) {
  useLayoutEffect(() => {
    const update = () => {
      const h = window.innerHeight
      const w = window.innerWidth

      if (isMobile) {
        // Mobile uses an entirely different layout; the desktop CSS vars are
        // not consumed. We still expose a few that Footer/Contact use so that
        // the fixed footer height behaves sensibly.
        document.documentElement.style.setProperty('--section-ht', `${h}px`)
        document.documentElement.style.setProperty('--footer-ht', `${h * 0.75}px`)
        document.documentElement.style.setProperty('--footer-content-ht', `${h * 0.75}px`)
        document.documentElement.style.setProperty('--contact-ht', `${h * 0.18}px`)
        return
      }

      // Scale all content sizes with viewport width (reference: 1440px).
      const sScale = Math.min(1.2, Math.max(0.4, w / 1440))
      const eff = h * sScale
      document.documentElement.style.setProperty('--section-ht', `${h}px`)
      document.documentElement.style.setProperty('--header-ht',      `${eff * 100 / 970}px`)
      document.documentElement.style.setProperty('--hero-text-ht',   `${eff * 240 / 970}px`)
      document.documentElement.style.setProperty('--hero-diagram-ht',`${eff * 420 / 970}px`)
      document.documentElement.style.setProperty('--hero-backed-ht', `${eff * 210 / 970}px`)
      document.documentElement.style.setProperty('--hero-ht',        `${eff * 870 / 970}px`)
      document.documentElement.style.setProperty('--grid-head-ht',   `${eff * 190 / 970}px`)
      document.documentElement.style.setProperty('--prob-title-ht',  `${eff * 130 / 970}px`)
      document.documentElement.style.setProperty('--prob-sq-ht',     `${eff * 440 / 970}px`)
      document.documentElement.style.setProperty('--prob-body-ht',   `${eff * 210 / 970}px`)
      document.documentElement.style.setProperty('--plat-row-ht',    `${eff * 260 / 970}px`)
      document.documentElement.style.setProperty('--contact-ht',        `${eff * 0.25}px`)
      document.documentElement.style.setProperty('--footer-ht',          `${h * 0.75}px`)
      document.documentElement.style.setProperty('--footer-content-ht',  `${eff * 0.75}px`)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [isMobile])
}

function useSmoothScroll(enabled) {
  useEffect(() => {
    if (!enabled) return
    let target = window.scrollY
    let current = window.scrollY
    let rafId = null
    let snapTimer = null
    let running = false
    const ease = 0.18

    const getMax = () =>
      document.documentElement.scrollHeight - window.innerHeight
    const clamp = (v) => Math.max(0, Math.min(v, getMax()))

    const loop = () => {
      const diff = target - current
      if (Math.abs(diff) < 0.4) {
        current = target
        window.scrollTo(0, current)
        running = false
        return
      }
      current += diff * ease
      window.scrollTo(0, current)
      rafId = requestAnimationFrame(loop)
    }

    const snapIfNear = () => {
      const vh = window.innerHeight
      const nearest = Math.round(target / vh) * vh
      if (Math.abs(target - nearest) < vh * 0.2) {
        target = clamp(nearest)
        if (!running) {
          running = true
          rafId = requestAnimationFrame(loop)
        }
      }
    }

    const onWheel = (e) => {
      if (e.ctrlKey) return
      e.preventDefault()
      target = clamp(target + e.deltaY)
      if (!running) {
        running = true
        rafId = requestAnimationFrame(loop)
      }
      clearTimeout(snapTimer)
      snapTimer = setTimeout(snapIfNear, 250)
    }

    const onScroll = () => {
      if (!running) {
        target = window.scrollY
        current = window.scrollY
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
      clearTimeout(snapTimer)
    }
  }, [enabled])
}

function FixedFooter({ isMobile }) {
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: isMobile ? 'auto' : '75vh',
      maxHeight: isMobile ? '85vh' : undefined,
      overflow: 'hidden',
    }}>
      <Footer isMobile={isMobile} />
    </div>
  )
}

function App() {
  const isMobile = useIsMobile()
  useSectionHeight(isMobile)
  // Wheel-driven smoothing/snap is desktop-only; mobile uses native touch scroll.
  useSmoothScroll(!isMobile)
  return (
    <div style={{ backgroundColor: '#171717' }}>
      {/* Footer is first in DOM: later position:relative sections paint over it; static spacer does not */}
      <FixedFooter isMobile={isMobile} />
      {/* Content wrapper — BG canvas sits here, above the footer but under the sections */}
      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          zIndex: 0,
        }}>
          <GlyphCanvas isMobile={isMobile} />
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <HeroSection isMobile={isMobile} />
          <ProblemSection isMobile={isMobile} />
          <PlatformSection isMobile={isMobile} />
          <ContactSection isMobile={isMobile} />
        </div>
      </div>
      {/* Static spacer reveals the fixed footer on scroll */}
      <div style={{ height: isMobile ? 'var(--mobile-footer-spacer, 60vh)' : '75vh' }} />
    </div>
  )
}

export default App
