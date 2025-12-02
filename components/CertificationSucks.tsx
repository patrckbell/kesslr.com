
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CertificationSucks: React.FC = () => {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const stats = [
    {
      stat: "70%",
      text: "Up to 70% of engineering effort is wasted on certification",
      backText: "Teams spend months generating traceability, tests, and documentation by hand across disconnected tools."
    },
    {
      stat: "25-40%",
      text: "25-40% of avionics budgets go to re-qualifying hardware and software",
      backText: "Hardware, software, and verification aren’t unified, so organisations rebuild their entire certification workflow for every mission."
    },
    {
      stat: "~30%",
      text: "Documentation and testing errors account for ~30% of late-stage delays",
      backText: "Fragmented processes inflate costs, delay schedules, and force teams to recertify everything whenever requirements or hardware change."
    }
  ];

  return (
    <section className="w-full h-screen max-w-7xl mx-auto px-12 md:px-24 py-24 relative flex items-center">
      {/* Gradient border */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(to right, transparent 0%, rgba(176, 176, 176, 0.1) 33%, rgba(176, 176, 176, 0.1) 66%, transparent 100%)'
        }}
      ></div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        
        {/* Left Side: Stats */}
        <div>
          <h2 className="text-[50px] md:text-[50px] font-semibold mb-2">
            Certification <span className="font-bold">Sucks.</span>
          </h2>
          <div className="space-y-2 p-2 bg-[#0E0E0E] border border-[#2E2E2E]">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                index={index}
                stat={stat.stat}
                text={stat.text}
                backText={stat.backText}
                flippedIndex={flippedIndex}
                setFlippedIndex={setFlippedIndex}
              />
            ))}
          </div>

          <p className="text-[14px] text-gray-500 mt-4">
            Fragmented systems, endless testing, <span className="text-900 text-[#D90000]">billions in overruns.</span>
          </p>
        </div>

        {/* Right Side: Document Pile Visual */}
        <div className="relative h-[500px] flex flex-col items-center justify-center">
           <DocumentPile />
        </div>

      </div>
    </section>
  );
};

const DocumentPile: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  
  const docs = [
    { label: "DO-178C", filename: "DO-178C.png", description: "DO-178C: Software Considerations in Airborne Systems and Equipment Certification", rotate: -15, x: -100, y: -100, z: 1 },
    { label: "DO-254", filename: "DO-254.png", description: "DO-254: Design Assurance Guidance for Airborne Electronic Hardware", rotate: 10, x: -30, y: -95, z: 2 },
    { label: "DO-160", filename: "DO-160.png", description: "DO-160: Environmental Conditions and Test Procedures for Airborne Equipment", rotate: 22, x: 100, y: -100, z: 3 },
    { label: "DO-331", filename: "DO-331.png", description: "DO-331: Model-Based Development and Verification Supplement to DO-178C", rotate: -25, x: 50, y: -70, z: 2 },
    { label: "ARP-4754A", filename: "ARP-4754A.png", description: "ARP-4754A: Guidelines for Development of Civil Aircraft and Systems", rotate: -14, x: 90, y: 10, z: 6 },
    { label: "ARP-4761A", filename: "ARP-4761A.png", description: "ARP-4761A: Guidelines and Methods for Conducting the Safety Assessment Process", rotate: 2, x: -10, y: -10, z: 4 },
    { label: "FACE", filename: "FACE.png", description: "FACE: Future Airborne Capability Environment Technical Standard", rotate: -2, x: -20, y: 90, z: 5 },
    { label: "MOSA/SOSA", filename: "MOSA_SOSA.png", description: "MOSA/SOSA: Modular Open Systems Architecture / Sensor Open Systems Architecture", rotate: 17, x: -100, y: 100, z: 2 },
    { label: "ECSS-E-ST-40C", filename: "ECSS-E-ST-40C.png", description: "ECSS-E-ST-40C: Software Engineering Standards (European Space Standards)", rotate: 21, x: -90, y: -20, z: 3 },
    { label: "ECSS-Q-ST-80C", filename: "ECSS-Q-ST-80C.png", description: "ECSS-Q-ST-80C: Software Product Assurance (European Space Standards)", rotate: -12, x: 40, y: 70, z: 6 },
    { label: "UL-4600", filename: "UL-4600.png", description: "UL-4600: Standard for Safety for the Evaluation of Autonomous Products", rotate: 4, x: 100, y: 100, z: 11 },
  ];

  const selectedDescription = selectedIndex !== null ? docs[selectedIndex].description : null;

  // Calculate bounds to center the document pile
  const minX = Math.min(...docs.map(d => d.x));
  const maxX = Math.max(...docs.map(d => d.x));
  const minY = Math.min(...docs.map(d => d.y));
  const maxY = Math.max(...docs.map(d => d.y));
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative w-[200px] h-[200px] flex items-center justify-center">
          {docs.map((doc, idx) => (
           <DocCard 
             key={idx} 
             label={doc.label}
             filename={doc.filename}
             rotate={doc.rotate}
             x={doc.x - centerX}
             y={doc.y - centerY}
             z={doc.z}
             index={idx}
             hoveredIndex={hoveredIndex}
             selectedIndex={selectedIndex}
             onHoverStart={() => setHoveredIndex(idx)}
             onHoverEnd={() => setHoveredIndex(null)}
             onSelect={() => setSelectedIndex(selectedIndex === idx ? null : idx)}
           />
         ))}
      </div>
      <p className="absolute top-[330px] text-[14px] text-gray-600 text-center whitespace-nowrap transition-all duration-300">
        {selectedDescription || "Click on a document to learn more"}
      </p>
    </div>
  );
};

interface DocCardProps {
  label: string;
  filename: string;
  rotate: number;
  x: number;
  y: number;
  z: number;
  index: number;
  hoveredIndex: number | null;
  selectedIndex: number | null;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onSelect: () => void;
}

const DocCard: React.FC<DocCardProps> = ({ label, filename, rotate, x, y, z, index, hoveredIndex, selectedIndex, onHoverStart, onHoverEnd, onSelect }) => {
  const [hovered, setHovered] = useState(false);
  const isSelected = selectedIndex === index;
  const shouldBlur = selectedIndex !== null && selectedIndex !== index;

  const handleMouseEnter = () => {
    setHovered(true);
    onHoverStart();
  };

  const handleMouseLeave = () => {
    setHovered(false);
    onHoverEnd();
  };

  const handleClick = () => {
    onSelect();
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        position: 'absolute',
        left: '30%',
        top: '40%',
        transform: isSelected 
          ? `translate(calc(0px), calc(0px))`
          : `translate(calc(${x}px), calc(${y}px))`,
        width: '10rem',
        height: '10rem',
        zIndex: isSelected ? 50 : (hovered ? 40 : z),
        pointerEvents: 'auto',
      }}
      className="transition-all duration-300 ease-out cursor-pointer"
    >
      {/* Invisible hover area that stays in original position */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      />
      
      {/* Visible document */}
      <div
        style={{
          position: 'absolute',
          left: '0',
          top: '0',
          transform: `rotate(${hovered || isSelected ? 0 : rotate}deg) scale(${isSelected ? 2 : 1.3})`,
          filter: shouldBlur ? 'blur(0.5px)' : 'none',
          transition: 'all 300ms ease-out',
        }}
        className="w-16"
      >
        <img 
          src={`images/docs/${filename}`} 
          alt={label}
          className={`w-full h-auto drop-shadow-2xl ${isSelected || hovered ? 'brightness-110' : 'brightness-90'} transition-all`}
        />
      </div>
    </div>
  );
};

interface StatCardProps {
  index: number;
  stat: string;
  text: string;
  backText: string;
  flippedIndex: number | null;
  setFlippedIndex: (index: number | null) => void;
}

const StatCard: React.FC<StatCardProps> = ({ index, stat, text, backText, flippedIndex, setFlippedIndex }) => {
  const isFlipped = flippedIndex === index;

  return (
    <div 
      className="relative min-h-[120px]"
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setFlippedIndex(index)}
      onMouseLeave={() => setFlippedIndex(null)}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateX: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Front side */}
        <div
          className="border border-white/10 p-6 bg-[#121212] relative w-full h-full flex items-center min-h-[120px]"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-white z-10"></div>
          <div className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t border-r border-white z-10"></div>
          <div className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b border-l border-white z-10"></div>
          <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-white z-10"></div>
          <div className="grid grid-cols-3 gap-6 items-center w-full relative">
            <span className="text-3xl font-bold text-center">{stat}</span>
            {/* Vertical separator line */}
            <div className="absolute left-[calc(30%+0.75rem)] top-0 bottom-0 w-px bg-white/10"></div>
            <p className="text-[15px] text-gray-400 col-span-2 text-center">
              {text}
            </p>
          </div>
        </div>

        {/* Back side */}
        <div
          className="border border-white/10 p-6 bg-[#121212] absolute top-0 left-0 w-full h-full flex items-center justify-center min-h-[120px]"
          style={{ 
            backfaceVisibility: 'hidden', 
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateX(180deg)'
          }}
        >
          <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-white z-10"></div>
          <div className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t border-r border-white z-10"></div>
          <div className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b border-l border-white z-10"></div>
          <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-white z-10"></div>
          <div className="w-[80%] text-center mx-auto">
            <p className="text-[15px] text-gray-400">
              {backText}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CertificationSucks;
