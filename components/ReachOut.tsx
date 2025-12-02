import React from 'react';

interface ReachOutProps {
  setCurrentPage: (page: 'home' | 'contact' | 'investors') => void;
}

const ReachOut: React.FC<ReachOutProps> = ({ setCurrentPage }) => {
  return (
    <section className="w-full max-w-7xl mx-auto px-12 md:px-24 py-12 relative flex flex-col items-center">
      {/* Gradient border */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(to right, transparent 0%, rgba(176, 176, 176, 0.1) 33%, rgba(176, 176, 176, 0.1) 66%, transparent 100%)'
        }}
      ></div>
      <div className="text-center mb-12 w-full">
        <h2 className="text-4xl font-semibold mb-6">Reach Out</h2>
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => {
              setCurrentPage('investors');
              window.scrollTo(0, 0);
            }}
            className="border border-cyan-800 text-cyan-500 text-[12px] uppercase font-nippo px-8 py-4 hover:bg-cyan-900/20 transition-colors"
          >
            For Investors
          </button>
          <button 
            onClick={() => {
              setCurrentPage('contact');
              window.scrollTo(0, 0);
            }}
            className="bg-gray-200 text-black text-[12px] uppercase font-nippo px-8 py-4 hover:bg-white transition-colors"
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReachOut;

