
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPage: 'home' | 'contact' | 'investors' | 'privacy' | 'careers';
  setCurrentPage: (page: 'home' | 'contact' | 'investors' | 'privacy' | 'careers') => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (page: 'home' | 'contact' | 'investors' | 'privacy' | 'careers') => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className="w-full fixed top-0 z-50"
      style={{
        background: 'linear-gradient(to bottom,rgb(11, 11, 11) 0%, rgba(0, 0, 0, 0) 100%)'
      }}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-12 md:px-24 h-20 flex justify-between items-center">
        {/* Left Section - Logo and Nav Links */}
        <div className="flex items-center gap-4 sm:gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <img src="/images/logo.png" alt="Kronos Space" className="w-6 h-6 sm:w-8 sm:h-8 object-contain" />
            <span className="font-regular tracking-[0.2em] text-xs sm:text-sm text-white font-nippo">KRONOS SPACE</span>
          </div>
          
          {/* Nav Links as Separate Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {/* HOME Button */}
            <div className="relative">
              {/* Corner brackets for HOME button - top-left, bottom-left, bottom-right */}
              <div className="absolute -top-[1px] -left-[1px] w-1.5 h-1.5 border-t border-l border-white z-10"></div>
              <div className="absolute -top-[1px] -right-[1px] w-1.5 h-1.5 border-t border-r border-white z-10"></div>
              <div className="absolute -bottom-[1px] -left-[1px] w-1.5 h-1.5 border-b border-l border-white z-10"></div>
              <div className="absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 border-b border-r border-white z-10"></div>
              
              <button
                onClick={() => handleNavClick('home')}
                className={`relative text-[12px] font-regular tracking-widest px-6 py-3 font-nippo transition-all duration-200 flex-shrink-0 border-t border-r border-l border-b border-[#2E2E2E] ${
                  currentPage === 'home'
                    ? 'text-[#00B7FF] bg-[#0a2a2f] hover:text-[#4DD0FF] hover:bg-[#0D353B]'
                    : 'text-gray-400 bg-black/40 hover:text-white hover:bg-black/60'
                }`}
                style={{ width: '150px' }}
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
                onClick={() => handleNavClick('investors')}
                className={`relative text-[12px] font-regular tracking-widest px-6 py-3 font-nippo transition-all duration-200 flex-shrink-0 border-t border-l border-r border-b border-[#2E2E2E] ${
                  currentPage === 'investors'
                    ? 'text-[#00B7FF] bg-[#0a2a2f] hover:text-[#4DD0FF] hover:bg-[#0D353B]'
                    : 'text-gray-400 bg-black/40 hover:text-white hover:bg-black/60'
                }`}
                style={{ width: '150px' }}
              >
                / INVEST
              </button>
            </div>
            
            {/* CAREERS Button */}
            <div className="relative">
              {/* Corner brackets for CAREERS button */}
              <div className="absolute -top-[1px] -left-[1px] w-1.5 h-1.5 border-t border-l border-white z-10"></div>
              <div className="absolute -top-[1px] -right-[1px] w-1.5 h-1.5 border-t border-r border-white z-10"></div>
              <div className="absolute -bottom-[1px] -left-[1px] w-1.5 h-1.5 border-b border-l border-white z-10"></div>
              <div className="absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 border-b border-r border-white z-10"></div>
              
              <button
                onClick={() => handleNavClick('careers')}
                className={`relative text-[12px] font-regular tracking-widest px-6 py-3 font-nippo transition-all duration-200 flex-shrink-0 border-t border-l border-r border-b border-[#2E2E2E] ${
                  currentPage === 'careers'
                    ? 'text-[#00B7FF] bg-[#0a2a2f] hover:text-[#4DD0FF] hover:bg-[#0D353B]'
                    : 'text-gray-400 bg-black/40 hover:text-white hover:bg-black/60'
                }`}
                style={{ width: '150px' }}
              >
                / CAREERS
              </button>
            </div>
          </div>
        </div>

        {/* Right Section - Contact Button and Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Contact Button - Desktop */}
          <button 
            onClick={() => handleNavClick('contact')}
            className="hidden md:block relative bg-white text-black text-[12px] font-bold px-8 py-3 uppercase tracking-wide font-nippo overflow-hidden group"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Contact Us</span>
            <span 
              className="absolute inset-0 bg-black transition-transform duration-300 ease-in-out transform -translate-x-full group-hover:translate-x-0"
            ></span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-t border-[#2E2E2E]">
          <div className="px-4 py-4 space-y-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-4 py-3 text-sm font-nippo border border-[#2E2E2E] ${
                currentPage === 'home'
                  ? 'text-[#00B7FF] bg-[#0a2a2f]'
                  : 'text-gray-400 bg-black/40'
              }`}
            >
              / HOME
            </button>
            <button
              onClick={() => handleNavClick('investors')}
              className={`w-full text-left px-4 py-3 text-sm font-nippo border border-[#2E2E2E] ${
                currentPage === 'investors'
                  ? 'text-[#00B7FF] bg-[#0a2a2f]'
                  : 'text-gray-400 bg-black/40'
              }`}
            >
              / INVEST
            </button>
            <button
              onClick={() => handleNavClick('careers')}
              className={`w-full text-left px-4 py-3 text-sm font-nippo border border-[#2E2E2E] ${
                currentPage === 'careers'
                  ? 'text-[#00B7FF] bg-[#0a2a2f]'
                  : 'text-gray-400 bg-black/40'
              }`}
            >
              / CAREERS
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full text-left px-4 py-3 text-sm font-nippo bg-white text-black font-bold"
            >
              Contact Us
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
