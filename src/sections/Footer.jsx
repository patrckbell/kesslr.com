const companyLinks = ['Demo', 'Docs', 'Whitepaper']
const mediaLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/kronus-corp' },
  { label: 'X', href: 'https://x.com/kronuscorp' },
]

function FooterMobile() {
  return (
    <footer style={{
      background: '#121212',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      paddingTop: '40px',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        padding: '0 24px',
      }}>
        <div>
          <img
            src="/Group%2070.svg"
            alt="Kronus"
            style={{ height: '24px', width: 'auto', display: 'block' }}
          />
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '13px',
            letterSpacing: '0.04em',
            color: '#AFAFAF',
            marginTop: '10px',
          }}>
            info@kronus.io
          </div>
        </div>

        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          <div>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '12px',
              letterSpacing: '0.06em',
              color: '#AFAFAF',
              marginBottom: '12px',
            }}>
              /COMPANY
            </div>
            {companyLinks.map((link) => (
              <div key={link} style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '13px',
                color: '#666666',
                marginBottom: '8px',
                lineHeight: 1.4,
              }}>
                {link}{' '}
                <span style={{ color: '#5a5a5a', fontSize: '11px' }}>
                  (coming soon)
                </span>
              </div>
            ))}
          </div>

          <div>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '12px',
              letterSpacing: '0.06em',
              color: '#AFAFAF',
              marginBottom: '12px',
            }}>
              /MEDIA
            </div>
            {mediaLinks.map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{
                display: 'block',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '13px',
                color: '#d3d3d3',
                marginBottom: '8px',
                textDecoration: 'none',
              }}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        marginTop: '32px',
        display: 'flex',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <img
          src="/KRONUS.svg"
          alt=""
          style={{
            width: '100vw',
            height: 'auto',
            display: 'block',
            opacity: 0.65,
          }}
        />
      </div>
    </footer>
  )
}

function FooterDesktop() {
  return (
    <footer style={{
      height: 'var(--footer-ht)',
      background: '#121212',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '3% clamp(60px, 13.2vw, 280px) 0',
        flexShrink: 0,
      }}>
        <div>
          <img
            src="/Group%2070.svg"
            alt="Kronus"
            style={{
              height: 'calc(var(--footer-content-ht) * 0.04)',
              width: 'auto',
              display: 'block',
            }}
          />
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 'calc(var(--footer-content-ht) * 0.02)',
            letterSpacing: '0.04em',
            color: '#AFAFAF',
            marginTop: 'calc(var(--footer-content-ht) * 0.01)',
          }}>
            info@kronus.io
          </div>
        </div>

        <div style={{ display: 'flex', gap: 'calc(var(--footer-content-ht) * 0.08)' }}>
          <div>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 'calc(var(--footer-content-ht) * 0.022)',
              letterSpacing: '0.06em',
              color: '#AFAFAF',
              marginBottom: 'calc(var(--footer-content-ht) * 0.025)',
            }}>
              /COMPANY
            </div>
            {companyLinks.map((link) => (
              <div key={link} style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 'calc(var(--footer-content-ht) * 0.022)',
                color: '#666666',
                marginBottom: 'calc(var(--footer-content-ht) * 0.018)',
              }}>
                {link}
                <span style={{
                  color: '#666666',
                  marginLeft: 'calc(var(--footer-content-ht) * 0.012)',
                  fontSize: 'calc(var(--footer-content-ht) * 0.016)',
                }}>
                  <br />(coming soon)
                </span>
              </div>
            ))}
          </div>

          <div>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 'calc(var(--footer-content-ht) * 0.022)',
              letterSpacing: '0.06em',
              color: '#AFAFAF',
              marginBottom: 'calc(var(--footer-content-ht) * 0.025)',
            }}>
              /MEDIA
            </div>
            {mediaLinks.map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{
                display: 'block',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 'calc(var(--footer-content-ht) * 0.022)',
                color: '#d3d3d3',
                marginBottom: 'calc(var(--footer-content-ht) * 0.018)',
                textDecoration: 'none',
              }}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        overflow: 'visible',
      }}>
        <img
          src="/KRONUS.svg"
          alt=""
          style={{
            width: '98vw',
            height: 'auto',
            display: 'block',
            opacity: 0.65,
          }}
        />
      </div>
    </footer>
  )
}

export function Footer({ isMobile = false }) {
  return isMobile ? <FooterMobile /> : <FooterDesktop />
}
