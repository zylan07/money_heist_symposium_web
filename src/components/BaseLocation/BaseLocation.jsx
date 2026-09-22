import React from 'react';
import { useInViewAnimation } from '../../hooks/useInViewAnimation';
import { MOTION_EASING } from '../../utils/motion';
import RollingText from '../Hero/RollingText';

export default function BaseLocation() {
  const [sectionRef, inView] = useInViewAnimation({ threshold: 0.15 });

  return (
    <section
      ref={sectionRef}
      id="base-location"
      className="w-full relative bg-[#08080a]/25 text-[#e5e1e4] border-t border-[#1c1b1e]/60 py-14 sm:py-20 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_45%,rgba(255,30,39,0.06)_0%,transparent_70%)]" />

      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative z-10 flex flex-col items-center">
        {/* Header */}
        <div
          className="flex flex-col items-center text-center space-y-3 mb-12 transition-[opacity,transform] duration-700 will-change-[transform,opacity]"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transitionTimingFunction: MOTION_EASING.cinematic,
          }}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ff1e27] animate-pulse" />
            <span className="font-label-sm text-xs tracking-[0.3em] uppercase text-[#ff1e27] font-bold">
              05 // BASE LOCATION
            </span>
          </div>
          <h2 className="font-headline-lg text-3xl min-[360px]:text-4xl sm:text-6xl lg:text-7xl text-white uppercase tracking-[0.06em] leading-none drop-shadow-[0_8px_30px_rgba(0,0,0,0.8)]">
            <RollingText
              text="BASE LOCATION."
              active={inView}
              isComplete={inView}
              duration={0.7}
              stagger={0.025}
            />
          </h2>
          <p className="font-code-md text-xs sm:text-sm tracking-[0.24em] text-[#ffdad6]/80 uppercase">
            KPR INSTITUTE OF ENGINEERING AND TECHNOLOGY // COIMBATORE, TAMIL NADU
          </p>
          <div className="inline-flex items-center gap-2.5 bg-[#141418] border border-[#24242c] px-4 py-1.5 rounded-sm mt-1 shadow-sm">
            <span className="material-symbols-outlined text-[14px] text-[#ff544b]">my_location</span>
            <span className="font-code-md text-[11px] text-[#c8c5ca] tracking-[0.2em] uppercase font-semibold">
              REAL COORDINATES: 11.0827° N, 77.1408° E
            </span>
          </div>
        </div>

        {/* Tactical Dark Vector Map Viewport — Widescreen Cinematic Cartography */}
        <div
          className="relative w-full h-[520px] sm:h-[600px] lg:h-[640px] bg-[#0c0c0e] border border-[#262630] rounded-lg overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)] group select-none transition-all duration-1000 mb-8"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'scale(1)' : 'scale(0.98)',
            transitionTimingFunction: MOTION_EASING.cinematic,
          }}
        >
          {/* Subtle Grid Coordinates Background */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
            style={{
              opacity: inView ? 0.35 : 0.05,
              backgroundImage:
                'linear-gradient(#1a1a22 1px, transparent 1px), linear-gradient(90deg, #1a1a22 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              transitionDelay: '200ms',
            }}
          />

          {/* Real KPRIET Campus Tactical Vector Map SVG */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-90"
            preserveAspectRatio="none"
            viewBox="0 0 1000 600"
          >
            <defs>
              <linearGradient id="nh544-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e1e26" />
                <stop offset="35%" stopColor="#ff1e27" stopOpacity="0.45" />
                <stop offset="70%" stopColor="#252430" />
              </linearGradient>
            </defs>

            {/* Latitude & Longitude Reference Grid Lines */}
            <line
              x1="0" y1="140" x2="1000" y2="140"
              stroke="#1b1b22" strokeWidth="1" strokeDasharray="4 4"
              className="transition-opacity duration-700"
              style={{ opacity: inView ? 0.8 : 0, transitionDelay: '200ms' }}
            />
            <line
              x1="0" y1="360" x2="1000" y2="360"
              stroke="#1b1b22" strokeWidth="1" strokeDasharray="4 4"
              className="transition-opacity duration-700"
              style={{ opacity: inView ? 0.8 : 0, transitionDelay: '250ms' }}
            />
            <line
              x1="260" y1="0" x2="260" y2="600"
              stroke="#1b1b22" strokeWidth="1" strokeDasharray="4 4"
              className="transition-opacity duration-700"
              style={{ opacity: inView ? 0.8 : 0, transitionDelay: '300ms' }}
            />
            <line
              x1="760" y1="0" x2="760" y2="600"
              stroke="#1b1b22" strokeWidth="1" strokeDasharray="4 4"
              className="transition-opacity duration-700"
              style={{ opacity: inView ? 0.8 : 0, transitionDelay: '350ms' }}
            />

            {/* Real OpenStreetMap Geometry: NH 544 Avinashi Road (Salem-Kochi 6-Lane Highway) */}
            {/* South Service Road */}
            <path
              d="M -40 485 L 1040 265"
              fill="none"
              stroke="#1a1a24"
              strokeWidth="6"
            />
            {/* Main 6-Lane Carriageway */}
            <path
              d="M -40 460 L 1040 240"
              fill="none"
              stroke="#171720"
              strokeWidth="24"
              style={{
                strokeDasharray: 1400,
                strokeDashoffset: inView ? 0 : 1400,
                transition: `stroke-dashoffset 1300ms ${MOTION_EASING.cinematic} 300ms`,
              }}
            />
            {/* Highway Central Median Glow */}
            <path
              d="M -40 460 L 1040 240"
              fill="none"
              stroke="url(#nh544-glow)"
              strokeWidth="3.5"
              style={{
                strokeDasharray: 1400,
                strokeDashoffset: inView ? 0 : 1400,
                transition: `stroke-dashoffset 1300ms ${MOTION_EASING.cinematic} 350ms`,
              }}
            />
            {/* Lane Dash Markers */}
            <path
              d="M -40 460 L 1040 240"
              fill="none"
              stroke="#ff1e27"
              strokeWidth="1.2"
              strokeDasharray="8 12"
              strokeOpacity="0.65"
              style={{
                strokeDasharray: 1400,
                strokeDashoffset: inView ? 0 : 1400,
                transition: `stroke-dashoffset 1300ms ${MOTION_EASING.cinematic} 400ms`,
              }}
            />
            {/* North Service Road */}
            <path
              d="M -40 435 L 1040 215"
              fill="none"
              stroke="#1a1a24"
              strokeWidth="6"
            />

            {/* Arasur Junction branching Northwest towards Annur */}
            <path
              d="M 280 400 C 260 300, 220 180, 150 0"
              fill="none"
              stroke="#20202a"
              strokeWidth="5"
              style={{
                strokeDasharray: 500,
                strokeDashoffset: inView ? 0 : 500,
                transition: `stroke-dashoffset 900ms ${MOTION_EASING.cinematic} 550ms`,
              }}
            />

            {/* Somanur Road branching Southeast towards Somanur Railway Station */}
            <path
              d="M 660 315 C 690 420, 740 510, 800 600"
              fill="none"
              stroke="#20202a"
              strokeWidth="4.5"
              style={{
                strokeDasharray: 500,
                strokeDashoffset: inView ? 0 : 500,
                transition: `stroke-dashoffset 900ms ${MOTION_EASING.cinematic} 600ms`,
              }}
            />

            {/* Real KPRIET Campus Outer Perimeter Polygon Boundary */}
            <polygon
              points="380,350 370,110 470,80 660,85 670,290 540,315"
              fill="#111116"
              stroke="#ff1e27"
              strokeWidth="1.5"
              strokeDasharray="5 3"
              strokeOpacity={inView ? 0.6 : 0}
              className="transition-all duration-1000"
              style={{ opacity: inView ? 1 : 0, transitionDelay: '650ms' }}
            />

            {/* Campus Internal Ring Road */}
            <path
              d="M 505 320 C 560 310, 630 270, 640 180 C 640 115, 570 100, 480 100 C 400 100, 390 160, 400 250 C 410 305, 460 320, 505 320"
              fill="none"
              stroke="#22222e"
              strokeWidth="3.5"
              style={{
                strokeDasharray: 800,
                strokeDashoffset: inView ? 0 : 800,
                transition: `stroke-dashoffset 1000ms ${MOTION_EASING.cinematic} 700ms`,
              }}
            />

            {/* Real KPRIET Academic Building Footprints */}
            {/* 1. Administrative Block & Library */}
            <rect x="465" y="225" width="80" height="38" rx="2" fill="#181822" stroke="#2d2d3c" strokeWidth="1.2" />
            {/* 2. G-Block Auditorium (The Tactical Symposium Venue) */}
            <rect
              x="490" y="165" width="60" height="42" rx="2"
              fill="#221517" stroke="#ff1e27" strokeWidth="1.6"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(255, 30, 39, 0.4))'
              }}
            />
            {/* 3. CSE Dept & Computing Labs */}
            <rect x="565" y="170" width="55" height="34" rx="2" fill="#181822" stroke="#2d2d3c" strokeWidth="1.2" />
            {/* 4. Thanam Hall */}
            <rect x="420" y="170" width="50" height="34" rx="2" fill="#181822" stroke="#2d2d3c" strokeWidth="1.2" />
            {/* 5. Mechanical & Civil Engineering Labs */}
            <rect x="430" y="115" width="75" height="30" rx="2" fill="#15151c" stroke="#262634" strokeWidth="1" />
            {/* 6. Sports Ground / Arena */}
            <ellipse cx="400" cy="180" rx="22" ry="34" fill="none" stroke="#1f1f28" strokeWidth="1" strokeDasharray="3 3" />

            {/* Campus Main Gate Entrance from NH 544 Service Road */}
            <path d="M 505 350 L 505 320" fill="none" stroke="#ff1e27" strokeWidth="2.5" />
            <circle cx="505" cy="350" r="3" fill="#ff1e27" />

            {/* Map Typography & Real Highway Identification */}
            <text
              x="110" y="470"
              fill="#909099" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="2"
              transform="rotate(-12 110 470)"
              className="transition-opacity duration-700"
              style={{ opacity: inView ? 0.85 : 0, transitionDelay: '750ms' }}
            >
              ← COIMBATORE CITY / KMCH / AIRPORT (12 KM)
            </text>
            <text
              x="520" y="380"
              fill="#ffdad6" fontFamily="JetBrains Mono" fontSize="10" letterSpacing="2" font-weight="bold"
              transform="rotate(-12 520 380)"
              className="transition-opacity duration-700"
              style={{ opacity: inView ? 0.95 : 0, transitionDelay: '800ms' }}
            >
              AVINASHI ROAD // SALEM-KOCHI HIGHWAY (NH 544)
            </text>
            <text
              x="830" y="310"
              fill="#909099" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="2"
              transform="rotate(-12 830 310)"
              className="transition-opacity duration-700"
              style={{ opacity: inView ? 0.85 : 0, transitionDelay: '850ms' }}
            >
              KARUMATHAMPATTI / SALEM →
            </text>

            <text
              x="170" y="240"
              fill="#6e6d78" fontFamily="JetBrains Mono" fontSize="8" letterSpacing="1.5"
              transform="rotate(-40 170 240)"
            >
              ARASUR - ANNUR ROAD
            </text>

            {/* Building Identification Labels */}
            <text
              x="520" y="160"
              fill="#ff544b" fontFamily="JetBrains Mono" fontSize="8" letterSpacing="1.5" font-weight="bold"
              textAnchor="middle"
              className="transition-opacity duration-700"
              style={{ opacity: inView ? 1 : 0, transitionDelay: '900ms' }}
            >
              [ DEPT OF CSE & D BLOCK // EVENT VENUES ]
            </text>
            <text
              x="505" y="247"
              fill="#909099" fontFamily="JetBrains Mono" fontSize="7.5" letterSpacing="1"
              textAnchor="middle"
            >
              CENTRAL ADMIN & LIBRARY
            </text>
            <text
              x="505" y="312"
              fill="#c8c5ca" fontFamily="JetBrains Mono" fontSize="7.5" letterSpacing="1"
              textAnchor="middle"
            >
              MAIN ENTRANCE GATE
            </text>

            {/* Concentric Tactical Radar Rings Centered on G-Block Auditorium */}
            <circle
              cx="520" cy="186" r="35" fill="none" stroke="#ff1e27" strokeWidth="1"
              strokeOpacity={inView ? 0.35 : 0}
              className="transition-opacity duration-700"
              style={{ transitionDelay: '850ms' }}
            />
            <circle
              cx="520" cy="186" r="75" fill="none" stroke="#ff1e27" strokeWidth="1"
              strokeOpacity={inView ? 0.20 : 0}
              className="transition-opacity duration-700"
              style={{ transitionDelay: '900ms' }}
            />
            <circle
              cx="520" cy="186" r="125" fill="none" stroke="#ff1e27" strokeWidth="1"
              strokeOpacity={inView ? 0.10 : 0}
              className="transition-opacity duration-700"
              style={{ transitionDelay: '950ms' }}
            />
          </svg>

          {/* Pulsing Crimson Target Location Marker over G-Block */}
          <div
            className="absolute top-[31%] left-[52%] -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center transition-all duration-700"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.6)',
              transitionDelay: '900ms',
              transitionTimingFunction: MOTION_EASING.cinematic,
            }}
          >
            <div className="relative flex items-center justify-center">
              <span className="absolute w-14 h-14 rounded-full bg-[#ff1e27]/25 animate-ping" />
              <span className="absolute w-7 h-7 rounded-full bg-[#ff1e27]/50 animate-pulse" />
              <span className="relative w-3.5 h-3.5 rounded-full bg-[#ff1e27] shadow-[0_0_15px_#ff1e27] border-2 border-white" />
            </div>
          </div>

          {/* Real Compass Rose Indicator (Top Left) */}
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-[#121216]/90 border border-[#26252d] px-3 py-1.5 rounded text-[10px] font-code-md text-[#909099] tracking-wider uppercase backdrop-blur-sm">
            <span className="text-[#ff544b] font-bold">▲ N</span>
            <span className="text-neutral-500">|</span>
            <span>SCALE: 1:5000</span>
          </div>

          {/* Sector & Verified Telemetry Badge (Top Right) */}
          <div
            className="absolute top-4 right-4 flex items-center gap-2 bg-[#121216]/90 border border-[#26252d] px-3 py-1.5 rounded text-[10px] font-code-md text-[#909099] tracking-wider uppercase backdrop-blur-sm transition-opacity duration-700"
            style={{ opacity: inView ? 1 : 0, transitionDelay: '500ms' }}
          >
            <span>ARASUR SECTOR // NH 544</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          {/* Floating Campus Intel Card */}
          <div
            className="absolute bottom-2 left-2 sm:bottom-6 sm:left-6 max-w-[calc(100%-1rem)] sm:max-w-md w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] bg-[#100f14]/95 border border-[#2d2d35] rounded p-3.5 sm:p-5 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-20 transition-all duration-800"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(16px)',
              transitionDelay: '750ms',
              transitionTimingFunction: MOTION_EASING.cinematic,
            }}
          >
            <div className="flex items-center justify-between border-b border-[#212127] pb-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ff1e27] animate-pulse" />
                <span className="font-label-sm text-[10px] tracking-[0.2em] text-[#ff544b] uppercase font-bold">
                  BASE LOCATION // VENUE
                </span>
              </div>
              <span className="font-code-md text-[9px] tracking-widest text-[#909099] uppercase">
                KPRIET CAMPUS
              </span>
            </div>

            {/* Institution & Location */}
            <div className="mb-3">
              <h4 className="font-headline-sm text-lg sm:text-xl text-white uppercase tracking-[0.05em] leading-snug">
                KPR INSTITUTE OF ENGINEERING AND TECHNOLOGY
              </h4>
              <p className="font-code-md text-[11px] text-[#c8c5ca] mt-0.5 tracking-wider uppercase">
                COIMBATORE, TAMIL NADU
              </p>
            </div>

            {/* Single Venue Card */}
            <div className="pt-2.5 border-t border-[#1c1b22]">
              <div className="bg-[#16151c] border border-[#2c2b38] p-3.5 rounded">
                <span className="block font-code-md text-[9px] text-[#ff544b] font-bold uppercase tracking-widest">
                  VENUE
                </span>
                <span className="block font-headline-sm text-base sm:text-lg text-white uppercase tracking-wide mt-1">
                  DEPARTMENT OF CSE
                </span>
                <div className="mt-1.5 pt-1.5 border-t border-[#22212b]">
                  <span className="block font-headline-sm text-sm text-[#ffdad6] uppercase tracking-wide">
                    D BLOCK
                  </span>
                  <span className="block font-body-sm text-xs text-[#a09ca8] uppercase tracking-wider mt-0.5">
                    NEAR SYMPHONY AMPHITHEATRE
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 py-2 mt-2.5 border-t border-[#1c1b1e] font-code-md text-[10px] tracking-wider text-[#ffdad6]/80 uppercase">
              <span>14 — 15 OCTOBER 2026</span>
              <span className="text-[#a09ca8]">OFFICIAL VENUE</span>
            </div>

            <div className="mt-2 pt-1">
              <a
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#ff1e27] text-white hover:brightness-110 font-code-md text-xs uppercase tracking-[0.16em] transition-[filter,box-shadow] shadow-[0_0_15px_rgba(255,30,39,0.35)] w-full text-center font-semibold"
                href="https://maps.google.com/?q=KPR+Institute+of+Engineering+and+Technology+Coimbatore"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>OPEN IN GOOGLE MAPS</span>
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>
            </div>
          </div>
        </div>

        {/* Dedicated Campus Map Actions & Official PDF Access */}
        <div
          className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 p-5 sm:p-6 bg-[#111016] border border-[#2d2d38] rounded-lg shadow-lg transition-[opacity,transform] duration-700 will-change-[transform,opacity]"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(16px)',
            transitionDelay: '850ms',
            transitionTimingFunction: MOTION_EASING.cinematic,
          }}
        >
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ff544b] text-base">map</span>
              <span className="font-code-md text-xs uppercase tracking-[0.2em] text-[#ffdad6] font-bold">
                OFFICIAL COLLEGE STREET MAP
              </span>
            </div>
            <p className="font-body-sm text-xs sm:text-sm text-[#b0aeb8] mt-1 leading-relaxed max-w-xl">
              View the complete campus map to locate event blocks, gates, roads and walkways.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* VIEW CAMPUS MAP Button opening the official PDF */}
            <a
              id="view-campus-map-btn"
              href="/campus-map.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#ff1e27] text-white hover:brightness-110 font-headline-sm text-base uppercase tracking-[0.14em] transition-[filter,box-shadow] shadow-[0_0_20px_rgba(255,30,39,0.4)] w-full sm:w-auto text-center font-semibold"
            >
              <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
              <span>VIEW CAMPUS MAP</span>
            </a>

            {/* Secondary Google Maps Navigation */}
            <a
              href="https://maps.google.com/?q=KPR+Institute+of+Engineering+and+Technology+Coimbatore"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#18171f] hover:bg-[#201f2b] border border-[#383746] text-[#d4d1da] hover:text-white font-code-md text-xs uppercase tracking-wider transition-colors w-full sm:w-auto text-center"
            >
              <span>GOOGLE MAPS</span>
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
