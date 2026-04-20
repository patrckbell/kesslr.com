export function Header() {
  return (
    <header className="flex items-center justify-between px-[220px] pt-[35px] max-[1100px]:px-[24px]">
      <img
        src="/Brandmark.png"
        alt="Kronus Brandmark"
        className="h-[17px]"
        style={{ display: 'block' }}
      />

      <a
        href="mailto:info@kronus.io"
        className="font-['Audiowide',sans-serif] text-[16px] tracking-[0.045em] text-[#2b3130]"
      >
        /CONTACT
      </a>
    </header>
  )
}
