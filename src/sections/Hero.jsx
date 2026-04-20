import { useEffect, useState } from 'react'
import { HeroDiagram } from './HeroDiagram'

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

export function Hero() {
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
        if (isFinalWord) {
          return
        }
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

  return (
    <section className="px-[clamp(24px,10vw,280px)] pt-[clamp(40px,6vh,72px)]">
      <h1 className="font-['IBM_Plex_Mono',ui-monospace,monospace] text-[clamp(30px,4vw,48px)] leading-[1.12] tracking-[-0.025em] text-[#222827]">
        {headline}
        <span className="typing-cursor">|</span>
      </h1>
      <p className="mt-[16px] max-w-[800px] px-[clamp(0px,3vw,60px)] font-['IBM_Plex_Mono',ui-monospace,monospace] text-[clamp(16px,1.5vw,18px)] leading-[1.45] tracking-[0.01em] text-[#8b9090]">
        Kronus ingests engineering documentation and automatically generates
        system software, tests, and certifiable artifacts.
      </p>

      <div className="mt-[clamp(48px,9vh,100px)] flex w-full justify-center">
        <HeroDiagram className="block h-auto w-full max-w-[1000px]" />
      </div>
      <p className="mt-[clamp(48px,8vh,90px)] text-center font-['IBM_Plex_Sans',sans-serif] text-[clamp(14px,1.2vw,16px)] tracking-[0.01em] text-black/40">
        Backed by:
      </p>
      <div className="mt-[20px] flex w-full justify-center">
        <img
          src="/logos.png"
          alt="Partner logos"
          className="block h-auto w-[min(620px,80%)] opacity-[40%] object-contain"
        />
      </div>
    </section>
  )
}
