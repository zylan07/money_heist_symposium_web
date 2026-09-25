import React, { useRef } from 'react';
import ticket9Logo from '../../assets/Ticket9Logo.png';
import gfgLogo from '../../assets/geeksforgeeks.png';
import { useInViewAnimation } from '../../hooks/useInViewAnimation';
import { MOTION_EASING } from '../../utils/motion';
import { TICKET9_URL } from '../../data/events';
import RollingText from '../Hero/RollingText';

function PassCard({
  passType,
  badgeText,
  price,
  priceSubtitle,
  priceSublabel,
  description,
  benefits,
  hackathonBar,
  ctaText,
  isFeatured = false,
  inView,
  delay = 300,
}) {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const reflectionRef = useRef(null);
  const isHoveredRef = useRef(false);

  // Subtle physics-based 3D tilt interaction (Desktop only)
  const handleMouseMove = (e) => {
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

    // Subtle, realistic perspective angles
    const rotX = -(yPct * 6.5).toFixed(2);
    const rotY = (xPct * 8.5).toFixed(2);

    card.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.012, 1.012, 1.012)`;
    card.style.boxShadow = `${-rotY * 2.5}px ${rotX * 2.5 + 32}px 65px rgba(0, 0, 0, 0.9), 0 0 30px rgba(255, 30, 39, ${isFeatured ? '0.24' : '0.16'})`;

    if (ref) {
      const refX = Math.round((mouseX / bounds.width) * 100);
      const refY = Math.round((mouseY / bounds.height) * 100);
      ref.style.background = `radial-gradient(circle at ${refX}% ${refY}%, rgba(255, 30, 39, ${isFeatured ? '0.18' : '0.14'}) 0%, rgba(255, 30, 39, 0.02) 45%, transparent 70%)`;
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
      cardRef.current.style.boxShadow = isFeatured
        ? '0 30px 90px rgba(0,0,0,0.95), 0 0 25px rgba(255,30,39,0.2)'
        : '0 30px 90px rgba(0,0,0,0.95)';
    }
    if (reflectionRef.current) {
      reflectionRef.current.style.background = 'transparent';
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full max-w-5xl perspective-[1200px] flex justify-center"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(32px) scale(0.97)',
        transition: `opacity 1000ms ${MOTION_EASING.cinematic} ${delay}ms, transform 1100ms ${MOTION_EASING.cinematic} ${delay}ms`,
      }}
    >
      <div
        ref={cardRef}
        className={`w-full relative bg-[#100f14] ${
          isFeatured ? 'border-2 border-[#ff1e27]/60' : 'border border-[#2d2d35]'
        } rounded-lg shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col md:flex-row will-change-transform group select-none`}
      >
        {/* Specular Glint Reflection */}
        <div
          ref={reflectionRef}
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-transparent via-[#ff1e27]/10 to-transparent"
        />

        {/* Main Pass Body (Left ~70%) */}
        <div className="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#26252d] relative">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-[#212127] pb-4 mb-6">
            <div className="flex flex-col">
              <span className="font-headline-sm text-xl min-[380px]:text-2xl sm:text-3xl text-white uppercase tracking-[0.10em] sm:tracking-[0.12em]">
                TECHBYTE SUMMIT '26
              </span>
              <span className="font-code-md text-[10px] tracking-[0.24em] text-[#ff544b] uppercase mt-0.5">
                {passType}
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#16151c] border border-[#2c2b36] rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-code-md text-[10px] tracking-[0.2em] text-[#c8c5ca] uppercase">
                {badgeText}
              </span>
            </div>
          </div>

          <div className="space-y-5 my-2">
            {/* Price Treatment */}
            <div
              className="flex flex-wrap items-baseline gap-3 transition-all duration-700"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(12px)',
                transitionDelay: `${delay + 150}ms`,
                transitionTimingFunction: MOTION_EASING.cinematic,
              }}
            >
              <div className="flex items-baseline gap-2.5">
                <span className="font-headline-lg text-6xl sm:text-7xl lg:text-8xl text-white font-bold tracking-tight leading-none">
                  {price}
                </span>
                <span className="font-headline-sm text-2xl sm:text-3xl lg:text-4xl text-[#ff544b] font-bold tracking-wider uppercase">
                  ONLY
                </span>
              </div>
              <div className="flex flex-col ml-1">
                <span className="font-code-md text-xs tracking-[0.2em] text-[#ff544b] uppercase font-bold">
                  {priceSubtitle}
                </span>
                <span className="font-code-md text-[11px] text-[#c8c5ca]/70 tracking-widest uppercase">
                  {priceSublabel}
                </span>
              </div>
            </div>

            {/* Description */}
            <p
              className="font-body-md text-xs sm:text-sm text-[#d4d1da] leading-relaxed max-w-xl transition-all duration-700"
              style={{
                opacity: inView ? 1 : 0,
                transitionDelay: `${delay + 250}ms`,
                transitionTimingFunction: MOTION_EASING.cinematic,
              }}
            >
              {description}
            </p>

            {/* Explicit Benefits */}
            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 transition-all duration-800"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(14px)',
                transitionDelay: `${delay + 350}ms`,
                transitionTimingFunction: MOTION_EASING.cinematic,
              }}
            >
              {benefits.map((b, idx) => (
                <div
                  key={idx}
                  className={`p-3 bg-[#17161b] rounded ${
                    b.highlight ? 'border border-[#ff1e27]/40' : 'border border-[#282832]'
                  }`}
                >
                  <span className={`block font-headline-sm text-base uppercase ${b.highlight ? 'text-[#ffdad6]' : 'text-white'}`}>
                    {b.title}
                  </span>
                  <span
                    className={`block font-code-md text-[9px] tracking-wider uppercase mt-0.5 ${
                      b.highlight ? 'text-[#ff544b] font-bold' : 'text-[#909099]'
                    }`}
                  >
                    {b.subtitle}
                  </span>
                </div>
              ))}
            </div>

            {/* Hackathon Bar Highlight (for Pass 02) */}
            {hackathonBar && (
              <div className="p-3.5 bg-[#171217] border border-[#ff1e27]/40 rounded space-y-1.5">
                <div className="flex items-center justify-between border-b border-[#301c22] pb-1.5 flex-wrap gap-2">
                  <span className="font-code-md text-xs text-[#ff544b] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[15px]">timer</span>
                    12-HOUR HACKATHON
                  </span>
                  <span className="inline-flex items-center gap-1 font-code-md text-[9px] text-[#48bb78] bg-[#0e1c12] border border-[#2f8d46]/50 px-2 py-0.5 rounded font-bold uppercase">
                    <img src={gfgLogo} alt="GeeksforGeeks" className="h-3 w-auto object-contain" />
                    POWERED BY GEEKSFORGEEKS
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-code-md text-[#dcd8e4]">
                  <span>2–4 MEMBERS</span>
                  <span className="text-[#656070]">•</span>
                  <span>OWN LAPTOP REQUIRED</span>
                  <span className="text-[#656070]">•</span>
                  <span className="text-[#9ae6b4] font-semibold">WI-FI FACILITIES PROVIDED</span>
                  <span className="text-[#656070]">•</span>
                  <span className="text-[#ff9995] font-semibold uppercase">EXCITING CASH PRIZES & GIFTS</span>
                </div>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-[#1f1e24] flex flex-wrap items-center justify-between gap-3 text-[#909099] font-code-md text-[10px] uppercase tracking-widest">
            <span>14 — 15 OCTOBER 2026</span>
            <span>•</span>
            <span>KPR INSTITUTE OF ENGG & TECH, COIMBATORE</span>
            <span>•</span>
            <span className="text-[#9ae6b4]">WI-FI FACILITIES PROVIDED</span>
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
                <a
                  href={TICKET9_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-2 px-3 text-center ${
                    isFeatured
                      ? 'bg-[#ff1e27] hover:bg-[#ff333c] text-white shadow-[0_0_20px_rgba(255,30,39,0.4)]'
                      : 'bg-[#ff1e27]/20 hover:bg-[#ff1e27] text-white border border-[#ff1e27]'
                  } font-headline-sm text-sm uppercase tracking-wider rounded transition-colors font-semibold block`}
                >
                  {ctaText}
                </a>
                <span className="font-code-md text-[8.5px] text-[#8e8a96] tracking-wider uppercase mt-1">
                  VERIFIED TICKETING PORTAL
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Verification Label */}
          <div className="w-full pt-3 border-t border-[#1a1922] flex flex-col items-center">
            <span className="font-code-md text-[9px] text-[#a09ca8] uppercase tracking-[0.2em]">
              {passType} // 2026
            </span>
            <span className="font-code-md text-[8px] text-[#ff544b]/80 uppercase tracking-widest mt-0.5">
              DEPT OF COMPUTER SCIENCE & ENGG
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MissionAccess() {
  const [sectionRef, inView] = useInViewAnimation({ threshold: 0.1 });

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
          className="flex flex-col items-center text-center space-y-3 mb-12 sm:mb-16 transition-[opacity,transform] duration-1000 will-change-[transform,opacity]"
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
            <RollingText
              text="GET ACCESS."
              active={inView}
              isComplete={inView}
              duration={0.7}
              stagger={0.03}
            />
          </h2>
          <p className="font-code-md text-xs sm:text-sm tracking-[0.28em] text-[#ffdad6]/80 uppercase">
            CHOOSE YOUR PASS CREDENTIAL • TWO DAYS • FULL ADMISSION
          </p>
        </div>

        {/* 4 Feature Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-5xl mb-10">
          {[
            { label: 'ALL 6 MISSIONS', sub: 'DAY 1 & DAY 2' },
            { label: '12-H HACKATHON', sub: 'SPECIAL EVENT' },
            { label: 'MEALS & FOOD', sub: 'LUNCH & REFRESHMENTS' },
            { label: 'WI-FI & CERTIFICATES', sub: 'ALL PARTICIPANTS' },
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

        {/* Vertical Pass Cards Stack: Card 1 [ EVENT PASS ] ABOVE Card 2 [ HACKATHON PASS ] */}
        <div className="flex flex-col items-center gap-8 sm:gap-10 w-full">
          {/* CARD 1 — EVENT PASS */}
          <PassCard
            passType="EVENT PASS CREDENTIAL"
            badgeText="ALL-ACCESS PASS"
            price="₹399"
            priceSubtitle="COMPLETE TWO-DAY ADMISSION"
            priceSublabel="ONE PASS GIVES ACCESS TO ALL 6 EVENTS"
            description="One Event Pass can be used to access ALL 6 events across both days of TECHBYTE SUMMIT '26. Participants do not need to purchase separate passes for individual events. Includes lunch on Day 1, lunch on Day 2, and day refreshments."
            benefits={[
              { title: '2 DAYS', subtitle: 'OCT 14 — 15' },
              { title: 'ALL 6 MISSIONS', subtitle: 'FULL ACCESS' },
              { title: 'LUNCH', subtitle: 'DAY 1 & DAY 2', highlight: true },
              { title: 'REFRESHMENTS', subtitle: 'DAY 1 & DAY 2', highlight: true },
            ]}
            ctaText="GET EVENT PASS"
            isFeatured={false}
            inView={inView}
            delay={250}
          />

          {/* CARD 2 — HACKATHON PASS */}
          <PassCard
            passType="HACKATHON PASS CREDENTIAL"
            badgeText="HACKATHON + ALL MISSIONS"
            price="₹699"
            priceSubtitle="12-HOUR HACKATHON + ALL 6 MISSIONS"
            priceSublabel="FLAGSHIP ADMISSION PROTOCOL"
            description="Complete access to the 12-Hour continuous overnight Hackathon plus admission to all 6 symposium events across both days. Includes 2 lunches, 1 dinner, 1 breakfast, day refreshments, and night refreshments during the Hackathon."
            benefits={[
              { title: 'HACKATHON', subtitle: '12-H OVERNIGHT' },
              { title: 'ALL 6 MISSIONS', subtitle: 'BOTH DAYS' },
              { title: 'MEALS (4)', subtitle: '2 LUNCH, DINNER, BFAST', highlight: true },
              { title: 'REFRESHMENTS', subtitle: 'DAY & NIGHT', highlight: true },
            ]}
            hackathonBar={true}
            ctaText="GET HACKATHON PASS"
            isFeatured={true}
            inView={inView}
            delay={400}
          />
        </div>

        {/* Main Pass CTA */}
        <div
          className="flex flex-col items-center justify-center mt-12 w-full transition-all duration-800"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(16px)',
            transitionDelay: '600ms',
            transitionTimingFunction: MOTION_EASING.cinematic,
          }}
        >
          <a
            className="w-full sm:w-auto min-w-[280px] h-14 flex items-center justify-center gap-3 bg-[#ff1e27] text-white hover:brightness-110 font-headline-sm text-2xl uppercase tracking-[0.16em] transition-all shadow-[0_0_30px_rgba(255,30,39,0.45)] hover:shadow-[0_0_45px_rgba(255,30,39,0.7)] px-8 py-3 font-semibold"
            href={TICKET9_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>REGISTER NOW VIA TICKET9</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </a>
          <span className="font-code-md text-xs text-[#c8c5ca]/70 tracking-[0.22em] uppercase mt-3 text-center">
            EVENT PASS: ₹399 • HACKATHON PASS: ₹699 • VIA TICKET9
          </span>
        </div>
      </div>
    </section>
  );
}
