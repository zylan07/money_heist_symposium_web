import React from 'react';
import { SYMPOSIUM_INFO } from '../../data/events';
import operationImg from '../../assets/operation.jpg';
import OperationImageReveal from './OperationImageReveal';
import { useInViewAnimation } from '../../hooks/useInViewAnimation';
import RollingText from '../Hero/RollingText';

export default function Operation() {
  const [sectionRef, inView] = useInViewAnimation({ threshold: 0.15 });

  return (
    <section
      ref={sectionRef}
      id="the-operation"
      className="w-full bg-[#08080a]/25 relative overflow-hidden text-[#e5e1e4] border-t border-[#1c1b1e]/60 py-16 sm:py-20"
    >
      <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* 40-45% Dossier Column with Staggered Entrance */}
          <div
            className={`lg:col-span-5 flex flex-col justify-center space-y-5 transition-[opacity,transform] duration-700 will-change-[transform,opacity] ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
            id="operation-dossier"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ff1e27] animate-pulse" />
              <span className="font-label-sm text-xs tracking-[0.3em] uppercase text-[#ff1e27] font-bold">
                01 // THE OPERATION
              </span>
            </div>

            <h2 className="font-headline-lg text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-[0.05em] leading-tight">
              <RollingText
                text="THE OPERATION."
                active={inView}
                isComplete={inView}
                duration={0.7}
                stagger={0.025}
              />
            </h2>

            {SYMPOSIUM_INFO.operationTagline && (
              <p className="font-code-md text-xs sm:text-sm tracking-[0.2em] text-[#ff544b] uppercase font-medium">
                {SYMPOSIUM_INFO.operationTagline}
              </p>
            )}

            <p className="font-body-md text-sm sm:text-base text-[#c8c5ca] leading-relaxed font-light">
              {SYMPOSIUM_INFO.missionBrief}
            </p>

            <div className="py-2 px-3.5 bg-[#121215]/80 border-l-2 border-[#ff1e27] font-code-md text-xs tracking-wider text-[#ffdad6]">
              <span className="text-[#ff544b] uppercase font-bold">CONDUCTED BY: </span>
              <span>Department of CSE in collaboration with Yi Yuva Club, KPRIET</span>
            </div>

            <div className="py-3 border-y border-[#262529] font-code-md text-xs tracking-[0.12em] text-neutral-400 bg-[#121215]/60 px-4 rounded-sm flex flex-wrap items-center gap-2 uppercase">
              <span className="text-[#ff544b] font-semibold">{SYMPOSIUM_INFO.dates}</span>
              <span>•</span>
              <span>{SYMPOSIUM_INFO.institution.toUpperCase()}</span>
              <span>•</span>
              <span>COIMBATORE</span>
              <span>•</span>
              <span>2 DAYS</span>
            </div>

            <div>
              <a
                className="relative inline-flex items-center justify-center gap-3 px-6 py-3 bg-[#121215] text-white border border-[#ff1e27]/80 hover:bg-[#ff1e27]/20 font-code-md text-xs uppercase tracking-[0.2em] transition-colors shadow-[0_0_15px_rgba(255,30,39,0.2)]"
                href="#missions"
              >
                <span>KNOW MORE</span>
                <span className="text-[#ff1e27]">→</span>
              </a>
            </div>
          </div>

          {/* 55-60% Framed Visual Column — Edge-to-Center Photographic Reconstruction */}
          <div
            className={`lg:col-span-7 relative w-full transition-[opacity,transform] duration-700 will-change-[transform,opacity] ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
            id="operation-board"
          >
            <div className="relative p-2 sm:p-2.5 bg-[#19191d] border border-[#38373d] rounded shadow-[0_25px_60px_rgba(0,0,0,0.85)] group overflow-hidden">
              <OperationImageReveal src={operationImg} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
