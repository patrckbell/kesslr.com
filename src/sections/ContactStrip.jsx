export function ContactStrip() {
  return (
    <section className="flex items-center justify-between bg-[#e4e4e4] px-[280px] py-[80px] max-[760px]:flex-col max-[760px]:items-start max-[760px]:gap-[16px] max-[760px]:px-[24px]">
      <div>
        <h2 className="font-['Audiowide',sans-serif] text-[48px] leading-none tracking-[0.01em] text-[#1a2020]">
          WORK WITH KRONUS
        </h2>
        <p className="mt-[8px] font-['IBM_Plex_Sans',sans-serif] text-[24px] leading-[1.35] tracking-[-0.005em] text-[#6f7675]">
          We&apos;re working with a select few design partners
        </p>
      </div>
      <button
        type="button"
        className="h-[75px] w-[300px] rounded-[0px] border border-[#a1a5a4] bg-[#efefef] font-['IBM_Plex_Mono',ui-monospace,monospace] text-[20px] leading-none tracking-[0.01em] text-[#2b3130]"
      >
        REACH OUT
      </button>
    </section>
  )
}
