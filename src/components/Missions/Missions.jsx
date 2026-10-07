import React, { useRef, useState, useEffect } from 'react';
import CircularMissionCarousel from './CircularMissionCarousel';
import { useInViewAnimation } from '../../hooks/useInViewAnimation';
import RollingText from '../Hero/RollingText';
import gfgLogo from '../../assets/geeksforgeeks.png';

// Stylized Banknote visual for the cinematic Money Heist celebration
function StylizedBanknote({ className, style }) {
  return (
    <svg
      viewBox="0 0 120 64"
      className={className}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Paper Base */}
      <rect x="1" y="1" width="118" height="62" rx="3" fill="#0f2317" stroke="#2f8d46" strokeWidth="1.5" />
      {/* Inner Decorative Border */}
      <rect x="4" y="4" width="112" height="56" rx="2" fill="#143020" stroke="#48bb78" strokeWidth="0.8" strokeDasharray="3 1.5" />
      {/* Corner Filigree Markers */}
      <circle cx="10" cy="10" r="3" fill="#2f8d46" opacity="0.6" />
      <circle cx="110" cy="10" r="3" fill="#2f8d46" opacity="0.6" />
      <circle cx="10" cy="54" r="3" fill="#2f8d46" opacity="0.6" />
      <circle cx="110" cy="54" r="3" fill="#2f8d46" opacity="0.6" />
      {/* Central Guilloche Ellipse */}
      <ellipse cx="60" cy="32" rx="28" ry="18" stroke="#48bb78" strokeWidth="1" fill="#0d1f14" opacity="0.9" />
      <ellipse cx="60" cy="32" rx="22" ry="13" stroke="#22543d" strokeWidth="0.8" strokeDasharray="2 1" />
      {/* Central Heist Denomination */}
      <text x="60" y="36" textAnchor="middle" fill="#9ae6b4" fontSize="13" fontFamily="monospace" fontWeight="bold" letterSpacing="0.1em">
        100
      </text>
      {/* Corner Denominations */}
      <text x="14" y="20" fill="#9ae6b4" fontSize="8" fontFamily="monospace" fontWeight="bold">100</text>
      <text x="106" y="50" textAnchor="end" fill="#9ae6b4" fontSize="8" fontFamily="monospace" fontWeight="bold">100</text>
      {/* Top Banner */}
      <text x="60" y="12" textAnchor="middle" fill="#68d391" fontSize="5" fontFamily="monospace" letterSpacing="0.15em" opacity="0.85">
        TECHBYTE SUMMIT
      </text>
      {/* Gold Security Thread */}
      <line x1="38" y1="4" x2="38" y2="60" stroke="#ffd700" strokeWidth="1" strokeDasharray="4 2" opacity="0.75" />
    </svg>
  );
}

const CELEBRATION_NOTES = [
  { dx: -220, dy: -260, rx: 280, ry: -210, rz: -35, delay: 40, dur: 1.6, scale: 0.95 },
  { dx: 210, dy: -280, rx: -220, ry: 260, rz: 42, delay: 80, dur: 1.7, scale: 1.05 },
  { dx: -100, dy: -310, rx: 190, ry: 310, rz: -18, delay: 0, dur: 1.5, scale: 1.1 },
  { dx: 95, dy: -300, rx: -310, ry: -190, rz: 22, delay: 110, dur: 1.6, scale: 0.9 },
  { dx: -260, dy: -190, rx: 140, ry: -340, rz: -50, delay: 140, dur: 1.8, scale: 0.85 },
  { dx: 250, dy: -200, rx: -160, ry: 330, rz: 48, delay: 60, dur: 1.75, scale: 0.95 },
  { dx: -45, dy: -340, rx: 340, ry: 180, rz: -10, delay: 90, dur: 1.85, scale: 1.15 },
  { dx: 40, dy: -350, rx: -270, ry: -240, rz: 15, delay: 120, dur: 1.8, scale: 1.0 },
  { dx: -160, dy: -280, rx: 210, ry: -170, rz: -28, delay: 160, dur: 1.65, scale: 0.9 },
  { dx: 170, dy: -260, rx: -190, ry: 220, rz: 32, delay: 180, dur: 1.7, scale: 1.0 },
  { dx: -300, dy: -150, rx: 170, ry: 290, rz: -65, delay: 200, dur: 1.9, scale: 0.8 },
  { dx: 290, dy: -160, rx: -240, ry: -280, rz: 58, delay: 150, dur: 1.85, scale: 0.85 },
  { dx: -70, dy: -230, rx: 320, ry: -210, rz: -15, delay: 220, dur: 1.55, scale: 0.95 },
  { dx: 75, dy: -220, rx: -180, ry: 310, rz: 25, delay: 70, dur: 1.6, scale: 1.05 },
  { dx: -190, dy: -210, rx: 250, ry: 160, rz: -40, delay: 240, dur: 1.75, scale: 0.88 },
  { dx: 180, dy: -220, rx: -290, ry: -150, rz: 38, delay: 100, dur: 1.7, scale: 0.92 },
];

export default function Missions({ onSelectMission, activeMissionId }) {
  const [sectionRef, inView] = useInViewAnimation({ threshold: 0, rootMargin: '0px 0px -20px 0px' });
  const cardRef = useRef(null);
  const glareRef = useRef(null);

  // One-time money celebration state
  const [showMoney, setShowMoney] = useState(false);
  const moneyTriggeredRef = useRef(false);

  useEffect(() => {
    if (inView && !moneyTriggeredRef.current) {
      moneyTriggeredRef.current = true;
      setShowMoney(true);
      const timer = setTimeout(() => {
        setShowMoney(false);
      }, 2400);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  // Subtle physics-based 3D tilt interaction (Desktop only)
  const handleCardMouseMove = (e) => {
    if (typeof window !== 'undefined' && (window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches)) {
      return;
    }
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card) return;

    const bounds = card.getBoundingClientRect();
    const mouseX = e.clientX - bounds.left;
    const mouseY = e.clientY - bounds.top;
    const xPct = mouseX / bounds.width - 0.5;
    const yPct = mouseY / bounds.height - 0.5;

    const rotX = -(yPct * 6.0).toFixed(2);
    const rotY = (xPct * 7.5).toFixed(2);

    card.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.012, 1.012, 1.012)`;
    card.style.boxShadow = `${-rotY * 2.5}px ${rotX * 2.5 + 24}px 65px rgba(0, 0, 0, 0.9), 0 0 45px rgba(255, 30, 39, 0.35)`;

    if (glare) {
      const refX = Math.round((mouseX / bounds.width) * 100);
      const refY = Math.round((mouseY / bounds.height) * 100);
      glare.style.background = `radial-gradient(circle at ${refX}% ${refY}%, rgba(255, 30, 39, 0.22) 0%, rgba(255, 255, 255, 0.08) 25%, transparent 60%)`;
    }
  };

  const handleCardMouseEnter = () => {
    if (typeof window !== 'undefined' && (window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches)) {
      return;
    }
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.12s ease-out, box-shadow 0.12s ease-out';
    }
  };

  const handleCardMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.65s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.65s cubic-bezier(0.22, 1, 0.36, 1)';
      cardRef.current.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      cardRef.current.style.boxShadow = '0 20px 60px rgba(0,0,0,0.85), 0 0 35px rgba(255,30,39,0.2)';
    }
    if (glareRef.current) {
      glareRef.current.style.background = 'transparent';
    }
  };

  return (
    <section
      ref={sectionRef}
      id="missions"
      className={`w-full bg-[#08080a]/25 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative py-16 sm:py-24 transition-[opacity,transform] duration-700 will-change-[transform,opacity] overflow-x-clip ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
    >
      {/* Cinematic Soft Atmospheric Gradient Transitions (Top & Bottom fades) */}
      <div className="absolute top-0 inset-x-0 h-32 pointer-events-none bg-gradient-to-b from-[#08080a] via-[#08080a]/40 to-transparent z-0" />
      <div className="absolute bottom-0 inset-x-0 h-32 pointer-events-none bg-gradient-to-t from-[#08080a] via-[#08080a]/40 to-transparent z-0" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(255,30,39,0.04)_0%,transparent_70%)]" />
      <div className="w-full max-w-[1680px] mx-auto relative z-10">
        {/* Section Header */}
        <div
          className={`flex flex-col space-y-3 transition-[opacity,transform] duration-700 will-change-[transform,opacity] ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        >
          <div className="flex items-center gap-3">
            <span className="font-headline-lg text-5xl lg:text-6xl text-[#ff1e27] tracking-wider leading-none">
              02
            </span>
            <div className="flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[#ff1e27]/80" />
              <span className="font-label-sm text-xs tracking-[0.28em] text-[#ff1e27] uppercase font-bold">
                // MISSIONS
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-[#202026] pb-5">
            <h2 className="font-headline-lg text-white tracking-[0.06em] uppercase text-3xl min-[360px]:text-4xl sm:text-5xl lg:text-6xl">
              <RollingText
                text="CHOOSE YOUR MISSION."
                active={inView}
                isComplete={inView}
                duration={0.7}
                stagger={0.025}
              />
            </h2>
            <p className="font-code-md text-xs sm:text-sm tracking-[0.22em] uppercase text-[#c8c5ca]/80">
              SIX MISSIONS. TWO DAYS. ONE SUMMIT.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SPECIAL EVENT — 12-HOUR HACKATHON SPOTLIGHT CARD */}
        {/* ========================================================================= */}
        <div
          className="w-full my-10 sm:my-14 relative [perspective:1200px]"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1) 200ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 200ms'
          }}
        >
          {/* One-Time Cinematic Money Celebration Burst from the Card */}
          {showMoney && (
            <div
              aria-hidden="true"
              className="absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 pointer-events-none z-30 [perspective:1000px] overflow-visible"
            >
              {CELEBRATION_NOTES.map((note, idx) => (
                <div
                  key={idx}
                  className="absolute top-0 left-0 w-14 sm:w-20 h-8 sm:h-11 -ml-7 sm:-ml-10 -mt-4 sm:-mt-5 will-change-transform pointer-events-none"
                  style={{
                    animation: `moneyBurst ${note.dur}s cubic-bezier(0.12, 0.85, 0.32, 1) ${note.delay}ms forwards`,
                    '--dx': `${note.dx}px`,
                    '--dy': `${note.dy}px`,
                    '--rx': `${note.rx}deg`,
                    '--ry': `${note.ry}deg`,
                    '--rz': `${note.rz}deg`,
                    '--scale': note.scale,
                  }}
                >
                  <StylizedBanknote className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]" />
                </div>
              ))}
            </div>
          )}

          {/* Interactive 3D Tilt Card Frame */}
          <div
            ref={cardRef}
            onMouseMove={handleCardMouseMove}
            onMouseEnter={handleCardMouseEnter}
            onMouseLeave={handleCardMouseLeave}
            onClick={() => onSelectMission && onSelectMission('special-hackathon')}
            className="w-full relative bg-[#100e15]/95 border-2 border-[#ff1e27]/60 hover:border-[#ff1e27] rounded-lg p-6 sm:p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(255,30,39,0.2)] hover:shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_50px_rgba(255,30,39,0.35)] transition-shadow duration-300 cursor-pointer group overflow-hidden will-change-transform"
          >
            {/* Dynamic Cursor Specular Glare Layer */}
            <div
              ref={glareRef}
              className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-20"
            />

            {/* Background subtle radial spotlight */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,rgba(255,30,39,0.14)_0%,transparent_65%)]" />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom_left,rgba(47,141,70,0.1)_0%,transparent_60%)]" />

            {/* Industrial corner accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#ff1e27]" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#ff1e27]" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#ff1e27]" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#ff1e27]" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
              {/* Left Column (7 cols): Identity, Specs & Details */}
              <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-between space-y-4">
                {/* Header badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#ff1e27]/20 border border-[#ff1e27] text-[#ff544b] text-[11px] sm:text-xs font-code-md font-bold uppercase tracking-[0.22em] rounded">
                    <span className="w-2 h-2 rounded-full bg-[#ff1e27] animate-pulse" />
                    SPECIAL EVENT
                  </span>

                  <span className="font-code-md text-[11px] sm:text-xs text-[#ffdad6] bg-[#1d1720] border border-[#3b3240] px-3 py-1 rounded tracking-wider uppercase font-semibold">
                    OVERNIGHT CHALLENGE
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0e1c12] border border-[#2f8d46]/70 text-[#48bb78] text-[11px] sm:text-xs font-code-md font-bold uppercase tracking-wider rounded">
                    <img src={gfgLogo} alt="GeeksforGeeks" className="h-3.5 w-auto object-contain" />
                    POWERED BY GEEKSFORGEEKS
                  </span>
                </div>

                {/* Main Code Vault Title & Subtitles */}
                <div>
                  <h3 className="font-headline-lg text-4xl min-[400px]:text-5xl sm:text-6xl lg:text-7xl text-white tracking-[0.05em] uppercase leading-none drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)] group-hover:text-[#ffdad6] transition-colors">
                    CODE VAULT
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 sm:mt-2.5">
                    <span className="font-headline-sm text-base min-[400px]:text-lg sm:text-2xl text-[#ff544b] font-bold tracking-[0.20em] uppercase">
                      SOFTWARE EDITION
                    </span>
                    <span className="text-[#605d66] text-sm hidden min-[400px]:inline">•</span>
                    <span className="font-code-md text-xs sm:text-sm text-[#b0aeb8] tracking-[0.16em] uppercase font-semibold">
                      12-HOUR HACKATHON
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-[#ff9995] font-code-md text-xs sm:text-sm tracking-[0.14em] uppercase font-bold">
                    <span className="material-symbols-outlined text-[16px]">event_available</span>
                    <span>14 OCTOBER 2026 • 7:00 PM — 15 OCTOBER 2026 • 7:00 AM</span>
                  </div>
                </div>

                {/* Briefing Text */}
                <p className="font-body-md text-xs sm:text-sm text-[#cac5d0] leading-relaxed max-w-2xl">
                  A 12-hour software hackathon where teams work on an SDG-aligned real-world problem and build a working software solution during the official development window.
                </p>

                {/* Core Focus Badges */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-0.5">
                  <span className="font-code-md text-[9.5px] sm:text-[10px] text-[#ffdad6] bg-[#22161b] border border-[#ff1e27]/40 px-2.5 py-0.5 rounded uppercase font-semibold">
                    SOFTWARE-ONLY
                  </span>
                  <span className="font-code-md text-[9.5px] sm:text-[10px] text-[#90caf9] bg-[#0d1624] border border-[#1e324d] px-2.5 py-0.5 rounded uppercase font-semibold">
                    SDG-ALIGNED THEME
                  </span>
                  <span className="font-code-md text-[9.5px] sm:text-[10px] text-[#ffd166] bg-[#1c180d] border border-[#4a3f18] px-2.5 py-0.5 rounded uppercase font-semibold">
                    RANDOM PROBLEM ALLOCATION
                  </span>
                  <span className="font-code-md text-[9.5px] sm:text-[10px] text-[#a0aec0] bg-[#141419] border border-[#2d2d38] px-2.5 py-0.5 rounded uppercase font-semibold">
                    NO PRE-BUILT PROJECTS
                  </span>
                </div>

                {/* Key Specifications Row (3 uncrowded, responsive boxes) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 w-full">
                  <div className="p-3 bg-[#17141d] border border-[#2e2938] rounded flex items-center gap-3 min-w-0">
                    <span className="material-symbols-outlined text-[#ff544b] text-[20px] shrink-0">groups</span>
                    <div className="flex flex-col min-w-0">
                      <span className="font-code-md text-[9.5px] text-[#9a94a2] uppercase tracking-wider block">TEAM SIZE</span>
                      <span className="font-code-md text-xs sm:text-[13px] text-white font-bold uppercase block leading-tight">2–4 MEMBERS</span>
                    </div>
                  </div>

                  <div className="p-3 bg-[#17141d] border border-[#2e2938] rounded flex items-center gap-3 min-w-0">
                    <span className="material-symbols-outlined text-[#ff544b] text-[20px] shrink-0">laptop_mac</span>
                    <div className="flex flex-col min-w-0">
                      <span className="font-code-md text-[9.5px] text-[#9a94a2] uppercase tracking-wider block">EQUIPMENT</span>
                      <span className="font-code-md text-xs sm:text-[13px] text-white font-bold uppercase block leading-tight">OWN LAPTOP REQUIRED</span>
                    </div>
                  </div>

                  <div className="p-3 bg-[#17141d] border border-[#2f8d46]/50 rounded flex items-center gap-3 min-w-0">
                    <span className="material-symbols-outlined text-[#48bb78] text-[20px] shrink-0">wifi</span>
                    <div className="flex flex-col min-w-0">
                      <span className="font-code-md text-[9.5px] text-[#9ae6b4] uppercase tracking-wider block">CONNECTIVITY</span>
                      <span className="font-code-md text-xs sm:text-[13px] text-[#dcfce7] font-bold uppercase block leading-tight">WI-FI FACILITIES PROVIDED</span>
                    </div>
                  </div>
                </div>

                {/* Coordinators / Supporting Info */}
                <div className="pt-2 border-t border-[#232029] flex flex-wrap items-center justify-between gap-2 text-[#9a94a2] font-code-md text-[10.5px] sm:text-xs uppercase tracking-wider">
                  <div className="flex items-center gap-1.5 text-[#ffdad6]">
                    <span className="material-symbols-outlined text-[#ff544b] text-[15px]">contact_phone</span>
                    <span>COORDINATORS: SATHYA R V (7604903115) • SRIVISHNU J (6382906285)</span>
                  </div>
                  <span className="text-[#ff544b] font-semibold">OPEN TO STUDENTS FROM ALL DISCIPLINES</span>
                </div>
              </div>

              {/* Right Column (5 cols): Dedicated Rewards, High-Prominence Internship Panel & CTA */}
              <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#2e2938] pt-6 lg:pt-0 lg:pl-7 gap-4">
                {/* Prize Pool & Rewards Panel */}
                <div className="p-3.5 sm:p-4 bg-[#170e12] border border-[#ff1e27]/40 rounded shadow-inner">
                  <div className="flex items-center justify-between border-b border-[#30161a] pb-1.5 mb-2">
                    <span className="font-code-md text-[10px] sm:text-[11px] text-[#ff9995] uppercase tracking-widest font-bold flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[15px]">workspace_premium</span>
                      AWARDS & PRIZE POOL
                    </span>
                    <span className="bg-[#ff1e27]/25 text-[#ff544b] font-code-md text-[9px] px-2 py-0.5 rounded uppercase font-semibold">
                      OFFICIAL
                    </span>
                  </div>
                  <span className="font-headline-sm text-lg sm:text-xl lg:text-2xl text-white font-bold uppercase tracking-wider block leading-tight">
                    EXCITING CASH PRIZES & REWARDS
                  </span>
                </div>

                {/* High-Prominence Career Opportunity & Internship Panel */}
                <div className="relative p-4 sm:p-5 bg-gradient-to-br from-[#24130b] via-[#1a0e0c] to-[#12080a] border-2 border-[#ff8c42] rounded-lg shadow-[0_0_30px_rgba(255,140,66,0.25)] overflow-hidden">
                  {/* Ambient accent corner glow */}
                  <div className="absolute top-0 right-0 w-28 h-28 bg-[#ff8c42]/12 rounded-full blur-2xl pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-full bg-[#ff8c42]/20 border border-[#ff8c42] flex items-center justify-center text-[#ff8c42] shrink-0">
                        <span className="material-symbols-outlined text-[17px]">military_tech</span>
                      </div>
                      <span className="font-code-md text-[10.5px] sm:text-xs text-[#ffb07c] uppercase tracking-[0.22em] font-bold">
                        CAREER OPPORTUNITY
                      </span>
                    </div>

                    <h4 className="font-headline-sm text-lg sm:text-xl lg:text-[22px] text-white font-bold uppercase tracking-wide leading-tight drop-shadow">
                      INTERNSHIP OPPORTUNITIES WITH STIPEND
                      <span className="block text-[#ff9e59] text-base sm:text-lg lg:text-xl mt-0.5">
                        FOR HACKATHON PRIZE WINNERS
                      </span>
                    </h4>

                    <p className="font-code-md text-[10px] sm:text-[11px] text-[#e0dad5]/80 uppercase tracking-wider mt-2 font-medium">
                      Subject to partner selection process • Exciting cash prizes & rewards
                    </p>
                  </div>
                </div>

                {/* Vault Trigger Button & Access Hint */}
                <div className="w-full pt-1 flex flex-col items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectMission) onSelectMission('special-hackathon');
                    }}
                    className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#ff1e27] hover:bg-[#ff333c] text-white font-headline-sm text-base sm:text-lg uppercase tracking-[0.14em] rounded shadow-[0_0_25px_rgba(255,30,39,0.4)] group-hover:shadow-[0_0_35px_rgba(255,30,39,0.6)] transition-all font-semibold cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">lock_open</span>
                    <span>ENTER THE VAULT</span>
                    <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </button>

                  <span className="font-code-md text-[10px] text-[#a09ca8] uppercase tracking-widest text-center">
                    ACCESS SECURE VAULT DOSSIER
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DAY 1 MISSIONS — 3D Circular Carousel 1 */}
        <div className="w-full relative">
          <CircularMissionCarousel
            missionIds={['mission-01', 'mission-02', 'mission-03']}
            dayTitle="DAY 01 // 14 OCTOBER 2026"
            dayTag="3 LIVE RESEARCH & BUILD STREAMS"
            initialAngle={0}
            autoRotateSpeed={0.48}
            onSelectMission={onSelectMission}
            activeMissionId={activeMissionId}
            inView={inView}
          />
        </div>

        {/* DAY 2 MISSIONS — 3D Circular Carousel 2 */}
        <div className="w-full relative pt-6">
          <CircularMissionCarousel
            missionIds={['mission-04', 'mission-05', 'mission-06']}
            dayTitle="DAY 02 // 15 OCTOBER 2026"
            dayTag="LEADERSHIP SUMMIT & ALGO CONTEST"
            initialAngle={45}
            autoRotateSpeed={-0.44}
            onSelectMission={onSelectMission}
            activeMissionId={activeMissionId}
            inView={inView}
          />
        </div>
      </div>
    </section>
  );
}

