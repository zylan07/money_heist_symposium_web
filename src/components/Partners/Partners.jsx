import React from 'react';
import gfgLogo from '../../assets/geeksforgeeks.png';
import eventopiaLogo from '../../assets/Eventopia.png';
import ticket9Logo from '../../assets/Ticket9Logo.png';
import { useInViewAnimation } from '../../hooks/useInViewAnimation';
import { MOTION_EASING } from '../../utils/motion';
import RollingText from '../Hero/RollingText';

export default function Partners() {
  const [sectionRef, inView] = useInViewAnimation({ threshold: 0.15 });

  const partners = [
    {
      id: 'gfg',
      role: 'HACKATHON POWERED BY',
      name: 'GEEKSFORGEEKS',
      caption: 'Powering CODE VAULT — Software Edition',
      url: 'https://www.geeksforgeeks.org/',
      logo: gfgLogo,
      haloGlow: 'radial-gradient(circle, rgba(47, 141, 70, 0.28) 0%, rgba(47, 141, 70, 0.05) 50%, transparent 72%)',
      labelColor: 'text-[#48bb78]',
      logoHeight: 'h-9 sm:h-11',
    },
    {
      id: 'eventopia',
      role: 'MEDIA PARTNER',
      name: 'EVENTOPIA',
      caption: 'Media & event outreach partner',
      url: 'https://eventopia.in/',
      logo: eventopiaLogo,
      haloGlow: 'radial-gradient(circle, rgba(255, 140, 66, 0.25) 0%, rgba(255, 140, 66, 0.04) 50%, transparent 72%)',
      labelColor: 'text-[#ffb07c]',
      logoHeight: 'h-9 sm:h-11',
    },
    {
      id: 'ticket9',
      role: 'TICKETING PARTNER',
      name: 'TICKET9',
      caption: 'Official registration & admission gateway',
      url: 'https://www.theticket9.com/',
      logo: ticket9Logo,
      haloGlow: 'radial-gradient(circle, rgba(255, 30, 39, 0.26) 0%, rgba(255, 30, 39, 0.04) 50%, transparent 72%)',
      labelColor: 'text-[#ff544b]',
      logoHeight: 'h-8 sm:h-10',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="partners"
      aria-label="Partners and Event Ecosystem"
      className="w-full relative bg-[#08080a]/30 text-[#e5e1e4] py-14 sm:py-18 overflow-hidden select-none"
    >
      {/* Cinematic Soft Atmospheric Gradient Transitions (Top & Bottom fades) */}
      <div className="absolute top-0 inset-x-0 h-28 pointer-events-none bg-gradient-to-b from-[#08080a] via-[#08080a]/40 to-transparent z-0" />
      <div className="absolute bottom-0 inset-x-0 h-28 pointer-events-none bg-gradient-to-t from-[#08080a] via-[#08080a]/40 to-transparent z-0" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(255,30,39,0.05)_0%,transparent_70%)]" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 relative z-10">
        {/* Section Header */}
        <div
          className="flex flex-col items-center text-center space-y-2.5 mb-10 sm:mb-14 transition-all duration-700"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(16px)',
            transitionTimingFunction: MOTION_EASING.cinematic,
          }}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ff1e27] animate-pulse" />
            <span className="font-label-sm text-xs tracking-[0.3em] uppercase text-[#ff544b] font-bold">
              07 // ECOSYSTEM
            </span>
          </div>

          <h2 className="font-headline-lg text-3xl sm:text-5xl lg:text-6xl text-white uppercase tracking-[0.06em] leading-none drop-shadow-[0_8px_30px_rgba(0,0,0,0.8)]">
            <RollingText
              text="PARTNERS & EVENT ECOSYSTEM"
              active={inView}
              isComplete={inView}
              duration={0.7}
              stagger={0.02}
            />
          </h2>

          <p className="font-code-md text-xs sm:text-sm tracking-[0.24em] text-[#cac5d0]/80 uppercase max-w-xl">
            OFFICIAL PLATFORMS, MEDIA & EVENT PARTNERS
          </p>
        </div>

        {/* Lightweight Floating-Logo Ecosystem (No bordered cards, no heavy boxes) */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 max-w-5xl mx-auto w-full transition-all duration-[800ms]"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '150ms',
            transitionTimingFunction: MOTION_EASING.cinematic,
          }}
        >
          {partners.map((partner, idx) => (
            <a
              key={partner.id}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${partner.name} - ${partner.role}`}
              className="group relative flex flex-col items-center text-center cursor-pointer p-4 transition-all duration-300 hover:-translate-y-1"
              style={{
                transitionDelay: `${idx * 100}ms`,
              }}
            >
              {/* Soft Atmospheric Halo behind the logo */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full pointer-events-none opacity-60 group-hover:opacity-100 group-hover:scale-115 transition-all duration-500 blur-xl"
                style={{
                  background: partner.haloGlow,
                }}
              />

              {/* Floating Logo Area */}
              <div className="relative z-10 w-full h-16 sm:h-20 flex items-center justify-center mb-3">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className={`${partner.logoHeight} max-w-[200px] w-auto object-contain filter brightness-100 contrast-105 group-hover:brightness-125 group-hover:drop-shadow-[0_4px_20px_rgba(255,255,255,0.25)] transition-all duration-300`}
                />
              </div>

              {/* Label */}
              <span className={`relative z-10 font-code-md text-[10px] sm:text-[11px] tracking-[0.24em] uppercase font-bold mb-1 ${partner.labelColor} transition-colors`}>
                {partner.role}
              </span>

              {/* Partner Name */}
              <span className="relative z-10 font-headline-sm text-lg sm:text-xl text-white font-bold uppercase tracking-wider group-hover:text-[#ffdad6] transition-colors leading-tight">
                {partner.name}
              </span>

              {/* Caption */}
              <p className="relative z-10 font-code-md text-[11px] sm:text-xs text-[#a09ca8] leading-snug mt-1.5 max-w-xs group-hover:text-[#c8c5ca] transition-colors">
                {partner.caption}
              </p>
            </a>
          ))}
        </div>

        {/* Subtle Institutional Mark at the bottom */}
        <div className="mt-12 sm:mt-14 pt-6 border-t border-[#1a1922]/60 flex flex-col items-center text-center">
          <span className="font-code-md text-[10px] text-[#70707a] uppercase tracking-[0.26em]">
            HOST INSTITUTION // KPR INSTITUTE OF ENGINEERING AND TECHNOLOGY, COIMBATORE
          </span>
        </div>
      </div>
    </section>
  );
}
