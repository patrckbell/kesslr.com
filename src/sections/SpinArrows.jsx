import { useRef, useEffect, useImperativeHandle, forwardRef } from 'react'

export const SpinArrows = forwardRef(function SpinArrows(_, ref) {
  const svgRef = useRef(null)
  const gRef = useRef(null)
  const animRef = useRef(null)

  useImperativeHandle(ref, () => ({
    start(onDone) {
      const el = gRef.current
      const anim = animRef.current
      if (!el || !anim) return

      const t0 = performance.now()
      const FADE_DUR = 750
      const SLOW_DUR = 750
      const eio = p => p < 0.5 ? 4 * p * p * p : (p - 1) * (2 * p - 2) * (2 * p - 2) + 1

      function tick(now) {
        const elapsed = now - t0
        const opP = Math.min(elapsed / FADE_DUR, 1)
        el.style.opacity = eio(opP)
        const rateP = Math.min(elapsed / SLOW_DUR, 1)
        anim.playbackRate = 8 + (1 - 8) * eio(rateP)
        if (elapsed < SLOW_DUR) requestAnimationFrame(tick)
        else {
          el.style.opacity = '1'
          anim.playbackRate = 1
          onDone?.()
        }
      }
      requestAnimationFrame(tick)
    },
  }))

  useEffect(() => {
    const el = gRef.current
    if (!el) return
    el.style.opacity = '0'
    const anim = el.animate(
      [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],
      { duration: 10000, iterations: Infinity, easing: 'linear' },
    )
    anim.playbackRate = 8
    animRef.current = anim
    return () => anim.cancel()
  }, [])

  // Circle r=30, centre (50,50)
  // 40° gaps (20° each side of top/bottom) give room for arrowheads without crowding
  // Arc 1: θ=20° → 160° clockwise  start (60.3,21.8) → end (60.3,78.2)
  // Arc 2: θ=200° → 340° clockwise  start (39.7,78.2) → end (39.7,21.8)
  return (
    <svg ref={svgRef} viewBox="0 0 100 100" style={{ width: '75%', height: 'auto', display: 'block' }}>
      <defs>
        <marker
          id="sa-tip"
          viewBox="0 0 10 10"
          refX="1" refY="5"
          markerWidth="10" markerHeight="10"
          markerUnits="userSpaceOnUse"
          orient="auto"
        >
          <path d="M 0 2.5 L 10 5 L 0 7.5 Z" fill="#4c0065" />
        </marker>
      </defs>
      {/* Safari: CSS transform-origin pixel values on SVG <g> are computed
          in viewport (CSS) coordinates, not SVG user units, which makes the
          element pivot around its top-left edge. transform-box: fill-box
          makes the origin relative to the element's bounding box, and
          'center' then resolves to the geometric centre. */}
      <g
        ref={gRef}
        style={{
          transformBox: 'fill-box',
          transformOrigin: 'center',
          willChange: 'transform',
        }}
      >
        <path
          d="M 60.3 21.8 A 30 30 0 0 1 60.3 78.2"
          stroke="#4c0065"
          strokeWidth="2"
          fill="none"
          markerEnd="url(#sa-tip)"
        />
        <path
          d="M 39.7 78.2 A 30 30 0 0 1 39.7 21.8"
          stroke="#4c0065"
          strokeWidth="2"
          fill="none"
          markerEnd="url(#sa-tip)"
        />
      </g>
    </svg>
  )
})
