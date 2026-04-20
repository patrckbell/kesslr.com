const problemCards = [
  {
    title: 'Software complexity is exploding.',
    body: 'Modern systems are defined in software, but behave unpredictably.',
    line: 'horizontal',
  },
  {
    title: 'Certification is slow and costly.',
    body: 'Proving systems are safe dominates development time and cost.',
    line: 'horizontalArrow',
  },
  {
    title: 'Teams rebuild dev infrastructure.',
    body: 'Deployment, testing, and assurance are fragmented every time.',
    line: 'cornerArrow',
  },
]

function DiagramLine({ type }) {
  if (type === 'cornerArrow') {
    return (
      <div className="absolute bottom-[18px] left-[11px] h-[53px] w-[72px] border-l-[1.5px] border-t-[1.5px] border-[#8f9494]">
        <div className="absolute right-[-1px] top-[-1px] h-0 w-0 border-b-[4px] border-l-[4px] border-b-transparent border-l-[#8f9494]" />
      </div>
    )
  }

  return (
    <div className="absolute bottom-[18px] left-[11px] h-[1.5px] w-[72px] bg-[#8f9494]">
      {type === 'horizontalArrow' && (
        <div className="absolute right-[-1px] top-[-2px] h-0 w-0 border-b-[4px] border-l-[4px] border-b-transparent border-l-[#8f9494]" />
      )}
    </div>
  )
}

export function Problem() {
  return (
    <section className="px-[280px] pb-[160px] pt-[100px] max-[760px]:px-[24px]">
      <h2 className="font-['Audiowide',sans-serif] text-[48px] leading-none tracking-[0.01em] text-[#1a2020]">
        PROBLEM
      </h2>
      <div className="mt-[200px] grid grid-cols-3 gap-[8px] max-[760px]:gap-[18px]">
        {problemCards.map((card) => (
          <article key={card.title}>
            <div className="relative h-[350px] bg-[#dfdfdf]">
              <DiagramLine type={card.line} />
            </div>
            <h3 className="mt-[20px] font-['IBM_Plex_Sans',sans-serif] text-[20px] font-semibold leading-[1.4] tracking-[-0.005em] text-[#1f2625]">
              {card.title}
            </h3>
            <p className="mt-[6px] font-['IBM_Plex_Sans',sans-serif] text-[20px] leading-[1.35] tracking-[-0.005em] text-[#747a79]">
              {card.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
