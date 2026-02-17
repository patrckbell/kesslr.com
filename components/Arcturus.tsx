import React, { useState } from 'react';

const Arcturus: React.FC = () => {
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);

  return (
    <section id="arcturus-section" className="w-full min-h-[50vh] sm:h-[60vh] max-w-7xl mx-auto px-4 sm:px-12 md:px-24 py-16 sm:py-24 relative flex flex-col items-center justify-center">
      {/* Gradient border */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(to right, transparent 0%, rgba(176, 176, 176, 0.1) 33%, rgba(176, 176, 176, 0.1) 66%, transparent 100%)'
        }}
      ></div>
      <div className="text-center mb-6 sm:mb-8 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-wide">ARCTURUS</h2>
        <p className="text-xs sm:text-sm text-gray-400 mt-2">The unified compute platform for safety-critical systems.</p>
        
        <a
          href="/resources/KRONUS_PLATFORM_OVERVIEW.pdf"
          download="KRONUS_PLATFORM_OVERVIEW.pdf"
          className="mt-4 inline-block bg-white/10 border border-white/10 text-white text-[10px] px-6 sm:px-9 py-2 sm:py-3 uppercase tracking-wider hover:bg-white/5 hover:text-gray-500 transition-all"
        >
          View the brief<br />(.pdf)
        </a>
      </div>
    </section>
  );
};

export default Arcturus;