import React, { useState, useEffect } from 'react';
import { TIMELINE_POINTS } from '../../data/events';
import { useInViewAnimation } from '../../hooks/useInViewAnimation';
import RollingText from '../Hero/RollingText';

export default function PlanTimeline() {
  const [sectionRef, inView] = useInViewAnimation({ threshold: 0.15 });
  const [activeIdx, setActiveIdx] = useState(0);
  const [openTooltipIdx, setOpenTooltipIdx] = useState(null);

  const toggleTooltip = (idx, e) => {
    e.stopPropagation();
    setOpenTooltipIdx(openTooltipIdx === idx ? null : idx);
    setActiveIdx(idx);
  };

  useEffect(() => {
    const closeTooltips = () => setOpenTooltipIdx(null);
    document.addEventListener('click', closeTooltips);
    return () => document.removeEventListener('click', closeTooltips);
  }, []);

  const day1Points = TIMELINE_POINTS.slice(0, 3);
  const day2Points = TIMELINE_POINTS.slice(3, 6);

  return (
    <section
      ref={sectionRef}
      id="the-plan"
      className="w-full bg-[#08080a]/25 border-t border-[#1c1b1e]/60 text-[#e5e1e4] select-none py-16 sm:py-20 relative overflow-hidden"
    >
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(255,30,39,0.05)_0%,transparent_70%)]" />

      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 max-w-[1720px] mx-auto relative z-10">
        {/* 1. Section Header */}
        <div
          className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16 transition-[opacity,transform] duration-700 will-change-[transform,opacity] ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        >
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#ff1e27] animate-pulse" />
              <span className="font-label-sm text-xs tracking-[0.3em] uppercase text-[#ff1e27] font-bold">
                03 // THE PLAN
              </span>
            </div>
            <h2 className="font-headline-lg text-5xl sm:text-6xl lg:text-7xl text-white uppercase tracking-[0.05em] leading-none">
              <RollingText
                text="THE PLAN"
                active={inView}
                isComplete={inView}
                duration={0.7}
                stagger={0.025}
              />
            </h2>
            <p className="font-code-md text-xs sm:text-sm tracking-[0.25em] text-[#ffdad6]/80 uppercase mt-2">
              14 — 15 OCTOBER 2026
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-code-md text-[11px] text-[#909099] tracking-[0.2em] uppercase bg-[#141418] px-3.5 py-1.5 border border-[#24242c] rounded-sm">
            <span className="material-symbols-outlined text-[14px] text-[#ff544b]">schedule</span>
            <span>TWO-DAY OPERATIONAL TIMELINE</span>
          </div>
        </div>

        {/* 2. Complete Six-Point Horizontal Timeline Track */}
        {/* Desktop View: Full 6-Point Single Track Across Viewport */}
        <div className="hidden lg:block relative pt-6 pb-12" id="desktop-timeline-track">
          {/* Continuous Red Axis Line — Runs directly through the center of all 6 nodes */}
          <div
            className="absolute top-[132px] left-0 right-0 h-[2px] bg-gradient-to-r from-[#ff1e27]/30 via-[#ff1e27] to-[#ff1e27]/30 z-0 shadow-[0_0_14px_rgba(255,30,39,0.6)] origin-left transition-transform duration-1000 ease-out"
            style={{
              transform: inView ? 'scaleX(1)' : 'scaleX(0)',
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)'
            }}
          />

          <div className="grid grid-cols-6 gap-2 relative z-10">
            {TIMELINE_POINTS.map((point, idx) => {
              const isActive = activeIdx === idx;
              const isTooltipOpen = openTooltipIdx === idx;
              const nodeDelay = 180 + idx * 110;

              return (
                <div
                  key={point.num}
                  onClick={(e) => toggleTooltip(idx, e)}
                  onMouseEnter={() => setActiveIdx(idx)}
                  style={{
                    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                    transitionDelay: inView ? `${nodeDelay}ms` : '0ms'
                  }}
                  className={`timeline-item relative flex flex-col items-center group cursor-pointer transition-[opacity,transform] duration-700 px-1 ${
                    isActive ? 'item-active' : ''
                  } ${isTooltipOpen ? 'tooltip-open' : ''} ${
                    inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
                  }`}
                >
                  {/* Top Day Badge on first item of each day */}
                  {idx === 0 && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center gap-1.5 font-code-md text-[10px] tracking-[0.22em] text-[#ff544b] uppercase font-bold bg-[#141419] px-2.5 py-0.5 border border-[#ff1e27]/40 rounded whitespace-nowrap">
                      <span>DAY 01 // 14 OCT</span>
                    </div>
                  )}
                  {idx === 3 && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center gap-1.5 font-code-md text-[10px] tracking-[0.22em] text-[#ff544b] uppercase font-bold bg-[#141419] px-2.5 py-0.5 border border-[#ff1e27]/40 rounded whitespace-nowrap">
                      <span>DAY 02 // 15 OCT</span>
                    </div>
                  )}

                  {/* Timing & Title — Exactly 84px uniform vertical height for all 6 items */}
                  <div className="flex flex-col items-center text-center mb-4 space-y-1 h-[84px] justify-end w-full">
                    <span className="timeline-badge font-code-md text-[10px] tracking-[0.18em] text-[#c8c5ca]/70 bg-[#16161b] px-2 py-0.5 border border-[#282832] rounded transition-colors">
                      {point.timing}
                    </span>
                    <h3 className="timeline-title font-headline-sm text-xs xl:text-sm text-[#b5b2bb] group-hover:text-white uppercase tracking-[0.03em] transition-colors px-1 text-center w-full">
                      {point.num === '04' ? (
                        <span className="flex flex-col items-center leading-[1.12]">
                          <span>04 EXECUTIVE</span>
                          <span>DEVELOPMENT</span>
                          <span>PROGRAMME</span>
                        </span>
                      ) : (
                        <span className="block leading-[1.15]">{point.num} {point.title}</span>
                      )}
                    </h3>
                  </div>

                  {/* Central Timeline Dot on the line */}
                  <div className="relative flex items-center justify-center w-full h-4">
                    <div
                      className={`timeline-dot relative w-4 h-4 rounded-full bg-[#18181e] border-2 border-[#635d64] group-hover:border-[#ff1e27] group-hover:scale-125 transition-all duration-300 z-20 ${
                        isActive ? 'dot-active' : ''
                      }`}
                    />
                  </div>

                  {/* Day / Category Tag Below Dot */}
                  <div className="flex flex-col items-center text-center mt-2.5 space-y-0.5 max-w-[170px]">
                    <span className="font-code-md text-[10px] text-[#ff544b] tracking-wider uppercase font-semibold">
                      {point.timelineTag || point.day}
                    </span>
                    {point.timelineBlurb && (
                      <p className="font-body-sm text-[11px] text-[#a09ca8] leading-tight line-clamp-2">
                        {point.timelineBlurb}
                      </p>
                    )}
                  </div>

                  {/* Interactive Schedule Tooltip */}
                  <div className="timeline-tooltip opacity-0 invisible translate-y-2 transition-all duration-300 absolute top-28 left-1/2 -translate-x-1/2 z-30 w-64 p-3.5 bg-[#121214]/98 backdrop-blur-md border border-[#ff1e27]/50 rounded shadow-[0_10px_35px_rgba(0,0,0,0.9)] pointer-events-none">
                    <div className="flex items-center justify-between border-b border-[#2a282f] pb-1.5 mb-2">
                      <span className="font-headline-sm text-xs text-white tracking-[0.08em] uppercase">
                        {point.num} // {point.title}
                      </span>
                      <span className="font-code-md text-[9px] tracking-wider text-[#ff544b] uppercase">
                        {point.day}
                      </span>
                    </div>
                    <div className="space-y-1.5 font-code-md text-[11px] text-[#d8d5df]">
                      {point.schedule.map((item, sIdx) => (
                        <div key={sIdx} className="flex items-baseline justify-between gap-2">
                          <span className="text-[#ffb4ab] flex-shrink-0">{item.time}</span>
                          <span className="text-[10px] text-[#909099] text-right">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile & Tablet View: Clean Two-Day Structured Sections with Continuous Connecting Axis */}
        <div className="lg:hidden space-y-10 py-6" id="mobile-timeline-track">
          {/* DAY 01 */}
          <div className="relative">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#ff1e27]" />
              <span className="font-code-md text-xs tracking-[0.25em] text-[#ff544b] uppercase font-bold">
                DAY 01 // 14 OCTOBER 2026
              </span>
            </div>

            <div className="relative pl-6 border-l-2 border-[#ff1e27]/60 space-y-8 ml-2">
              {day1Points.map((point, idx) => {
                return (
                  <div
                    key={point.num}
                    onClick={(e) => toggleTooltip(idx, e)}
                    className="relative cursor-pointer group"
                  >
                    {/* Glowing Node on the left line */}
                    <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#18181e] border-2 border-[#ff1e27] group-hover:bg-[#ff1e27] transition-colors" />

                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-code-md text-[10px] text-[#ff544b] tracking-wider bg-[#1c1b22] px-2 py-0.5 rounded border border-[#2c2b36]">
                        {point.timing}
                      </span>
                      <span className="font-code-md text-[10px] text-neutral-400">
                        MISSION {point.num}
                      </span>
                      {point.timelineTag && (
                        <span className="font-code-md text-[9px] text-[#ffdad6] tracking-wider bg-[#ff1e27]/20 px-1.5 py-0.5 rounded border border-[#ff1e27]/30">
                          {point.timelineTag}
                        </span>
                      )}
                    </div>

                    <h3 className="font-headline-sm text-lg text-white uppercase tracking-wider group-hover:text-[#ffdad6] transition-colors">
                      {point.title}
                    </h3>

                    {point.timelineBlurb && (
                      <p className="font-body-sm text-xs text-[#b0aeb8] mt-1 leading-snug">
                        {point.timelineBlurb}
                      </p>
                    )}

                    {/* Schedule Preview */}
                    <div className="mt-2 space-y-1 bg-[#131317] p-2.5 rounded border border-[#24232c] max-w-md">
                      {point.schedule.map((item, sIdx) => (
                        <div key={sIdx} className="flex items-center justify-between text-xs font-code-md">
                          <span className="text-[#ffb4ab]">{item.time}</span>
                          <span className="text-neutral-400">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* PHASE SHIFT / NIGHT ZERO DIVIDER */}
          <div className="flex items-center gap-4 py-2">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-[#ff1e27]/60 to-transparent" />
            <div className="flex items-center gap-2 bg-[#16161b] px-3 py-1 border border-[#ff1e27]/30 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff544b] animate-ping" />
              <span className="font-code-md text-[10px] tracking-[0.25em] text-[#ffdad6] uppercase">
                PHASE SHIFT // NIGHT ZERO
              </span>
            </div>
            <div className="flex-1 h-[1px] bg-gradient-to-l from-[#ff1e27]/60 to-transparent" />
          </div>

          {/* DAY 02 */}
          <div className="relative">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#ff544b]" />
              <span className="font-code-md text-xs tracking-[0.25em] text-[#ff544b] uppercase font-bold">
                DAY 02 // 15 OCTOBER 2026
              </span>
            </div>

            <div className="relative pl-6 border-l-2 border-[#ff1e27]/60 space-y-8 ml-2">
              {day2Points.map((point, i) => {
                const idx = i + 3;
                return (
                  <div
                    key={point.num}
                    onClick={(e) => toggleTooltip(idx, e)}
                    className="relative cursor-pointer group"
                  >
                    {/* Glowing Node on the left line */}
                    <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#18181e] border-2 border-[#ff1e27] group-hover:bg-[#ff1e27] transition-colors" />

                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-code-md text-[10px] text-[#ff544b] tracking-wider bg-[#1c1b22] px-2 py-0.5 rounded border border-[#2c2b36]">
                        {point.timing}
                      </span>
                      <span className="font-code-md text-[10px] text-neutral-400">
                        MISSION {point.num}
                      </span>
                      {point.timelineTag && (
                        <span className="font-code-md text-[9px] text-[#ffdad6] tracking-wider bg-[#ff1e27]/20 px-1.5 py-0.5 rounded border border-[#ff1e27]/30">
                          {point.timelineTag}
                        </span>
                      )}
                    </div>

                    <h3 className="font-headline-sm text-lg text-white uppercase tracking-wider group-hover:text-[#ffdad6] transition-colors">
                      {point.title}
                    </h3>

                    {point.timelineBlurb && (
                      <p className="font-body-sm text-xs text-[#b0aeb8] mt-1 leading-snug">
                        {point.timelineBlurb}
                      </p>
                    )}

                    {/* Schedule Preview */}
                    <div className="mt-2 space-y-1 bg-[#131317] p-2.5 rounded border border-[#24232c] max-w-md">
                      {point.schedule.map((item, sIdx) => (
                        <div key={sIdx} className="flex items-center justify-between text-xs font-code-md">
                          <span className="text-[#ffb4ab]">{item.time}</span>
                          <span className="text-neutral-400">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. Section Callout & Clean Transition into Mission Access */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#1e1e24] pt-8 mt-10">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <span className="w-2 h-2 rounded-full bg-[#ff1e27] animate-ping" />
            <span className="font-headline-sm text-xl sm:text-2xl text-white uppercase tracking-[0.1em]">
              THE PLAN IS SET.
            </span>
            <span className="font-code-md text-xs text-[#909099] tracking-widest uppercase hidden md:inline">
              LIMITED PASSES AVAILABLE
            </span>
          </div>
          <a
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#ff1e27] text-white hover:brightness-110 font-headline-sm text-lg uppercase tracking-[0.16em] transition-[filter,box-shadow] shadow-[0_0_20px_rgba(255,30,39,0.35)] font-semibold"
            href="#access"
          >
            <span>ACQUIRE MISSION ACCESS</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
}
