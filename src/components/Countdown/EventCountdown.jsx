import React, { useState, useEffect } from 'react';
import { useInViewAnimation } from '../../hooks/useInViewAnimation';
import { MOTION_EASING } from '../../utils/motion';
import RollingText from '../Hero/RollingText';

// Official Symposium Start: 14 October 2026, 9:00 AM IST (Asia/Kolkata = UTC+05:30)
const SYMPOSIUM_START_TIME = new Date('2026-10-14T09:00:00+05:30').getTime();

function calculateTimeRemaining() {
  const now = Date.now();
  const diff = SYMPOSIUM_START_TIME - now;

  if (diff <= 0) {
    return {
      isComplete: true,
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00',
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return {
    isComplete: false,
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  };
}

export default function EventCountdown() {
  const [sectionRef, inView] = useInViewAnimation({ threshold: 0.15 });
  const [timeLeft, setTimeLeft] = useState(calculateTimeRemaining);

  useEffect(() => {
    // Initial sync
    setTimeLeft(calculateTimeRemaining());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const countdownUnits = [
    { label: 'DAYS', value: timeLeft.days, sub: 'REMAINING' },
    { label: 'HOURS', value: timeLeft.hours, sub: 'STANDARD TIME' },
    { label: 'MINUTES', value: timeLeft.minutes, sub: 'ELAPSING' },
    { label: 'SECONDS', value: timeLeft.seconds, sub: 'LIVE CLOCK' },
  ];

  return (
    <section
      ref={sectionRef}
      id="countdown"
      aria-label="Event Countdown"
      className="w-full relative bg-[#08080a]/60 text-[#e5e1e4] py-8 sm:py-10 md:py-12 overflow-hidden select-none"
    >
      {/* Cinematic Soft Atmospheric Gradient Transitions (Top & Bottom fades) */}
      <div className="absolute top-0 inset-x-0 h-16 pointer-events-none bg-gradient-to-b from-[#08080a] via-[#08080a]/40 to-transparent z-0" />
      <div className="absolute bottom-0 inset-x-0 h-16 pointer-events-none bg-gradient-to-t from-[#08080a] via-[#08080a]/40 to-transparent z-0" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(255,30,39,0.06)_0%,transparent_75%)]" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Section Indicator */}
          <div
            className="flex items-center gap-2 mb-2 transition-all duration-700"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(12px)',
              transitionTimingFunction: MOTION_EASING.cinematic,
            }}
          >
            <span className="w-2 h-2 rounded-full bg-[#ff1e27] animate-pulse" />
            <span className="font-label-sm text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#ff544b] font-bold">
              MISSION TIMELINE // SYMPOSIUM LAUNCH
            </span>
          </div>

          {/* Heading */}
          <h2
            className="font-headline-lg text-2xl min-[400px]:text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-[0.08em] leading-none mb-2 drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(14px)',
              transitionDelay: '100ms',
              transitionTimingFunction: MOTION_EASING.cinematic,
            }}
          >
            <RollingText
              text="THE COUNTDOWN BEGINS"
              active={inView}
              isComplete={inView}
              duration={0.65}
              stagger={0.02}
            />
          </h2>

          {/* Subtitle */}
          <p
            className="font-code-md text-[11px] sm:text-xs text-[#cac5d0]/80 tracking-[0.20em] uppercase mb-6 sm:mb-8"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(10px)',
              transitionDelay: '200ms',
              transitionTimingFunction: MOTION_EASING.cinematic,
            }}
          >
            OFFICIAL START: 14 OCTOBER 2026 • 9:00 AM IST • KPRIET COIMBATORE
          </p>

          {/* Countdown Display Units */}
          {timeLeft.isComplete ? (
            <div
              className="p-5 sm:p-6 bg-[#161012] border-2 border-[#ff1e27] rounded shadow-[0_0_40px_rgba(255,30,39,0.3)] max-w-xl mx-auto w-full transition-all duration-700"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'scale(1)' : 'scale(0.96)',
                transitionTimingFunction: MOTION_EASING.cinematic,
              }}
            >
              <div className="flex items-center justify-center gap-2 mb-2 text-[#48bb78]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#48bb78] animate-ping" />
                <span className="font-code-md text-xs sm:text-sm uppercase tracking-[0.24em] font-bold">
                  MISSION ACTIVE
                </span>
              </div>
              <h3 className="font-headline-lg text-2xl sm:text-4xl text-white font-bold uppercase tracking-wider">
                THE OPERATION HAS BEGUN
              </h3>
              <p className="font-code-md text-xs text-[#ffdad6]/80 uppercase tracking-widest mt-1">
                TECHBYTE SUMMIT 26 IS CURRENTLY UNDERWAY
              </p>
            </div>
          ) : (
            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-5 max-w-4xl mx-auto w-full transition-all duration-[800ms]"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(18px)',
                transitionDelay: '250ms',
                transitionTimingFunction: MOTION_EASING.cinematic,
              }}
            >
              {countdownUnits.map((unit, idx) => (
                <div
                  key={idx}
                  className="relative p-3.5 sm:p-5 bg-[#100f14]/90 border border-[#2d2936] hover:border-[#ff1e27]/50 rounded shadow-[0_8px_30px_rgba(0,0,0,0.7)] flex flex-col items-center justify-center text-center group transition-all duration-300"
                >
                  {/* Subtle top indicator notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-gradient-to-r from-transparent via-[#ff1e27]/60 to-transparent group-hover:w-16 transition-all duration-300" />

                  {/* Digit Display */}
                  <span className="font-headline-lg text-4xl min-[400px]:text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-none group-hover:text-[#ffdad6] transition-colors drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)] tabular-nums">
                    {unit.value}
                  </span>

                  {/* Unit Label */}
                  <span className="font-code-md text-xs sm:text-[13px] text-[#ff544b] uppercase tracking-[0.22em] font-bold mt-2 sm:mt-2.5">
                    {unit.label}
                  </span>

                  {/* Subtext */}
                  <span className="font-code-md text-[8.5px] sm:text-[9.5px] text-[#8e8a96] uppercase tracking-wider mt-0.5">
                    {unit.sub}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
