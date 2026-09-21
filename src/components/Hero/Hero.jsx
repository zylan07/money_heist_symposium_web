import React, { useRef, useEffect, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { easeCinematic } from '../../utils/motion';
import HeroFragmentAssembly from './HeroFragmentAssembly';

// Local high-resolution assets provided by the user in public/hero/
const MASKED_IMG_URL = "/hero/masked.png";
const UNMASKED_IMG_URL = "/hero/unmasked.jpg";

export default function Hero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const baseImgRef = useRef(null);
  const unmaskedImgRef = useRef(null);

  // Mask reveal DOM references for unified 60/120fps RAF master timeline
  const titleWrapRef = useRef(null);
  const titleRef = useRef(null);
  const dateWrapRef = useRef(null);
  const dateTextRef = useRef(null);
  const instWrapRef = useRef(null);
  const instTextRef = useRef(null);
  const ctaWrapRef = useRef(null);
  const scrollRef = useRef(null);

  const prefersReducedMotion = useReducedMotion();

  const [assemblyComplete, setAssemblyComplete] = useState(prefersReducedMotion);
  const [entranceComplete, setEntranceComplete] = useState(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) {
      setAssemblyComplete(true);
      setEntranceComplete(true);
      return;
    }

    let animId = null;
    let isDisposed = false;
    const startTime = performance.now();
    const MASTER_DURATION = 2800; // 2.8s total master timeline

    const tick = (now) => {
      if (isDisposed) return;
      const elapsed = now - startTime;

      // 1. Base image seamless blend-in: 1450ms -> 1950ms (500ms)
      if (baseImgRef.current) {
        if (elapsed < 1450) {
          baseImgRef.current.style.opacity = '0';
        } else if (elapsed >= 1950) {
          baseImgRef.current.style.opacity = '1';
        } else {
          const p = (elapsed - 1450) / 500;
          baseImgRef.current.style.opacity = easeCinematic(p).toFixed(3);
        }
      }

      // 2. Main Title Lockup Aperture Reveal (Bottom -> Top): 1450ms -> 2350ms (900ms)
      if (titleWrapRef.current) {
        if (elapsed < 1450) {
          titleWrapRef.current.style.clipPath = 'inset(100% 0% 0% 0%)';
          titleWrapRef.current.style.opacity = '0';
        } else if (elapsed >= 2350) {
          titleWrapRef.current.style.clipPath = 'none';
          titleWrapRef.current.style.opacity = '1';
          if (titleRef.current) {
            titleRef.current.style.transform = 'none';
            titleRef.current.style.filter = 'none';
          }
        } else {
          const p = (elapsed - 1450) / 900;
          const e = easeCinematic(p);
          const topInset = ((1 - e) * 100).toFixed(2);
          titleWrapRef.current.style.clipPath = `inset(${topInset}% 0% 0% 0%)`;
          titleWrapRef.current.style.opacity = Math.min(1, e * 1.8).toFixed(3);
          if (titleRef.current) {
            const y = ((1 - e) * 7).toFixed(2); // subtle 7px micro-drift
            titleRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
            const blur = ((1 - e) * 2.5).toFixed(2);
            titleRef.current.style.filter = `blur(${blur}px)`;
          }
        }
      }

      // 3. Date Reveal (Bottom -> Top): 1850ms -> 2450ms (600ms)
      if (dateWrapRef.current) {
        if (elapsed < 1850) {
          dateWrapRef.current.style.clipPath = 'inset(100% 0% 0% 0%)';
          dateWrapRef.current.style.opacity = '0';
        } else if (elapsed >= 2450) {
          dateWrapRef.current.style.clipPath = 'none';
          dateWrapRef.current.style.opacity = '1';
          if (dateTextRef.current) {
            dateTextRef.current.style.transform = 'none';
            dateTextRef.current.style.filter = 'none';
          }
        } else {
          const p = (elapsed - 1850) / 600;
          const e = easeCinematic(p);
          const topInset = ((1 - e) * 100).toFixed(2);
          dateWrapRef.current.style.clipPath = `inset(${topInset}% 0% 0% 0%)`;
          dateWrapRef.current.style.opacity = Math.min(1, e * 2).toFixed(3);
          if (dateTextRef.current) {
            const y = ((1 - e) * 5).toFixed(2);
            dateTextRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
            const blur = ((1 - e) * 1.5).toFixed(2);
            dateTextRef.current.style.filter = `blur(${blur}px)`;
          }
        }
      }

      // 4. Institution Reveal (Bottom -> Top): 2050ms -> 2600ms (550ms)
      if (instWrapRef.current) {
        if (elapsed < 2050) {
          instWrapRef.current.style.clipPath = 'inset(100% 0% 0% 0%)';
          instWrapRef.current.style.opacity = '0';
        } else if (elapsed >= 2600) {
          instWrapRef.current.style.clipPath = 'none';
          instWrapRef.current.style.opacity = '1';
          if (instTextRef.current) {
            instTextRef.current.style.transform = 'none';
          }
        } else {
          const p = (elapsed - 2050) / 550;
          const e = easeCinematic(p);
          const topInset = ((1 - e) * 100).toFixed(2);
          instWrapRef.current.style.clipPath = `inset(${topInset}% 0% 0% 0%)`;
          instWrapRef.current.style.opacity = Math.min(1, e * 2).toFixed(3);
          if (instTextRef.current) {
            const y = ((1 - e) * 4).toFixed(2);
            instTextRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
          }
        }
      }

      // 5. Buttons Reveal (Compact Aperture Wipe + Scale 0.985 -> 1.0): 2250ms -> 2750ms (500ms)
      if (ctaWrapRef.current) {
        if (elapsed < 2250) {
          ctaWrapRef.current.style.clipPath = 'inset(100% 0% 0% 0%)';
          ctaWrapRef.current.style.opacity = '0';
          ctaWrapRef.current.style.pointerEvents = 'none';
        } else if (elapsed >= 2750) {
          ctaWrapRef.current.style.clipPath = 'none';
          ctaWrapRef.current.style.opacity = '1';
          ctaWrapRef.current.style.transform = 'none';
          ctaWrapRef.current.style.pointerEvents = 'auto';
        } else {
          const p = (elapsed - 2250) / 500;
          const e = easeCinematic(p);
          const topInset = ((1 - e) * 100).toFixed(2);
          ctaWrapRef.current.style.clipPath = `inset(${topInset}% 0% 0% 0%)`;
          ctaWrapRef.current.style.opacity = Math.min(1, e * 2).toFixed(3);
          const scale = (0.985 + e * 0.015).toFixed(4);
          const y = ((1 - e) * 4).toFixed(2);
          ctaWrapRef.current.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`;
          if (e > 0.6) ctaWrapRef.current.style.pointerEvents = 'auto';
        }
      }

      // 6. Scroll Indicator: 2450ms -> 2750ms (300ms)
      if (scrollRef.current) {
        if (elapsed < 2450) {
          scrollRef.current.style.opacity = '0';
          scrollRef.current.style.pointerEvents = 'none';
        } else if (elapsed >= 2750) {
          scrollRef.current.style.opacity = '1';
          scrollRef.current.style.transform = 'none';
          scrollRef.current.style.pointerEvents = 'auto';
        } else {
          const p = (elapsed - 2450) / 300;
          const e = easeCinematic(p);
          scrollRef.current.style.opacity = e.toFixed(3);
          const y = ((1 - e) * 4).toFixed(2);
          scrollRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
        }
      }

      if (elapsed < MASTER_DURATION) {
        animId = requestAnimationFrame(tick);
      } else {
        // Complete settle: cleanly wipe all inline styles for zero CPU overhead
        if (titleWrapRef.current) {
          titleWrapRef.current.style.clipPath = '';
          titleWrapRef.current.style.opacity = '';
        }
        if (titleRef.current) {
          titleRef.current.style.transform = '';
          titleRef.current.style.filter = '';
        }
        if (dateWrapRef.current) {
          dateWrapRef.current.style.clipPath = '';
          dateWrapRef.current.style.opacity = '';
        }
        if (dateTextRef.current) {
          dateTextRef.current.style.transform = '';
          dateTextRef.current.style.filter = '';
        }
        if (instWrapRef.current) {
          instWrapRef.current.style.clipPath = '';
          instWrapRef.current.style.opacity = '';
        }
        if (instTextRef.current) {
          instTextRef.current.style.transform = '';
        }
        if (ctaWrapRef.current) {
          ctaWrapRef.current.style.clipPath = '';
          ctaWrapRef.current.style.opacity = '';
          ctaWrapRef.current.style.transform = '';
          ctaWrapRef.current.style.pointerEvents = 'auto';
        }
        if (scrollRef.current) {
          scrollRef.current.style.opacity = '';
          scrollRef.current.style.transform = '';
          scrollRef.current.style.pointerEvents = 'auto';
        }
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

  const handleAssemblyComplete = () => {
    setAssemblyComplete(true);
  };

  useEffect(() => {
    const container = containerRef.current;
    const mainCanvas = canvasRef.current;
    const unmaskedImg = unmaskedImgRef.current;
    const baseImg = baseImgRef.current;

    if (!container || !mainCanvas || !unmaskedImg || !baseImg) return;

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

    const LIFETIME = 600; // ms for the trail to dissolve softly
    const HOLD = 140; // ms for full opacity

    function resize() {
      if (!container) return;
      const r = container.getBoundingClientRect();
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
      let sx, sy, sw, sh;
      // Exactly match base masked image object-cover object-top coordinates
      if (ir > tr) {
        sh = nh;
        sw = nh * tr;
        sx = (nw - sw) / 2;
        sy = 0;
      } else {
        sw = nw;
        sh = nw / tr;
        sx = 0;
        sy = 0;
      }
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, width, height);
    }

    function addPt(x, y) {
      const r = Math.max(160, Math.min(270, width * 0.18));
      const now = performance.now();
      trail.push({
        x,
        y,
        px: lastPt ? lastPt.x : x,
        py: lastPt ? lastPt.y : y,
        r,
        t: now
      });
      lastPt = { x, y };
    }

    const onMouseMove = (e) => {
      const r = container.getBoundingClientRect();
      addPt(e.clientX - r.left, e.clientY - r.top);
    };

    const onMouseEnter = (e) => {
      const r = container.getBoundingClientRect();
      lastPt = { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const onMouseLeave = () => {
      lastPt = null;
    };

    const onTouchMove = (e) => {
      if (e.touches.length) {
        const r = container.getBoundingClientRect();
        addPt(e.touches[0].clientX - r.left, e.touches[0].clientY - r.top);
      }
    };

    const onTouchEnd = () => {
      lastPt = null;
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);
    container.addEventListener('touchmove', onTouchMove, { passive: true });
    container.addEventListener('touchend', onTouchEnd);

    // Render loop
    function render(time) {
      if (!isRunning) return;
      const now = time || performance.now();

      // Clean old trail points
      trail = trail.filter((p) => now - p.t < LIFETIME);

      maskCtx.clearRect(0, 0, width, height);

      if (trail.length > 0) {
        maskCtx.save();
        maskCtx.globalCompositeOperation = 'screen';

        for (let i = 0; i < trail.length; i++) {
          const seg = trail[i];
          const age = now - seg.t;
          let alpha = 1;
          if (age > HOLD) {
            alpha = Math.max(0, 1 - (age - HOLD) / (LIFETIME - HOLD));
          }
          if (alpha <= 0.01) continue;

          const dist = Math.hypot(seg.x - seg.px, seg.y - seg.py);
          const steps = Math.max(1, Math.min(8, Math.floor(dist / 14)));

          for (let s = 0; s <= steps; s++) {
            const t = s / steps;
            const cx = seg.px + (seg.x - seg.px) * t;
            const cy = seg.py + (seg.y - seg.py) * t;

            const rad = maskCtx.createRadialGradient(cx, cy, 0, cx, cy, seg.r);
            rad.addColorStop(0, `rgba(255,255,255,${(0.95 * alpha).toFixed(2)})`);
            rad.addColorStop(0.4, `rgba(255,255,255,${(0.75 * alpha).toFixed(2)})`);
            rad.addColorStop(1, 'rgba(255,255,255,0)');

            maskCtx.fillStyle = rad;
            maskCtx.beginPath();
            maskCtx.arc(cx, cy, seg.r, 0, Math.PI * 2);
            maskCtx.fill();
          }
        }
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
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
    };
  }, [prefersReducedMotion]);

  return (
    <section
      id="poster-stage"
      className="relative w-full min-h-screen h-[100vh] flex flex-col justify-between overflow-hidden bg-transparent"
    >
      {/* Visual Lens Stage with 1:1 Perfectly Aligned Layers */}
      <div
        ref={containerRef}
        id="lens-container"
        className="absolute inset-0 w-full h-full cursor-crosshair overflow-hidden pointer-events-auto"
      >
        {/* Layer 1: Base Masked Operatives - seamless blend-in from fragment assembly */}
        <div className="absolute inset-0 w-full h-full">
          <img
            ref={baseImgRef}
            id="base-masked-img"
            src={MASKED_IMG_URL}
            alt="TechBytes Summit Operatives Masked"
            className="w-full h-full object-cover object-top filter brightness-[0.96] contrast-[1.06] pointer-events-none select-none"
            style={{ opacity: entranceComplete || prefersReducedMotion ? 1 : 0 }}
          />
        </div>

        {/* Layer 1.5: Cinematic Fragment Assembly Overlay (Active during entrance, unmounts cleanly on completion) */}
        {!assemblyComplete && (
          <HeroFragmentAssembly
            imageSrc={MASKED_IMG_URL}
            onComplete={handleAssemblyComplete}
          />
        )}

        {/* Layer 2: Interactive Feathered Reveal Canvas */}
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

        {/* Ambient Film Vignettes & Gradients — subtle at bottom so operatives are prominently illuminated */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#08080A] via-[#08080A]/70 via-25% to-transparent" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#08080A]/85 via-transparent to-transparent h-32" />
        <div className="absolute inset-y-0 left-0 w-32 pointer-events-none bg-gradient-to-r from-[#08080A]/70 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-32 pointer-events-none bg-gradient-to-l from-[#08080A]/70 to-transparent" />
      </div>

      {/* Hero Typography — Master Continuous Aperture Mask Reveal */}
      <div className="relative z-10 w-full mt-auto pb-4 sm:pb-6 md:pb-8 flex flex-col items-center text-center px-4 select-none">
        <div className="flex flex-col items-center w-full max-w-[1500px] mx-auto">
          {/* Main Symposium Title Mask Region — Emerging through a vertical bottom-to-top aperture as one lockup */}
          <div
            ref={titleWrapRef}
            className="overflow-hidden py-1 sm:py-2 -my-1 sm:-my-2 px-3 sm:px-6 -mx-3 sm:-mx-6 will-change-[clip-path,opacity]"
            style={entranceComplete || prefersReducedMotion ? undefined : { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 }}
          >
            <h1
              ref={titleRef}
              className="font-display-lg flex flex-wrap md:flex-nowrap items-baseline justify-center md:whitespace-nowrap gap-x-3 sm:gap-x-4 md:gap-x-5 lg:gap-x-7 leading-[0.85] uppercase drop-shadow-[0_12px_45px_rgba(0,0,0,0.98)] tracking-[0.03em] will-change-transform"
            >
              <span className="text-[34px] min-[360px]:text-[40px] min-[400px]:text-[46px] sm:text-[68px] md:text-[84px] lg:text-[112px] xl:text-[134px] 2xl:text-[150px] tracking-[0.03em] text-[#f2edf0] font-bold scale-y-[1.06] inline-block">
                TECHBYTES
              </span>
              <span className="text-[34px] min-[360px]:text-[40px] min-[400px]:text-[46px] sm:text-[68px] md:text-[84px] lg:text-[112px] xl:text-[134px] 2xl:text-[150px] tracking-[0.03em] text-[#ff1e27] font-bold scale-y-[1.06] inline-block drop-shadow-[0_0_35px_rgba(255,30,39,0.55)]">
                SUMMIT '26
              </span>
            </h1>
          </div>

          {/* Breathing Space: Date and Institution Masked Regions */}
          <div className="flex flex-col items-center mt-4 sm:mt-6 md:mt-7">
            {/* Date Mask Region */}
            <div
              ref={dateWrapRef}
              className="overflow-hidden py-0.5 -my-0.5 px-3 -mx-3 will-change-[clip-path,opacity]"
              style={entranceComplete || prefersReducedMotion ? undefined : { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 }}
            >
              <span
                ref={dateTextRef}
                className="font-code-md text-xs min-[360px]:text-sm sm:text-base md:text-lg lg:text-[19px] tracking-[0.20em] sm:tracking-[0.28em] text-[#ffdad6] font-semibold uppercase drop-shadow text-center block will-change-transform"
              >
                09 — 10 OCTOBER 2026
              </span>
            </div>

            {/* Institution Mask Region */}
            <div
              ref={instWrapRef}
              className="overflow-hidden py-0.5 -my-0.5 px-3 -mx-3 mt-1.5 sm:mt-2.5 will-change-[clip-path,opacity]"
              style={entranceComplete || prefersReducedMotion ? undefined : { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 }}
            >
              <span
                ref={instTextRef}
                className="font-code-md text-[10px] sm:text-[11px] md:text-xs tracking-[0.15em] sm:tracking-[0.18em] text-[#c8c5ca]/80 uppercase text-center px-2 block will-change-transform"
              >
                KPR INSTITUTE OF ENGINEERING &amp; TECHNOLOGY, COIMBATORE
              </span>
            </div>
          </div>
        </div>

        {/* Action CTAs Mask Region — Settles naturally with compact bottom-to-top aperture wipe + scale */}
        <div
          ref={ctaWrapRef}
          className="overflow-hidden pt-1 pb-2 sm:pb-3 -mb-2 sm:-mb-3 px-2 -mx-2 mt-6 sm:mt-10 md:mt-12 lg:mt-14 w-full max-w-md will-change-[clip-path,opacity,transform]"
          style={entranceComplete || prefersReducedMotion ? undefined : { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0, pointerEvents: 'none' }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
            <a
              className="w-full sm:w-auto min-w-[160px] sm:min-w-[190px] h-12 flex items-center justify-center font-headline-sm text-lg sm:text-xl tracking-[0.14em] uppercase bg-[#ff544b] text-[#5c0005] hover:brightness-110 shadow-[0_0_30px_rgba(255,84,75,0.45)] transition-all font-semibold cursor-pointer"
              href="#access"
            >
              GET ACCESS
            </a>
            <a
              className="w-full sm:w-auto min-w-[160px] sm:min-w-[190px] h-12 flex items-center justify-center gap-2 font-headline-sm text-lg sm:text-xl tracking-[0.14em] uppercase text-white bg-[#1c1b1e]/80 hover:bg-[#2a2a2c] hover:text-[#ffb4ab] transition-all backdrop-blur-sm border border-[#353437]/60 cursor-pointer"
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
          className="group flex flex-col items-center gap-1 mt-5 sm:mt-6 text-[#c8c5ca]/60 hover:text-white transition-all duration-700 pointer-events-auto"
          style={entranceComplete || prefersReducedMotion ? undefined : { opacity: 0, pointerEvents: 'none' }}
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

