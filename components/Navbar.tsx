
import React from 'react';

interface NavbarProps {
  currentPage: 'home' | 'contact' | 'investors' | 'privacy';
  setCurrentPage: (page: 'home' | 'contact' | 'investors' | 'privacy') => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage }) => {

  return (
    <nav 
      className="w-full fixed top-0 z-50"
      style={{
        background: 'linear-gradient(to bottom,rgb(11, 11, 11) 0%, rgba(0, 0, 0, 0) 100%)'
      }}
    >
      <div className="max-w-8xl mx-auto px-12 md:px-24 h-20 flex justify-between items-center">
        {/* Left Section - Logo and Nav Links */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src="/images/logo.png" alt="Kesslr Labs" className="w-8 h-8 object-contain" />
            <span className="font-regular tracking-[0.2em] text-sm text-white font-nippo">KESSLR LABS</span>
          </div>
          
          {/* Nav Links as Separate Buttons */}
          <div className="hidden md:flex items-center gap-2">
            {/* HOME Button */}
            <div className="relative">
              {/* Corner brackets for HOME button - top-left, bottom-left, bottom-right */}
              <div className="absolute -top-[1px] -left-[1px] w-1.5 h-1.5 border-t border-l border-white z-10"></div>
              <div className="absolute -top-[1px] -right-[1px] w-1.5 h-1.5 border-t border-r border-white z-10"></div>
              <div className="absolute -bottom-[1px] -left-[1px] w-1.5 h-1.5 border-b border-l border-white z-10"></div>
              <div className="absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 border-b border-r border-white z-10"></div>
              
              <button
                onClick={() => {
                  setCurrentPage('home');
                  window.scrollTo(0, 0);
                }}
                className={`relative text-[12px] font-regular tracking-widest px-6 py-3 font-nippo transition-all duration-200 flex-shrink-0 border-t border-r border-l border-b border-[#2E2E2E] ${
                  currentPage === 'home'
                    ? 'text-[#00B7FF] bg-[#0a2a2f] hover:text-[#4DD0FF] hover:bg-[#0D353B]'
                    : 'text-gray-400 bg-black/40 hover:text-white hover:bg-black/60'
                }`}
                style={{ width: '136px' }}
              >
                / HOME
              </button>
            </div>
            
            {/* INVESTORS Button */}
            <div className="relative">
              {/* Corner brackets for INVESTORS button - top-right, bottom-right */}
              <div className="absolute -top-[1px] -left-[1px] w-1.5 h-1.5 border-t border-l border-white z-10"></div>
              <div className="absolute -top-[1px] -right-[1px] w-1.5 h-1.5 border-t border-r border-white z-10"></div>
              <div className="absolute -bottom-[1px] -left-[1px] w-1.5 h-1.5 border-b border-l border-white z-10"></div>
              <div className="absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 border-b border-r border-white z-10"></div>
              
              <button
                onClick={() => {
                  setCurrentPage('investors');
                  window.scrollTo(0, 0);
                }}
                className={`relative text-[12px] font-regular tracking-widest px-6 py-3 font-nippo transition-all duration-200 flex-shrink-0 border-t border-l border-r border-b border-[#2E2E2E] ${
                  currentPage === 'investors'
                    ? 'text-[#00B7FF] bg-[#0a2a2f] hover:text-[#4DD0FF] hover:bg-[#0D353B]'
                    : 'text-gray-400 bg-black/40 hover:text-white hover:bg-black/60'
                }`}
                style={{ width: '136px' }}
              >
                / INVESTORS
              </button>
            </div>
          </div>
        </div>

        {/* Right Button */}
        <button 
          onClick={() => {
            setCurrentPage('contact');
            window.scrollTo(0, 0);
          }}
          className="relative bg-white text-black text-[12px] font-bold px-8 py-3 uppercase tracking-wide font-nippo overflow-hidden group"
        >
          <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Contact Us</span>
          <span 
            className="absolute inset-0 bg-black transition-transform duration-300 ease-in-out transform -translate-x-full group-hover:translate-x-0"
          ></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
