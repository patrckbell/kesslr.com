import React from 'react';

const CertificationSpeed: React.FC = () => {
  const scrollToArcturus = () => {
    const arcturusSection = document.getElementById('arcturus-section');
    if (arcturusSection) {
      arcturusSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full h-screen max-w-7xl mx-auto px-12 md:px-24 py-24 relative flex items-center">
      {/* Gradient border */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(to right, transparent 0%, rgba(176, 176, 176, 0.1) 33%, rgba(176, 176, 176, 0.1) 66%, transparent 100%)'
        }}
      ></div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        {/* Left Text Content */}
        <div className="lg:col-span-2">
          <h2 className="text-[55px] md:text-[55px] font-semibold leading-tight mb-2">
            Certification at the<br />Speed of Development
          </h2>
          <p className="text-gray-400 text-[14px] max-w-[75%] leading-relaxed mb-5" style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 100 }}>
            Arcturus unifies hardware, software, and verification into one platform that produces certification-ready artefacts automatically. Teams save months of manual effort, avoid fragmented tooling, and can ship flight-critical systems with confidence.
          </p>
          <button 
            onClick={scrollToArcturus}
            className="border border-cyan-500 text-cyan-500 text-[12px] uppercase tracking-widest px-8 py-4 hover:bg-cyan-500/10 transition-colors font-nippo"
          >
            Discover Arcturus
          </button>
        </div>

        {/* Right SVG Diagram */}
        <div className="flex items-center justify-center lg:pl-12">
          <img 
            src="images/cert_speed.svg" 
            alt="Certification Speed Diagram"
            className="w-full h-auto max-w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default CertificationSpeed;