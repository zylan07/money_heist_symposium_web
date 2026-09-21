import React, { useRef } from 'react';
import { useInViewAnimation } from '../../hooks/useInViewAnimation';
import { MOTION_EASING } from '../../utils/motion';
import ticket9Logo from '../../assets/Ticket9Logo.png';

export default function MissionAccess() {
  const [sectionRef, inView] = useInViewAnimation({ threshold: 0.15 });
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const reflectionRef = useRef(null);
  const isHoveredRef = useRef(false);

  const handleMouseMove = (e) => {
    // Disable or simplify on mobile/touch devices
    if (typeof window !== 'undefined' && (window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches)) {
      return;
    }

    const container = containerRef.current;
    const card = cardRef.current;
    const ref = reflectionRef.current;
    if (!container || !card) return;

    const bounds = container.getBoundingClientRect();
    const mouseX = e.clientX - bounds.left;
    const mouseY = e.clientY - bounds.top;
    const xPct = mouseX / bounds.width - 0.5;
    const yPct = mouseY / bounds.height - 0.5;

    // Subtle, realistic perspective angles (max ~6deg X, ~8deg Y)
    const rotX = -(yPct * 7.5).toFixed(2);
    const rotY = (xPct * 9.5).toFixed(2);

    card.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.015, 1.015, 1.015)`;
    card.style.boxShadow = `${-rotY * 2.5}px ${rotX * 2.5 + 32}px 65px rgba(0, 0, 0, 0.9), 0 0 30px rgba(255, 30, 39, 0.18)`;

    if (ref) {
      const refX = Math.round((mouseX / bounds.width) * 100);
      const refY = Math.round((mouseY / bounds.height) * 100);
      ref.style.background = `radial-gradient(circle at ${refX}% ${refY}%, rgba(255, 30, 39, 0.16) 0%, rgba(255, 30, 39, 0.03) 45%, transparent 70%)`;
    }
  };

  const handleMouseEnter = () => {
    if (typeof window !== 'undefined' && (window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches)) {
      return;
    }
    isHoveredRef.current = true;
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.12s ease-out, box-shadow 0.12s ease-out';
    }
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    if (cardRef.current) {
      cardRef.current.style.transition = `transform 0.65s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.65s cubic-bezier(0.22, 1, 0.36, 1)`;
      cardRef.current.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      cardRef.current.style.boxShadow = '0 30px 90px rgba(0,0,0,0.95)';
    }
    if (reflectionRef.current) {
      reflectionRef.current.style.background = '';
    }
  };

  return (
    <section
      ref={sectionRef}
      id="access"
      className="w-full relative bg-[#08080a]/25 text-[#e5e1e4] border-t border-[#1c1b1e]/60 py-16 sm:py-20 md:py-24 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_45%,rgba(255,30,39,0.08)_0%,transparent_70%)]" />

      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative z-10 flex flex-col items-center">
        {/* Header */}
        <div
          className="flex flex-col items-center text-center space-y-3 mb-16 transition-all duration-1000"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transitionTimingFunction: MOTION_EASING.cinematic,
          }}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ff1e27] animate-pulse" />
            <span className="font-label-sm text-xs tracking-[0.3em] uppercase text-[#ff1e27] font-bold">
              04 // MISSION ACCESS
            </span>
          </div>
          <h2 className="font-headline-lg text-4xl min-[360px]:text-5xl sm:text-7xl lg:text-8xl text-white uppercase tracking-[0.06em] leading-none drop-shadow-[0_8px_30px_rgba(0,0,0,0.8)]">
            GET ACCESS.
          </h2>
          <p className="font-code-md text-xs sm:text-sm tracking-[0.28em] text-[#ffdad6]/80 uppercase">
            ONE PASS. TWO DAYS. SIX MISSIONS.
          </p>
        </div>

        {/* 4 Feature Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-5xl mb-10">
          {[
            { label: 'ALL 6 MISSIONS', sub: 'DAY 1 & DAY 2' },
            { label: '2 DAYS ACCESS', sub: '09 & 10 OCT 2026' },
            { label: 'LUNCH', sub: 'DAY 1 & DAY 2' },
            { label: 'REFRESHMENTS', sub: 'DAY 1 & DAY 2' },
          ].map((perk, idx) => (
            <div
              key={idx}
              className="bg-[#121215] border border-[#24242c] px-3.5 py-2.5 rounded-sm flex items-center justify-center gap-2 text-center shadow-[0_4px_15px_rgba(0,0,0,0.5)] transition-all duration-800"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(18px)',
                transitionDelay: `${150 + idx * 80}ms`,
                transitionTimingFunction: MOTION_EASING.cinematic,
              }}
            >
              <span className="font-code-md text-[10px] text-[#ff544b] font-bold">
                [ 0{idx + 1} ]
              </span>
              <div className="flex flex-col text-left">
                <span className="font-label-sm text-[11px] text-[#c8c5ca] uppercase tracking-wider font-semibold leading-tight">
                  {perk.label}
                </span>
                <span className="font-code-md text-[9px] text-[#ff544b]/80 uppercase tracking-widest leading-none mt-0.5">
                  {perk.sub}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 3D Physical Pass Card */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          id="pass-container"
          className="w-full max-w-5xl perspective-[1200px] flex justify-center"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0) scale(1)' : 'translateY(32px) scale(0.97)',
            transition: `opacity 1000ms ${MOTION_EASING.cinematic} 300ms, transform 1100ms ${MOTION_EASING.cinematic} 300ms`,
          }}
        >
          <div
            ref={cardRef}
            id="tactical-pass"
            className="w-full relative bg-[#100f14] border border-[#2d2d35] rounded-lg shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col md:flex-row will-change-transform group select-none"
          >
            {/* Specular Glint Reflection */}
            <div
              ref={reflectionRef}
              id="pass-reflection"
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-transparent via-[#ff1e27]/10 to-transparent"
            />

            {/* Main Pass Body (Left ~70%) */}
            <div className="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#26252d] relative">
              {/* Clean Header without fabricated pass number */}
              <div className="flex items-start justify-between gap-4 border-b border-[#212127] pb-4 mb-6">
                <div className="flex flex-col">
                  <span className="font-headline-sm text-xl min-[380px]:text-2xl sm:text-3xl text-white uppercase tracking-[0.10em] sm:tracking-[0.12em]">
                    TECHBYTES SUMMIT '26
                  </span>
                  <span className="font-code-md text-[10px] tracking-[0.24em] text-[#ff544b] uppercase mt-0.5">
                    MISSION ACCESS CREDENTIAL
                  </span>
                </div>
                {/* Visual breathing room replacing fabricated pass number */}
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-[#16151c] border border-[#2c2b36] rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-code-md text-[10px] tracking-[0.2em] text-[#c8c5ca] uppercase">
                    ALL-ACCESS PASS
                  </span>
                </div>
              </div>

              <div className="space-y-5 my-2">
                {/* Price Treatment: ₹399 ONLY */}
                <div
                  className="flex flex-wrap items-baseline gap-3 transition-all duration-700"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(12px)',
                    transitionDelay: '450ms',
                    transitionTimingFunction: MOTION_EASING.cinematic,
                  }}
                >
                  <div className="flex items-baseline gap-2.5">
                    <span
                      id="pass-price"
                      className="font-headline-lg text-6xl sm:text-7xl lg:text-8xl text-white font-bold tracking-tight leading-none"
                    >
                      ₹399
                    </span>
                    <span className="font-headline-sm text-2xl sm:text-3xl lg:text-4xl text-[#ff544b] font-bold tracking-wider uppercase">
                      ONLY
                    </span>
                  </div>
                  <div className="flex flex-col ml-1">
                    <span className="font-code-md text-xs tracking-[0.2em] text-[#ff544b] uppercase font-bold">
                      COMPLETE TWO-DAY ADMISSION
                    </span>
                    <span className="font-code-md text-[11px] text-[#c8c5ca]/70 tracking-widest uppercase">
                      UNRESTRICTED ACCESS PROTOCOL
                    </span>
                  </div>
                </div>

                {/* Exact Specified Description */}
                <p
                  className="font-body-md text-xs sm:text-sm text-[#d4d1da] leading-relaxed max-w-xl transition-all duration-700"
                  style={{
                    opacity: inView ? 1 : 0,
                    transitionDelay: '550ms',
                    transitionTimingFunction: MOTION_EASING.cinematic,
                  }}
                >
                  One pass for the complete two-day symposium, with access to all registered sessions, missions, lunch and refreshments across both days.
                </p>

                {/* Explicit Benefits: 2 DAYS, 6 MISSIONS, LUNCH (DAY 1 & 2), REFRESHMENTS (DAY 1 & 2) */}
                <div
                  className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 transition-all duration-800"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(14px)',
                    transitionDelay: '650ms',
                    transitionTimingFunction: MOTION_EASING.cinematic,
                  }}
                >
                  <div className="p-3 bg-[#17161b] border border-[#282832] rounded">
                    <span className="block font-headline-sm text-base text-white uppercase">2 DAYS</span>
                    <span className="block font-code-md text-[9px] text-[#909099] tracking-wider uppercase mt-0.5">
                      OCT 09 — 10
                    </span>
                  </div>
                  <div className="p-3 bg-[#17161b] border border-[#282832] rounded">
                    <span className="block font-headline-sm text-base text-white uppercase">6 MISSIONS</span>
                    <span className="block font-code-md text-[9px] text-[#909099] tracking-wider uppercase mt-0.5">
                      ALL SESSIONS
                    </span>
                  </div>
                  <div className="p-3 bg-[#17161b] border border-[#ff1e27]/40 rounded">
                    <span className="block font-headline-sm text-base text-[#ffdad6] uppercase">LUNCH</span>
                    <span className="block font-code-md text-[9px] text-[#ff544b] tracking-wider uppercase font-bold mt-0.5">
                      DAY 1 &amp; DAY 2
                    </span>
                  </div>
                  <div className="p-3 bg-[#17161b] border border-[#ff1e27]/40 rounded">
                    <span className="block font-headline-sm text-base text-[#ffdad6] uppercase">REFRESHMENTS</span>
                    <span className="block font-code-md text-[9px] text-[#ff544b] tracking-wider uppercase font-bold mt-0.5">
                      DAY 1 &amp; DAY 2
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#1f1e24] flex flex-wrap items-center justify-between gap-3 text-[#909099] font-code-md text-[10px] uppercase tracking-widest">
                <span>09 — 10 OCTOBER 2026</span>
                <span>•</span>
                <span>KPR INSTITUTE OF ENGG &amp; TECH, COIMBATORE</span>
              </div>
            </div>

            {/* Perforated Stub (Right ~30%) — Ticket9 Official Ticketing Partner Badge */}
            <div className="w-full md:w-64 p-6 sm:p-7 bg-[#0d0c10] flex flex-col justify-between items-center text-center relative border-t md:border-t-0 md:border-l border-dashed border-[#ff1e27]/30">
              {/* Semi-circle notch cutouts on perforated edge */}
              <div className="hidden md:block absolute -left-3 -top-3 w-6 h-6 bg-[#08080A] rounded-full border border-[#2d2d35]" />
              <div className="hidden md:block absolute -left-3 -bottom-3 w-6 h-6 bg-[#08080A] rounded-full border border-[#2d2d35]" />

              {/* Official Partner Top Header */}
              <div className="w-full">
                <div className="w-full py-1.5 px-3 bg-[#181214] border border-[#ff1e27]/40 rounded text-center">
                  <span className="font-code-md text-[10px] text-[#ff544b] font-bold uppercase tracking-[0.24em] block">
                    OFFICIAL PARTNER
                  </span>
                </div>
              </div>

              {/* Vertically Balanced Ticket9 Partner Block */}
              <div className="w-full flex-1 flex flex-col items-center justify-center my-3 sm:my-4">
                <div className="w-full bg-[#121117] border border-[#2a2933] p-5 sm:p-6 rounded-sm flex flex-col items-center justify-center space-y-4 shadow-[0_4px_20px_rgba(0,0,0,0.5)] select-none">
                  <div className="p-3 sm:p-3.5 bg-black/50 rounded border border-[#23222a] flex items-center justify-center w-full shadow-inner">
                    <img
                      src={ticket9Logo}
                      alt="Ticket9 — Ticketing Partner"
                      className="h-10 sm:h-12 w-auto max-w-[170px] object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] filter brightness-105"
                    />
                  </div>

                  <div className="pt-2 border-t border-[#262530] w-full text-center space-y-1">
                    <span className="font-code-md text-xs sm:text-[13px] text-white font-bold tracking-[0.22em] uppercase block">
                      TICKETING PARTNER
                    </span>
                    <span className="font-code-md text-[9px] sm:text-[10px] text-[#ff544b] tracking-widest uppercase block font-semibold">
                      OFFICIAL ADMISSION GATEWAY
                    </span>
                  </div>

                  <div className="pt-1 flex flex-col items-center gap-1.5 w-full">
                    <span className="inline-block bg-[#ff1e27]/15 border border-[#ff1e27]/40 text-[#ff544b] text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-[0.16em]">
                      AUTHORIZED PLATFORM
                    </span>
                    <span className="font-code-md text-[8.5px] text-[#8e8a96] tracking-wider uppercase">
                      VERIFIED TICKETING PORTAL
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Verification Label */}
              <div className="w-full pt-3 border-t border-[#1a1922] flex flex-col items-center">
                <span className="font-code-md text-[9px] text-[#a09ca8] uppercase tracking-[0.2em]">
                  DELEGATE PASS // 2026
                </span>
                <span className="font-code-md text-[8px] text-[#ff544b]/80 uppercase tracking-widest mt-0.5">
                  DEPT OF COMPUTER SCIENCE &amp; ENGG
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Pass CTA */}
        <div
          className="flex flex-col items-center justify-center mt-12 w-full transition-all duration-800"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(16px)',
            transitionDelay: '750ms',
            transitionTimingFunction: MOTION_EASING.cinematic,
          }}
        >
          <a
            className="w-full sm:w-auto min-w-[260px] h-14 flex items-center justify-center gap-3 bg-[#ff1e27] text-white hover:brightness-110 font-headline-sm text-2xl uppercase tracking-[0.16em] transition-all shadow-[0_0_30px_rgba(255,30,39,0.45)] hover:shadow-[0_0_45px_rgba(255,30,39,0.7)] px-8 py-3 font-semibold"
            href="#command-channel"
          >
            <span>GET ACCESS</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </a>
          <span className="font-code-md text-xs text-[#c8c5ca]/70 tracking-[0.22em] uppercase mt-3 text-center">
            ₹399 • 2 DAY ACCESS • VIA TICKET9
          </span>
        </div>
      </div>
    </section>
  );
}
