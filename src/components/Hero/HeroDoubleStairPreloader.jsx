import React from 'react';

/**
 * 6 Cascading tiers forming opposing stepped architectural security shutters
 */
const STAIR_TIERS = [
  { leftWidth: '38%', rightWidth: '72%', label: 'SEC-01 // ALPHA' },
  { leftWidth: '50%', rightWidth: '60%', label: 'SEC-02 // BRAVO' },
  { leftWidth: '62%', rightWidth: '48%', label: 'SEC-03 // CHARLIE' },
  { leftWidth: '74%', rightWidth: '36%', label: 'SEC-04 // DELTA' },
  { leftWidth: '86%', rightWidth: '24%', label: 'SEC-05 // ECHO' },
  { leftWidth: '98%', rightWidth: '12%', label: 'SEC-06 // FOXTROT' },
];

export default function HeroDoubleStairPreloader({
  preloaderRef,
  bgOverlayRef,
  leftTiersRef,
  rightTiersRef,
  seamRef,
}) {
  return (
    <div
      ref={preloaderRef}
      id="double-stair-preloader"
      className="fixed inset-0 z-50 pointer-events-none overflow-hidden select-none"
      style={{ willChange: 'opacity' }}
    >
      {/* Dark Ambient Ground Plane */}
      <div
        ref={bgOverlayRef}
        className="absolute inset-0 bg-[#08080a] pointer-events-none will-change-opacity"
      />

      {/* LEFT STAIR STRUCTURE — Enters from -105%, Retracts -115% */}
      <div className="absolute inset-y-0 left-0 w-full pointer-events-none">
        {STAIR_TIERS.map((tier, idx) => (
          <div
            key={`left-${idx}`}
            ref={(el) => {
              if (leftTiersRef.current) leftTiersRef.current[idx] = el;
            }}
            className="absolute left-0 overflow-hidden bg-gradient-to-r from-[#0a090e] via-[#100f16] to-[#14121b] border-y border-[#23202e]/90 border-r-2 border-r-[#ff1e27]/80 shadow-[4px_0_22px_rgba(255,30,39,0.3)] will-change-transform flex items-center justify-between"
            style={{
              top: `calc(${idx} * (100% / 6))`,
              height: `calc(100% / 6 + 1px)`,
              width: tier.leftWidth,
              transform: 'translate3d(-105%, 0, 0)',
            }}
          >
            {/* Horizontal shutter louvers */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-black/60 shadow-[0_1px_0_rgba(255,255,255,0.03)] pointer-events-none" />
            <div className="absolute inset-x-0 top-1/4 h-[1px] bg-black/40 shadow-[0_1px_0_rgba(255,255,255,0.02)] pointer-events-none" />
            <div className="absolute inset-x-0 top-3/4 h-[1px] bg-black/40 shadow-[0_1px_0_rgba(255,255,255,0.02)] pointer-events-none" />

            {/* Industrial Stencil Mark */}
            <div className="pl-4 sm:pl-6 flex items-center gap-2 z-10 opacity-70">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff1e27] animate-pulse" />
              <span className="font-code-md text-[8px] sm:text-[9px] text-[#ffdad6]/60 tracking-[0.22em] uppercase font-mono">
                {tier.label}
              </span>
            </div>

            {/* Red Seam End Cap Indicator */}
            <div className="h-full w-1.5 bg-[#ff1e27]/40 shadow-[0_0_8px_rgba(255,30,39,0.6)] shrink-0" />
          </div>
        ))}
      </div>

      {/* RIGHT STAIR STRUCTURE — Enters from 105%, Retracts 115% */}
      <div className="absolute inset-y-0 right-0 w-full pointer-events-none">
        {STAIR_TIERS.map((tier, idx) => (
          <div
            key={`right-${idx}`}
            ref={(el) => {
              if (rightTiersRef.current) rightTiersRef.current[idx] = el;
            }}
            className="absolute right-0 overflow-hidden bg-gradient-to-l from-[#08070c] via-[#0e0d14] to-[#121118] border-y border-[#23202e]/90 border-l-2 border-l-[#ff1e27]/80 shadow-[-4px_0_22px_rgba(255,30,39,0.3)] will-change-transform flex items-center justify-between"
            style={{
              top: `calc(${idx} * (100% / 6))`,
              height: `calc(100% / 6 + 1px)`,
              width: tier.rightWidth,
              transform: 'translate3d(105%, 0, 0)',
            }}
          >
            {/* Red Seam Start Cap Indicator */}
            <div className="h-full w-1.5 bg-[#ff1e27]/40 shadow-[0_0_8px_rgba(255,30,39,0.6)] shrink-0" />

            {/* Horizontal shutter louvers */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-black/60 shadow-[0_1px_0_rgba(255,255,255,0.03)] pointer-events-none" />
            <div className="absolute inset-x-0 top-1/4 h-[1px] bg-black/40 shadow-[0_1px_0_rgba(255,255,255,0.02)] pointer-events-none" />
            <div className="absolute inset-x-0 top-3/4 h-[1px] bg-black/40 shadow-[0_1px_0_rgba(255,255,255,0.02)] pointer-events-none" />

            {/* Industrial Stencil Mark (Right side) */}
            <div className="pr-4 sm:pr-6 flex items-center gap-2 z-10 opacity-70">
              <span className="font-code-md text-[8px] sm:text-[9px] text-[#ffdad6]/60 tracking-[0.22em] uppercase font-mono">
                SEC-LOCK // {idx + 1}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff544b]/80" />
            </div>
          </div>
        ))}
      </div>

      {/* CENTRAL COMPOSITION LASER SEAM INDICATOR */}
      <div
        ref={seamRef}
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-transparent via-[#ff1e27] to-transparent shadow-[0_0_18px_rgba(255,30,39,0.9)] opacity-0 pointer-events-none will-change-opacity"
      />
    </div>
  );
}
