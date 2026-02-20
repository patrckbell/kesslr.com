import React, { useState, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

interface CareersProps {
  scrollY: number;
}

const Careers: React.FC<CareersProps> = ({ scrollY }) => {
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
  
  // State for job modal
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  
  // Job data
  const jobs = {

    'fpga-engineer': {
      title: 'Founding FPGA Engineer',
      details: 'Full-time | On-site (Collingwood, VIC)',
  
      about: `Kronus builds foundational compute infrastructure for systems where correctness is not optional. We work on electronic systems that operate beyond the reach of intervention, where failure is catastrophic, behaviour must be understood in advance, and confidence must be earned, not assumed.
  
  Our answer to this problem is a deterministic compute platform designed for safety-critical systems. It combines custom hardware, constrained runtime environments, and integrated verification and evidence generation to make system behaviour predictable, legible, and certifiable.
  
  Rather than treating certification and validation as downstream processes, we embed assurance directly into the architecture. The result is a platform where engineers can design systems whose behaviour is proven by design.`,
  
      roleSummary: `This role focuses on designing the deterministic hardware at the core of the platform. You'll implement FPGA logic that defines how the system observes, processes, and controls the physical world, with an emphasis on predictable timing, correctness, and verifiability.
  
  You will help define the architecture that future ASIC implementations will be derived from, making this foundational to the long-term evolution of the platform.`,
  
      whatYoullWorkOn: [
        'Designing FPGA architectures for deterministic data acquisition, control, and compute',
        'Implementing and verifying logic using Verilog, VHDL, or SystemVerilog',
        'Building high-reliability interfaces to sensors, memory, and high-speed peripherals',
        'Designing streaming datapaths, control logic, and hardware state machines',
        'Ensuring deterministic timing and observable, testable system behaviour',
        'Debugging designs using simulation, instrumentation, and on-target hardware',
        'Contributing to architectural decisions shaping future ASIC implementations'
      ],
  
      required: [
        'Experience designing and debugging FPGA-based systems',
        'Proficiency in Verilog, VHDL, or SystemVerilog',
        'Strong understanding of synchronous digital design',
        'Experience validating hardware through simulation and real-world testing',
        'Comfort working directly with hardware and lab equipment',
        'Ability to reason precisely about timing, state, and system behaviour',
        'Ability to reason from first principles'
      ],
  
      niceToHave: [
        'Experience with SoC-FPGA platforms (PolarFire SoC, Zynq, etc.)',
        'Experience building datapaths, DSP pipelines, or accelerators',
        'Experience with SoC platforms (ARM Cortex-A/R/M, RISC-V, etc.)',
        'Exposure to safety-critical hardware standards (DO-254, IEC 61508, etc.)',
        'Experience preparing designs for ASIC implementation',
        'Embedded firmware experience for FPGA-adjacent processors',
        'Experience building internal hardware tooling or automation',
        'Linux-based development environments'
      ],
  
      location: [
        'Full-time role',
        'On-site, Collingwood, Victoria',
        'Salary range: $80k–$120k AUD'
      ],
  
      howToApply: 'Please apply through this Google Form.',
      applicationLink: 'https://forms.gle/XrW9yfWbpgUzKQth8',
  
      equalOpportunity: 'Kronus is an equal opportunity employer.'
    },
  
  
  
    'embedded-firmware-engineer': {
      title: 'Founding Embedded Firmware Engineer',
      details: 'Full-time | On-site (Collingwood, VIC)',
  
      about: `Kronus builds foundational compute infrastructure for systems where correctness is not optional.
  
  Our solution is a vertically integrated platform combining deterministic hardware, constrained runtime environments, and automated verification to enable certifiable system behaviour. Firmware is a critical part of this platform, acting as the interface between programmable logic, physical hardware, and higher-level system logic.
  
  We are building firmware that does not merely control hardware, but defines, constrains, and validates system behaviour. This is closer in spirit to flight software than traditional embedded development.`,
  
      roleSummary: `This role focuses on building the firmware and runtime layers that bring the platform to life. You'll write low-level software that configures hardware, coordinates execution, enforces system invariants, and ensures predictable, correct operation.
  
  You will work close to the hardware, defining the boundary between programmable logic and software, and shaping the runtime environment that applications rely on.`,
  
      whatYoullWorkOn: [
        'Developing embedded firmware in C, C++, or Rust for SoC-based platforms',
        'Implementing low-level drivers for memory, sensors, and hardware peripherals',
        'Bringing up processors, configuring hardware, and debugging system integration',
        'Building runtime components that manage system state, execution, and safety invariants',
        'Designing interfaces between FPGA logic and software layers',
        'Implementing validation, monitoring, and diagnostic capabilities',
        'Supporting hardware bring-up, integration, and verification'
      ],
  
      required: [
        'Experience writing embedded firmware for real hardware systems',
        'Strong proficiency in C, C++, or Rust',
        'Comfort working with registers, memory maps, and hardware datasheets',
        'Experience debugging embedded systems on physical hardware',
        'Understanding of system-level behaviour and failure modes',
        'Ability to design robust, predictable firmware architectures',
        'Ability to reason from first principles'
      ],
  
      niceToHave: [
        'Experience with SoC platforms (ARM Cortex-A/R/M, RISC-V, etc.)',
        'Experience with FPGA-based systems',
        'Exposure to RTOSes or embedded runtime systems',
        'Experience in safety-critical domains (space, aerospace, robotics, infrastructure)',
        'Experience implementing state machines or control systems',
        'Experience with automated testing or validation infrastructure',
        'Linux-based development environments'
      ],
  
      location: [
        'Full-time role',
        'On-site, Collingwood, Victoria',
        'Salary range: $80k–$140k AUD'
      ],
  
      howToApply: 'Please apply through this Google Form.',
      applicationLink: 'https://forms.gle/SDDucL8evUfvLCwF7',
  
      equalOpportunity: 'Kronus is an equal opportunity employer.'
    },
  
  
  
    'software-engineer': {
      title: 'Founding Software Engineer (Systems & Tooling)',
      details: 'Full-time | On-site (Collingwood, VIC)',
  
      about: `Kronus builds foundational compute infrastructure for systems where correctness is not optional.
  
  Our solution is a complete development and execution environment. The platform includes system definition tools, build pipelines, validation infrastructure, and developer tooling that make system behaviour explicit, observable, and certifiable.
  
  We are building the software layer that allows engineers to define, configure, test, and reason about complex embedded systems with clarity and confidence.`,
  
      roleSummary: `This role focuses on the software systems and tooling that sit above the hardware and firmware layers. You'll build developer tooling, orchestration systems, software libraries, and application-layer infrastructure that define how engineers interact with the platform.
  
  This includes compilers, system configuration tools, testing infrastructure, and developer workflows. Your work will directly shape the developer experience and capabilities of the platform.`,
  
      whatYoullWorkOn: [
        'Building system definition tools, compilers, and configuration infrastructure',
        'Developing tooling that orchestrates builds, tests, and hardware execution',
        'Implementing software that interfaces with embedded and FPGA-based systems',
        'Designing internal developer tooling to improve observability and correctness',
        'Designing and implementing safety-critical software libraries',
        'Building validation, testing, and verification infrastructure',
        'Designing APIs and abstractions that define system behaviour',
        'Improving development workflows and engineering productivity'
      ],
  
      required: [
        'Strong proficiency in Python, Rust, or modern C++',
        'Experience building complex software systems or developer tooling',
        'Ability to design clean abstractions and interfaces',
        'Strong systems thinking and architectural reasoning',
        'Experience working close to operating systems, hardware, or compilers',
        'Ability to reason about system correctness and behaviour',
        'Ability to reason from first principles'
      ],
  
      niceToHave: [
        'Experience building compilers, build systems, or language tooling',
        'Experience with embedded systems or hardware-adjacent software',
        'Experience building testing, CI/CD, or validation infrastructure',
        'Experience with distributed systems or orchestration',
        'Experience with Rust or strongly typed systems languages',
        'Experience in safety-critical or infrastructure domains',
        'Linux-based development environments'
      ],
  
      location: [
        'Full-time role',
        'On-site, Collingwood, Victoria',
        'Salary range: $80k–$140k AUD'
      ],
  
      howToApply: 'Please apply through this Google Form.',
      applicationLink: 'https://forms.gle/K2c7QQEqFocuGLi1A',
  
      equalOpportunity: 'Kronus is an equal opportunity employer.'
    }
  };
  
  useEffect(() => {
    const unsubscribe = gradientIntensity.on('change', (latest) => {
      setGradientIntensityValue(Math.max(0, Math.min(1, latest)));
    });
    return () => unsubscribe();
  }, [gradientIntensity]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedJob) {
        setSelectedJob(null);
      }
    };

    if (selectedJob) {
      window.addEventListener('keydown', handleEscape);
      return () => {
        window.removeEventListener('keydown', handleEscape);
      };
    }
  }, [selectedJob]);
  
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
          JOIN <br/> THE TEAM
        </h1>
        </div>
      </div>
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-gray-700 z-20">
        <ChevronDown size={32} />
      </div>
    </section>

    <section className="w-full min-h-screen max-w-7xl mx-auto px-4 sm:px-12 md:px-24 py-16 sm:py-32 relative">
      {/* Gradient border */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(to right, transparent 0%, rgba(176, 176, 176, 0.1) 33%, rgba(176, 176, 176, 0.1) 66%, transparent 100%)'
        }}
      ></div>
      
      <div className="w-full max-w-4xl mx-auto">
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">Open Roles</h2>
        </div>

        <div className="p-2 bg-[#030303] border border-[#2E2E2E]">
          <div className="space-y-2">
          {/* FPGA Engineer */}
          <div className="relative group cursor-pointer">
            {/* Corner brackets */}
            <div className="absolute -top-[1px] -left-[1px] w-1.5 h-1.5 border-t border-l border-white z-10"></div>
            <div className="absolute -top-[1px] -right-[1px] w-1.5 h-1.5 border-t border-r border-white z-10"></div>
            <div className="absolute -bottom-[1px] -left-[1px] w-1.5 h-1.5 border-b border-l border-white z-10"></div>
            <div className="absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 border-b border-r border-white z-10"></div>
            
            <button
              onClick={() => setSelectedJob('fpga-engineer')}
              className="relative w-full text-left p-4 sm:p-6 bg-[#121212] border border-[#2E2E2E] hover:border-cyan-500/50 hover:bg-[#0a2a2f] transition-all duration-200"
            >
              <div className="flex flex-col gap-2">
                <div>
                  <h3 className="text-base sm:text-lg font-normal text-white mb-1">Founding FPGA Engineer</h3>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                  <span>Full-time</span>
                  <span>•</span>
                  <span>On-site</span>
                  <span>•</span>
                  <span>Collingwood, VIC</span>
                </div>
              </div>
            </button>
          </div>

          {/* Embedded Software Engineer (Full-time) */}
          <div className="relative group cursor-pointer">
            {/* Corner brackets */}
            <div className="absolute -top-[1px] -left-[1px] w-1.5 h-1.5 border-t border-l border-white z-10"></div>
            <div className="absolute -top-[1px] -right-[1px] w-1.5 h-1.5 border-t border-r border-white z-10"></div>
            <div className="absolute -bottom-[1px] -left-[1px] w-1.5 h-1.5 border-b border-l border-white z-10"></div>
            <div className="absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 border-b border-r border-white z-10"></div>
            
            <button
              onClick={() => setSelectedJob('embedded-software-fulltime')}
              className="relative w-full text-left p-4 sm:p-6 bg-[#121212] border border-[#2E2E2E] hover:border-cyan-500/50 hover:bg-[#0a2a2f] transition-all duration-200"
            >
              <div className="flex flex-col gap-2">
                <div>
                  <h3 className="text-base sm:text-lg font-normal text-white mb-1">Founding Software Engineer</h3>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                  <span>Full-time</span>
                  <span>•</span>
                  <span>On-site</span>
                  <span>•</span>
                  <span>Collingwood, VIC</span>
                </div>
              </div>
            </button>
          </div>

          {/* Machine Learning Systems Engineer */}
          <div className="relative group cursor-pointer">
            {/* Corner brackets */}
            <div className="absolute -top-[1px] -left-[1px] w-1.5 h-1.5 border-t border-l border-white z-10"></div>
            <div className="absolute -top-[1px] -right-[1px] w-1.5 h-1.5 border-t border-r border-white z-10"></div>
            <div className="absolute -bottom-[1px] -left-[1px] w-1.5 h-1.5 border-b border-l border-white z-10"></div>
            <div className="absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 border-b border-r border-white z-10"></div>
            
            <button
              onClick={() => setSelectedJob('ml-systems-engineer')}
              className="relative w-full text-left p-4 sm:p-6 bg-[#121212] border border-[#2E2E2E] hover:border-cyan-500/50 hover:bg-[#0a2a2f] transition-all duration-200"
            >
              <div className="flex flex-col gap-2">
                <div>
                  <h3 className="text-base sm:text-lg font-normal text-white mb-1">Machine Learning Systems Engineer</h3>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                  <span>Part-time</span>
                  <span>•</span>
                  <span>On-site</span>
                  <span>•</span>
                  <span>Collingwood, VIC</span>
                </div>
              </div>
            </button>
          </div>

          {/* Software Systems Engineer */}
          <div className="relative group cursor-pointer">
            {/* Corner brackets */}
            <div className="absolute -top-[1px] -left-[1px] w-1.5 h-1.5 border-t border-l border-white z-10"></div>
            <div className="absolute -top-[1px] -right-[1px] w-1.5 h-1.5 border-t border-r border-white z-10"></div>
            <div className="absolute -bottom-[1px] -left-[1px] w-1.5 h-1.5 border-b border-l border-white z-10"></div>
            <div className="absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 border-b border-r border-white z-10"></div>
            
            <button
              onClick={() => setSelectedJob('software-systems')}
              className="relative w-full text-left p-4 sm:p-6 bg-[#121212] border border-[#2E2E2E] hover:border-cyan-500/50 hover:bg-[#0a2a2f] transition-all duration-200"
            >
              <div className="flex flex-col gap-2">
                <div>
                  <h3 className="text-base sm:text-lg font-normal text-white mb-1">Software Systems Engineer</h3>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                  <span>Part-time</span>
                  <span>•</span>
                  <span>On-site</span>
                  <span>•</span>
                  <span>Collingwood, VIC</span>
                </div>
              </div>
            </button>
          </div>

          {/* Embedded Software Engineer (Part-time) */}
          <div className="relative group cursor-pointer">
            {/* Corner brackets */}
            <div className="absolute -top-[1px] -left-[1px] w-1.5 h-1.5 border-t border-l border-white z-10"></div>
            <div className="absolute -top-[1px] -right-[1px] w-1.5 h-1.5 border-t border-r border-white z-10"></div>
            <div className="absolute -bottom-[1px] -left-[1px] w-1.5 h-1.5 border-b border-l border-white z-10"></div>
            <div className="absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 border-b border-r border-white z-10"></div>
            
            <button
              onClick={() => setSelectedJob('embedded-software-parttime')}
              className="relative w-full text-left p-4 sm:p-6 bg-[#121212] border border-[#2E2E2E] hover:border-cyan-500/50 hover:bg-[#0a2a2f] transition-all duration-200"
            >
              <div className="flex flex-col gap-2">
                <div>
                  <h3 className="text-base sm:text-lg font-normal text-white mb-1">Embedded Software Engineer</h3>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                  <span>Part-time</span>
                  <span>•</span>
                  <span>On-site</span>
                  <span>•</span>
                  <span>Collingwood, VIC</span>
                </div>
              </div>
            </button>
          </div>

          {/* University Capstone EOI */}
          <div className="relative group cursor-pointer">
            {/* Corner brackets */}
            <div className="absolute -top-[1px] -left-[1px] w-1.5 h-1.5 border-t border-l border-white z-10"></div>
            <div className="absolute -top-[1px] -right-[1px] w-1.5 h-1.5 border-t border-r border-white z-10"></div>
            <div className="absolute -bottom-[1px] -left-[1px] w-1.5 h-1.5 border-b border-l border-white z-10"></div>
            <div className="absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 border-b border-r border-white z-10"></div>
            
            <button
              onClick={() => setSelectedJob('university-capstone')}
              className="relative w-full text-left p-4 sm:p-6 bg-[#121212] border border-[#2E2E2E] hover:border-cyan-500/50 hover:bg-[#0a2a2f] transition-all duration-200"
            >
              <div className="flex flex-col gap-2">
                <div>
                  <h3 className="text-base sm:text-lg font-normal text-white mb-1">University Capstone EOI</h3>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                </div>
              </div>
            </button>
          </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-[12px]" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
            If you have any questions, please email {' '}
            <a href="mailto:info@kesslr.com" className="text-cyan-500 hover:text-cyan-400 transition-colors">
              info@kesslr.com
            </a>
          </p>
        </div>
      </div>
    </section>
    
    {/* Job Details Modal */}
    {selectedJob && jobs[selectedJob as keyof typeof jobs] && (
      <>
        <style>{`
          .job-modal-scroll::-webkit-scrollbar {
            width: 8px;
          }
          .job-modal-scroll::-webkit-scrollbar-track {
            background: #000;
          }
          .job-modal-scroll::-webkit-scrollbar-thumb {
            background: #00B7FF;
            border-radius: 4px;
          }
          .job-modal-scroll::-webkit-scrollbar-thumb:hover {
            background: #4DD0FF;
          }
        `}</style>
        <div 
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-sm pt-12 sm:pt-20 px-2 sm:px-4"
          onClick={() => setSelectedJob(null)}
        >
        <div 
          className="relative w-full max-w-6xl bg-[#0e0e0e] border border-[#2E2E2E] max-h-[85vh] sm:max-h-[80vh] mt-4 sm:mt-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Corner brackets */}
          <div className="absolute -top-[1px] -left-[1px] w-2 h-2 sm:w-3 sm:h-3 border-t border-l border-white z-20"></div>
          <div className="absolute -top-[1px] -right-[1px] w-2 h-2 sm:w-3 sm:h-3 border-t border-r border-white z-20"></div>
          <div className="absolute -bottom-[1px] -left-[1px] w-2 h-2 sm:w-3 sm:h-3 border-b border-l border-white z-20"></div>
          <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 sm:w-3 sm:h-3 border-b border-r border-white z-20"></div>
          
          {/* Close button */}
          <button
            onClick={() => setSelectedJob(null)}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 text-white hover:text-gray-400 transition-colors"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
          
          {/* Content */}
          <div 
            className="p-4 sm:p-6 md:p-8 overflow-y-auto max-h-[75vh] sm:max-h-[75vh] job-modal-scroll"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#00B7FF #000'
            }}
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-2">
              {jobs[selectedJob as keyof typeof jobs].title}
            </h2>
            {jobs[selectedJob as keyof typeof jobs].details && (
              <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                {jobs[selectedJob as keyof typeof jobs].details}
              </p>
            )}
            
            {/* Separator line */}
            <div 
              className="h-px mb-4 sm:mb-6"
              style={{
                background: 'linear-gradient(to right, transparent 0%, rgba(176, 176, 176, 0.25) 33%, rgba(176, 176, 176, 0.25) 66%, transparent 100%)'
              }}
            ></div>
            
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">About Us</h3>
            <div className="text-gray-300 space-y-3 sm:space-y-4 mb-6 sm:mb-8 text-sm sm:text-base" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
              {jobs[selectedJob as keyof typeof jobs].about.split('\n\n').map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Role Summary - only for jobs that have it */}
            {'roleSummary' in jobs[selectedJob as keyof typeof jobs] && (
              <>
                <div 
                  className="h-px mb-4 sm:mb-6"
                  style={{
                    background: 'linear-gradient(to right, transparent 0%, rgba(176, 176, 176, 0.25) 33%, rgba(176, 176, 176, 0.25) 66%, transparent 100%)'
                  }}
                ></div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Role Summary</h3>
                <div className="text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                  <p className="leading-relaxed">
                    {(jobs[selectedJob as keyof typeof jobs] as any).roleSummary}
                  </p>
                </div>
              </>
            )}

            {/* What You'll Work On - only for jobs that have it */}
            {'whatYoullWorkOn' in jobs[selectedJob as keyof typeof jobs] && (
              <>
                <div 
                  className="h-px mb-4 sm:mb-6"
                  style={{
                    background: 'linear-gradient(to right, transparent 0%, rgba(176, 176, 176, 0.25) 33%, rgba(176, 176, 176, 0.25) 66%, transparent 100%)'
                  }}
                ></div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">What You'll Work On</h3>
                <ul className="text-gray-300 space-y-2 mb-6 sm:mb-8 list-disc list-inside text-sm sm:text-base" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                  {(jobs[selectedJob as keyof typeof jobs] as any).whatYoullWorkOn.map((item: string, index: number) => (
                    <li key={index} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* What We're Looking For - only for jobs that have it */}
            {'required' in jobs[selectedJob as keyof typeof jobs] && (
              <>
                <div 
                  className="h-px mb-4 sm:mb-6"
                  style={{
                    background: 'linear-gradient(to right, transparent 0%, rgba(176, 176, 176, 0.25) 33%, rgba(176, 176, 176, 0.25) 66%, transparent 100%)'
                  }}
                ></div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">What We're Looking For</h3>
                <div className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                  <h4 className="font-semibold mb-2 sm:mb-3">Required</h4>
                  <ul className="space-y-2 list-disc list-inside mb-4 sm:mb-6">
                    {(jobs[selectedJob as keyof typeof jobs] as any).required.map((item: string, index: number) => (
                      <li key={index} className="leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                  {'niceToHave' in jobs[selectedJob as keyof typeof jobs] && (
                    <>
                      <h4 className="font-semibold mb-2 sm:mb-3">Nice to Have</h4>
                      <ul className="space-y-2 list-disc list-inside">
                        {(jobs[selectedJob as keyof typeof jobs] as any).niceToHave.map((item: string, index: number) => (
                          <li key={index} className="leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </>
            )}

            {/* Location & Working Arrangements - only for jobs that have it */}
            {'location' in jobs[selectedJob as keyof typeof jobs] && (
              <>
                <div 
                  className="h-px mb-4 sm:mb-6"
                  style={{
                    background: 'linear-gradient(to right, transparent 0%, rgba(176, 176, 176, 0.25) 33%, rgba(176, 176, 176, 0.25) 66%, transparent 100%)'
                  }}
                ></div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Location & Working Arrangements</h3>
                <ul className="text-gray-300 space-y-2 mb-6 sm:mb-8 list-disc list-inside text-sm sm:text-base" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                  {Array.isArray((jobs[selectedJob as keyof typeof jobs] as any).location) 
                    ? (jobs[selectedJob as keyof typeof jobs] as any).location.map((item: string, index: number) => (
                        <li key={index} className="leading-relaxed">
                          {item}
                        </li>
                      ))
                    : <li className="leading-relaxed">{(jobs[selectedJob as keyof typeof jobs] as any).location}</li>
                  }
                </ul>
              </>
            )}

            {/* How to Apply - only for jobs that have it */}
            {'howToApply' in jobs[selectedJob as keyof typeof jobs] && (
              <>
                <div 
                  className="h-px mb-4 sm:mb-6"
                  style={{
                    background: 'linear-gradient(to right, transparent 0%, rgba(176, 176, 176, 0.25) 33%, rgba(176, 176, 176, 0.25) 66%, transparent 100%)'
                  }}
                ></div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">How to Apply</h3>
                <div className="text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                  <p className="leading-relaxed">
                    {(jobs[selectedJob as keyof typeof jobs] as any).howToApply.split('this Google Form').map((part: string, index: number, array: string[]) => {
                      if (index === array.length - 1) return part;
                      const applicationLink = (jobs[selectedJob as keyof typeof jobs] as any).applicationLink || '#';
                      return (
                        <React.Fragment key={index}>
                          {part}
                          <a 
                            href={applicationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-500 hover:text-cyan-400 underline transition-colors"
                          >
                            this Google Form
                          </a>
                        </React.Fragment>
                      );
                    })}
                  </p>
                </div>
              </>
            )}

            {/* Equal Opportunity - only for jobs that have it */}
            {'equalOpportunity' in jobs[selectedJob as keyof typeof jobs] && (
              <>
                <div 
                  className="h-px mb-4 sm:mb-6"
                  style={{
                    background: 'linear-gradient(to right, transparent 0%, rgba(176, 176, 176, 0.25) 33%, rgba(176, 176, 176, 0.25) 66%, transparent 100%)'
                  }}
                ></div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Equal Opportunity</h3>
                <div className="text-gray-300 text-sm sm:text-base" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                  <p className="leading-relaxed">
                    {(jobs[selectedJob as keyof typeof jobs] as any).equalOpportunity}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      </>
    )}
  </>
  );
};

export default Careers;

