import React from 'react';

/**
 * TECHBYTE SUMMIT '26 — LARGE HERO-SCALE REGISTRATION CLOSING SOON TICKER
 * 
 * Major cinematic emergency transmission banner positioned directly below HERO
 * and directly above the COUNTDOWN / TIMING COUNTER.
 * 
 * Visual Specs:
 * - 100–140px desktop height (~136px), scaled proportionally for mobile (~76px).
 * - Hero-scale typography ('Bebas Neue' font-display-lg) dominating the strip.
 * - Two-tone styling (crisp white + luminous heist crimson glow) matching the Hero title.
 * - Heavy industrial emergency borders with laser hairlines and ambient red pulse.
 * - Gapless continuous RIGHT -> LEFT marquee with zero visible jump.
 */

const TICKER_ITEMS_COUNT = 4;

export default function RegistrationAlertStrip() {
  const items = Array.from({ length: TICKER_ITEMS_COUNT }, (_, idx) => idx);

  const renderTickerSegment = (ariaHidden = false) => (
    <div
      className="flex items-center shrink-0"
      aria-hidden={ariaHidden ? "true" : undefined}
    >
      {items.map((i) => (
        <div key={i} className="inline-flex items-center shrink-0 select-none">
          {/* Pulsing Emergency Transmission Beacon */}
          <span className="inline-block w-2.5 h-2.5 min-[400px]:w-3 min-[400px]:h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full bg-[#ff1e27] shadow-[0_0_15px_#ff1e27,0_0_30px_#ff1e27] animate-pulse mr-3.5 sm:mr-5 md:mr-6 shrink-0" />

          {/* Hero-Scale Alert Typography: Two-Tone White & Glowing Crimson */}
          <span className="font-display-lg text-4xl min-[400px]:text-5xl sm:text-6xl md:text-7xl lg:text-[84px] xl:text-[96px] font-bold uppercase tracking-[0.04em] sm:tracking-[0.06em] leading-none scale-y-[1.04] whitespace-nowrap">
            <span className="text-[#f2edf0] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              REGISTRATION
            </span>{' '}
            <span className="text-[#ff1e27] drop-shadow-[0_0_35px_rgba(255,30,39,0.7),0_4px_20px_rgba(0,0,0,0.9)]">
              CLOSING SOON
            </span>
          </span>

          {/* Massive Classified Operation Separator */}
          <span className="font-display-lg text-2xl min-[400px]:text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#ff1e27]/80 mx-6 sm:mx-10 md:mx-14 lg:mx-16 tracking-widest select-none font-bold drop-shadow-[0_0_20px_rgba(255,30,39,0.5)]">
            //
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <aside
      aria-label="Registration Alert Banner"
      className="w-full relative z-20 overflow-hidden bg-[#070406]/98 border-y-2 border-[#ff1e27]/50 shadow-[0_0_35px_rgba(255,30,39,0.18),inset_0_0_30px_rgba(255,30,39,0.08)] backdrop-blur-md"
    >
      {/* Background Classified Crosshair Grid Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(to_right,#ff1e27_1px,transparent_1px),linear-gradient(to_bottom,#ff1e27_1px,transparent_1px)] bg-[size:44px_44px]" />

      {/* Atmospheric Ambient Core Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_100%_at_50%_50%,rgba(255,30,39,0.18)_0%,rgba(7,4,6,0)_80%)] animate-ticker-scan" />

      {/* Glowing Crimson Laser Accent Lines (Top & Bottom) */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff1e27] to-transparent shadow-[0_0_20px_#ff1e27] pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff1e27] to-transparent shadow-[0_0_20px_#ff1e27] pointer-events-none" />

      {/* Edge Gradient Masks for Cinematic Viewport Entry and Exit */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 md:w-36 lg:w-44 pointer-events-none bg-gradient-to-r from-[#060608] via-[#060608]/70 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 md:w-36 lg:w-44 pointer-events-none bg-gradient-to-l from-[#060608] via-[#060608]/70 to-transparent z-10" />

      {/* Large Hero-Scale Interactive Marquee Track */}
      <a
        href="#access"
        title="Emergency Notice: Registration Closing Soon — Secure Your Syndicate Pass"
        className="flex items-center h-[72px] min-[400px]:h-[80px] sm:h-[96px] md:h-[112px] lg:h-[128px] xl:h-[136px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff1e27] cursor-pointer group"
      >
        <div className="animate-alert-ticker flex whitespace-nowrap items-center">
          {/* Segment 1 */}
          {renderTickerSegment(false)}
          {/* Segment 2 (Duplicate for Seamless Zero-Jump Infinite Loop) */}
          {renderTickerSegment(true)}
        </div>
      </a>
    </aside>
  );
}
