const steps = [
  '1. Intent\nCapture engineering context.',
  '2. Definition\nGenerate a model of the system.',
  '3. Generation\nGenerate software, tests, certification.',
  '4. Execution Model\nFully deterministic execution.',
  '5. Hardware\nExact, repeatable execution.',
]

function Bracket() {
  return (
    <div className="relative h-[34px] w-[9px]">
      <span className="absolute left-0 top-0 h-[1px] w-[7px] bg-[#7f8383]" />
      <span className="absolute left-0 top-[33px] h-[1px] w-[7px] bg-[#7f8383]" />
      <span className="absolute left-0 top-[0px] h-[34px] w-[1px] bg-[#7f8383]" />
    </div>
  )
}

export function Platform() {
  return (
    <section className="px-[280px] pb-[225px] pt-[42px] max-[760px]:px-[24px]">
      <div className="grid grid-cols-[1fr_222px] gap-[15px] max-[760px]:grid-cols-1">
        <div>
          <h2 className="font-['Audiowide',sans-serif] text-[48px] leading-none tracking-[0.01em] text-[#1a2020]">
            KRONUS PLATFORM
          </h2>
          <p className="mt-[100px] max-w-[515px] font-['IBM_Plex_Sans',sans-serif] text-[22px] font-semibold leading-[1.34] tracking-[-0.005em] text-[#232827]">
            From requirements to running systems.
          </p>
          <p className="mt-[10px] max-w-[515px] font-['IBM_Plex_Sans',sans-serif] text-[20px] leading-[1.38] tracking-[-0.005em] text-[#6f7675]">
            Kronus ingests system requirements and engineering context, and
            generates software implementations, tests, and certification
            artifacts from a single source of truth.
          </p>

          <p className="mt-[50px] max-w-[515px] font-['IBM_Plex_Sans',sans-serif] text-[22px] font-semibold leading-[1.34] tracking-[-0.005em] text-[#232827]">
            Compliance is baked in.
          </p>
          <p className="mt-[10px] max-w-[515px] font-['IBM_Plex_Sans',sans-serif] text-[20px] leading-[1.38] tracking-[-0.005em] text-[#6f7675]">
            The platform constrains what can be expressed and generated,
            enforcing certification alignment throughout development.
          </p>

          <p className="mt-[50px] max-w-[515px] font-['IBM_Plex_Sans',sans-serif] text-[22px] font-semibold leading-[1.34] tracking-[-0.005em] text-[#232827]">
            Determinism at the execution layer.
          </p>
          <p className="mt-[10px] max-w-[515px] font-['IBM_Plex_Sans',sans-serif] text-[20px] leading-[1.38] tracking-[-0.005em] text-[#6f7675]">
            Kronus defines a fixed, statically-scheduled execution model.
            Operations are time-bounded and every behavior is known and
            repeatable before deployment.
          </p>
        </div>

        <div className="pt-[7px] max-[760px]:pt-[18px]">
          {steps.map((step) => {
            const [title, sub] = step.split('\n')
            return (
              <div key={title} className="mb-[14px] flex items-start justify-between gap-[9px]">
                <Bracket />
                <div className="w-[180px] pt-[2px] text-right">
                  <div className="font-['IBM_Plex_Mono',ui-monospace,monospace] text-[10px] leading-[1.3] tracking-[0.01em] text-[#1f2524]">
                    {title}
                  </div>
                  <div className="mt-[5px] font-['IBM_Plex_Mono',ui-monospace,monospace] text-[8px] leading-[1.35] tracking-[0.01em] text-[#606766]">
                    {sub}
                  </div>
                </div>
                <Bracket />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
