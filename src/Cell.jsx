const CLR = 'rgb(55, 55, 55)'
const B = `1px solid ${CLR}`
const C = { position: 'absolute', width: 'clamp(4px, 0.42vw, 9px)', height: 'clamp(4px, 0.42vw, 9px)', pointerEvents: 'none', zIndex: 9999 }

export function Cell({ style, children }) {
  const corners = [
    { bottom: -1, right: -1, borderBottom: B, borderRight: B },
    { bottom: -1, left: -1, borderBottom: B, borderLeft: B },
    { top: -1, right: -1, borderTop: B, borderRight: B },
    { top: -1, left: -1, borderTop: B, borderLeft: B }
  ]

  return (
    <div style={{ position: 'relative', ...style }}>
      {children}
      {corners.map((cornerStyle, i) => (
        <span key={i} style={{ ...C, ...cornerStyle }} />
      ))}
    </div>
  )
}
