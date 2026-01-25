import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

interface InvestorsProps {
  scrollY: number;
}

const Investors: React.FC<InvestorsProps> = ({ scrollY }) => {
  // Asteroid final position (adjustable)
  const asteroidBaseX = 330; // Final X position
  const asteroidBaseY = -80; // Final Y position (centered vertically)
  
  // Asteroid initial position (adjustable for crash-in angle)
  const asteroidInitialX = 1500; // Initial X position (off-screen left)
  const asteroidInitialY = -2000; // Initial Y position (adjust this to change crash-in angle)
  
  // Track asteroid's animated X and Y positions
  const asteroidX = useMotionValue(asteroidInitialX); // Start at initial position
  const asteroidY = useMotionValue(asteroidInitialY); // Start at initial position
  
  // State to control when animation should start (after initialization)
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Reset motion values when component mounts to ensure animation starts from correct position
  useEffect(() => {
    // Set initial positions immediately
    asteroidX.set(asteroidInitialX);
    asteroidY.set(asteroidInitialY);
    
    // Since App.tsx now waits for images to load, we can start animation immediately
    // Small delay to ensure DOM is ready and positions are set before animation starts
    const timer = setTimeout(() => {
      asteroidX.set(asteroidInitialX);
      asteroidY.set(asteroidInitialY);
      setIsInitialized(true);
    }, 100); // Small delay to ensure everything is initialized
    
    return () => clearTimeout(timer);
  }, [asteroidX, asteroidY, asteroidInitialX, asteroidInitialY]);
  
  // No scroll parallax - asteroid stays in place with bounce animation
  
  // Calculate distance between asteroid and text
  // Text is positioned from right, asteroid from left
  // Container is max-w-7xl (1280px), text at right: 100px means ~1180px from left edge
  // Asteroid at baseX = -220px means it's about 1400px away when fully in position
  const textPositionX = 1180; // Approximate text X position from left
  
  // Calculate distance (simplified - adjust based on actual layout)
  // Asteroid starts at initialX (far right, off-screen)
  // Asteroid ends at baseX when fully in position
  const maxDistance = 2000; // Maximum distance when asteroid is at initial position
  const minDistance = 800; // Minimum distance when asteroid is close to text (at baseX)
  const gradientStartDistance = 1500; // Distance at which gradient starts appearing
  
  // Use the motion value to track actual animated position
  const asteroidAnimatedX = useTransform(asteroidX, (latest) => latest);
  
  // Calculate distance based on asteroid position
  // When asteroid is at initialX (far away), distance is max
  // When asteroid is at baseX, distance is smaller (closer)
  const distance = useTransform(
    asteroidX,
    [asteroidInitialX, asteroidBaseX],
    [maxDistance, minDistance]
  );
  
  // Gradient intensity based on distance (0 = far/white, 1 = close/darker gradient)
  // More impactful: gradient only appears when asteroid is much closer
  // Closer asteroid = higher intensity = darker gradient
  const gradientIntensity = useTransform(
    distance,
    [maxDistance, gradientStartDistance, minDistance],
    [0, 0.1, 1], // No gradient when far (white), full gradient when close (darker)
    { clamp: true }
  );
  
  // State to track gradient intensity for CSS
  const [gradientIntensityValue, setGradientIntensityValue] = useState(0);
  
  useEffect(() => {
    const unsubscribe = gradientIntensity.on('change', (latest) => {
      setGradientIntensityValue(Math.max(0, Math.min(1, latest)));
    });
    return () => unsubscribe();
  }, [gradientIntensity]);
  
  // Calculate shadow position based on asteroid position
  // Shadow moves as asteroid scrolls, creating dynamic effect
  const shadowOffsetX = Math.min(scrollY * 0.3, 200); // Shadow moves right as we scroll
  const shadowBlur = Math.max(50 - scrollY * 0.1, 20); // Shadow gets sharper as asteroid moves away
  const shadowOpacity = Math.max(0.6 - scrollY * 0.001, 0.2); // Shadow fades as asteroid moves away

  return (
    <>
    <section className="w-full h-screen flex items-center relative pt-20 overflow-hidden">
      {/* Container with max-width matching other sections */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-12 md:px-24 h-full relative">
        {/* Asteroid on the left - absolute positioning with crash-in animation - hidden on mobile */}
        <motion.div 
          className="absolute top-1/2 hidden md:block"
          style={{
            left: '0px',
            zIndex: 2,
            x: asteroidX,
            y: asteroidY,
            scale: 0.3,
            opacity: 0,
            rotate: 20
          }}
          initial={false}
          animate={isInitialized ? { 
            x: asteroidBaseX,
            y: `calc(-50% + ${asteroidBaseY}px)`,
            scale: 0.8,
            opacity: 1
          } : {
            x: asteroidInitialX,
            y: asteroidInitialY,
            scale: 0.3,
            opacity: 0
          }}
          transition={{ 
            type: "spring",
            stiffness: 30,
            damping: 15,
            mass: 2,
            duration: 1.5
          }}
          onUpdate={(latest) => {
            if (typeof latest.x === 'number') {
              asteroidX.set(latest.x);
            }
            if (typeof latest.y === 'number') {
              asteroidY.set(latest.y);
            }
          }}
        >
          <img 
            src="/images/asteroid_hero.png" 
            alt="Asteroid"
            className="max-w-full h-auto object-contain"
            loading="eager"
            style={{
              filter: 'drop-shadow(0 0 30px rgba(0, 0, 0, 0.5)) brightness(30%)'
            }}
          />
        </motion.div>

        {/* Text - responsive positioning */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:left-auto md:translate-x-0 md:right-[520px] flex flex-col items-center md:items-end justify-center w-full md:w-auto"
          style={{
            zIndex: 1
          }}
        >
        <h1 
          className="text-6xl sm:text-8xl md:text-[140px] font-semibold tracking-tighter leading-none text-center md:text-left"
          style={{
            backgroundImage: gradientIntensityValue > 0 
              ? `linear-gradient(to left, rgba(${Math.round(100 * 1/gradientIntensityValue)}, ${Math.round(100 * 1/gradientIntensityValue)}, ${Math.round(100 * 1/gradientIntensityValue)}, ${0.8 * 1/gradientIntensityValue}) 0%, rgba(255, 255, 255, 1) 100%)`
              : 'linear-gradient(to left, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 100%)',
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '0% 0%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: `drop-shadow(${shadowOffsetX}px 0 ${shadowBlur}px rgba(0, 0, 0, ${shadowOpacity}))`,
            textShadow: `${shadowOffsetX}px 0 ${shadowBlur}px rgba(0, 0, 0, ${shadowOpacity})`,
            display: 'inline-block',
            transition: 'background-image 0.1s ease-out'
          }}
        >
          FOR <br /> INVESTORS
        </h1>
        </div>
      </div>
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-gray-700 z-20">
        <ChevronDown size={32} />
      </div>
    </section>
      {/* Under Construction Section */}
    <section className="w-full min-h-screen max-w-7xl mx-auto px-4 sm:px-12 md:px-24 py-16 sm:py-32 relative flex items-center">
        {/* Gradient border */}
        <div 
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: 'linear-gradient(to right, transparent 0%, rgba(176, 176, 176, 0.1) 33%, rgba(176, 176, 176, 0.1) 66%, transparent 100%)'
          }}
        ></div>
        
        <div className="w-full max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-6">Investor Resources</h2>
          <p className="text-gray-400 text-xs sm:text-sm mb-8 sm:mb-12 px-4" style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300 }}>
            Our investor page is currently under construction. In the meantime, please download our materials or book a meeting with our team.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
            <a 
              href="/resources/Kesslr_Labs_Deck.pdf" 
              download="Kesslr_Labs_Deck.pdf"
              className="w-full sm:w-auto border border-cyan-800 text-cyan-500 text-[12px] uppercase font-nippo px-6 sm:px-8 py-3 sm:py-4 hover:bg-cyan-900/20 transition-colors text-center"
            >
              Download Slide Deck
            </a>
            <a 
              href="/resources/Kesslr_Labs_One_Pager.pdf" 
              download="Kesslr_Labs_One_Pager.pdf"
              className="w-full sm:w-auto border border-cyan-800 text-cyan-500 text-[12px] uppercase font-nippo px-6 sm:px-8 py-3 sm:py-4 hover:bg-cyan-900/20 transition-colors text-center"
            >
              Download One Pager
            </a>
            <a 
              href="https://cal.com/kesslr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-gray-200 text-black text-[12px] uppercase font-nippo px-6 sm:px-8 py-3 sm:py-4 hover:bg-white transition-colors text-center"
            >
              Book a Meeting
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Investors;

