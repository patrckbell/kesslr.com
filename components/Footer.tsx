
import React from 'react';

interface FooterProps {
  setCurrentPage: (page: 'home' | 'contact' | 'investors' | 'privacy') => void;
}

const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  return (
    <footer className="w-full max-w-7xl mx-auto px-4 sm:px-12 md:px-24 pb-8 sm:pb-12 pt-0 flex flex-col items-center relative border-t border-white/10">
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-end text-[10px] text-gray-600 pt-6 gap-4 sm:gap-0">
        <div className="flex flex-col gap-2">
             <div className="flex flex-wrap items-center gap-2 mb-1">
                <img src="/images/logo.png" alt="Kronos Space" className="w-4 h-4 object-contain opacity-50" />
                <span className="font-bold tracking-widest text-gray-500">KRONOS SPACE</span>
                <div className="flex items-center gap-3 ml-0 sm:ml-4">
                  <a href="https://x.com/kesslrlabs" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-500">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"/>
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/company/kesslr-labs" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-500">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor"/>
                    </svg>
                  </a>
                </div>
            </div>
            <p>© 2025 Kesslr Labs Pty Ltd. All rights reserved. | ABN: 690 342 969</p>
        </div>
        <div>
            <button 
              onClick={() => {
                setCurrentPage('privacy');
                window.scrollTo(0, 0);
              }}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
