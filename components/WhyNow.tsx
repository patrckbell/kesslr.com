import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const WhyNow: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Global graph height (adjustable)
  const graphHeight = 'h-60'; // Options: 'aspect-square', 'h-40', 'h-48', 'h-56', etc.
  
  // Wrapper box dimensions (adjustable)
  const wrapperMaxWidth = 'max-w-[800px]'; // Options: 'max-w-4xl', 'max-w-6xl', 'max-w-[1200px]', etc.
  const wrapperMinHeight = ''; // Options: 'min-h-[500px]', 'min-h-[600px]', etc. (leave empty for auto)
  const wrapperSidePadding = 'px-[0px]'; // Horizontal padding only (left/right): 'px-2', 'px-4', 'px-6', 'px-8', 'px-[100px]', etc.

  // Bar chart data - first 4 gray, last blue
  const barData = [
    { value: 20, color: 'gray' },
    { value: 25, color: 'gray' },
    { value: 35, color: 'gray' },
    { value: 50, color: 'gray' },
    { value: 85, color: 'blue' },
  ];
  const maxBarValue = 100;

  // Timeline/Gantt data - 3 horizontal bars with overruns
  const timelineData = [
    { width: 30, overrun: 25, x: 10 },  // Top - shortest
    { width: 45, overrun: 35, x: 55 },  // Middle - longer
    { width: 40, overrun: 35, x: 90},
    { width: 40, overrun: 30, x: 140} // Bottom - longest
  ];

  // Line chart data - exponential growth curve with reduced y range
  const lineData = [
    { x: 10, y: 0 },
    { x: 30, y: 5 },
    { x: 50, y: 12 },
    { x: 70, y: 25 },
    { x: 90, y: 45 },
  ];

  // Map to SVG coordinates - axes match other charts
  // X axis at bottom (y=95) inset from edge
  // Y axis height matches tallest bar (goes to top y=5) inset from edge
  const mapToSVG = (point: { x: number; y: number }) => {
    // X: map from 0-100 to 8-88 (with padding, matching axis position)
    const x = 8 + (point.x / 100) * 80;
    // Y: map from -5 to 50, accounting for negative values
    const yMin = -5; // Min data value
    const yMax = 50; // Max data value
    const yAxisTop = 5; // Top of y axis (inset from edge)
    const yAxisBottom = 95; // Bottom of y axis (inset from edge, matching axis position)
    const y = yAxisBottom - ((point.y - yMin) / (yMax - yMin)) * (yAxisBottom - yAxisTop);
    return { x, y };
  };

  const linePath = lineData.map((point, index) => {
    const svgPoint = mapToSVG(point);
    return `${index === 0 ? 'M' : 'L'} ${svgPoint.x} ${svgPoint.y}`;
  }).join(' ');

  return (
    <section ref={sectionRef} className="w-full h-screen max-w-7xl mx-auto px-12 md:px-24 py-12 relative flex flex-col justify-center">
      {/* Gradient border */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(to right, transparent 0%, rgba(176, 176, 176, 0.1) 33%, rgba(176, 176, 176, 0.1) 66%, transparent 100%)'
        }}
      ></div>
      <div className="mb-8 text-center">
        <h2 className="text-5xl font-semibold">Why Now?</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 max-w-[90%] mx-auto p-2 bg-[#0E0E0E] border border-[#2E2E2E]">
        {/* Chart 1 - Bar Graph */}
        <div className="border border-white/10 flex flex-col bg-[#121212] relative">
          {/* Corner brackets */}
          <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-white z-10"></div>
          <div className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t border-r border-white z-10"></div>
          <div className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b border-l border-white z-10"></div>
          <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-white z-10"></div>
          
          {/* Graph section - full width, background to top */}
          <div className={`w-full ${graphHeight} relative`} style={{ backgroundImage: 'url(images/graph_bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className="w-full h-full flex items-end justify-center gap-2 px-6 py-4">
              {barData.map((bar, index) => (
                <motion.div
                  key={index}
                  className="flex-1 flex flex-col items-center"
                  initial={{ height: 0 }}
                  animate={isInView ? { height: `${(bar.value / maxBarValue) * 100}%` } : { height: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 + index * 0.15,
                    ease: "easeOut"
                  }}
                >
                  <div 
                    className={`w-full rounded-t ${bar.color === 'blue' ? 'bg-blue-500' : 'bg-gray-700'}`}
                    style={{ height: '100%' }}
                  ></div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Separator with outline and corner brackets */}
          <div className="relative border-t border-white/10">
            {/* Corner brackets */}
            <div className="absolute -left-[1px] -top-[9px] w-2 h-2 border-b border-l border-white"></div>
            <div className="absolute -right-[1px] -top-[9px] w-2 h-2 border-b border-r border-white"></div>
            <div className="absolute -left-[1px] -top-[1px] w-2 h-2 border-t border-l border-white"></div>
            <div className="absolute -right-[1px] -top-[1px] w-2 h-2 border-t border-r border-white"></div>
          </div>
          
          {/* Text section */}
          <div className="p-4">
            {/* Header */}
            <h3 className="text-xl text-white mb-3 text-center" style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 500 }}>Demand for<br />Rapid Iteration</h3>
            
            {/* Separator line between header and bullet points */}
            <div className="relative border-t border-white/10 mb-3">
            </div>
            
            {/* Bullet points */}
            <ul className="text-[13px] text-white space-y-2 w-[85%] mx-auto">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Modern teams require in-loop evidence generation to keep development velocity high.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>End-of-cycle certification creates bottlenecks that stall launches and inflate costs.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Continuous artefact generation is becoming essential for fast, iterative mission design.</span>
            </li>
            </ul>
          </div>
        </div>

        {/* Chart 2 - Timeline/Gantt */}
        <div className="border border-white/10 flex flex-col bg-[#121212] relative">
          {/* Corner brackets */}
          <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-white z-10"></div>
          <div className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t border-r border-white z-10"></div>
          <div className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b border-l border-white z-10"></div>
          <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-white z-10"></div>

          {/* Graph section - full width, background to top */}
          <div className={`w-full ${graphHeight} relative overflow-hidden`} style={{ backgroundImage: 'url(images/graph_bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className="w-full h-full flex flex-col justify-center gap-3 px-6 py-4 relative z-0">
            {/* Horizontal arrow pointing right - inset from edges */}
            <div className="absolute bottom-4 left-6 right-6 h-px bg-[#999999]">
              <motion.div
                className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[8px] border-l-[#999999] border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.8, duration: 0.3 }}
              />
            </div>
            
            {timelineData.map((item, index) => {
              // Calculate tuck amount (5% of container width)
              const tuckAmount = 5;
              // Overrun starts tucked into the bar, extends to full overrun value
              const overrunStart = item.x + item.width - tuckAmount;
              const overrunWidth = item.overrun + tuckAmount;
              
              return (
                <div key={index} className="relative h-5 flex items-center">
                  {item.overrun > 0 && (
                    <motion.div
                      className="h-4 border-2 border-dashed border-gray-500 rounded ml-1 absolute"
                      style={{ zIndex: 1 }}
                      initial={{ width: 0, x: overrunStart, opacity: 0 }}
                      animate={isInView ? { width: `${overrunWidth}%`, x: overrunStart, opacity: 1 } : { width: 0, opacity: 0 }}
                      transition={{
                        duration: 0.25,
                        delay: 1.3 + index * 0.1,
                        ease: "easeOut"
                      }}
                    />
                  )}
                  <motion.div
                    className="h-4 bg-gray-600 rounded relative"
                    style={{ zIndex: 2 }}
                    initial={{ width: 0, x: -100 }}
                    animate={isInView ? { width: `${item.width}%`, x: item.x } : { width: 0, x: -100 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.8 + index * 0.1,
                      ease: "easeOut"
                    }}
                  />
                </div>
              );
            })}
            </div>
          </div>
          {/* Separator with outline and corner brackets */}
          <div className="relative border-t border-white/10">
            {/* Corner brackets */}
            <div className="absolute -left-[1px] -top-[9px] w-2 h-2 border-b border-l border-white"></div>
            <div className="absolute -right-[1px] -top-[9px] w-2 h-2 border-b border-r border-white"></div>
            <div className="absolute -left-[1px] -top-[1px] w-2 h-2 border-t border-l border-white"></div>
            <div className="absolute -right-[1px] -top-[1px] w-2 h-2 border-t border-r border-white"></div>
          </div>
          
          {/* Text section */}
          <div className="p-4">
            {/* Header */}
            <h3 className="text-xl text-white mb-3 text-center" style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 500 }}>Certification is<br />the Bottleneck</h3>
            
            {/* Separator line between header and bullet points */}
            <div className="relative border-t border-white/10 mb-3">
            </div>
            
            {/* Bullet points */}
            <ul className="text-[13px] text-white space-y-2 w-[85%] mx-auto">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Legacy certification tools can't keep pace with modern system scale and verification depth.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Teams rely on manual processes that slow development and introduce avoidable risk.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>The gap between required artefacts and available tooling grows larger every release cycle.</span>
            </li>
            </ul>
          </div>
        </div>

        {/* Chart 3 - Line Plot */}
        <div className="border border-white/10 flex flex-col bg-[#121212] relative">
          {/* Corner brackets */}
          <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-white z-10"></div>
          <div className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t border-r border-white z-10"></div>
          <div className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b border-l border-white z-10"></div>
          <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-white z-10"></div>

          {/* Graph section - full width, background to top */}
          <div className={`w-full ${graphHeight} relative`} style={{ backgroundImage: 'url(images/graph_bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className="w-full h-full px-6 py-4">
              <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
              {/* Axes with arrows - inset from edges */}
              <line x1="8" y1="95" x2="88" y2="95" stroke="#999999" strokeWidth="0.5" opacity="1" />
              <line x1="8" y1="95" x2="8" y2="5" stroke="#999999" strokeWidth="0.5" opacity="1" />
              
              {/* Arrow on X axis */}
              <path d="M 88 95 L 86 93 L 86 97 Z" fill="#999999" opacity="1" />
              {/* Arrow on Y axis */}
              <path d="M 8 5 L 6 7 L 10 7 Z" fill="#999999" opacity="1" />
              
              {/* Line path */}
              <motion.path
                d={linePath}
                fill="none"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 1.6,
                  ease: "easeOut"
                }}
              />
              
              {/* Data points (circles) */}
              {lineData.map((point, index) => {
                const svgPoint = mapToSVG(point);
                return (
                  <motion.circle
                    key={index}
                    cx={svgPoint.x}
                    cy={svgPoint.y}
                    r="1.5"
                    fill="white"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{
                      delay: 1.6 + (index * 0.1),
                      duration: 0.2
                    }}
                  />
                );
              })}
              
              {/* Arrow at the end pointing up */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 2.3, duration: 0.3 }}
              >
                {(() => {
                  const lastPoint = mapToSVG(lineData[lineData.length - 1]);
                  return (
                    <path
                      d={`M ${lastPoint.x} ${lastPoint.y} L ${lastPoint.x - 2} ${lastPoint.y - 4} L ${lastPoint.x + 2} ${lastPoint.y - 4} Z`}
                      fill="white"
                    />
                  );
                })()}
              </motion.g>
              </svg>
            </div>
          </div>
          
          {/* Separator with outline and corner brackets */}
          <div className="relative border-t border-white/10">
            {/* Corner brackets */}
            <div className="absolute -left-[1px] -top-[9px] w-2 h-2 border-b border-l border-white"></div>
            <div className="absolute -right-[1px] -top-[9px] w-2 h-2 border-b border-r border-white"></div>
            <div className="absolute -left-[1px] -top-[1px] w-2 h-2 border-t border-l border-white"></div>
            <div className="absolute -right-[1px] -top-[1px] w-2 h-2 border-t border-r border-white"></div>
          </div>
          
          {/* Text section */}
          <div className="p-4">
            {/* Header */}
            <h3 className="text-xl text-white mb-3 text-center" style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 500 }}>Complexity is<br />Growing</h3>
            
            {/* Separator line between header and bullet points */}
            <div className="relative border-t border-white/10 mb-3">
            </div>
            
            {/* Bullet points */}
            <ul className="text-[13px] text-white space-y-2 w-[85%] mx-auto">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>New autonomy workloads demand assurance levels that exceed current team capacity.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Software footprints and sensor fusion stacks expand faster than verification can follow.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>The mismatch between ambition and certification throughput is now a structural blocker.</span>
            </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyNow;
