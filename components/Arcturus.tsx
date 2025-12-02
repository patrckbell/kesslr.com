import React, { useState } from 'react';

const Arcturus: React.FC = () => {
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);

  return (
    <section id="arcturus-section" className="w-full h-screen max-w-7xl mx-auto px-12 md:px-24 py-24 relative flex flex-col items-center justify-center">
      {/* Gradient border */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(to right, transparent 0%, rgba(176, 176, 176, 0.1) 33%, rgba(176, 176, 176, 0.1) 66%, transparent 100%)'
        }}
      ></div>
      <div className="text-center mb-8">
        <h2 className="text-5xl font-semibold tracking-wide">ARCTURUS</h2>
        <p className="text-xs text-gray-400 mt-2">The unified compute platform for safety-critical systems.</p>
        
        <button className="mt-4 bg-white/5 border border-white/10 text-gray-500 text-[10px] px-9 py-3 uppercase tracking-wider hover:bg-white/10 hover:text-white transition-all">
          Request a Demo<br />(Coming Soon)
        </button>
      </div>

      {/* Arcturus Hero SVG - Inline for interactivity */}
      <div className="relative w-full max-w-3xl flex items-center justify-center" style={{ overflow: 'visible' }}>
        <div className="relative" style={{ width: '100%', maxWidth: '100%' }}>
          <svg 
            width="1953" 
            height="1218" 
            viewBox="0 0 1953 1218" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
            style={{ overflow: 'visible', display: 'block' }}
          >
          {/* Main center rectangle */}
          <g filter="url(#filter0_d_36_966)">
            <rect x="726" y="359" width="500" height="500" rx="20" fill="url(#paint0_radial_36_966)"/>
            <rect x="728.5" y="361.5" width="495" height="495" rx="17.5" stroke="#00B7FF" strokeWidth="5"/>
          </g>
          
          {/* Lines and other elements */}
          <line y1="-4" x2="401.5" y2="-4" transform="matrix(-1 0 0 1 726 499)" stroke="url(#paint1_linear_36_966)" strokeWidth="8"/>
          <line y1="-4" x2="265" y2="-4" transform="matrix(-0.5 -0.866025 -0.866025 0.5 324.5 499.497)" stroke="#007CAD" strokeWidth="8"/>
          <line y1="-4" x2="265" y2="-4" transform="matrix(0.5 -0.866025 -0.866025 -0.5 261 950.496)" stroke="#007CAD" strokeWidth="8"/>
          <line y1="-4" x2="123" y2="-4" transform="matrix(-1 0 0 1 268 955)" stroke="#007CAD" strokeWidth="8"/>
          <line y1="-4" x2="119" y2="-4" transform="matrix(-1 0 0 1 199 274)" stroke="#007CAD" strokeWidth="8"/>
          <line y1="-4" x2="215" y2="-4" transform="matrix(-1 0 0 1 726 442)" stroke="url(#paint2_linear_36_966)" strokeWidth="8"/>
          <line y1="-4" x2="198" y2="-4" transform="matrix(-1 0 0 1 726 840.999)" stroke="url(#paint3_linear_36_966)" strokeWidth="8"/>
          <line y1="-4" x2="99" y2="-4" transform="matrix(-1 0 0 1 726 556)" stroke="url(#paint4_linear_36_966)" strokeWidth="8"/>
          <line y1="-4" x2="285" y2="-4" transform="matrix(-1 0 0 1 726 613)" stroke="url(#paint5_linear_36_966)" strokeWidth="8"/>
          <line y1="-4" x2="108" y2="-4" transform="matrix(-1 0 0 1 726 784.999)" stroke="url(#paint6_linear_36_966)" strokeWidth="8"/>
          <line y1="-4" x2="199" y2="-4" transform="matrix(-1 0 0 1 726 670)" stroke="url(#paint7_linear_36_966)" strokeWidth="8"/>
          <line y1="-4" x2="136" y2="-4" transform="matrix(-1 0 0 1 726 385)" stroke="url(#paint8_linear_36_966)" strokeWidth="8"/>
          
          {/* Circles */}
          <circle cx="515" cy="837" r="11" stroke="#007CAD" strokeWidth="6"/>
          <circle cx="606" cy="781" r="11" stroke="#007CAD" strokeWidth="6"/>
          <circle cx="514" cy="666" r="11" stroke="#007CAD" strokeWidth="6"/>
          <circle cx="428" cy="609" r="11" stroke="#007CAD" strokeWidth="6"/>
          
          {/* White circles with filters - hoverable (outer and inner together) */}
          <g 
            filter="url(#filter1_d_36_966)"
            onMouseEnter={() => setHoveredElement('white-circle-1')}
            onMouseLeave={() => setHoveredElement(null)}
            className="cursor-pointer transition-opacity"
            style={{ opacity: hoveredElement === 'white-circle-1' ? 1 : 0.3 }}
          >
            <circle cx="113.5" cy="951.5" r="28.5" stroke="white" strokeWidth="8" shapeRendering="crispEdges"/>
          </g>
          <circle 
            cx="113.5" 
            cy="951.5" 
            r="8.5" 
            fill="white" 
            stroke="white" 
            strokeWidth="8"
            onMouseEnter={() => setHoveredElement('white-circle-1')}
            onMouseLeave={() => setHoveredElement(null)}
            className="cursor-pointer transition-opacity"
            style={{ opacity: hoveredElement === 'white-circle-1' ? 1 : 0.3 }}
          />
          
          <g 
            filter="url(#filter2_d_36_966)"
            onMouseEnter={() => setHoveredElement('white-circle-2')}
            onMouseLeave={() => setHoveredElement(null)}
            className="cursor-pointer transition-opacity"
            style={{ opacity: hoveredElement === 'white-circle-2' ? 1 : 0.3 }}
          >
            <circle cx="48.5" cy="269.5" r="28.5" stroke="white" strokeWidth="8" shapeRendering="crispEdges"/>
          </g>
          <circle 
            cx="48.5" 
            cy="269.5" 
            r="8.5" 
            fill="white" 
            stroke="white" 
            strokeWidth="8"
            onMouseEnter={() => setHoveredElement('white-circle-2')}
            onMouseLeave={() => setHoveredElement(null)}
            className="cursor-pointer transition-opacity"
            style={{ opacity: hoveredElement === 'white-circle-2' ? 1 : 0.3 }}
          />
          
          {/* More circles */}
          <circle cx="615" cy="553" r="11" stroke="#007CAD" strokeWidth="6"/>
          <circle cx="499" cy="438" r="11" stroke="#007CAD" strokeWidth="6"/>
          <circle cx="577" cy="381" r="11" stroke="#007CAD" strokeWidth="6"/>
          <line y1="-4" x2="332" y2="-4" transform="matrix(-1 0 0 1 726 729)" stroke="url(#paint9_linear_36_966)" strokeWidth="8"/>
          <line x1="1226" y1="437.999" x2="1624" y2="437.999" stroke="url(#paint10_linear_36_966)" strokeWidth="8"/>
          <line x1="1226" y1="494.999" x2="1406.01" y2="494.999" stroke="url(#paint11_linear_36_966)" strokeWidth="8"/>
          <line x1="1226" y1="836.999" x2="1406.01" y2="836.999" stroke="url(#paint12_linear_36_966)" strokeWidth="8"/>
          <line x1="1226" y1="551.999" x2="1510" y2="551.999" stroke="url(#paint13_linear_36_966)" strokeWidth="8"/>
          <line x1="1226" y1="608.999" x2="1457" y2="608.999" stroke="url(#paint14_linear_36_966)" strokeWidth="8"/>
          <line x1="1226" y1="781" x2="1457" y2="781" stroke="url(#paint15_linear_36_966)" strokeWidth="8"/>
          <line x1="1227" y1="666" x2="1342" y2="666" stroke="url(#paint16_linear_36_966)" strokeWidth="8"/>
          <line x1="1226" y1="381" x2="1341" y2="381" stroke="url(#paint17_linear_36_966)" strokeWidth="8"/>
          <line x1="1717.84" y1="268.058" x2="1792.84" y2="267.9" stroke="#007CAD" strokeWidth="8"/>
          <line x1="1620.8" y1="440.146" x2="1721.3" y2="266.074" stroke="#007CAD" strokeWidth="8"/>
          <circle cx="1355" cy="666" r="11" stroke="#007CAD" strokeWidth="6"/>
          <circle cx="1470" cy="609" r="11" stroke="#007CAD" strokeWidth="6"/>
          <circle cx="1522" cy="552" r="11" stroke="#007CAD" strokeWidth="6"/>
          <circle cx="1418" cy="495" r="11" stroke="#007CAD" strokeWidth="6"/>
          <circle cx="1354" cy="381" r="11" stroke="#007CAD" strokeWidth="6"/>
          <circle cx="1419" cy="837" r="11" stroke="#007CAD" strokeWidth="6"/>
          <circle cx="1470" cy="781" r="11" stroke="#007CAD" strokeWidth="6"/>
          
          <g 
            filter="url(#filter3_d_36_966)"
            onMouseEnter={() => setHoveredElement('white-circle-3')}
            onMouseLeave={() => setHoveredElement(null)}
            className="cursor-pointer transition-opacity"
            style={{ opacity: hoveredElement === 'white-circle-3' ? 0.4 : 0.3 }}
          >
            <circle cx="1824.5" cy="269.5" r="28.5" stroke="white" strokeWidth="8" shapeRendering="crispEdges"/>
          </g>
          <circle 
            cx="1824.5" 
            cy="269.5" 
            r="8.5" 
            fill="white" 
            stroke="white" 
            strokeWidth="8"
            onMouseEnter={() => setHoveredElement('white-circle-3')}
            onMouseLeave={() => setHoveredElement(null)}
            className="cursor-pointer transition-opacity"
            style={{ opacity: hoveredElement === 'white-circle-3' ? 0.4 : 0.3 }}
          />
          <line x1="1227" y1="724" x2="1559" y2="724" stroke="url(#paint18_linear_36_966)" strokeWidth="8"/>
          <line x1="1557" y1="723.536" x2="1731.07" y2="824.036" stroke="#007CAD" strokeWidth="8"/>
          <line x1="1729" y1="823" x2="1873" y2="823" stroke="#007CAD" strokeWidth="8"/>
          
          <g 
            filter="url(#filter4_d_36_966)"
            onMouseEnter={() => setHoveredElement('white-circle-4')}
            onMouseLeave={() => setHoveredElement(null)}
            className="cursor-pointer transition-opacity"
            style={{ opacity: hoveredElement === 'white-circle-4' ? 1 : 0.3 }}
          >
            <circle cx="1904.5" cy="822.5" r="28.5" stroke="white" strokeWidth="8" shapeRendering="crispEdges"/>
          </g>
          <circle 
            cx="1904.5" 
            cy="822.5" 
            r="8.5" 
            fill="white" 
            stroke="white" 
            strokeWidth="8"
            onMouseEnter={() => setHoveredElement('white-circle-4')}
            onMouseLeave={() => setHoveredElement(null)}
            className="cursor-pointer transition-opacity"
            style={{ opacity: hoveredElement === 'white-circle-4' ? 1 : 0.3 }}
          />
          <line x1="749" y1="859" x2="749" y2="1109" stroke="url(#paint19_linear_36_966)" strokeWidth="8"/>
          <line y1="-4" x2="197" y2="-4" transform="matrix(0 1 1 0 811 859)" stroke="url(#paint20_linear_36_966)" strokeWidth="8"/>
          <line y1="-4" x2="200" y2="-4" transform="matrix(0 1 1 0 1207 859)" stroke="url(#paint21_linear_36_966)" strokeWidth="8"/>
          <line y1="-4" x2="200" y2="-4" transform="matrix(0 1 1 0 1075 859)" stroke="url(#paint22_linear_36_966)" strokeWidth="8"/>
          <line y1="-4" x2="100" y2="-4" transform="matrix(0 1 1 0 877 859)" stroke="url(#paint23_linear_36_966)" strokeWidth="8"/>
          <line y1="-4" x2="110" y2="-4" transform="matrix(0 1 1 0 1141 859)" stroke="url(#paint24_linear_36_966)" strokeWidth="8"/>
          <line y1="-4" x2="80" y2="-4" transform="matrix(0 1 1 0 1009 859)" stroke="url(#paint25_linear_36_966)" strokeWidth="8"/>
          <line y1="-4" x2="332" y2="-4" transform="matrix(0 1 1 0 943 859)" stroke="url(#paint26_linear_36_966)" strokeWidth="8"/>
          <circle cx="749" cy="1122" r="11" stroke="#007CAD" strokeWidth="6"/>
          <circle cx="807" cy="1069" r="11" stroke="#007CAD" strokeWidth="6"/>
          <circle cx="939" cy="1204" r="11" stroke="#007CAD" strokeWidth="6"/>
          <circle cx="1071" cy="1071" r="11" stroke="#007CAD" strokeWidth="6"/>
          <circle cx="1005" cy="951" r="11" stroke="#007CAD" strokeWidth="6"/>
          <circle cx="873" cy="972" r="11" stroke="#007CAD" strokeWidth="6"/>
          <circle cx="1137" cy="982" r="11" stroke="#007CAD" strokeWidth="6"/>
          <circle cx="1203" cy="1072" r="11" stroke="#007CAD" strokeWidth="6"/>
          <line x1="1203" y1="359" x2="1203" y2="109" stroke="url(#paint27_linear_36_966)" strokeWidth="8"/>
          <line y1="-4" x2="197" y2="-4" transform="matrix(0 -1 -1 0 1141 359)" stroke="url(#paint28_linear_36_966)" strokeWidth="8"/>
          <line y1="-4" x2="200" y2="-4" transform="matrix(0 -1 -1 0 745 359)" stroke="url(#paint29_linear_36_966)" strokeWidth="8"/>
          <line y1="-4" x2="200" y2="-4" transform="matrix(0 -1 -1 0 877 359)" stroke="url(#paint30_linear_36_966)" strokeWidth="8"/>
          <line y1="-4" x2="100" y2="-4" transform="matrix(0 -1 -1 0 1075 359)" stroke="url(#paint31_linear_36_966)" strokeWidth="8"/>
          <line y1="-4" x2="110" y2="-4" transform="matrix(0 -1 -1 0 811 359)" stroke="url(#paint32_linear_36_966)" strokeWidth="8"/>
          <line y1="-4" x2="80" y2="-4" transform="matrix(0 -1 -1 0 943 359)" stroke="url(#paint33_linear_36_966)" strokeWidth="8"/>
          <line y1="-4" x2="332" y2="-4" transform="matrix(0 -1 -1 0 1009 359)" stroke="url(#paint34_linear_36_966)" strokeWidth="8"/>
          <circle cx="1203" cy="96" r="11" transform="rotate(180 1203 96)" stroke="#007CAD" strokeWidth="6"/>
          <circle cx="1145" cy="150" r="11" transform="rotate(180 1145 150)" stroke="#007CAD" strokeWidth="6"/>
          <circle cx="1013" cy="14" r="11" transform="rotate(180 1013 14)" stroke="#007CAD" strokeWidth="6"/>
          <circle cx="881" cy="147" r="11" transform="rotate(180 881 147)" stroke="#007CAD" strokeWidth="6"/>
          <circle cx="947" cy="267" r="11" transform="rotate(180 947 267)" stroke="#007CAD" strokeWidth="6"/>
          <circle cx="1079" cy="247" r="11" transform="rotate(180 1079 247)" stroke="#007CAD" strokeWidth="6"/>
          <circle cx="815" cy="236" r="11" transform="rotate(180 815 236)" stroke="#007CAD" strokeWidth="6"/>
          <circle cx="749" cy="146" r="11" transform="rotate(180 749 146)" stroke="#007CAD" strokeWidth="6"/>
          
          {/* SVG Definitions */}
          <defs>
            <filter id="filter0_d_36_966" x="698.1" y="335.1" width="555.8" height="555.8" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feMorphology radius="6" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_36_966"/>
              <feOffset dy="4"/>
              <feGaussianBlur stdDeviation="10.95"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.716155 0 0 0 0 0.999286 0 0 0 0.19 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_36_966"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_36_966" result="shape"/>
            </filter>
            <filter id="filter1_d_36_966" x="65" y="903" width="97" height="97" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feMorphology radius="6" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_36_966"/>
              <feOffset/>
              <feGaussianBlur stdDeviation="5"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_36_966"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_36_966" result="shape"/>
            </filter>
            <filter id="filter2_d_36_966" x="0" y="221" width="97" height="97" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feMorphology radius="6" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_36_966"/>
              <feOffset/>
              <feGaussianBlur stdDeviation="5"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_36_966"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_36_966" result="shape"/>
            </filter>
            <filter id="filter3_d_36_966" x="1776" y="221" width="97" height="97" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feMorphology radius="6" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_36_966"/>
              <feOffset/>
              <feGaussianBlur stdDeviation="5"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_36_966"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_36_966" result="shape"/>
            </filter>
            <filter id="filter4_d_36_966" x="1856" y="774" width="97" height="97" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feMorphology radius="6" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_36_966"/>
              <feOffset/>
              <feGaussianBlur stdDeviation="5"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_36_966"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_36_966" result="shape"/>
            </filter>
            <radialGradient id="paint0_radial_36_966" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(976 609) rotate(90) scale(250)">
              <stop offset="0.235577" stopColor="#001422"/>
              <stop offset="1" stopColor="#000C11"/>
            </radialGradient>
            <linearGradient id="paint1_linear_36_966" x1="0" y1="0.5" x2="401.5" y2="0.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#003347"/>
              <stop offset="1" stopColor="#007CAD"/>
            </linearGradient>
            <linearGradient id="paint2_linear_36_966" x1="0" y1="0.5" x2="215" y2="0.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#003347"/>
              <stop offset="1" stopColor="#007CAD"/>
            </linearGradient>
            <linearGradient id="paint3_linear_36_966" x1="0" y1="0.5" x2="198" y2="0.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#003347"/>
              <stop offset="1" stopColor="#007CAD"/>
            </linearGradient>
            <linearGradient id="paint4_linear_36_966" x1="0" y1="0.5" x2="99" y2="0.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#003347"/>
              <stop offset="1" stopColor="#007CAD"/>
            </linearGradient>
            <linearGradient id="paint5_linear_36_966" x1="0" y1="0.5" x2="285" y2="0.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#003347"/>
              <stop offset="1" stopColor="#007CAD"/>
            </linearGradient>
            <linearGradient id="paint6_linear_36_966" x1="0" y1="0.5" x2="108" y2="0.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#003347"/>
              <stop offset="1" stopColor="#007CAD"/>
            </linearGradient>
            <linearGradient id="paint7_linear_36_966" x1="0" y1="0.5" x2="199" y2="0.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#003347"/>
              <stop offset="1" stopColor="#007CAD"/>
            </linearGradient>
            <linearGradient id="paint8_linear_36_966" x1="0" y1="0.5" x2="136" y2="0.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#003347"/>
              <stop offset="1" stopColor="#007CAD"/>
            </linearGradient>
            <linearGradient id="paint9_linear_36_966" x1="0" y1="0.5" x2="332" y2="0.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#003347"/>
              <stop offset="1" stopColor="#007CAD"/>
            </linearGradient>
            <linearGradient id="paint10_linear_36_966" x1="1226" y1="442.499" x2="1624" y2="442.499" gradientUnits="userSpaceOnUse">
              <stop stopColor="#003347"/>
              <stop offset="1" stopColor="#007CAD"/>
            </linearGradient>
            <linearGradient id="paint11_linear_36_966" x1="1226" y1="499.499" x2="1406.01" y2="499.499" gradientUnits="userSpaceOnUse">
              <stop stopColor="#003347"/>
              <stop offset="1" stopColor="#007CAD"/>
            </linearGradient>
            <linearGradient id="paint12_linear_36_966" x1="1226" y1="841.499" x2="1406.01" y2="841.499" gradientUnits="userSpaceOnUse">
              <stop stopColor="#003347"/>
              <stop offset="1" stopColor="#007CAD"/>
            </linearGradient>
            <linearGradient id="paint13_linear_36_966" x1="1226" y1="556.499" x2="1510" y2="556.499" gradientUnits="userSpaceOnUse">
              <stop stopColor="#003347"/>
              <stop offset="1" stopColor="#007CAD"/>
            </linearGradient>
            <linearGradient id="paint14_linear_36_966" x1="1226" y1="613.499" x2="1457" y2="613.499" gradientUnits="userSpaceOnUse">
              <stop stopColor="#003347"/>
              <stop offset="1" stopColor="#007CAD"/>
            </linearGradient>
            <linearGradient id="paint15_linear_36_966" x1="1226" y1="785.5" x2="1457" y2="785.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#003347"/>
              <stop offset="1" stopColor="#007CAD"/>
            </linearGradient>
            <linearGradient id="paint16_linear_36_966" x1="1227" y1="670.5" x2="1342" y2="670.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#003347"/>
              <stop offset="1" stopColor="#007CAD"/>
            </linearGradient>
            <linearGradient id="paint17_linear_36_966" x1="1226" y1="385.5" x2="1341" y2="385.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#003347"/>
              <stop offset="1" stopColor="#007CAD"/>
            </linearGradient>
            <linearGradient id="paint18_linear_36_966" x1="1227" y1="728.5" x2="1559" y2="728.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#003347"/>
              <stop offset="1" stopColor="#007CAD"/>
            </linearGradient>
            <linearGradient id="paint19_linear_36_966" x1="744.5" y1="859" x2="744.5" y2="1109" gradientUnits="userSpaceOnUse">
              <stop stopColor="#003347"/>
              <stop offset="1" stopColor="#007CAD"/>
            </linearGradient>
            <linearGradient id="paint20_linear_36_966" x1="0" y1="0.5" x2="197" y2="0.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#003347"/>
              <stop offset="1" stopColor="#007CAD"/>
            </linearGradient>
            <linearGradient id="paint21_linear_36_966" x1="0" y1="0.5" x2="200" y2="0.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#003347"/>
              <stop offset="1" stopColor="#007CAD"/>
            </linearGradient>
            <linearGradient id="paint22_linear_36_966" x1="0" y1="0.5" x2="200" y2="0.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#003347"/>
              <stop offset="1" stopColor="#007CAD"/>
            </linearGradient>
            <linearGradient id="paint23_linear_36_966" x1="0" y1="0.5" x2="100" y2="0.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#003347"/>
              <stop offset="1" stopColor="#007CAD"/>
            </linearGradient>
            <linearGradient id="paint24_linear_36_966" x1="0" y1="0.5" x2="110" y2="0.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#003347"/>
              <stop offset="1" stopColor="#007CAD"/>
            </linearGradient>
            <linearGradient id="paint25_linear_36_966" x1="0" y1="0.5" x2="80" y2="0.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#003347"/>
              <stop offset="1" stopColor="#007CAD"/>
            </linearGradient>
            <linearGradient id="paint26_linear_36_966" x1="0" y1="0.5" x2="332" y2="0.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#003347"/>
              <stop offset="1" stopColor="#007CAD"/>
            </linearGradient>
            <linearGradient id="paint27_linear_36_966" x1="1207.5" y1="359" x2="1207.5" y2="109" gradientUnits="userSpaceOnUse">
              <stop stopColor="#003347"/>
              <stop offset="1" stopColor="#007CAD"/>
            </linearGradient>
            <linearGradient id="paint28_linear_36_966" x1="0" y1="0.5" x2="197" y2="0.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#003347"/>
              <stop offset="1" stopColor="#007CAD"/>
            </linearGradient>
            <linearGradient id="paint29_linear_36_966" x1="0" y1="0.5" x2="200" y2="0.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#003347"/>
              <stop offset="1" stopColor="#007CAD"/>
            </linearGradient>
            <linearGradient id="paint30_linear_36_966" x1="0" y1="0.5" x2="200" y2="0.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#003347"/>
              <stop offset="1" stopColor="#007CAD"/>
            </linearGradient>
            <linearGradient id="paint31_linear_36_966" x1="0" y1="0.5" x2="100" y2="0.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#003347"/>
              <stop offset="1" stopColor="#007CAD"/>
            </linearGradient>
            <linearGradient id="paint32_linear_36_966" x1="0" y1="0.5" x2="110" y2="0.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#003347"/>
              <stop offset="1" stopColor="#007CAD"/>
            </linearGradient>
            <linearGradient id="paint33_linear_36_966" x1="0" y1="0.5" x2="80" y2="0.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#003347"/>
              <stop offset="1" stopColor="#007CAD"/>
            </linearGradient>
            <linearGradient id="paint34_linear_36_966" x1="0" y1="0.5" x2="332" y2="0.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#003347"/>
              <stop offset="1" stopColor="#007CAD"/>
            </linearGradient>
          </defs>
          </svg>
          
          {/* Text labels positioned absolutely relative to SVG */}
          <div className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
            <a
              href="resources/Arcturus_Investor_Whitepaper.pdf"
              download="Arcturus_Investor_Whitepaper.pdf"
              className="absolute pointer-events-auto text-white cursor-pointer transition-opacity select-none text-center no-underline"
              style={{ 
                right: '100%',
                top: '78.1%',
                transform: 'translateY(-50%)',
                paddingRight: '20px',
                opacity: hoveredElement === 'white-circle-1' ? 1 : 0.3,
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '20px',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={() => setHoveredElement('white-circle-1')}
              onMouseLeave={() => setHoveredElement(null)}
            >
              HIGH-LEVEL<br/>WHITEPAPER
            </a>
            
            <a
              href="https://www.notion.so/Arcturus-Supporting-Evidence-2910a10ed172806f8d1cc5d7c8591ada?source=copy_link"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute pointer-events-auto text-white cursor-pointer transition-opacity select-none text-center no-underline"
              style={{ 
                right: '100%',
                top: '22.1%',
                transform: 'translateY(-50%)',
                paddingRight: '20px',
                opacity: hoveredElement === 'white-circle-2' ? 1 : 0.3,
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '20px',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={() => setHoveredElement('white-circle-2')}
              onMouseLeave={() => setHoveredElement(null)}
            >
              SUPPORTING<br />EVIDENCE
            </a>
            
            <div 
              className="absolute pointer-events-auto text-white cursor-pointer transition-opacity select-none text-center"
              style={{ 
                left: '100%',
                top: '22.1%',
                transform: 'translateY(-50%)',
                paddingLeft: '5px',
                opacity: hoveredElement === 'white-circle-3' ? 0.4 : 0.3,
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '20px',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={() => setHoveredElement('white-circle-3')}
              onMouseLeave={() => setHoveredElement(null)}
            >
              CASE<br />STUDY
            </div>
            
            <a
              href="resources/Arcturus_EOI.pdf"
              download="Arcturus_EOI.pdf"
              className="absolute pointer-events-auto text-white cursor-pointer transition-opacity select-none text-center no-underline"
              style={{ 
                left: '100%',
                top: '67.5%',
                transform: 'translateY(-50%)',
                paddingLeft: '20px',
                opacity: hoveredElement === 'white-circle-4' ? 1 : 0.3,
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '20px',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={() => setHoveredElement('white-circle-4')}
              onMouseLeave={() => setHoveredElement(null)}
            >
              EOI FORM
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Arcturus;