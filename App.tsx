import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CertificationSpeed from './components/CertificationSpeed';
import CertificationSucks from './components/CertificationSucks';
import WhyNow from './components/WhyNow';
import Arcturus from './components/Arcturus';
import ReachOut from './components/ReachOut';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Investors from './components/Investors';
import Privacy from './components/Privacy';

const App: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentPage, setCurrentPage] = useState<'home' | 'contact' | 'investors' | 'privacy'>('home');
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload critical images before showing content
  useEffect(() => {
    const preloadImages = async () => {
      const imageUrls = [
        '/images/asteroids.png',
        '/images/asteroid_hero.png'
      ];

      const loadPromises = imageUrls.map((url) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve; // Resolve even on error to not block the page
          img.src = url;
        });
      });

      await Promise.all(loadPromises);
      
      // Small additional delay to ensure everything is ready
      setTimeout(() => {
        setIsLoaded(true);
      }, 100);
    };

    preloadImages();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show loading state until images are loaded
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-cyan-500 selection:text-black relative">
      {/* Parallax asteroids background */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/images/asteroids.png)',
          backgroundSize: '100% auto',
          backgroundRepeat: 'repeat-y',
          backgroundPosition: `center ${scrollY * -0.1}px`,
          zIndex: 0,
          willChange: 'background-position',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)'
        }}
      ></div>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex flex-col items-center w-full relative z-10 min-h-screen">
        {currentPage === 'home' ? (
          <>
            <Hero key="home-hero" scrollY={scrollY} />
            <CertificationSpeed />
            <CertificationSucks />
            <WhyNow />
            <Arcturus />
            <ReachOut setCurrentPage={setCurrentPage} />
          </>
        ) : currentPage === 'contact' ? (
          <Contact />
        ) : currentPage === 'investors' ? (
          <Investors key="investors-page" scrollY={scrollY} />
        ) : (
          <Privacy />
        )}
        <Footer setCurrentPage={setCurrentPage} />
        {/* Gradient overlay spanning the whole page - hidden on investors page */}
        {currentPage == 'home' && (
          <div 
            className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.66) 0%, rgba(16,16,16,0.66) 33%, rgba(18,18,18,0.66) 50%, rgba(24,24,24,0.66) 60%, rgba(18,18,18,0.66) 72%, rgba(16,16,16,0.66) 82.5%, rgba(0,0,0,0.66) 100%)',
              zIndex: -100
            }}
          ></div>
        )}
        {/* Simple solid overlay for investors page */}
        {currentPage != 'home' && (
          <div 
            className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none"
            style={{
              background: 'rgba(0, 0, 0, 0.66)',
              zIndex: -100
            }}
          ></div>
        )}
      </main>
    </div>
  );
};

export default App;