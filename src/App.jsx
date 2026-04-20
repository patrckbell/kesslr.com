import { useEffect } from 'react'
import { Header } from './sections/Header'
import { Hero } from './sections/Hero'
import { Problem } from './sections/Problem'
import { Platform } from './sections/Platform'
import { ContactStrip } from './sections/ContactStrip'
import { Footer } from './sections/Footer'

// Subtle momentum/softening on wheel-driven scroll. Touch + keyboard
// keep their native behavior.
function useSmoothScroll() {
  useEffect(() => {
    let target = window.scrollY
    let current = window.scrollY
    let rafId = null
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

    const onWheel = (e) => {
      if (e.ctrlKey) return
      e.preventDefault()
      target = clamp(target + e.deltaY)
      if (!running) {
        running = true
        rafId = requestAnimationFrame(loop)
      }
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
    }
  }, [])
}

function ViewportSection({ children, background = '#ffffff' }) {
  return (
    <section className="relative w-full overflow-hidden" style={{ background }}>
      <div className="mx-auto w-full max-w-[1440px]">
        {children}
      </div>
    </section>
  )
}


function ContentSection({ children, background = '#ffffff' }) {
  return (
    <section className="relative w-full overflow-hidden" style={{ background }}>
      <div className="mx-auto min-h-screen w-full max-w-[1440px]">
        {children}
      </div>
    </section>
  )
}

function App() {
  useSmoothScroll()
  return (
    <div className="bg-[#ffffff] text-[#1f2524]">
      {/* Hero is pinned at the top; the footer scrolls up over it via z-index. */}
      <div className="sticky top-0 z-[1]">
        <ContentSection>
          <Header />
          <Hero />
        </ContentSection>
      </div>

      {/* <ContentSection>
        <Problem />
      </ContentSection>

      <ContentSection>
        <Platform />
      </ContentSection> */}

      <div className="relative z-[2] w-full overflow-hidden bg-[#005353]">
        <div className="mx-auto w-full max-w-[1440px]">
          {/* <ContactStrip /> */}
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default App