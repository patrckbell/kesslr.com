import React from 'react';

interface ReachOutProps {
  setCurrentPage: (page: 'home' | 'contact') => void;
}

const ReachOut: React.FC<ReachOutProps> = ({ setCurrentPage }) => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-12 md:px-24 py-8 sm:py-12 relative flex flex-col items-center">
      {/* Gradient border */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(to right, transparent 0%, rgba(176, 176, 176, 0.1) 33%, rgba(176, 176, 176, 0.1) 66%, transparent 100%)'
        }}
      ></div>
      <div className="text-center mb-8 sm:mb-12 w-full">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-6">Learn More</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
          <a
            href="/resources/KRONUS_ONE_PAGER.pdf"
            download="KRONUS_ONE_PAGER.pdf"
            className="w-full sm:w-auto border border-cyan-800 text-cyan-500 text-[12px] uppercase font-nippo px-6 sm:px-8 py-3 sm:py-4 hover:bg-cyan-900/20 transition-colors text-center inline-block"
          >
            ONE PAGER
          </a>
          <button 
            onClick={() => {
              setCurrentPage('contact');
              window.scrollTo(0, 0);
            }}
            className="w-full sm:w-auto bg-gray-200 text-black text-[12px] uppercase font-nippo px-6 sm:px-8 py-3 sm:py-4 hover:bg-white transition-colors"
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReachOut;

