import React, { useState, useEffect, useRef } from 'react';
import { useInViewAnimation } from '../../hooks/useInViewAnimation';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import RollingText from '../Hero/RollingText';

/**
 * TECHBYTE SUMMIT '26 — INTERACTIVE CINEMATIC PRIZE POOL VAULT SECTION
 * 
 * Interactive Classified Vault / Bounty Terminal:
 * - 5 independent mechanical tumbler columns with safe sequence lengths (18-33 digits)
 *   preventing GPU texture memory drops on high-DPI screens
 * - Buffer digits positioned after target index preventing boundary-clipping / blank gaps
 * - Desktop hover: subtle illumination, corner activation, laser scan sweep & micro-parallax
 * - Mobile tap: momentary authenticated activation (glow & scan sweep) without scroll locking
 * - Idle breathing: faint atmospheric glow respiration & scanning line
 * - Post-sequence "BOUNTY SECURED // ALLOCATION LOCKED" final status lock
 * - 100% visible digits before, during and after rolling sequence: ₹ 50,000
 */

const COLUMNS_CONFIG = [
  {
    id: 'col-1',
    targetDigit: 5,
    tag: 'L-01',
    // Sequence rolls through 0-9 then 0..5, with safety buffer digits after target
    digits: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
      0, 1, 2, 3, 4, 5, 6, 7
    ],
    targetIndex: 15, // value: 5
    duration: 1.6,
  },
  {
    id: 'col-2',
    targetDigit: 0,
    tag: 'L-02',
    // Sequence rolls through two 0-9 cycles to 0, with safety buffer digits
    digits: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
      0, 1, 2
    ],
    targetIndex: 20, // value: 0
    duration: 2.05,
  },
  {
    id: 'col-3',
    targetDigit: 0,
    tag: 'L-03',
    // 27 digits total (prevents GPU texture drop), rolls to 0, with safety buffer digits
    digits: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
      1, 2, 3, 4,
      0, 1, 2
    ],
    targetIndex: 24, // value: 0
    duration: 2.50,
  },
  {
    id: 'col-4',
    targetDigit: 0,
    tag: 'L-04',
    // 30 digits total (prevents GPU texture drop), rolls to 0, with safety buffer digits
    digits: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
      1, 2, 3, 4, 5, 6, 7,
      0, 1, 2
    ],
    targetIndex: 27, // value: 0
    duration: 2.95,
  },
  {
    id: 'col-5',
    targetDigit: 0,
    tag: 'L-05',
    // 33 digits total (prevents GPU texture drop), rolls to 0, with safety buffer digits
    digits: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
      0, 1, 2
    ],
    targetIndex: 30, // value: 0
    duration: 3.40,
  },
];

export default function PrizePool() {
  const [sectionRef, inView] = useInViewAnimation({ threshold: 0.15 });
  const prefersReduced = useReducedMotion();
  const [isRolling, setIsRolling] = useState(false);
  const [lockedColumns, setLockedColumns] = useState([false, false, false, false, false]);
  const [isAllComplete, setIsAllComplete] = useState(false);

  // Interaction State
  const [isInteracting, setIsInteracting] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0, active: false });
  const touchTimeoutRef = useRef(null);
  const scanTimeoutRef = useRef(null);

  useEffect(() => {
    if (!inView) return;

    if (prefersReduced) {
      setIsRolling(true);
      setLockedColumns([true, true, true, true, true]);
      setIsAllComplete(true);
      return;
    }

    // Trigger rolling motion with slight initial cinematic pause
    const startTimer = setTimeout(() => {
      setIsRolling(true);
    }, 150);

    // Staggered column stops with mechanical lock feedback
    const lockTimers = COLUMNS_CONFIG.map((col, idx) => {
      return setTimeout(() => {
        setLockedColumns((prev) => {
          const next = [...prev];
          next[idx] = true;
          return next;
        });
      }, 150 + Math.round(col.duration * 1000));
    });

    // Final completion flash & lock authorization
    const completeTimer = setTimeout(() => {
      setIsAllComplete(true);
    }, 150 + 3450);

    return () => {
      clearTimeout(startTimer);
      lockTimers.forEach(clearTimeout);
      clearTimeout(completeTimer);
    };
  }, [inView, prefersReduced]);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
      if (scanTimeoutRef.current) clearTimeout(scanTimeoutRef.current);
    };
  }, []);

  // Pointer Parallax & Interaction Handlers
  const handleMouseMove = (e) => {
    if (prefersReduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    setMouseOffset({ x, y, active: true });
  };

  const handleMouseEnter = () => {
    setIsInteracting(true);
    setIsScanning(true);
    if (scanTimeoutRef.current) clearTimeout(scanTimeoutRef.current);
    scanTimeoutRef.current = setTimeout(() => {
      setIsScanning(false);
    }, 1250);
  };

  const handleMouseLeave = () => {
    setIsInteracting(false);
    setMouseOffset({ x: 0, y: 0, active: false });
  };

  // Mobile / Touch Interaction
  const handleCardClick = () => {
    setIsInteracting(true);
    setIsScanning(true);

    if (scanTimeoutRef.current) clearTimeout(scanTimeoutRef.current);
    scanTimeoutRef.current = setTimeout(() => {
      setIsScanning(false);
    }, 1250);

    if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
    touchTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
      setMouseOffset({ x: 0, y: 0, active: false });
    }, 2400);
  };

  return (
    <section
      ref={sectionRef}
      id="prize-pool"
      aria-label="Prize Pool"
      className="w-full relative bg-[#070508]/90 text-[#e5e1e4] py-8 sm:py-10 md:py-12 overflow-hidden select-none border-b border-[#ff1e27]/20"
    >
      {/* FAINT TECHNICAL GRID & CROSSHAIR COORDINATE BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[linear-gradient(to_right,#ff1e27_1px,transparent_1px),linear-gradient(to_bottom,#ff1e27_1px,transparent_1px)] bg-[size:36px_36px]" />

      {/* Atmospheric Soft Gradient Transitions (Top & Bottom fades) */}
      <div className="absolute top-0 inset-x-0 h-16 pointer-events-none bg-gradient-to-b from-[#070406] via-[#070406]/60 to-transparent z-0" />
      <div className="absolute bottom-0 inset-x-0 h-16 pointer-events-none bg-gradient-to-t from-[#08080a] via-[#08080a]/60 to-transparent z-0" />

      {/* CINEMATIC CENTER GLOW WITH IDLE BREATHING & POINTER PARALLAX */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] md:w-[680px] lg:w-[820px] h-48 sm:h-64 rounded-full pointer-events-none blur-3xl z-0 transition-all duration-700 ${
          isInteracting
            ? 'opacity-90 scale-105 bg-[radial-gradient(ellipse_at_center,rgba(255,30,39,0.26)_0%,rgba(255,30,39,0.09)_45%,transparent_75%)]'
            : 'opacity-70 scale-100 bg-[radial-gradient(ellipse_at_center,rgba(255,30,39,0.18)_0%,rgba(255,30,39,0.05)_45%,transparent_75%)]'
        }`}
        style={{
          transform: !prefersReduced && mouseOffset.active
            ? `translate(calc(-50% + ${mouseOffset.x * 24}px), calc(-50% + ${mouseOffset.y * 16}px))`
            : 'translate(-50%, -50%)',
          transitionProperty: mouseOffset.active ? 'transform' : 'transform, opacity, scale',
          transitionDuration: mouseOffset.active ? '150ms' : '700ms',
          transitionTimingFunction: 'ease-out',
        }}
      />

      {/* MAIN CONTAINER */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 relative z-10 flex flex-col items-center text-center">
        {/* Subtle Outer Transmission Header Bar */}
        <div className="w-full flex items-center justify-between text-[#5f5a6a] font-code-md text-[8.5px] sm:text-[9.5px] tracking-[0.25em] uppercase mb-3 px-2 select-none pointer-events-none opacity-70">
          <span className="hidden sm:inline-flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-[#ff1e27]/60" />
            // SECURE CHANNEL // FINANCIAL ALLOCATION
          </span>
          <span className="mx-auto sm:mx-0 flex items-center gap-1.5 text-[#ff544b]/60">
            <span>SYS_07 // AUTHORIZED ACCESS</span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5">
            // TRANSMISSION ENCRYPTED
            <span className="w-1 h-1 rounded-full bg-[#48bb78]/60" />
          </span>
        </div>

        {/* CLASSIFIED BOUNTY HUD STATUS INDICATOR */}
        <div
          onClick={handleCardClick}
          className={`inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-2 px-3 py-1 rounded-full border transition-all duration-300 cursor-pointer backdrop-blur-sm ${
            isInteracting
              ? 'border-[#ff1e27] bg-[#1a0c12]/80 shadow-[0_0_20px_rgba(255,30,39,0.3)]'
              : 'border-[#ff1e27]/30 bg-[#140b10]/70 shadow-[0_0_15px_rgba(255,30,39,0.12)]'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff1e27] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff1e27]" />
            </span>
            <span className="font-label-sm text-[10px] sm:text-xs tracking-[0.28em] uppercase text-[#ff544b] font-bold">
              CLASSIFIED BOUNTY // MONETARY ALLOCATION
            </span>
          </div>
          <span className="text-[#453f4d] text-xs hidden sm:inline">|</span>
          <div className="flex items-center gap-1.5 font-code-md text-[9.5px] sm:text-[10px] tracking-[0.20em] text-[#ffdad6]/80 uppercase font-semibold">
            <span className="text-[#8a8594]">STATUS:</span>
            <span className="text-[#48bb78] flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#48bb78] animate-pulse" />
              ACTIVE
            </span>
          </div>
        </div>

        {/* MAIN TITLE: PRIZE POOL */}
        <h2 className="font-headline-lg text-3xl min-[400px]:text-4xl sm:text-5xl md:text-6xl text-white uppercase tracking-[0.08em] leading-none mb-6 sm:mb-8 drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
          <RollingText
            text="PRIZE POOL"
            active={inView}
            isComplete={inView}
            duration={0.65}
            stagger={0.025}
          />
        </h2>

        {/* MAIN DISPLAY ROW FLANKED BY SIDE HUD INFORMATION (DESKTOP) */}
        <div className="w-full flex items-center justify-center gap-4 lg:gap-8 xl:gap-12 max-w-5xl mx-auto">
          {/* LEFT SIDE HUD TELEMETRY (Desktop only) */}
          <div
            className={`hidden lg:flex flex-col gap-5 text-left border-l pl-4 py-3 select-none shrink-0 w-36 xl:w-44 transition-all duration-300 ${
              isInteracting
                ? 'border-[#ff1e27] text-white shadow-[inset_1px_0_12px_rgba(255,30,39,0.15)]'
                : 'border-[#ff1e27]/30 text-[#e5e1e4]'
            }`}
          >
            <div className="flex flex-col">
              <span className={`font-code-md text-[9px] xl:text-[10px] uppercase tracking-[0.22em] font-semibold transition-colors duration-300 ${
                isInteracting ? 'text-[#ff9995]' : 'text-[#8a8594]'
              }`}>
                PRIZE STATUS
              </span>
              <span className="font-headline-sm text-sm xl:text-base text-white uppercase tracking-[0.16em] font-bold flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-[#48bb78] animate-pulse" />
                VERIFIED
              </span>
            </div>

            <div className={`w-10 h-[1px] transition-colors duration-300 ${
              isInteracting ? 'bg-[#ff1e27]/50' : 'bg-[#ff1e27]/25'
            }`} />

            <div className="flex flex-col">
              <span className={`font-code-md text-[9px] xl:text-[10px] uppercase tracking-[0.22em] font-semibold transition-colors duration-300 ${
                isInteracting ? 'text-[#ff9995]' : 'text-[#8a8594]'
              }`}>
                ALLOCATION
              </span>
              <span className={`font-headline-sm text-lg xl:text-xl uppercase tracking-[0.14em] font-bold mt-0.5 transition-all duration-300 ${
                isInteracting
                  ? 'text-[#ff544b] drop-shadow-[0_0_18px_rgba(255,30,39,0.7)] scale-[1.02]'
                  : 'text-[#ff544b] drop-shadow-[0_0_12px_rgba(255,30,39,0.45)]'
              }`}>
                ₹50,000
              </span>
            </div>
          </div>

          {/* MAIN INTERACTIVE VAULT TERMINAL CONTAINER */}
          <div
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleCardClick}
            className={`relative flex flex-col items-center justify-center p-3.5 min-[380px]:p-4 sm:p-6 md:p-7 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#140c13]/95 via-[#0b080c]/98 to-[#050406] border transition-all duration-500 max-w-full cursor-pointer group ${
              isInteracting
                ? 'border-[#ff1e27] shadow-[0_0_55px_rgba(255,30,39,0.5),inset_0_0_25px_rgba(255,30,39,0.18)]'
                : isAllComplete
                ? 'border-[#ff1e27]/80 shadow-[0_0_40px_rgba(255,30,39,0.35),inset_0_0_20px_rgba(255,30,39,0.1)]'
                : 'border-[#ff1e27]/35 shadow-[0_16px_50px_rgba(0,0,0,0.95),inset_0_1px_12px_rgba(255,30,39,0.06)]'
            }`}
          >
            {/* TECHNICAL CORNER BRACKETS */}
            <span
              className={`absolute -top-1.5 -left-1.5 w-3.5 h-3.5 sm:w-5 sm:h-5 border-t-2 border-l-2 transition-all duration-300 pointer-events-none ${
                isInteracting
                  ? 'border-[#ff1e27] shadow-[0_0_12px_#ff1e27]'
                  : 'border-[#ff1e27]/40'
              }`}
            />
            <span
              className={`absolute -top-1.5 -right-1.5 w-3.5 h-3.5 sm:w-5 sm:h-5 border-t-2 border-r-2 transition-all duration-300 pointer-events-none ${
                isInteracting
                  ? 'border-[#ff1e27] shadow-[0_0_12px_#ff1e27]'
                  : 'border-[#ff1e27]/40'
              }`}
            />
            <span
              className={`absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 sm:w-5 sm:h-5 border-b-2 border-l-2 transition-all duration-300 pointer-events-none ${
                isInteracting
                  ? 'border-[#ff1e27] shadow-[0_0_12px_#ff1e27]'
                  : 'border-[#ff1e27]/40'
              }`}
            />
            <span
              className={`absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 sm:w-5 sm:h-5 border-b-2 border-r-2 transition-all duration-300 pointer-events-none ${
                isInteracting
                  ? 'border-[#ff1e27] shadow-[0_0_12px_#ff1e27]'
                  : 'border-[#ff1e27]/40'
              }`}
            />

            {/* RED CORNER INDICATOR LEDS */}
            <span
              className={`absolute top-2 left-2.5 w-1 h-1 rounded-full transition-all duration-300 pointer-events-none ${
                isInteracting
                  ? 'bg-[#ff1e27] shadow-[0_0_8px_#ff1e27,0_0_16px_#ff1e27]'
                  : 'bg-[#ff1e27]/60 shadow-[0_0_4px_#ff1e27] animate-pulse'
              }`}
            />
            <span
              className={`absolute top-2 right-2.5 w-1 h-1 rounded-full transition-all duration-300 pointer-events-none ${
                isInteracting
                  ? 'bg-[#ff1e27] shadow-[0_0_8px_#ff1e27,0_0_16px_#ff1e27]'
                  : 'bg-[#ff1e27]/60 shadow-[0_0_4px_#ff1e27] animate-pulse'
              }`}
            />
            <span
              className={`absolute bottom-2 left-2.5 w-1 h-1 rounded-full transition-all duration-300 pointer-events-none ${
                isInteracting
                  ? 'bg-[#ff1e27] shadow-[0_0_8px_#ff1e27,0_0_16px_#ff1e27]'
                  : 'bg-[#ff1e27]/60 shadow-[0_0_4px_#ff1e27]'
              }`}
            />
            <span
              className={`absolute bottom-2 right-2.5 w-1 h-1 rounded-full transition-all duration-300 pointer-events-none ${
                isInteracting
                  ? 'bg-[#ff1e27] shadow-[0_0_8px_#ff1e27,0_0_16px_#ff1e27]'
                  : 'bg-[#ff1e27]/60 shadow-[0_0_4px_#ff1e27]'
              }`}
            />

            {/* FAINT INTERNAL SCANLINES & GRID TEXTURE */}
            <div className="absolute inset-0 pointer-events-none rounded-xl sm:rounded-2xl opacity-[0.035] bg-[radial-gradient(#ff1e27_1px,transparent_1px)] bg-[size:12px_12px]" />

            {/* IDLE & ACTIVE SCANNER SWEEP LINES */}
            {isScanning ? (
              <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff1e27] to-transparent shadow-[0_0_16px_#ff1e27] pointer-events-none animate-active-scan z-30" />
            ) : (
              <div className="absolute inset-x-2 sm:inset-x-3 h-[2px] bg-gradient-to-r from-transparent via-[#ff1e27]/35 to-transparent shadow-[0_0_10px_#ff1e27] pointer-events-none animate-vault-scan z-30 opacity-70" />
            )}

            {/* TOP TECHNICAL HUD LABELS INSIDE CONTAINER (Micro-Parallax) */}
            <div
              className="w-full flex items-center justify-between pb-2.5 sm:pb-3 mb-2 sm:mb-2.5 border-b border-[#ff1e27]/20 font-code-md text-[8.5px] min-[400px]:text-[9.5px] sm:text-[10px] tracking-[0.20em] uppercase select-none transition-colors duration-300"
              style={{
                transform: !prefersReduced && mouseOffset.active
                  ? `translate3d(${mouseOffset.x * 4}px, ${mouseOffset.y * 3}px, 0)`
                  : 'translate3d(0, 0, 0)',
                transition: mouseOffset.active ? 'transform 120ms ease-out' : 'transform 500ms ease-out',
              }}
            >
              <div className={`flex items-center gap-1.5 transition-colors duration-300 ${
                isInteracting ? 'text-[#ffdad6]' : 'text-[#ff9995]'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff1e27] animate-pulse" />
                <span className="font-bold">BOUNTY COUNTER</span>
              </div>
              <div className={`flex items-center gap-1 hidden min-[400px]:flex transition-colors duration-300 ${
                isInteracting ? 'text-[#e5e1e4]' : 'text-[#7a7584]'
              }`}>
                <span>TERMINAL</span>
                <span className={`font-bold transition-colors duration-300 ${
                  isInteracting ? 'text-[#ff544b]' : 'text-[#ff544b]/80'
                }`}>// 0x50K</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`transition-colors duration-300 ${
                  isInteracting ? 'text-[#cac5d0]' : 'text-[#8a8594]'
                }`}>
                  SYSTEM STATUS //
                </span>
                <span className="text-[#48bb78] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#48bb78]" />
                  ACTIVE
                </span>
              </div>
            </div>

            {/* INNER DISPLAY: ₹ SIGNIFIER + 5 ROLLING COLUMNS */}
            <div
              className={`relative z-10 flex items-center justify-center p-1 sm:p-2 rounded-lg bg-[#070508]/70 border transition-all duration-300 ${
                isInteracting ? 'border-[#ff1e27]/35 bg-[#0a0609]/80 shadow-[inset_0_0_20px_rgba(255,30,39,0.12)]' : 'border-[#ff1e27]/15'
              }`}
              style={{
                transform: !prefersReduced && mouseOffset.active
                  ? `translate3d(${mouseOffset.x * 2.2}px, ${mouseOffset.y * 2.2}px, 0)`
                  : 'translate3d(0, 0, 0)',
                transition: mouseOffset.active ? 'transform 120ms ease-out' : 'transform 500ms ease-out',
              }}
            >
              {/* Currency Signifier: ₹ (Separated, Static, Non-Animated) */}
              <div className="flex items-center justify-center mr-1 min-[380px]:mr-2 sm:mr-3 md:mr-4 select-none shrink-0">
                <span className={`font-headline-lg text-3xl min-[380px]:text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-[#ff544b] font-bold leading-none transition-all duration-300 ${
                  isInteracting
                    ? 'drop-shadow-[0_0_28px_rgba(255,30,39,0.8)] scale-[1.03]'
                    : 'drop-shadow-[0_0_22px_rgba(255,30,39,0.6)] scale-100'
                }`}>
                  ₹
                </span>
              </div>

              {/* 5 Rolling Digit Columns Group */}
              <div className="flex items-center gap-1 min-[380px]:gap-1.5 sm:gap-2.5 md:gap-3.5 lg:gap-4 shrink-0">
                {COLUMNS_CONFIG.map((col, idx) => {
                  const isLocked = lockedColumns[idx];

                  return (
                    <React.Fragment key={col.id}>
                      {/* Subtle Separator Comma between 2nd and 3rd digit (₹50,000) */}
                      {idx === 2 && (
                        <span
                          aria-hidden="true"
                          className="font-headline-lg text-2xl min-[380px]:text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-[#ff544b]/80 font-bold self-end pb-1 min-[380px]:pb-1.5 sm:pb-3 select-none -mx-0.5 sm:-mx-1 leading-none drop-shadow-[0_0_12px_rgba(255,30,39,0.4)]"
                        >
                          ,
                        </span>
                      )}

                      {/* Individual Tumbler Column Reel with Mechanical HUD Elements */}
                      <div className="flex flex-col items-center gap-1">
                        {/* Status / Lock Monitor Above Reel */}
                        <div className="flex items-center gap-1 font-code-md text-[7.5px] sm:text-[8.5px] tracking-widest uppercase">
                          <span
                            className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full transition-all duration-300 ${
                              isLocked
                                ? 'bg-[#ff1e27] shadow-[0_0_6px_#ff1e27]'
                                : 'bg-[#ff1e27]/40 animate-pulse'
                            }`}
                          />
                          <span className={isLocked ? 'text-[#ff9995] font-semibold' : 'text-[#6a6574]'}>
                            {col.tag}
                          </span>
                        </div>

                        {/* Tumbler Reel Box */}
                        <div
                          className={`relative w-11 min-[380px]:w-12 sm:w-16 md:w-20 lg:w-24 xl:w-28 h-16 min-[380px]:h-18 sm:h-24 md:h-28 lg:h-32 xl:h-36 rounded-md sm:rounded-lg overflow-hidden select-none bg-[#09070a] border transition-all duration-300 ${
                            isInteracting
                              ? isLocked
                                ? 'border-[#ff1e27] shadow-[0_0_26px_rgba(255,30,39,0.6),inset_0_0_16px_rgba(255,30,39,0.25)]'
                                : 'border-[#ff1e27]/60 shadow-[0_8px_30px_rgba(0,0,0,0.9),inset_0_2px_6px_rgba(255,255,255,0.08)]'
                              : isLocked
                              ? 'border-[#ff1e27] shadow-[0_0_22px_rgba(255,30,39,0.5),inset_0_0_14px_rgba(255,30,39,0.2)]'
                              : 'border-[#ff1e27]/35 shadow-[0_8px_25px_rgba(0,0,0,0.85),inset_0_2px_4px_rgba(255,255,255,0.06)]'
                          }`}
                        >
                          {/* Top Cylindrical Curvature Shadow (Gentle roller gradient) */}
                          <div className="absolute top-0 inset-x-0 h-3 sm:h-5 md:h-6 bg-gradient-to-b from-[#09070a]/80 via-[#09070a]/35 to-transparent pointer-events-none z-20" />

                          {/* Bottom Cylindrical Curvature Shadow (Gentle roller gradient) */}
                          <div className="absolute bottom-0 inset-x-0 h-3 sm:h-5 md:h-6 bg-gradient-to-t from-[#09070a]/80 via-[#09070a]/35 to-transparent pointer-events-none z-20" />

                          {/* Center Tumbler Laser Alignment Hairline with side ticks */}
                          <div className="absolute inset-y-0 inset-x-0 flex items-center pointer-events-none z-10 border-y border-[#ff1e27]/20">
                            <span className="w-1 h-2 bg-[#ff1e27]/40 self-center" />
                            <div className="flex-1" />
                            <span className="w-1 h-2 bg-[#ff1e27]/40 self-center" />
                          </div>

                          {/* Vertical Scanline Sheen */}
                          <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.25)_3px)] z-10" />

                          {/* Vault Reel Corner Rivets */}
                          <span className="absolute top-1 left-1 w-0.5 sm:w-1 h-0.5 sm:h-1 rounded-full bg-[#3d2028] z-20 pointer-events-none" />
                          <span className="absolute top-1 right-1 w-0.5 sm:w-1 h-0.5 sm:h-1 rounded-full bg-[#3d2028] z-20 pointer-events-none" />
                          <span className="absolute bottom-1 left-1 w-0.5 sm:w-1 h-0.5 sm:h-1 rounded-full bg-[#3d2028] z-20 pointer-events-none" />
                          <span className="absolute bottom-1 right-1 w-0.5 sm:w-1 h-0.5 sm:h-1 rounded-full bg-[#3d2028] z-20 pointer-events-none" />

                          {/* Mechanical Rolling Strip */}
                          <div
                            className="w-full flex flex-col"
                            style={{
                              transform: isRolling
                                ? `translate3d(0, -${(col.targetIndex / col.digits.length) * 100}%, 0)`
                                : 'translate3d(0, 0%, 0)',
                              transitionProperty: prefersReduced ? 'none' : 'transform',
                              transitionDuration: prefersReduced ? '0s' : `${col.duration}s`,
                              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                              willChange: isLocked ? 'auto' : 'transform',
                            }}
                          >
                            {col.digits.map((digit, dIdx) => (
                              <div
                                key={dIdx}
                                className="w-full h-16 min-[380px]:h-18 sm:h-24 md:h-28 lg:h-32 xl:h-36 flex items-center justify-center shrink-0 font-headline-lg text-3xl min-[380px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-wider drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] leading-none"
                              >
                                {digit}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* BOTTOM TECHNICAL HUD LABELS INSIDE CONTAINER */}
            <div
              className="w-full flex items-center justify-between pt-2.5 sm:pt-3 mt-2 sm:mt-2.5 border-t border-[#ff1e27]/20 font-code-md text-[8px] min-[400px]:text-[9px] sm:text-[9.5px] tracking-[0.20em] uppercase select-none transition-colors duration-300"
              style={{
                transform: !prefersReduced && mouseOffset.active
                  ? `translate3d(${mouseOffset.x * 4}px, ${mouseOffset.y * 3}px, 0)`
                  : 'translate3d(0, 0, 0)',
                transition: mouseOffset.active ? 'transform 120ms ease-out' : 'transform 500ms ease-out',
              }}
            >
              <span className={`transition-colors duration-300 ${
                isInteracting ? 'text-[#b0a9b8]' : 'text-[#7a7584]'
              }`}>
                VAULT ALLOCATION // 01
              </span>
              <span className={`flex items-center gap-1 font-semibold transition-colors duration-300 ${
                isInteracting ? 'text-[#ff7a73]' : 'text-[#ff544b]/80'
              }`}>
                <span className="material-symbols-outlined text-[12px] text-[#ff544b]">lock</span>
                SECURED TRANSMISSION
              </span>
            </div>
          </div>

          {/* RIGHT SIDE HUD TELEMETRY (Desktop only) */}
          <div
            className={`hidden lg:flex flex-col gap-5 text-right border-r pr-4 py-3 select-none shrink-0 w-36 xl:w-44 transition-all duration-300 ${
              isInteracting
                ? 'border-[#ff1e27] text-white shadow-[inset_-1px_0_12px_rgba(255,30,39,0.15)]'
                : 'border-[#ff1e27]/30 text-[#e5e1e4]'
            }`}
          >
            <div className="flex flex-col items-end">
              <span className={`font-code-md text-[9px] xl:text-[10px] uppercase tracking-[0.22em] font-semibold transition-colors duration-300 ${
                isInteracting ? 'text-[#ff9995]' : 'text-[#8a8594]'
              }`}>
                REWARD CHANNEL
              </span>
              <span className="font-headline-sm text-sm xl:text-base text-white uppercase tracking-[0.16em] font-bold mt-0.5">
                CASH + BENEFITS
              </span>
            </div>

            <div className={`w-10 h-[1px] ml-auto transition-colors duration-300 ${
              isInteracting ? 'bg-[#ff1e27]/50' : 'bg-[#ff1e27]/25'
            }`} />

            <div className="flex flex-col items-end">
              <span className={`font-code-md text-[9px] xl:text-[10px] uppercase tracking-[0.22em] font-semibold transition-colors duration-300 ${
                isInteracting ? 'text-[#ff9995]' : 'text-[#8a8594]'
              }`}>
                STATUS
              </span>
              <span className="font-headline-sm text-base xl:text-lg text-[#ff9995] uppercase tracking-[0.16em] font-bold flex items-center gap-1.5 mt-0.5">
                SECURED
                <span className="material-symbols-outlined text-[15px] text-[#ff544b]">verified_user</span>
              </span>
            </div>
          </div>
        </div>

        {/* BOUNTY SECURED FINAL LOCK STATE (Triggers after 5th column stops, intensifies on interaction) */}
        <div
          onClick={handleCardClick}
          className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 mt-4 sm:mt-5 rounded-full border transition-all duration-500 cursor-pointer ${
            isInteracting
              ? 'border-[#ff1e27] bg-[#1a0c12] shadow-[0_0_28px_rgba(255,30,39,0.4)] scale-[1.02]'
              : 'border-[#ff1e27]/40 bg-[#160a0f]/90 shadow-[0_0_20px_rgba(255,30,39,0.25)] scale-100'
          } ${
            isAllComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#48bb78] animate-pulse" />
          <span className="font-code-md text-[10px] sm:text-[11px] tracking-[0.26em] text-[#ffdad6] uppercase font-bold">
            BOUNTY SECURED // ALLOCATION LOCKED
          </span>
          <span className="font-code-md text-[9px] sm:text-[9.5px] text-[#ff544b] font-semibold border-l border-[#ff1e27]/30 pl-2 ml-1 hidden min-[400px]:inline">
            AUTH: 2026
          </span>
        </div>

        {/* Required Exact Subtext (Muted, uppercase, center-aligned, single line on desktop) */}
        <p className="font-code-md text-[10px] min-[400px]:text-[11px] sm:text-xs md:text-[12.5px] text-[#cac5d0]/75 uppercase tracking-[0.14em] sm:tracking-[0.22em] text-center mt-3 sm:mt-4 px-4 whitespace-normal sm:whitespace-nowrap select-none leading-relaxed">
          (INCLUDING GEEKSFORGEEKS COURSE COUPONS AND INTERNSHIP OPPORTUNITIES)
        </p>
      </div>
    </section>
  );
}
