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

Arcturus is our answer to this problem: a compute and development platform designed from the ground up for safety-critical systems. It combines deterministic hardware, constrained software environments, and tightly integrated testing and evidence generation to make system behaviour legible, predictable, and defensible. Rather than treating assurance and certification as downstream processes, Arcturus embeds them directly into how systems are designed, built, and validated.

We are starting in the space industry (satellites, launch vehicles, and supporting ground systems) because it represents one of the most demanding operating environments imaginable. The same constraints apply across a wider set of domains, from autonomous and industrial systems to critical power infrastructure. We are a small, deeply technical team building this infrastructure from first principles.`,
      roleSummary: `You'll be responsible for designing and building core parts of an FPGA-based embedded system, from data acquisition and control logic in FPGA fabric through to the embedded software that configures and validates it. This is a deeply technical role focused on making complex systems behave predictably on real hardware.`,
      whatYoullWorkOn: [
        'Implementing FPGA logic for data acquisition, processing, and control on SoC-FPGA platforms',
        'Interfacing high-speed ADCs and peripherals with FPGA fabric, including timing, buffering, and trigger logic',
        'Integrating FPGA designs with embedded software running on ARM-based processors',
        'Debugging and validating designs using simulation, hardware instrumentation, and on-target testing',
        'Contributing to system architecture decisions with an emphasis on determinism, reliability, and testability'
      ],
      required: [
        'Experience designing, debugging, and verifying FPGA systems',
        'Proficiency with Verilog, VHDL, or SystemVerilog',
        'Experience working on systems where failure mattered (space, aerospace, robotics, med-tech, industrial, infrastructure)',
        'Comfort debugging hardware using real test equipment (scopes, logic analysers)',
        'Ability to reason from first principles'
      ],
      niceToHave: [
        'Embedded C/C++ or Rust for FPGA-adjacent firmware',
        'Experience with FPGA toolchains (Libero, Quartus, Vitis, etc.)',
        'Exposure to safety-critical standards (DO-178C, DO-254, IEC 61508, etc.)',
        'Digital signal processing or high-throughput datapath design',
        'Experience with CI/CD, automated verification, or internal developer tooling',
        'Linux-based development environments'
      ],
      location: [
        'Full-time role',
        'On-site, based out of our Collingwood, Victoria office',
        'Company plans to relocate to the USA within the year; visa and relocation costs will be covered',
        'Salary range: $80k-$120k AUD'
      ],
      howToApply: 'Please apply through this Google Form.',
      applicationLink: 'https://forms.gle/XrW9yfWbpgUzKQth8', // Add your Google Form link here
      equalOpportunity: 'Kronus is an equal opportunity employer. We value thoughtful, capable people from diverse backgrounds and do not discriminate on the basis of race, gender, sexuality, disability, or background.'
    },
    'embedded-software-fulltime': {
      title: 'Founding Software Engineer',
      details: 'Full-time | On-site (Collingwood, VIC)',
      about: `Kronus builds foundational compute infrastructure for systems where correctness is not optional. We work on electronic systems that operate beyond the reach of intervention, where failure is catastrophic, behaviour must be understood in advance, and confidence must be earned, not assumed.

Arcturus is our answer to this problem: a compute and development platform designed from the ground up for safety-critical systems. It combines deterministic hardware, constrained software environments, and tightly integrated testing and evidence generation to make system behaviour legible, predictable, and defensible. Rather than treating assurance and certification as downstream processes, Arcturus embeds them directly into how systems are designed, built, and validated.

We are starting in the space industry (satellites, launch vehicles, and supporting ground systems) because it represents one of the most demanding operating environments imaginable. The same constraints apply across a wider set of domains, from autonomous and industrial systems to critical power infrastructure. We are a small, deeply technical team building this infrastructure from first principles.`,
      roleSummary: `This role focuses on building embedded software that directly controls and validates real hardware. You'll work close to the metal on SoC-based systems, writing firmware that configures peripherals, coordinates with FPGA logic, and ensures predictable, correct system behaviour under real-world constraints. In addition, you'll contribute to higher-level system libraries and control software, similar in style to flight software, that sit above the hardware layer and define system behaviour.`,
      whatYoullWorkOn: [
        'Writing embedded C/C++/Rust firmware for SoC-based systems, including processor bring-up and peripheral configuration',
        'Developing low-level drivers and interfaces for sensors, ADCs, memory, and communication buses',
        'Coordinating embedded software with FPGA logic for control, configuration, and data flow',
        'Designing and implementing higher-level system libraries and control layers, similar in style to flight software',
        'Defining system state, control flows, and fault handling behaviour in software',
        'Building test, validation, and diagnostic tooling to verify system behaviour on real hardware',
        'Working closely with hardware and FPGA engineers during integration and bring-up'
      ],
      required: [
        'Experience developing embedded software for hardware-centric systems',
        'Strong proficiency in C/C++ or Rust for embedded environments',
        'Experience bringing up and debugging software on real hardware (processors, peripherals, boards)',
        'Comfort working close to the metal, including registers, memory maps, and hardware datasheets',
        'Ability to design clear interfaces between low-level drivers and higher-level system logic',
        'Experience working on systems where failure mattered (space, aerospace, robotics, med-tech, industrial, infrastructure)',
        'Ability to reason from first principles about system behaviour and failure modes'
      ],
      niceToHave: [
        'Experience with RTOSes or embedded Linux (tasking, scheduling, IPC)',
        'Exposure to flight-software-style architectures (state machines, sequencing, health monitoring, fault handling)',
        'Experience interfacing embedded software with FPGA logic or other programmable hardware',
        'Familiarity with embedded communication protocols (SPI, I²C, CAN, UART, Ethernet, etc.)',
        'Exposure to safety-critical or high-assurance development practices (DO-178C, IEC 61508, MISRA, etc.)',
        'Experience building test, validation, or diagnostic tooling for embedded systems',
        'Linux-based development environments and version-controlled workflows'
      ],
      location: [
        'Full-time role',
        'On-site, based out of our Collingwood, Victoria office',
        'Company plans to relocate to the USA within the year; visa and relocation costs will be covered',
        'Salary range: $80k-$120k AUD'
      ],
      howToApply: 'Please apply through this Google Form.',
      applicationLink: 'https://forms.gle/SDDucL8evUfvLCwF7', // Add your Google Form link here
      equalOpportunity: 'Kronus is an equal opportunity employer. We value thoughtful, capable people from diverse backgrounds and do not discriminate on the basis of race, gender, sexuality, disability, or background.'
    },
    'software-systems': {
      title: 'Software Systems Engineer',
      details: 'Part-time | On-site (Collingwood, VIC)',
      about: `Kronus builds foundational compute infrastructure for systems where correctness is not optional. We work on electronic systems that operate beyond the reach of intervention, where failure is catastrophic, behaviour must be understood in advance, and confidence must be earned, not assumed.

Arcturus is our answer to this problem: a compute and development platform designed from the ground up for safety-critical systems. It combines deterministic hardware, constrained software environments, and tightly integrated testing and evidence generation to make system behaviour legible, predictable, and defensible. Rather than treating assurance and certification as downstream processes, Arcturus embeds them directly into how systems are designed, built, and validated.

We are starting in the space industry (satellites, launch vehicles, and supporting ground systems) because it represents one of the most demanding operating environments imaginable. The same constraints apply across a wider set of domains, from autonomous and industrial systems to critical power infrastructure. We are a small, deeply technical team building this infrastructure from first principles.`,
      roleSummary: `This role focuses on the software systems that sit around and above the core hardware platform. You'll work on flight-software-style system logic, developer tooling, and orchestration layers that tie together FPGA designs, embedded software, simulation, and test infrastructure. The work is systems-oriented and integration-focused, shaping how engineers interact with, configure, test, and reason about the platform.`,
      whatYoullWorkOn: [
        'Developing flight-software-style system logic, such as state machines, sequencing, configuration, and health monitoring',
        'Building tooling and orchestration layers that coordinate simulations, tests, hardware runs, and data collection',
        'Designing clean interfaces between embedded software, FPGA workflows, and host-side tools',
        'Improving developer experience through scripting, automation, and internal utilities',
        'Supporting integration and test workflows by making system behaviour observable and repeatable',
        'Collaborating with FPGA and embedded engineers to ensure tooling and system software align with real hardware constraints'
      ],
      required: [
        'Experience building software systems that coordinate or orchestrate other components',
        'Strong proficiency in Python and/or modern C++ for systems tooling',
        'Experience designing state machines, sequencing logic, or system controllers',
        'Comfort working across boundaries between software, embedded systems, and hardware workflows',
        'Experience building internal tools, scripts, or automation to support engineering teams',
        'Ability to reason about system behaviour, failure modes, and observability',
        'Strong written communication and ability to document system behaviour clearly'
      ],
      niceToHave: [
        'Exposure to flight software–style architectures (state, modes, health monitoring, fault handling)',
        'Experience orchestrating tests, simulations, or hardware-in-the-loop workflows',
        'Familiarity with build systems, CI/CD, or automated testing pipelines',
        'Experience working with embedded or FPGA-based systems (at the interface level, not RTL)',
        'Experience with Linux-based development environments',
        'Background in space, robotics, or other safety- or reliability-focused domains'
      ],
      location: [
        'Part-time role: 16-24hrs/week (2-3 days)',
        'On-site, based out of our Collingwood, Victoria office',
        'Flexible working arrangements available for university students; office located near university',
        'Salary range: $30-$40 AUD/hr'
      ],
      howToApply: 'Please apply through this Google Form.',
      applicationLink: 'https://forms.gle/K2c7QQEqFocuGLi1A', // Add your Google Form link here
      equalOpportunity: 'Kronus is an equal opportunity employer. We value thoughtful, capable people from diverse backgrounds and do not discriminate on the basis of race, gender, sexuality, disability, or background.'
    },
    'embedded-software-parttime': {
      title: 'Embedded Software Engineer',
      details: 'Part-time | On-site (Collingwood, VIC)',
      about: `Kronus builds foundational compute infrastructure for systems where correctness is not optional. We work on electronic systems that operate beyond the reach of intervention, where failure is catastrophic, behaviour must be understood in advance, and confidence must be earned, not assumed.

Arcturus is our answer to this problem: a compute and development platform designed from the ground up for safety-critical systems. It combines deterministic hardware, constrained software environments, and tightly integrated testing and evidence generation to make system behaviour legible, predictable, and defensible. Rather than treating assurance and certification as downstream processes, Arcturus embeds them directly into how systems are designed, built, and validated.

We are starting in the space industry (satellites, launch vehicles, and supporting ground systems) because it represents one of the most demanding operating environments imaginable. The same constraints apply across a wider set of domains, from autonomous and industrial systems to critical power infrastructure. We are a small, deeply technical team building this infrastructure from first principles.`,
      roleSummary: `This role focuses on targeted embedded software development in support of hardware bring-up, testing, and validation. You'll work close to the hardware, contributing firmware, drivers, and test utilities that help validate and exercise the system, without owning the full embedded stack. The scope is intentionally constrained to make part-time contribution effective and impactful.`,
      whatYoullWorkOn: [
        'Writing and maintaining embedded C/C++ firmware for specific subsystems or peripherals',
        'Implementing drivers and interfaces for sensors, ADCs, or communication buses',
        'Developing test and validation firmware used during hardware bring-up and integration',
        'Supporting coordination between embedded software and FPGA logic for configuration and control',
        'Debugging and diagnosing issues on real hardware using logs, instrumentation, and lab tools',
        'Working closely with full-time engineers during defined integration or bring-up phases'
      ],
      required: [
        'Experience writing embedded C/C++ firmware for real hardware systems',
        'Comfort working close to the hardware (registers, datasheets, memory maps)',
        'Experience bringing up or debugging embedded software on physical boards',
        'Familiarity with common embedded communication protocols (SPI, I²C, UART, CAN, etc.)',
        'Ability to implement drivers, interfaces, or test firmware for specific subsystems',
        'Comfort debugging with logs, basic instrumentation, and lab tools',
        'Ability to work effectively within a narrowly defined technical scope'
      ],
      niceToHave: [
        'Experience with SoC-based platforms or processor + programmable logic systems',
        'Exposure to RTOSes or embedded Linux',
        'Experience coordinating embedded software with FPGA logic or other accelerators',
        'Familiarity with hardware bring-up and validation workflows',
        'Exposure to safety-critical or high-assurance development practices',
        'Linux-based development environments and version-controlled workflows'
      ],
      location: [
        'Part-time role: 16-24hrs/week (2-3 days)',
        'On-site, based out of our Collingwood, Victoria office',
        'Flexible working arrangements available for university students; office located near university',
        'Salary range: $30-$40 AUD/hr'
      ],
      howToApply: 'Please apply through this Google Form.',
      applicationLink: 'https://forms.gle/RZq6SpFDjfoTMW898', // Add your Google Form link here
      equalOpportunity: 'Kronus is an equal opportunity employer. We value thoughtful, capable people from diverse backgrounds and do not discriminate on the basis of race, gender, sexuality, disability, or background.'
    },
    'ml-systems-engineer': {
      title: 'Machine Learning Systems Engineer',
      details: 'Part-time | On-site (Collingwood, VIC)',
      about: `Kronus builds foundational compute infrastructure for systems where correctness is not optional. We work on electronic systems that operate beyond the reach of intervention, where failure is catastrophic, behaviour must be understood in advance, and confidence must be earned, not assumed.

Arcturus is our answer to this problem: a compute and development platform designed from the ground up for safety-critical systems. It combines deterministic hardware, constrained software environments, and tightly integrated testing and evidence generation to make system behaviour legible, predictable, and defensible. Rather than treating assurance and certification as downstream processes, Arcturus embeds them directly into how systems are designed, built, and validated.

We are starting in the space industry (satellites, launch vehicles, and supporting ground systems) because it represents one of the most demanding operating environments imaginable. The same constraints apply across a wider set of domains, from autonomous and industrial systems to critical power infrastructure. We are a small, deeply technical team building this infrastructure from first principles.`,
      roleSummary: `This role focuses on developing machine learning algorithms and inference pipelines for deployment on constrained, hardware-accelerated edge systems. You'll work on image processing and ML inference for space and other safety-critical environments, collaborating closely with FPGA and hardware engineers to ensure models are architected, simplified, and structured in a way that can be efficiently implemented in hardware. You will act as the bridge between ML models and the underlying accelerator, shaping algorithms, dataflows, and interfaces to enable efficient, deterministic execution on FPGA-based platforms.`,
      whatYoullWorkOn: [
        'Developing and adapting ML models for edge inference, with a focus on image processing and computer vision',
        'Designing inference pipelines suitable for hardware acceleration, including dataflow, memory access patterns, and latency constraints',
        'Working with FPGA engineers to translate ML models into accelerator-friendly forms (e.g. fixed-point, reduced precision, streaming architectures)',
        'Exploring and evaluating ML acceleration approaches on FPGA (e.g. custom datapaths, systolic-style pipelines, offload kernels)',
        'Implementing and testing inference software on embedded and edge platforms',
        'Profiling performance, power, and accuracy trade-offs under real-world constraints',
        'Contributing to system-level design decisions where ML, hardware, and mission constraints intersect'
      ],
      required: [
        'Strong background in machine learning, particularly computer vision / image processing',
        'Experience implementing and training ML models (e.g. CNNs, classical CV pipelines, hybrid approaches)',
        'Proficiency in Python and at least one ML framework (PyTorch, TensorFlow, JAX, etc.)',
        'Ability to reason about performance, memory, and numerical precision',
        'Comfort working at the boundary between algorithms and systems',
        'Willingness to engage deeply with hardware constraints, even without writing HDL',
        'Ability to reason from first principles and adapt algorithms to hard constraints'
      ],
      niceToHave: [
        'Experience with edge or embedded ML deployment',
        'Familiarity with model optimisation techniques (quantisation, pruning, distillation)',
        'Exposure to hardware-aware ML or ML compilers (TVM, Vitis AI, ONNX, etc.)',
        'Experience with fixed-point arithmetic or numerical optimisation',
        'Background in robotics, space systems, or other resource-constrained environments',
        'Basic familiarity with FPGA concepts (pipelines, parallelism, streaming), even at a conceptual level',
        'Experience working alongside hardware or FPGA engineers'
      ],
      location: [
        'Part-time role: 16-24hrs/week (2-3 days)',
        'On-site, based out of our Collingwood, Victoria office',
        'Flexible working arrangements available for university students; office located near university',
        'Salary range: $30-$40 AUD/hr'
      ],
      howToApply: 'Please apply through this Google Form.',
      applicationLink: 'https://forms.gle/LGQZyHD5AwF5VKbQ8', // Add your Google Form link here
      equalOpportunity: 'Kronus is an equal opportunity employer. We value thoughtful, capable people from diverse backgrounds and do not discriminate on the basis of race, gender, sexuality, disability, or background.'
    },
    'university-capstone': {
      title: 'University Capstone EOI',
      details: '',
      about: `Kronus builds foundational compute infrastructure for systems where correctness is not optional. We work on electronic systems that operate beyond the reach of intervention, where failure is catastrophic, behaviour must be understood in advance, and confidence must be earned, not assumed.

      Arcturus is our answer to this problem: a compute and development platform designed from the ground up for safety-critical systems. It combines deterministic hardware, constrained software environments, and tightly integrated testing and evidence generation to make system behaviour legible, predictable, and defensible. Rather than treating assurance and certification as downstream processes, Arcturus embeds them directly into how systems are designed, built, and validated.
      
      We are starting in the space industry (satellites, launch vehicles, and supporting ground systems) because it represents one of the most demanding operating environments imaginable. The same constraints apply across a wider set of domains, from autonomous and industrial systems to critical power infrastructure. We are a small, deeply technical team building this infrastructure from first principles.`,
      roleSummary: `You'll work alongside engineers in an active startup, taking real ownership of a piece of work that actually matters. Expect to build things, break things, debug real problems, and make decisions that shape how the project evolves. You'll get exposure not just to technical engineering, but also to how a technical startup operates day-to-day; from iteration and trade-offs to collaboration in a small team. You'll have access to people, hardware, and a proper engineering environment. This is a great fit for students who like learning by doing, want more responsibility than a standard capstone, and are excited by the idea of contributing to something real.`,
      howToApply: `We're currently working with the universities to scope out these projects. If you'd be interested in learning more, please shoot us an email at info@kesslr.com`,
      equalOpportunity: 'Kronus is an equal opportunity employer. We value thoughtful, capable people from diverse backgrounds and do not discriminate on the basis of race, gender, sexuality, disability, or background.'
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

