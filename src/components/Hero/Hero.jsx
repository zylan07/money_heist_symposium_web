import React, { useRef, useEffect, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { easeCinematic, easeOutExpo } from '../../utils/motion';
import HeroDoubleStairPreloader from './HeroDoubleStairPreloader';
import RollingText from './RollingText';

// Local high-resolution assets provided by the user in public/hero/
const MASKED_IMG_URL = "/hero/masked.png";
const UNMASKED_IMG_URL = "/hero/unmasked.jpg";

export default function Hero() {
  const stageRef = useRef(null);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const baseImgRef = useRef(null);
  const unmaskedImgRef = useRef(null);

  // Preloader elements refs for direct RAF manipulation
  const preloaderRef = useRef(null);
  const bgOverlayRef = useRef(null);
  const leftTiersRef = useRef([]);
  const rightTiersRef = useRef([]);
  const seamRef = useRef(null);

  // Layout container refs
  const titleWrapRef = useRef(null);
  const titleRef = useRef(null);
  const dateWrapRef = useRef(null);
  const instWrapRef = useRef(null);
  const prizeRef = useRef(null);
  const ctaWrapRef = useRef(null);
  const scrollRef = useRef(null);

  const prefersReducedMotion = useReducedMotion();

  const [entranceComplete, setEntranceComplete] = useState(prefersReducedMotion);
  const [preloaderMounted, setPreloaderMounted] = useState(!prefersReducedMotion);

  // Rolling Text trigger states (driven deterministically by master timeline)
  const [title1Active, setTitle1Active] = useState(prefersReducedMotion);
  const [title2Active, setTitle2Active] = useState(prefersReducedMotion);
  const [dateActive, setDateActive] = useState(prefersReducedMotion);
  const [instActive, setInstActive] = useState(prefersReducedMotion);
  const [prizeActive, setPrizeActive] = useState(prefersReducedMotion);
  const [ctaActive, setCtaActive] = useState(prefersReducedMotion);
  const [scrollActive, setScrollActive] = useState(prefersReducedMotion);

  // =========================================================================
  // ONE MASTER DETERMINISTIC ENTRANCE TIMELINE (RAF @ 60/120fps)
  // Slightly increased duration (~3.6s) with silky cubic-bezier(0.16, 1, 0.3, 1)
  // =========================================================================
  useEffect(() => {
    if (prefersReducedMotion) {
      setEntranceComplete(true);
      setPreloaderMounted(false);
      setTitle1Active(true);
      setTitle2Active(true);
      setDateActive(true);
      setInstActive(true);
      setPrizeActive(true);
      setCtaActive(true);
      setScrollActive(true);
      return;
    }

    let animId = null;
    let isDisposed = false;
    const startTime = performance.now();
    const MASTER_DURATION = 3600; // 3.6s relaxed, cinematic master timeline

    // Trigger flags to ensure exactly one state update per milestone
    const flags = {
      title1: false,
      title2: false,
      date: false,
      inst: false,
      prize: false,
      cta: false,
      scroll: false,
      preloaderDone: false,
    };

    const tick = (now) => {
      if (isDisposed) return;
      const elapsed = now - startTime;

      // -----------------------------------------------------------------
      // 1. DOUBLE-STAIR PRELOADER (0.00s -> 1.95s)
      // -----------------------------------------------------------------
      if (elapsed < 1950) {
        // A. Shutter Tiers Movement
        for (let i = 0; i < 6; i++) {
          const leftEl = leftTiersRef.current ? leftTiersRef.current[i] : null;
          const rightEl = rightTiersRef.current ? rightTiersRef.current[i] : null;

          const inStart = 100 + i * 40;
          const inDuration = 500;

          const outStart = 1150 + (5 - i) * 45;
          const outDuration = 620;

          if (elapsed < inStart) {
            if (leftEl) leftEl.style.transform = 'translate3d(-105%, 0, 0)';
            if (rightEl) rightEl.style.transform = 'translate3d(105%, 0, 0)';
          } else if (elapsed < 1150) {
            if (elapsed < inStart + inDuration) {
              const p = (elapsed - inStart) / inDuration;
              const e = easeOutExpo(p);
              const lx = (-105 * (1 - e)).toFixed(2);
              const rx = (105 * (1 - e)).toFixed(2);
              if (leftEl) leftEl.style.transform = `translate3d(${lx}%, 0, 0)`;
              if (rightEl) rightEl.style.transform = `translate3d(${rx}%, 0, 0)`;
            } else {
              // Locked in central composition (0.65s - 1.15s)
              if (leftEl) leftEl.style.transform = 'translate3d(0%, 0, 0)';
              if (rightEl) rightEl.style.transform = 'translate3d(0%, 0, 0)';
            }
          } else {
            // Retract outward & upward in silky cinematic motion (1.15s - 1.85s)
            if (elapsed < outStart) {
              if (leftEl) leftEl.style.transform = 'translate3d(0%, 0, 0)';
              if (rightEl) rightEl.style.transform = 'translate3d(0%, 0, 0)';
            } else if (elapsed < outStart + outDuration) {
              const p = (elapsed - outStart) / outDuration;
              const e = easeOutExpo(p);
              const lx = (-115 * e).toFixed(2);
              const ly = (-7 * e).toFixed(2);
              const rx = (115 * e).toFixed(2);
              const ry = (7 * e).toFixed(2);
              const op = Math.max(0, 1 - e * 1.15).toFixed(3);
              if (leftEl) {
                leftEl.style.transform = `translate3d(${lx}%, ${ly}%, 0)`;
                leftEl.style.opacity = op;
              }
              if (rightEl) {
                rightEl.style.transform = `translate3d(${rx}%, ${ry}%, 0)`;
                rightEl.style.opacity = op;
              }
            } else {
              if (leftEl) {
                leftEl.style.transform = 'translate3d(-115%, -7%, 0)';
                leftEl.style.opacity = '0';
              }
              if (rightEl) {
                rightEl.style.transform = 'translate3d(115%, 7%, 0)';
                rightEl.style.opacity = '0';
              }
            }
          }
        }

        // B. Central Laser Seam Pulse (650ms -> 1200ms)
        if (seamRef.current) {
          if (elapsed >= 650 && elapsed <= 1200) {
            const p = (elapsed - 650) / 550;
            const op = (Math.sin(p * Math.PI) * 0.95).toFixed(3);
            seamRef.current.style.opacity = op;
          } else {
            seamRef.current.style.opacity = '0';
          }
        }

        // C. Ambient Background Overlay Fade Out (1250ms -> 1850ms)
        if (bgOverlayRef.current) {
          if (elapsed < 1250) {
            bgOverlayRef.current.style.opacity = '1';
          } else if (elapsed >= 1850) {
            bgOverlayRef.current.style.opacity = '0';
          } else {
            const p = (elapsed - 1250) / 600;
            bgOverlayRef.current.style.opacity = (1 - easeOutExpo(p)).toFixed(3);
          }
        }
      } else if (!flags.preloaderDone) {
        flags.preloaderDone = true;
        if (preloaderRef.current) preloaderRef.current.style.display = 'none';
        setPreloaderMounted(false);
      }

      // -----------------------------------------------------------------
      // 2. HERO BASE IMAGE REVEAL (1250ms -> 1850ms, 600ms)
      // -----------------------------------------------------------------
      if (baseImgRef.current) {
        if (elapsed < 1250) {
          baseImgRef.current.style.opacity = '0';
        } else if (elapsed >= 1850) {
          baseImgRef.current.style.opacity = '1';
        } else {
          const p = (elapsed - 1250) / 600;
          baseImgRef.current.style.opacity = easeOutExpo(p).toFixed(3);
        }
      }

      // -----------------------------------------------------------------
      // 3. SKIPER27 ROLLING TEXT REVEAL TIMELINE
      // As preloader retracts outward, rolling reveals begin from center-out
      // All animations happen directly in their actual resting position!
      // -----------------------------------------------------------------
      // 1250ms: TECHBYTE center-out letter roll begins
      if (elapsed >= 1250 && !flags.title1) {
        flags.title1 = true;
        setTitle1Active(true);
      }

      // 1450ms: SUMMIT '26 center-out letter roll begins (~200ms stagger)
      if (elapsed >= 1450 && !flags.title2) {
        flags.title2 = true;
        setTitle2Active(true);
      }

      // 1950ms: Date roll begins (right as preloader fully finishes)
      if (elapsed >= 1950 && !flags.date) {
        flags.date = true;
        setDateActive(true);
      }

      // 2250ms: Institution roll begins
      if (elapsed >= 2250 && !flags.inst) {
        flags.inst = true;
        setInstActive(true);
      }

      // 2550ms: Prize Pool badge roll begins
      if (elapsed >= 2550 && !flags.prize) {
        flags.prize = true;
        setPrizeActive(true);
      }

      // 2850ms: CTA Buttons reveal
      if (elapsed >= 2850 && !flags.cta) {
        flags.cta = true;
        setCtaActive(true);
      }

      // 3150ms: Scroll indicator fades in
      if (elapsed >= 3150 && !flags.scroll) {
        flags.scroll = true;
        setScrollActive(true);
      }

      // -----------------------------------------------------------------
      // 4. SETTLE / FINALIZE (3600ms)
      // -----------------------------------------------------------------
      if (elapsed < MASTER_DURATION) {
        animId = requestAnimationFrame(tick);
      } else {
        if (baseImgRef.current) {
          baseImgRef.current.style.opacity = '1';
        }
        setEntranceComplete(true);
      }
    };

    animId = requestAnimationFrame(tick);

    return () => {
      isDisposed = true;
      if (animId) cancelAnimationFrame(animId);
    };
  }, [prefersReducedMotion]);

  // =========================================================================
  // INTERACTIVE REVEAL CANVAS (Layer 2)
  // Preserved 100% — high-fidelity feathered flashlight unmask effect
  // Now hit-tests across the ENTIRE Hero section (including directly behind text)
  // =========================================================================
  useEffect(() => {
    const stage = stageRef.current || containerRef.current;
    const mainCanvas = canvasRef.current;
    const unmaskedImg = unmaskedImgRef.current;
    const baseImg = baseImgRef.current;

    if (!stage || !mainCanvas || !unmaskedImg || !baseImg) return;

    const mainCtx = mainCanvas.getContext('2d');
    const maskCanvas = document.createElement('canvas');
    const maskCtx = maskCanvas.getContext('2d');

    let trail = [];
    let lastPt = null;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let animId = null;
    let isRunning = true;

    const LIFETIME = 600;
    const HOLD = 140;

    function resize() {
      if (!stage) return;
      const r = stage.getBoundingClientRect();
      width = r.width;
      height = r.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      mainCanvas.width = width * dpr;
      mainCanvas.height = height * dpr;
      maskCanvas.width = width * dpr;
      maskCanvas.height = height * dpr;

      mainCtx.setTransform(1, 0, 0, 1, 0, 0);
      maskCtx.setTransform(1, 0, 0, 1, 0, 0);
      mainCtx.scale(dpr, dpr);
      maskCtx.scale(dpr, dpr);
    }

    window.addEventListener('resize', resize);
    resize();

    function drawMapped(ctx, img) {
      if (!img.naturalWidth || !img.naturalHeight) return;
      const nw = img.naturalWidth;
      const nh = img.naturalHeight;
      const tr = width / height;
      const ir = nw / nh;

      let sw, sh, sx, sy;
      if (tr > ir) {
        sw = nw;
        sh = nw / tr;
        sx = 0;
        sy = 0;
      } else {
        sh = nh;
        sw = nh * tr;
        sx = (nw - sw) / 2;
        sy = 0;
      }

      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, width, height);
    }

    function addPoint(x, y) {
      const now = performance.now();
      const radius = Math.min(Math.max(width * 0.12, 100), 170);

      if (lastPt) {
        const dx = x - lastPt.x;
        const dy = y - lastPt.y;
        const dist = Math.hypot(dx, dy);
        const step = radius * 0.28;

        if (dist > step) {
          const count = Math.min(Math.floor(dist / step), 10);
          for (let i = 1; i <= count; i++) {
            const t = i / (count + 1);
            trail.push({
              x: lastPt.x + dx * t,
              y: lastPt.y + dy * t,
              t: now,
              radius: radius * 0.95,
            });
          }
        }
      }

      trail.push({ x, y, t: now, radius });
      lastPt = { x, y };

      if (trail.length > 80) {
        trail = trail.slice(-80);
      }
    }

    function onMouseMove(e) {
      if (!stage) return;
      const r = stage.getBoundingClientRect();
      addPoint(e.clientX - r.left, e.clientY - r.top);
    }

    function onMouseEnter(e) {
      if (!stage) return;
      const r = stage.getBoundingClientRect();
      lastPt = null;
      addPoint(e.clientX - r.left, e.clientY - r.top);
    }

    function onMouseLeave() {
      lastPt = null;
    }

    function onTouchMove(e) {
      if (e.touches.length > 0 && stage) {
        const r = stage.getBoundingClientRect();
        addPoint(e.touches[0].clientX - r.left, e.touches[0].clientY - r.top);
      }
    }

    function onTouchEnd() {
      lastPt = null;
    }

    // Attach to the entire stage so moving across text or buttons never breaks disclosure
    stage.addEventListener('mousemove', onMouseMove, { passive: true });
    stage.addEventListener('mouseenter', onMouseEnter, { passive: true });
    stage.addEventListener('mouseleave', onMouseLeave, { passive: true });
    stage.addEventListener('touchmove', onTouchMove, { passive: true });
    stage.addEventListener('touchend', onTouchEnd, { passive: true });

    function render(now) {
      if (!isRunning) return;

      trail = trail.filter((pt) => now - pt.t < LIFETIME);

      maskCtx.clearRect(0, 0, width, height);

      for (let i = 0; i < trail.length; i++) {
        const pt = trail[i];
        const age = now - pt.t;

        let alpha = 1;
        if (age > HOLD) {
          alpha = Math.max(0, 1 - (age - HOLD) / (LIFETIME - HOLD));
        }

        const r = pt.radius;
        const grad = maskCtx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, r);
        grad.addColorStop(0, `rgba(0, 0, 0, ${alpha * 0.95})`);
        grad.addColorStop(0.35, `rgba(0, 0, 0, ${alpha * 0.85})`);
        grad.addColorStop(0.7, `rgba(0, 0, 0, ${alpha * 0.35})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        maskCtx.save();
        maskCtx.fillStyle = grad;
        maskCtx.beginPath();
        maskCtx.arc(pt.x, pt.y, r, 0, Math.PI * 2);
        maskCtx.fill();
        maskCtx.restore();
      }

      mainCtx.clearRect(0, 0, width, height);
      if (trail.length > 0) {
        mainCtx.drawImage(maskCanvas, 0, 0, width, height);
        mainCtx.save();
        mainCtx.globalCompositeOperation = 'source-in';
        drawMapped(mainCtx, unmaskedImg);
        mainCtx.restore();
      }

      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      stage.removeEventListener('mousemove', onMouseMove);
      stage.removeEventListener('mouseenter', onMouseEnter);
      stage.removeEventListener('mouseleave', onMouseLeave);
      stage.removeEventListener('touchmove', onTouchMove);
      stage.removeEventListener('touchend', onTouchEnd);
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={stageRef}
      id="poster-stage"
      className="relative w-full min-h-screen h-[100vh] flex flex-col justify-between overflow-hidden bg-transparent cursor-crosshair"
    >
      {/* Visual Lens Stage with 1:1 Perfectly Aligned Layers */}
      <div
        ref={containerRef}
        id="lens-container"
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
      >
        {/* Layer 1: Base Masked Operatives */}
        <div className="absolute inset-0 w-full h-full">
          <img
            ref={baseImgRef}
            id="base-masked-img"
            src={MASKED_IMG_URL}
            alt="TechByte Summit Operatives Masked"
            className="w-full h-full object-cover object-top filter brightness-[0.96] contrast-[1.06] pointer-events-none select-none"
            style={{ opacity: entranceComplete || prefersReducedMotion ? 1 : 0 }}
          />
        </div>

        {/* DOUBLE-STAIR PRELOADER OVERLAY */}
        {preloaderMounted && (
          <HeroDoubleStairPreloader
            preloaderRef={preloaderRef}
            bgOverlayRef={bgOverlayRef}
            leftTiersRef={leftTiersRef}
            rightTiersRef={rightTiersRef}
            seamRef={seamRef}
          />
        )}

        {/* Ambient Film Vignettes & Gradients on Base Layer (darkens base masked image) */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#08080A] via-[#08080A]/70 via-25% to-transparent" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#08080A]/85 via-transparent to-transparent h-32" />
        <div className="absolute inset-y-0 left-0 w-32 pointer-events-none bg-gradient-to-r from-[#08080A]/70 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-32 pointer-events-none bg-gradient-to-l from-[#08080A]/70 to-transparent" />

        {/* Layer 2: Interactive Feathered Reveal Canvas (renders unmasked operative above base & vignettes) */}
        <canvas
          ref={canvasRef}
          id="reveal-canvas"
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        {/* Hidden Source for Layer 2 Unmasked Pixels */}
        <img
          ref={unmaskedImgRef}
          id="unmasked-source-img"
          src={UNMASKED_IMG_URL}
          alt="Unmasked Operatives"
          className="hidden"
        />
      </div>

      {/* Hero Typography — Exactly preserved layout, positioning, and text elements */}
      {/* pointer-events-none on wrapper ensures disclosure tracks continuously behind text */}
      <div className="relative z-10 w-full mt-auto pb-4 sm:pb-6 md:pb-8 flex flex-col items-center text-center px-4 select-none pointer-events-none">
        <div className="flex flex-col items-center w-full max-w-[1500px] mx-auto">
          {/* Main Symposium Title Mask Region */}
          <div
            ref={titleWrapRef}
            className="overflow-hidden py-1 sm:py-2 -my-1 sm:-my-2 px-3 sm:px-6 -mx-3 sm:-mx-6 will-change-[clip-path,opacity]"
          >
            <h1
              ref={titleRef}
              className="font-display-lg flex flex-wrap md:flex-nowrap items-baseline justify-center md:whitespace-nowrap gap-x-3 sm:gap-x-4 md:gap-x-5 lg:gap-x-7 leading-[0.85] uppercase drop-shadow-[0_12px_45px_rgba(0,0,0,0.98)] tracking-[0.03em] will-change-transform"
            >
              {/* Skiper27-Style Rolling Title: Group 1 (TECHBYTE) */}
              <RollingText
                text="TECHBYTE"
                className="text-[34px] min-[360px]:text-[40px] min-[400px]:text-[46px] sm:text-[68px] md:text-[84px] lg:text-[112px] xl:text-[134px] 2xl:text-[150px] tracking-[0.03em] text-[#f2edf0] font-bold scale-y-[1.06]"
                active={title1Active}
                isComplete={entranceComplete}
                reducedMotion={prefersReducedMotion}
                stagger={0.045}
                duration={0.85}
                centerOut={true}
              />

              {/* Skiper27-Style Rolling Title: Group 2 (SUMMIT '26) */}
              <RollingText
                text="SUMMIT '26"
                className="text-[34px] min-[360px]:text-[40px] min-[400px]:text-[46px] sm:text-[68px] md:text-[84px] lg:text-[112px] xl:text-[134px] 2xl:text-[150px] tracking-[0.03em] text-[#ff1e27] font-bold scale-y-[1.06] drop-shadow-[0_0_35px_rgba(255,30,39,0.55)]"
                active={title2Active}
                isComplete={entranceComplete}
                reducedMotion={prefersReducedMotion}
                stagger={0.040}
                duration={0.85}
                centerOut={true}
              />
            </h1>
          </div>

          {/* Breathing Space: Date and Institution Masked Regions */}
          <div className="flex flex-col items-center mt-4 sm:mt-6 md:mt-7">
            {/* Date Mask Region — Moderate Rolling Effect */}
            <div
              ref={dateWrapRef}
              className="overflow-hidden py-0.5 -my-0.5 px-3 -mx-3 will-change-[clip-path,opacity]"
            >
              <RollingText
                text="14 — 15 OCTOBER 2026"
                className="font-code-md text-xs min-[360px]:text-sm sm:text-base md:text-lg lg:text-[19px] tracking-[0.20em] sm:tracking-[0.28em] text-[#ffdad6] font-semibold uppercase drop-shadow text-center block"
                active={dateActive}
                isComplete={entranceComplete}
                reducedMotion={prefersReducedMotion}
                stagger={0.022}
                duration={0.75}
                centerOut={true}
              />
            </div>

            {/* Institution Mask Region — Restrained Rolling Effect */}
            <div
              ref={instWrapRef}
              className="overflow-hidden py-2 -my-2 px-4 -mx-4 mt-1.5 sm:mt-2.5 will-change-[clip-path,opacity]"
            >
              <RollingText
                text="KPR INSTITUTE OF ENGINEERING & TECHNOLOGY, COIMBATORE"
                className="font-code-md text-[10px] sm:text-[11px] md:text-xs tracking-[0.15em] sm:tracking-[0.18em] text-[#c8c5ca]/80 uppercase text-center px-2 block"
                active={instActive}
                isComplete={entranceComplete}
                reducedMotion={prefersReducedMotion}
                stagger={0.014}
                duration={0.70}
                centerOut={true}
              />

              {/* Organizer & Collaboration Branding */}
              <div className="mt-2 sm:mt-2.5 flex flex-col items-center justify-center text-center">
                <span className="font-code-md text-[10px] sm:text-[11px] text-[#ff544b] tracking-[0.16em] sm:tracking-[0.2em] uppercase font-bold">
                  Department of CSE
                </span>
                <span className="font-code-md text-[9px] sm:text-[10px] text-[#a09ca8] tracking-[0.14em] uppercase mt-0.5">
                  in collaboration with
                </span>
                <span className="font-code-md text-[10px] sm:text-[11px] text-[#ffdad6] tracking-[0.16em] sm:tracking-[0.2em] uppercase font-semibold mt-0.5">
                  Yi Yuva Club, KPRIET
                </span>
              </div>

              {/* Major Hero Highlight: Large Prominent Prize Pool & Perks — Compact Rolling Reveal */}
              <div
                ref={prizeRef}
                className="mt-3.5 sm:mt-4 md:mt-5 flex items-center justify-center w-full px-2 will-change-transform"
                style={
                  entranceComplete || prefersReducedMotion
                    ? undefined
                    : {
                        transform: prizeActive ? 'translate3d(0, 0%, 0) scale(1)' : 'translate3d(0, 110%, 0) scale(0.985)',
                        opacity: prizeActive ? 1 : 0,
                        transition: prizeActive
                          ? 'transform 0.75s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1)'
                          : 'none',
                      }
                }
              >
                <div className="inline-flex items-center justify-center gap-2.5 sm:gap-3.5 px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-3.5 bg-[#110e16]/80 border-2 border-[#ff1e27]/60 rounded-md sm:rounded-full shadow-[0_0_35px_rgba(255,30,39,0.3),inset_0_0_20px_rgba(255,30,39,0.12)] backdrop-blur-md">
                  <span className="material-symbols-outlined text-2xl sm:text-3xl md:text-4xl text-[#ff544b] drop-shadow-[0_0_12px_rgba(255,30,39,0.7)]">
                    workspace_premium
                  </span>
                  <span className="font-headline-sm text-2xl sm:text-3xl md:text-4xl text-white font-bold tracking-[0.10em] sm:tracking-[0.12em] uppercase leading-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                    ₹15K PRIZE POOL
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action CTAs Mask Region — Settles naturally with controlled gap */}
        <div
          ref={ctaWrapRef}
          className="overflow-hidden pt-1 pb-2 sm:pb-3 -mb-2 sm:-mb-3 px-2 -mx-2 mt-4 sm:mt-5 md:mt-6 w-full max-w-md will-change-[transform,opacity] pointer-events-auto"
          style={
            entranceComplete || prefersReducedMotion
              ? { pointerEvents: 'auto' }
              : {
                  transform: ctaActive ? 'translate3d(0, 0%, 0)' : 'translate3d(0, 100%, 0)',
                  opacity: ctaActive ? 1 : 0,
                  pointerEvents: ctaActive ? 'auto' : 'none',
                  transition: ctaActive
                    ? 'transform 0.70s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.60s cubic-bezier(0.16, 1, 0.3, 1)'
                    : 'none',
                }
          }
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
            <a
              className="w-full sm:w-auto min-w-[160px] sm:min-w-[190px] h-12 flex items-center justify-center font-headline-sm text-lg sm:text-xl tracking-[0.14em] uppercase bg-[#ff544b] text-[#5c0005] hover:brightness-110 shadow-[0_0_30px_rgba(255,84,75,0.45)] transition-all font-semibold cursor-pointer pointer-events-auto"
              href="#access"
            >
              GET ACCESS
            </a>
            <a
              className="w-full sm:w-auto min-w-[160px] sm:min-w-[190px] h-12 flex items-center justify-center gap-2 font-headline-sm text-lg sm:text-xl tracking-[0.14em] uppercase text-white bg-[#1c1b1e]/80 hover:bg-[#2a2a2c] hover:text-[#ffb4ab] transition-all backdrop-blur-sm border border-[#353437]/60 cursor-pointer pointer-events-auto"
              href="#missions"
            >
              <span>VIEW MISSIONS</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <a
          ref={scrollRef}
          className="group flex flex-col items-center gap-1 mt-5 sm:mt-6 text-[#c8c5ca]/60 hover:text-white transition-all duration-700 pointer-events-auto will-change-[transform,opacity]"
          style={
            entranceComplete || prefersReducedMotion
              ? undefined
              : {
                  opacity: scrollActive ? 1 : 0,
                  transform: scrollActive ? 'translate3d(0, 0, 0)' : 'translate3d(0, 8px, 0)',
                  pointerEvents: scrollActive ? 'auto' : 'none',
                  transition: scrollActive
                    ? 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1)'
                    : 'none',
                }
          }
          href="#the-operation"
        >
          <span className="font-label-sm text-[10px] tracking-[0.3em] uppercase">
            SCROLL TO ENTER THE OPERATION
          </span>
          <div className="w-[1px] h-7 bg-gradient-to-b from-[#ff544b] to-transparent group-hover:h-10 transition-all" />
        </a>
      </div>
    </section>
  );
}
