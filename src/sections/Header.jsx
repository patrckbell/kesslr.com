export function Header() {
  return (
    <header className="flex items-center justify-between px-[clamp(24px,8vw,220px)] pt-[clamp(24px,3vw,35px)]">
      <img
        src="/Brandmark.png"
        alt="Kronus Brandmark"
        className="h-[17px]"
        style={{ display: 'block' }}
      />

      <a
        href="mailto:info@kronus.io"
        className="font-['Audiowide',sans-serif] text-[clamp(14px,1.2vw,16px)] tracking-[0.045em] text-[#2b3130]"
      >
        /CONTACT
      </a>
    </header>
  )
}
