const links = [
  ['Whitepaper', 'LinkedIn'],
  ['About', 'YouTube'],
  ['Investors', 'X'],
  ['Demo', ''],
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#005353] pb-0 pt-[50px]">
      <div className="flex justify-between px-[200px] max-[1100px]:flex-col max-[1100px]:gap-[16px] max-[1100px]:px-[24px]">
        <div>
          <div className="font-['Audiowide',sans-serif] text-[32px] leading-none tracking-[0.01em] text-[#e5f0ee]">
            KRONUS
          </div>
          <div className="mt-[5px] font-['IBM_Plex_Sans',sans-serif] text-[16px] tracking-[0.01em] text-[#9ec3c3]">
            info@kronus.io
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-[50px] gap-y-[16px] pt-[2px]">
          <span className="font-['IBM_Plex_Mono',ui-monospace,monospace] text-[18px] text-[#ffffff]">
            /COMPANY
          </span>
          <span className="font-['IBM_Plex_Mono',ui-monospace,monospace] text-[18px] text-[#ffffff]">
            /MEDIA
          </span>
          {links.map(([left, right]) => (
            <div key={left} className="contents">
              <span className="font-['IBM_Plex_Sans',sans-serif] text-[18px] text-[#c2dad8]">
                {left}
              </span>
              <span className="font-['IBM_Plex_Sans',sans-serif] text-[18px] text-[#c2dad8]">
                {right}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="pointer-events-none mt-[200px] flex w-full justify-center px-0 max-[1100px]:px-[24px]">
        <img
          src="/footer.svg"
          alt=""
          className="block h-auto w-[98%] max-w-[98%] object-contain"
          aria-hidden
        />
      </div>
    </footer>
  )
}
