import React from 'react';
import { SYMPOSIUM_INFO, TICKET9_URL } from '../../data/events';
import { useInViewAnimation } from '../../hooks/useInViewAnimation';
import { MOTION_EASING } from '../../utils/motion';
import ticket9Logo from '../../assets/Ticket9Logo.png';
import gfgLogo from '../../assets/geeksforgeeks.png';

/**
 * Placeholders for social and contact channels.
 * To be replaced with confirmed live URLs when provided.
 */
export const INSTAGRAM_URL = 'https://www.instagram.com/techbytesummit26?utm_source=qr&stkn=MTlzMm1tYWV2aHBoaw==';
export const EMAIL_ADDRESS = 'mailto:techbytesummit26@kpriet.ac.in';
export const INSTAGRAM_URL_PLACEHOLDER = INSTAGRAM_URL;
export const EMAIL_PLACEHOLDER = EMAIL_ADDRESS;

export default function Footer() {
  const [sectionRef, inView] = useInViewAnimation({ threshold: 0.15 });

  return (
    <div className="w-full relative overflow-hidden select-none">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. CINEMATIC CLOSING SECTION (Preserving animations, removing REEL MMXXVI)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        ref={sectionRef}
        id="closing-frame"
        className="relative w-full bg-[#08080a]/25 text-[#e5e1e4] border-t border-[#1c1b1e]/60 pt-16 sm:pt-20 pb-16 transition-colors duration-1000"
      >
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[#060608]/80 to-black" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-[#ff1e27]/50 to-transparent transition-all duration-1000"
          style={{
            transform: inView ? 'translateX(-50%) scaleX(1)' : 'translateX(-50%) scaleX(0)',
            transitionTimingFunction: MOTION_EASING.cinematic,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-10 lg:px-16 flex flex-col items-center text-center">
          {/* Cinematic Title Card (REEL MMXXVI removed) */}
          <div
            id="closing-title-card"
            className="flex flex-col items-center transition-all duration-1200"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(28px)',
              transitionTimingFunction: MOTION_EASING.cinematic,
            }}
          >
            <span className="font-code-md text-xs sm:text-sm tracking-[0.3em] uppercase text-[#ff544b] mb-3">
              THE CLOSING FRAME
            </span>
            <h2
              className="font-display-lg text-4xl min-[360px]:text-5xl sm:text-7xl md:text-8xl lg:text-[110px] leading-[0.88] uppercase text-white drop-shadow-[0_15px_40px_rgba(0,0,0,0.95)] transition-all duration-1000"
              style={{
                letterSpacing: inView ? '0.06em' : '0.14em',
                transitionTimingFunction: MOTION_EASING.cinematic,
              }}
            >
              TECHBYTE
            </h2>
            <h3
              className="font-display-lg text-2xl min-[360px]:text-3xl sm:text-5xl md:text-6xl lg:text-[76px] leading-[0.92] uppercase text-[#ff1e27] mt-1 transition-all duration-1000"
              style={{
                letterSpacing: inView ? '0.12em' : '0.20em',
                opacity: inView ? 1 : 0,
                transitionDelay: '300ms',
                transitionTimingFunction: MOTION_EASING.cinematic,
              }}
            >
              SUMMIT '26
            </h3>
          </div>

          {/* Laser Divider Line */}
          <div
            className="w-full max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-[#ff1e27] to-transparent my-10 sm:my-12 transition-transform duration-1000 origin-center"
            style={{
              transform: inView ? 'scaleX(1)' : 'scaleX(0)',
              opacity: inView ? 0.85 : 0,
              transitionDelay: '500ms',
              transitionTimingFunction: MOTION_EASING.cinematic,
            }}
          />

          {/* Institution Info */}
          <div
            className="flex flex-col items-center space-y-2.5 max-w-3xl transition-all duration-800 mb-8"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(16px)',
              transitionDelay: '650ms',
              transitionTimingFunction: MOTION_EASING.cinematic,
            }}
          >
            <h4 className="font-headline-sm text-xl sm:text-2xl tracking-[0.12em] uppercase text-white font-semibold">
              {SYMPOSIUM_INFO.institution.toUpperCase()}
            </h4>
            <p className="font-code-md text-xs sm:text-sm tracking-[0.24em] text-[#c8c5ca]/80 uppercase">
              {SYMPOSIUM_INFO.location.toUpperCase()}
            </p>
            <div className="flex items-center gap-3 pt-2 font-code-md text-xs sm:text-sm tracking-[0.26em] text-[#ffdad6] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff1e27]" />
              <span>{SYMPOSIUM_INFO.dates}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff1e27]" />
            </div>
          </div>

          {/* Closing CTA */}
          <div className="flex flex-col items-center space-y-3">
            <a
              className="inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-[#ff1e27] text-white hover:brightness-110 font-headline-sm text-xl uppercase tracking-[0.16em] transition-all shadow-[0_0_30px_rgba(255,30,39,0.45)] hover:shadow-[0_0_45px_rgba(255,30,39,0.7)] font-semibold"
              href={TICKET9_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>GET ACCESS</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </a>
            <span className="font-code-md text-[11px] tracking-[0.25em] text-[#c8c5ca]/60 uppercase">
              LIMITED PASSES AVAILABLE
            </span>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. DEDICATED SYMPOSIUM FOOTER
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <footer className="w-full bg-[#060608]/75 border-t border-[#1c1b22] text-[#c8c5ca] pt-12 pb-10 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-[#1c1b22]">
            {/* Column 1: Brand & Institution */}
            <div className="md:col-span-5 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#ff1e27]" />
                  <span className="font-code-md text-xs tracking-[0.26em] text-[#ff544b] uppercase font-bold">
                    OFFICIAL SYMPOSIUM
                  </span>
                </div>
                <h3 className="font-headline-sm text-2xl sm:text-3xl text-white uppercase tracking-[0.08em] font-bold">
                  TECHBYTE SUMMIT '26
                </h3>
                <p className="font-body-sm text-xs sm:text-sm text-[#909099] mt-2 leading-relaxed">
                  KPR Institute of Engineering and Technology<br />
                  Coimbatore, Tamil Nadu
                </p>
                <div className="mt-2.5 pt-2.5 border-t border-[#1c1b22]">
                  <span className="font-code-md text-[10px] text-[#ff544b] uppercase tracking-wider block font-bold">
                    CONDUCTED BY
                  </span>
                  <span className="font-body-sm text-xs text-[#c8c5ca] mt-0.5 block">
                    Department of CSE in collaboration with Yi Yuva Club, KPRIET
                  </span>
                </div>
              </div>

              {/* Official Partners Badge Strip */}
              <div className="pt-3 border-t border-[#1c1b22] flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="font-code-md text-[9px] text-[#70707a] uppercase tracking-wider">TICKETING:</span>
                  <img src={ticket9Logo} alt="Ticket9" className="h-4 w-auto object-contain filter brightness-95" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-code-md text-[9px] text-[#70707a] uppercase tracking-wider">CODING:</span>
                  <img src={gfgLogo} alt="GeeksforGeeks" className="h-4 w-auto object-contain filter brightness-95" />
                </div>
              </div>

              <div className="pt-1">
                <span className="font-code-md text-[11px] text-[#70707a] uppercase tracking-wider block">
                  © 2026 TECHBYTE SUMMIT '26. All rights reserved.
                </span>
              </div>
            </div>

            {/* Column 2: Quick Navigation */}
            <div className="md:col-span-4">
              <span className="font-code-md text-xs tracking-[0.24em] text-[#ff544b] uppercase font-bold block mb-4">
                QUICK NAVIGATION
              </span>
              <ul className="grid grid-cols-2 gap-y-2.5 gap-x-4 font-code-md text-xs uppercase tracking-wider text-[#b0aeb8]">
                <li>
                  <a href="#the-operation" className="hover:text-[#ff544b] transition-colors">
                    The Operation
                  </a>
                </li>
                <li>
                  <a href="#missions" className="hover:text-[#ff544b] transition-colors">
                    Missions
                  </a>
                </li>
                <li>
                  <a href="#the-plan" className="hover:text-[#ff544b] transition-colors">
                    The Plan
                  </a>
                </li>
                <li>
                  <a href="#base-location" className="hover:text-[#ff544b] transition-colors">
                    Base Location
                  </a>
                </li>
                <li>
                  <a href="#access" className="hover:text-[#ff544b] transition-colors">
                    Mission Access
                  </a>
                </li>
                <li>
                  <a href="#command-channel" className="hover:text-[#ff544b] transition-colors">
                    Command Channel
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Social / Contact */}
            <div className="md:col-span-3 flex flex-col justify-between">
              <div>
                <span className="font-code-md text-xs tracking-[0.24em] text-[#ff544b] uppercase font-bold block mb-4">
                  SOCIAL / CONTACT
                </span>
                <div className="flex items-center gap-3">
                  {/* Instagram Icon Button (Explicitly White Icon and Border) */}
                  <a
                    href="https://www.instagram.com/techbytesummit26?utm_source=qr&stkn=MTlzMm1tYWV2aHBoaw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram: @techbytesummit26"
                    aria-label="Instagram"
                    className="w-10 h-10 rounded bg-[#16161c] border-2 border-white flex items-center justify-center text-white transition-all cursor-pointer group shadow-[0_0_15px_rgba(255,255,255,0.25)] hover:bg-white hover:text-black"
                  >
                    <svg
                      className="w-5 h-5 fill-white text-white transition-transform group-hover:scale-110"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <path fill="white" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>

                  {/* Mail Icon Button (Explicitly White Icon and Border) */}
                  <a
                    href="mailto:techbytesummit26@kpriet.ac.in"
                    title="Email: techbytesummit26@kpriet.ac.in"
                    aria-label="Email"
                    className="w-10 h-10 rounded bg-[#16161c] border-2 border-white flex items-center justify-center text-white transition-all cursor-pointer group shadow-[0_0_15px_rgba(255,255,255,0.25)] hover:bg-white hover:text-black"
                  >
                    <svg
                      className="w-5 h-5 fill-white text-white transition-transform group-hover:scale-110"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <path fill="white" d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-11.458l4.623 5.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-5.741v11.458l-4.616-5.717z" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-code-md text-[10px] tracking-[0.2em] uppercase text-[#ffdad6]/70">
                  SYSTEM READY // SECURE
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Terminal Row */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-code-md text-[10px] text-[#70707a] uppercase tracking-widest text-center sm:text-left">
            <span>DEPARTMENT OF CSE IN COLLABORATION WITH YI YUVA CLUB, KPRIET</span>
            <span className="text-[#ff544b]/80">TRANSMISSION TERMINATED // 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
