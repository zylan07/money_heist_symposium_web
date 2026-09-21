import React from 'react';
import { SYMPOSIUM_INFO } from '../../data/events';
import { useInViewAnimation } from '../../hooks/useInViewAnimation';
import { MOTION_EASING } from '../../utils/motion';

export default function CommandChannel() {
  const [sectionRef, inView] = useInViewAnimation({ threshold: 0.15 });

  return (
    <section
      ref={sectionRef}
      id="command-channel"
      className="w-full relative bg-[#08080a]/25 text-[#e5e1e4] border-t border-[#1c1b1e]/60 py-14 sm:py-20 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_45%,rgba(255,30,39,0.06)_0%,transparent_70%)]" />

      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative z-10">
        {/* Section Header */}
        <div
          className="flex flex-col items-center text-center space-y-3 mb-16 transition-all duration-1000"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transitionTimingFunction: MOTION_EASING.cinematic,
          }}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ff1e27] animate-pulse" />
            <span className="font-label-sm text-xs tracking-[0.3em] uppercase text-[#ff1e27] font-bold">
              06 // COMMAND CHANNEL
            </span>
          </div>
          <h2 className="font-headline-lg text-3xl min-[360px]:text-4xl sm:text-6xl lg:text-7xl text-white uppercase tracking-[0.06em] leading-none drop-shadow-[0_8px_30px_rgba(0,0,0,0.8)]">
            COMMAND CHANNEL
          </h2>
          <p className="font-code-md text-xs sm:text-sm tracking-[0.26em] text-[#ffdad6]/80 uppercase">
            THE CHANNEL IS OPEN.
          </p>
        </div>

        {/* Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Classified Transmission Sheet (~58% desktop / 7 cols) - Content-driven natural height */}
          <div
            className="lg:col-span-7 flex flex-col relative group select-none transition-all duration-1000"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0) rotate(0deg)' : 'translateY(28px) rotate(-0.9deg)',
              transitionTimingFunction: MOTION_EASING.cinematic,
              transitionDelay: '250ms',
            }}
          >
            <div
              id="dispatch-sheet"
              className="relative bg-[#100f14]/95 border border-[#2d2d35] rounded-lg p-5 sm:p-6 lg:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.85)] hover:border-[#ff1e27]/40 transition-all duration-500 overflow-hidden flex flex-col"
            >
              {/* Specular Shimmer Sweep on Hover */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-[#ff1e27]/10 to-transparent" />

              {/* Corner Register Marks */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#ff1e27]/40 pointer-events-none" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#ff1e27]/40 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#ff1e27]/40 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#ff1e27]/40 pointer-events-none" />

              {/* Transmission Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#212127] pb-3.5 mb-3.5">
                <div className="flex flex-col">
                  <span className="font-code-md text-[10px] tracking-[0.28em] text-[#ff544b] uppercase font-bold">
                    TECHBYTES SUMMIT '26 // CLASSIFIED DISPATCH
                  </span>
                  <span className="font-headline-sm text-2xl sm:text-3xl text-white uppercase tracking-[0.08em] mt-0.5">
                    COMMAND CHANNEL — TRANSMISSION DOSSIER
                  </span>
                </div>
                <div
                  className="stamp-classified font-code-md text-[10px] sm:text-xs font-bold px-3 py-1 self-start sm:self-auto transition-transform duration-700"
                  style={{
                    transform: inView ? 'rotate(-2deg) scale(1)' : 'rotate(-12deg) scale(1.15)',
                    transitionDelay: '500ms',
                    transitionTimingFunction: MOTION_EASING.cinematic,
                  }}
                >
                  DEPT OF CSE // KPRIET
                </div>
              </div>

              {/* Document Information — Overall Coordinators (Content-driven, no empty spaces) */}
              <div className="space-y-4">
                {/* Faculty Coordinators Block */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff1e27]" />
                    <span className="font-code-md text-xs tracking-[0.24em] text-[#ff544b] uppercase font-bold">
                      FACULTY COORDINATORS
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                    {SYMPOSIUM_INFO.overallCoordinators.faculty.map((fc, idx) => (
                      <div
                        key={idx}
                        className="p-3 sm:p-3.5 bg-[#141419] border border-[#24242c] rounded flex items-center justify-between hover:border-[#ff1e27]/50 transition-all"
                      >
                        <div>
                          <span className="font-headline-sm text-base sm:text-lg text-white uppercase tracking-wider block leading-snug">
                            {fc.name}
                          </span>
                          <span className="font-code-md text-[10px] text-[#909099] tracking-wider uppercase block mt-0.5">
                            FACULTY CONVENER
                          </span>
                        </div>
                        <a
                          href={`tel:${fc.phone}`}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#ff1e27]/20 border border-[#ff1e27] text-white hover:bg-[#ff1e27] transition-colors rounded font-code-md text-xs tracking-wider font-semibold whitespace-nowrap shrink-0"
                        >
                          <span className="material-symbols-outlined text-[13px]">call</span>
                          <span>{fc.phone}</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Student Coordinators Block */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff544b]" />
                    <span className="font-code-md text-xs tracking-[0.24em] text-[#ffdad6] uppercase font-bold">
                      STUDENT COORDINATORS
                    </span>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
                    {SYMPOSIUM_INFO.overallCoordinators.students.map((sc, idx) => (
                      <div
                        key={idx}
                        className="w-full sm:w-[calc(50%-0.375rem)] p-3 sm:p-3.5 bg-[#141419] border border-[#24242c] rounded flex items-center justify-between hover:border-[#ff1e27]/50 transition-all"
                      >
                        <div>
                          <span className="font-headline-sm text-base sm:text-lg text-white uppercase tracking-wider block leading-snug">
                            {sc.name}
                          </span>
                          <span className="font-code-md text-[10px] text-[#909099] tracking-wider uppercase block mt-0.5">
                            SYMPOSIUM LEAD
                          </span>
                        </div>
                        <a
                          href={`tel:${sc.phone}`}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#ff1e27]/20 border border-[#ff1e27] text-white hover:bg-[#ff1e27] transition-colors rounded font-code-md text-xs tracking-wider font-semibold whitespace-nowrap shrink-0"
                        >
                          <span className="material-symbols-outlined text-[13px]">call</span>
                          <span>{sc.phone}</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Base Location Details */}
              <div className="pt-3.5 mt-3.5 border-t border-[#1f1e24] flex flex-wrap items-center justify-between gap-3 text-[#909099] font-code-md text-[10px] uppercase tracking-widest">
                <div className="flex items-center gap-2 text-white">
                  <span className="material-symbols-outlined text-[14px] text-[#ff544b]">location_on</span>
                  <span>{SYMPOSIUM_INFO.institution.toUpperCase()}</span>
                </div>
                <span className="text-[#c8c5ca]/60">{SYMPOSIUM_INFO.location.toUpperCase()}</span>
              </div>
            </div>
          </div>

          {/* FAQ Panel (~42% desktop / 5 cols) - Exact Same Outer Height via Grid Stretch */}
          <div
            className="lg:col-span-5 flex flex-col h-full relative transition-all duration-1000"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(24px)',
              transitionDelay: '400ms',
              transitionTimingFunction: MOTION_EASING.cinematic,
            }}
          >
            <div
              id="faq-panel"
              className="relative bg-[#100f14]/95 border border-[#2d2d35] rounded-lg p-5 sm:p-6 lg:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.85)] hover:border-[#ff1e27]/40 transition-all duration-500 flex flex-col justify-between h-full overflow-hidden"
            >
              {/* Corner Register Marks */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#ff1e27]/40 pointer-events-none" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#ff1e27]/40 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#ff1e27]/40 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#ff1e27]/40 pointer-events-none" />

              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#212127] pb-3.5 mb-3.5">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff1e27] animate-pulse" />
                    <span className="font-code-md text-[10px] tracking-[0.28em] uppercase text-[#ff544b] font-bold">
                      INTEL BRIEFING // FAQ
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-2xl sm:text-3xl text-white uppercase tracking-[0.08em] mt-0.5">
                    FREQUENTLY ASKED QUESTIONS
                  </h3>
                </div>
                <span className="stamp-classified font-code-md text-[10px] sm:text-xs font-bold px-3 py-1 self-start sm:self-auto">
                  6 INTEL ITEMS
                </span>
              </div>

              {/* Flexible Distributed FAQ Items: Fills Available Height Evenly */}
              <div className="flex-1 min-h-0 flex flex-col justify-between py-1 overflow-y-auto custom-modal-scrollbar">
                {[
                  {
                    num: "01",
                    q: "Who can participate?",
                    a: "Open to engineering students from all accredited institutions across eligible mission streams."
                  },
                  {
                    num: "02",
                    q: "Can we participate as a team?",
                    a: "Yes, team participation (2–4 members) is available for specified Day 1 missions. Day 2 events are individual."
                  },
                  {
                    num: "03",
                    q: "What is included in the ₹399 pass?",
                    a: "Complete 2-day symposium access, missions, lunch, and refreshments."
                  },
                  {
                    num: "04",
                    q: "Where will the events be conducted?",
                    a: "At Department of CSE, D Block, near Symphony Amphitheatre, KPRIET Coimbatore campus."
                  },
                  {
                    num: "05",
                    q: "How can I contact the coordinators?",
                    a: "Use the coordinator contact numbers shown in the Command Channel dispatch."
                  },
                  {
                    num: "06",
                    q: "When will remaining details be announced?",
                    a: "Remaining mission details will be updated dynamically on this portal."
                  }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="border-b border-[#1c1b24] last:border-b-0 py-1.5 sm:py-2 flex flex-col justify-center"
                  >
                    <div className="flex items-baseline gap-2">
                      <span className="font-code-md text-xs text-[#ff544b] font-bold shrink-0">
                        {item.num}
                      </span>
                      <h4 className="font-headline-sm text-[13px] sm:text-sm text-white uppercase tracking-wide font-semibold leading-tight">
                        {item.q}
                      </h4>
                    </div>
                    <p className="font-body-sm text-[11px] sm:text-xs text-[#b0aeb8] leading-snug mt-0.5 pl-4 font-light">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bottom Venue / Hotlines Link */}
              <div className="pt-3.5 mt-3.5 border-t border-[#1f1e24] flex items-center justify-between font-code-md text-[10px] uppercase tracking-widest text-[#909099]">
                <div className="flex items-center gap-2 text-white">
                  <span className="material-symbols-outlined text-[14px] text-[#ff544b]">help_outline</span>
                  <span>DISPATCH SUPPORT READY</span>
                </div>
                <a
                  href="#base-location"
                  className="text-[#ff544b] hover:text-white transition-colors flex items-center gap-1 font-semibold"
                >
                  <span>BASE LOCATION MAP</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
