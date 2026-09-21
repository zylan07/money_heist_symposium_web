import React from 'react';
import { useInViewAnimation } from '../../hooks/useInViewAnimation';
import CircularMissionCarousel from './CircularMissionCarousel';

export default function Missions({ onSelectMission, activeMissionId }) {
  const [sectionRef, inView] = useInViewAnimation({ threshold: 0.1 });

  return (
    <section
      ref={sectionRef}
      id="missions"
      className={`w-full bg-[#08080a]/25 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative border-t border-[#1c1b1e]/60 py-16 sm:py-24 transition-all duration-700 ${
        activeMissionId ? 'missions-dimmed' : ''
      }`}
    >
      <div className="mx-auto flex flex-col space-y-12 relative z-10 w-full max-w-[1680px]" id="missions-wrapper">
        {/* Section Header */}
        <div
          className={`flex flex-col space-y-3 transition-all duration-700 ${
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
              CHOOSE YOUR MISSION.
            </h2>
            <p className="font-code-md text-xs sm:text-sm tracking-[0.22em] uppercase text-[#c8c5ca]/80">
              SIX MISSIONS. TWO DAYS. ONE SUMMIT.
            </p>
          </div>
        </div>

        {/* DAY 1 MISSIONS — 3D Circular Carousel 1 */}
        <div className="w-full relative">
          <CircularMissionCarousel
            missionIds={['mission-01', 'mission-02', 'mission-03']}
            dayTitle="DAY 01 // 09 OCTOBER 2026"
            dayTag="3 LIVE RESEARCH &amp; BUILD STREAMS"
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
            dayTitle="DAY 02 // 10 OCTOBER 2026"
            dayTag="LEADERSHIP SUMMIT &amp; ALGO CONTEST"
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

