import React, { useRef, useState, useEffect, useCallback } from 'react';
import { MISSIONS_DATA } from '../../data/events';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { MOTION_EASING } from '../../utils/motion';
import gfgLogo from '../../assets/geeksforgeeks.png';

/**
 * TECHBYTE SUMMIT '26 — HIGH-PERFORMANCE 3D CIRCULAR MISSION CAROUSEL
 * 
 * Performance & Smoothness:
 * - Direct DOM manipulation via RAF on card refs (NO React state re-render on every frame)
 * - Interpolated target rotation with soft damping and seamless blending
 * - Slightly faster automatic rotation (~11-13s per full revolution)
 * - Preserved card visuals, borders, badges, hover effects, and "VIEW INTEL" vault triggers
 */

export default function CircularMissionCarousel({
  missionIds = ['mission-01', 'mission-02', 'mission-03'],
  dayTitle = 'DAY 01 // 14 OCTOBER 2026',
  dayTag = '3 LIVE SYNDICATE STREAMS',
  initialAngle = 0,
  autoRotateSpeed = 0.46, // ~13s per 360° revolution at 60fps
  onSelectMission,
  activeMissionId,
  inView = true,
}) {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef(null);
  const cardElementsRef = useRef([]);

  // Responsive dimensions state
  const [dimensions, setDimensions] = useState({
    radius: 380,
    cardWidth: 350,
    cardHeight: 460,
    perspective: 1600,
    isMobile: false,
    isTablet: false,
  });

  // Dynamic content-driven card height per mission card across all viewports
  const getInitialCardHeights = (ids, isMobile = false) => {
    // Day 1 missions: Mission 01 (~390px/415px), Mission 02 with prototype warning (~440px/490px), Mission 03 with 5 specs + AI policy (~480px/530px)
    if (ids.includes('mission-03')) {
      return isMobile ? [415, 490, 530] : [390, 440, 480];
    }
    // Day 2 missions: Mission 04 (~400px/435px), Mission 05 (~405px/445px), Mission 06 with 5 specs + GFG coupons (~475px/525px)
    return isMobile ? [435, 445, 525] : [400, 405, 475];
  };

  const isInitialMobile = typeof window !== 'undefined' ? window.innerWidth < 640 : false;
  const [cardHeights, setCardHeights] = useState(() => getInitialCardHeights(missionIds, isInitialMobile));
  const cardHeightsRef = useRef(getInitialCardHeights(missionIds, isInitialMobile));

  // The card height accommodates the actual content with a sensible minimum
  const minBaseHeight = dimensions.isMobile ? 380 : 390;
  const maxCardHeight = Math.max(...cardHeights, minBaseHeight);
  const stageHeight = maxCardHeight + (dimensions.isMobile ? 36 : 48);

  const dimensionsRef = useRef({ ...dimensions, cardHeight: maxCardHeight });
  dimensionsRef.current = { ...dimensions, cardHeight: maxCardHeight };

  // Viewport intersection ref for pausing RAF loop when off-screen
  const isCarouselVisibleRef = useRef(true);
  const startLoopRef = useRef(null);

  // Rotation angles
  const targetAngleRef = useRef(initialAngle);
  const currentAngleRef = useRef(initialAngle);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartAngleRef = useRef(0);
  const lastInteractionTimeRef = useRef(Date.now());
  const dragMovedRef = useRef(false);
  const dragStartYRef = useRef(0);
  const dragLockedDirectionRef = useRef(null);
  // Inertia and velocity refs
  const velocityRef = useRef(0);
  const lastPointerXRef = useRef(0);

  // Active card index state (only updated when card index actually changes)
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const activeCardIndexRef = useRef(0);

  // Assembly animation progress
  const assemblyProgressRef = useRef(prefersReduced ? 1 : 0);

  // Viewport IntersectionObserver to pause carousel RAF when scrolled off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      isCarouselVisibleRef.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isCarouselVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && startLoopRef.current) {
          startLoopRef.current();
        }
      },
      { threshold: 0, rootMargin: '100px 0px 100px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Update responsive dimensions
  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth;
      if (w < 380) {
        setDimensions({
          radius: 170,
          cardWidth: Math.min(270, w - 28),
          cardHeight: 335,
          perspective: 850,
          isMobile: true,
          isTablet: false,
        });
      } else if (w < 640) {
        setDimensions({
          radius: 210,
          cardWidth: 295,
          cardHeight: 340,
          perspective: 1000,
          isMobile: true,
          isTablet: false,
        });
      } else if (w < 1024) {
        setDimensions({
          radius: 295,
          cardWidth: 320,
          cardHeight: 450,
          perspective: 1250,
          isMobile: false,
          isTablet: true,
        });
      } else {
        setDimensions({
          radius: 380,
          cardWidth: 350,
          cardHeight: 460,
          perspective: 1600,
          isMobile: false,
          isTablet: false,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Synchronize initial heights when missionIds or mobile layout changes
  useEffect(() => {
    const initial = getInitialCardHeights(missionIds, dimensions.isMobile);
    cardHeightsRef.current = initial;
    setCardHeights(initial);
  }, [missionIds, dimensions.isMobile]);

  // Dynamic content-driven card height measurement across all viewports
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const measureCardHeights = () => {
      const newHeights = [...cardHeightsRef.current];
      let changed = false;

      cardElementsRef.current.forEach((el, idx) => {
        if (!el) return;
        const inner = el.querySelector('.mission-card');
        if (!inner) return;

        const innerStyle = window.getComputedStyle(inner);
        const padBottom = parseFloat(innerStyle.paddingBottom) || 16;

        let contentH = 0;
        const children = inner.children;
        if (children.length > 0) {
          const lastChild = children[children.length - 1];
          // Untransformed layout coordinates relative to inner (offsetParent)
          // invariant to CSS 3D scale and rotate transforms
          contentH = Math.ceil(lastChild.offsetTop + lastChild.offsetHeight + padBottom);
        }

        const measuredH = Math.max(
          contentH,
          Math.ceil(inner.offsetHeight || 0),
          Math.ceil(inner.scrollHeight || 0)
        );

        if (measuredH > 250 && Math.abs(measuredH - (newHeights[idx] || 0)) > 2) {
          newHeights[idx] = measuredH;
          changed = true;
        }
      });

      if (changed) {
        cardHeightsRef.current = newHeights;
        setCardHeights(newHeights);
      }
    };

    measureCardHeights();
    const rafId = requestAnimationFrame(measureCardHeights);
    const timer = setTimeout(measureCardHeights, 80);

    const observers = [];
    if (typeof ResizeObserver !== 'undefined') {
      cardElementsRef.current.forEach((el) => {
        if (!el) return;
        const inner = el.querySelector('.mission-card');
        if (inner) {
          const ro = new ResizeObserver(() => {
            measureCardHeights();
          });
          ro.observe(inner);
          observers.push(ro);
        }
      });
    }

    window.addEventListener('resize', measureCardHeights);
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
      window.removeEventListener('resize', measureCardHeights);
      observers.forEach((ro) => ro.disconnect());
    };
  }, [missionIds, dimensions.cardWidth, dimensions.isMobile]);

  // Assembly entrance animation
  useEffect(() => {
    if (!inView || prefersReduced) {
      assemblyProgressRef.current = 1;
      return;
    }

    let start = null;
    const duration = 900;
    let animId = null;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(1, elapsed / duration);
      assemblyProgressRef.current = 1 - Math.pow(1 - progress, 3);

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      }
    };

    animId = requestAnimationFrame(step);
    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [inView, prefersReduced]);

  // High-performance continuous animation loop (Zero React re-renders)
  useEffect(() => {
    let animId = null;
    const cardInners = [null, null, null];
    const frontStates = [false, false, false];

    const updateCardTransforms = () => {
      const current = currentAngleRef.current;
      const { radius, isMobile } = dimensionsRef.current;
      const assembly = assemblyProgressRef.current;

      missionIds.forEach((id, index) => {
        const el = cardElementsRef.current[index];
        if (!el) return;

        if (!cardInners[index]) {
          cardInners[index] = el.querySelector('.mission-card');
        }

        const baseAngle = index * 120;
        const totalAngle = baseAngle + current;

        // Normalized relative angle [-180, 180]
        const relAngle = ((((totalAngle % 360) + 540) % 360) - 180);
        const rad = (relAngle * Math.PI) / 180;

        // Coordinates
        const x = Math.sin(rad) * radius;
        const z = Math.cos(rad) * radius - radius;
        const rotY = relAngle * (isMobile ? 0.44 : 0.48);

        // Assembly offset
        const assemblyZOffset = (1 - assembly) * (-380 - index * 50);
        const currentZ = z + assemblyZOffset;

        // Depth parameters
        const depthFactor = (Math.cos(rad) + 1) * 0.5; // 1.0 front, 0.0 rear
        const scale = 0.82 + depthFactor * 0.18;
        const opacity = Math.max(0.38, 0.42 + depthFactor * 0.58) * assembly;
        const brightness = 0.50 + depthFactor * 0.50;
        const zIndex = Math.round(50 + depthFactor * 100);
        const isFront = Math.abs(relAngle) < 36;

        el.style.transform = `translate3d(${x.toFixed(1)}px, 0px, ${currentZ.toFixed(1)}px) rotateY(${rotY.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
        el.style.opacity = opacity.toFixed(3);
        el.style.filter = `brightness(${brightness.toFixed(3)})`;
        el.style.zIndex = zIndex;
        el.style.cursor = isFront ? 'default' : 'pointer';

        // Update front border highlighting only when state changes
        const cardInner = cardInners[index];
        if (cardInner && frontStates[index] !== isFront) {
          frontStates[index] = isFront;
          if (isFront) {
            cardInner.classList.add('border-[#ff1e27]', 'shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_30px_rgba(255,30,39,0.24)]');
            cardInner.classList.remove('border-[#2a2a30]');
          } else {
            cardInner.classList.remove('border-[#ff1e27]', 'shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_30px_rgba(255,30,39,0.24)]');
            cardInner.classList.add('border-[#2a2a30]');
          }
        }
      });

      // Calculate which card is currently at the front
      const normalizedFront = ((-current % 360) + 360) % 360;
      const frontIdx = Math.round(normalizedFront / 120) % 3;
      if (frontIdx !== activeCardIndexRef.current) {
        activeCardIndexRef.current = frontIdx;
        setActiveCardIndex(frontIdx);
      }
    };

    const loop = () => {
      if (!inView || !isCarouselVisibleRef.current || document.hidden) {
        animId = null;
        return;
      }

      // Damped inertia when not dragging
      if (!isDraggingRef.current && Math.abs(velocityRef.current) > 0.005) {
        velocityRef.current *= 0.92;
        targetAngleRef.current += velocityRef.current;
      } else if (!isDraggingRef.current) {
        velocityRef.current = 0;
      }

      const delta = targetAngleRef.current - currentAngleRef.current;

      // Inertial damping towards targetAngle
      currentAngleRef.current += delta * 0.098;

      // Auto-rotation when idle (smooth blend)
      const idleTime = Date.now() - lastInteractionTimeRef.current;
      if (
        !isDraggingRef.current &&
        idleTime > 1100 &&
        Math.abs(delta) < 0.25 &&
        Math.abs(velocityRef.current) === 0 &&
        !prefersReduced
      ) {
        targetAngleRef.current += autoRotateSpeed;
        currentAngleRef.current = targetAngleRef.current;
      }

      updateCardTransforms();
      animId = requestAnimationFrame(loop);
    };

    startLoopRef.current = () => {
      if (inView && isCarouselVisibleRef.current && !document.hidden && !animId) {
        animId = requestAnimationFrame(loop);
      }
    };

    if (inView && isCarouselVisibleRef.current && !document.hidden) {
      animId = requestAnimationFrame(loop);
    }

    const handleVisibility = () => {
      if (!document.hidden && inView && isCarouselVisibleRef.current && !animId) {
        animId = requestAnimationFrame(loop);
      } else if (document.hidden && animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      document.removeEventListener('visibilitychange', handleVisibility);
      startLoopRef.current = null;
    };
  }, [inView, autoRotateSpeed, missionIds, prefersReduced]);

  // Handle subtle scroll wheel rotation
  const handleWheel = useCallback((e) => {
    // Only capture horizontal or small vertical deltas to not block page scrolling
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) > 3) {
      targetAngleRef.current -= delta * 0.08;
      lastInteractionTimeRef.current = Date.now();
    }
  }, []);

  // Pointer drag controls (mouse & touch)
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    velocityRef.current = 0;
    dragStartXRef.current = e.clientX;
    dragStartYRef.current = e.clientY;
    lastPointerXRef.current = e.clientX;
    dragStartAngleRef.current = targetAngleRef.current;
    lastInteractionTimeRef.current = Date.now();
    dragMovedRef.current = false;
    dragLockedDirectionRef.current = null;
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - dragStartXRef.current;
    const deltaY = e.clientY - dragStartYRef.current;

    // Distinguish intentional vertical page scrolling vs horizontal carousel drag
    if (!dragLockedDirectionRef.current) {
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 8) {
        dragLockedDirectionRef.current = 'vertical';
        isDraggingRef.current = false;
        velocityRef.current = 0;
        return;
      }
      if (Math.abs(deltaX) > 8) {
        dragLockedDirectionRef.current = 'horizontal';
      }
    }

    if (Math.abs(deltaX) > 4) {
      dragMovedRef.current = true;
    }

    // Measure incremental step for damped inertia
    const stepDx = e.clientX - lastPointerXRef.current;
    velocityRef.current = stepDx * 0.04;
    lastPointerXRef.current = e.clientX;

    const sensitivity = dimensionsRef.current.isMobile ? 0.30 : 0.24;
    targetAngleRef.current = dragStartAngleRef.current + deltaX * sensitivity;
    lastInteractionTimeRef.current = Date.now();
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    dragLockedDirectionRef.current = null;
    lastInteractionTimeRef.current = Date.now();
    // Cap velocity to prevent wild spin
    if (Math.abs(velocityRef.current) > 2.5) {
      velocityRef.current = Math.sign(velocityRef.current) * 2.5;
    }
  };

  // Rotate smoothly to center a specific card index (0, 1, or 2)
  const rotateToCardIndex = (index) => {
    lastInteractionTimeRef.current = Date.now();
    const currentAngle = currentAngleRef.current;
    const cardBaseAngle = index * 120;
    const normalizedCurrent = ((currentAngle % 360) + 360) % 360;
    const targetOffset = ((360 - cardBaseAngle) % 360);
    let diff = targetOffset - normalizedCurrent;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    targetAngleRef.current = currentAngle + diff;
  };

  // Next / Previous step
  const stepCard = (direction) => {
    lastInteractionTimeRef.current = Date.now();
    targetAngleRef.current += direction * 120;
  };

  // Keyboard navigation for carousel
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      stepCard(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      stepCard(1);
    }
  };

  const activeMission = MISSIONS_DATA[missionIds[activeCardIndex]];

  return (
    <div
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${dayTitle} Missions Carousel`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="w-full flex flex-col items-center select-none relative my-6 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#ff1e27]"
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      style={{ touchAction: 'pan-y' }}
    >
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. DETERMINISTIC THREE-ZONE DAY HEADER / ACTIVE EVENT BAR
          Strict proportions: LEFT (~30%) | CENTER (~40%) | RIGHT (~30%)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="w-full bg-[#121216]/95 border border-[#26252d] rounded-sm mb-6 z-20 backdrop-blur-md shadow-lg overflow-hidden">
        {/* DESKTOP BAR (md:grid with 3 strictly bounded columns: 30% / 40% / 30%, fixed height h-[72px]) */}
        <div className="hidden md:grid md:grid-cols-[30%_40%_30%] items-center h-[72px] px-5 lg:px-7 gap-2 lg:gap-3">
          {/* ZONE 1: LEFT (Day / Date) - 30% */}
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff1e27] shadow-[0_0_10px_#ff1e27] animate-pulse shrink-0" />
            <h3 className="font-headline-sm text-sm lg:text-base xl:text-lg tracking-[0.14em] uppercase text-white font-bold whitespace-nowrap">
              {dayTitle}
            </h3>
          </div>

          {/* ZONE 2: CENTER (Active Mission Indicator) - 40%, fixed height, strictly centered, overflow-safe */}
          <div className="flex flex-col items-center justify-center text-center px-1 min-w-0 h-[52px] overflow-hidden">
            <span className="font-code-md text-[9px] lg:text-[10px] tracking-[0.25em] text-[#ff544b] uppercase font-bold leading-none mb-1 shrink-0">
              ACTIVE MISSION
            </span>
            <div className="font-headline-sm text-[clamp(11.5px,1.05vw,15.5px)] text-white tracking-[0.04em] uppercase font-bold leading-snug line-clamp-2 break-words text-center max-w-full">
              <span className="text-[#ff544b] font-code-md mr-1.5">{activeMission?.num} //</span>
              <span>{activeMission?.title}</span>
            </div>
          </div>

          {/* ZONE 3: RIGHT (Stream Tag & Event Selectors) - 30%, aligned right, gap-3 */}
          <div className="flex items-center justify-end gap-2.5 lg:gap-3 min-w-0">
            <span className="font-code-md text-[9.5px] lg:text-[10.5px] tracking-[0.14em] text-[#c8c5ca]/80 uppercase hidden md:inline-block text-right leading-tight max-w-[140px] lg:max-w-[180px] break-words">
              {dayTag}
            </span>
            {/* Quick 3-Mission Switcher Buttons */}
            <div className="flex items-center gap-1.5 shrink-0 bg-[#0c0c0f] p-1 border border-[#23232b] rounded-sm">
              {missionIds.map((id, idx) => {
                const isSelected = activeCardIndex === idx;
                const m = MISSIONS_DATA[id];
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => rotateToCardIndex(idx)}
                    aria-pressed={isSelected}
                    aria-label={`Select Mission ${m?.num || idx + 1}: ${m?.title || ''}`}
                    className={`font-code-md text-xs px-2.5 py-1 rounded-sm border transition-all cursor-pointer font-bold ${
                      isSelected
                        ? 'border-[#ff1e27] text-white bg-[#ff1e27] shadow-[0_0_10px_rgba(255,30,39,0.5)]'
                        : 'border-[#26262e] text-[#909099] hover:text-white hover:border-[#3a3a46] bg-[#141418]'
                    }`}
                  >
                    {m?.num || `0${idx + 1}`}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* MOBILE REFLOW BAR (< md: deliberate stacked composition) */}
        <div className="md:hidden flex flex-col p-3 gap-2.5 bg-[#121216]/95">
          {/* Top Row: Day/Date (Left) + 3 Live Streams Tag (Right) */}
          <div className="flex items-center justify-between border-b border-[#212128]/80 pb-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full bg-[#ff1e27] shadow-[0_0_8px_#ff1e27] animate-pulse shrink-0" />
              <h3 className="font-headline-sm text-sm tracking-[0.12em] uppercase text-white font-bold">
                {dayTitle}
              </h3>
            </div>
            <span className="font-code-md text-[9px] tracking-wider text-[#909099] uppercase shrink-0">
              3 LIVE STREAMS
            </span>
          </div>

          {/* Second: Active Mission Block (Centered, Stacked, Never Truncated) */}
          <div className="flex flex-col items-center justify-center text-center bg-[#17171e]/70 border border-[#262530] px-3 py-2 rounded-sm">
            <span className="font-code-md text-[9px] tracking-[0.24em] text-[#ff544b] uppercase font-bold leading-none mb-1">
              ACTIVE MISSION
            </span>
            <h4 className="font-headline-sm text-sm min-[380px]:text-[15px] text-white tracking-[0.04em] uppercase font-bold leading-tight">
              <span className="text-[#ff544b] font-code-md mr-1.5">{activeMission?.num} //</span>
              <span>{activeMission?.title}</span>
            </h4>
          </div>

          {/* Bottom: Event Selector Buttons [01] [02] [03] */}
          <div className="flex items-center justify-center gap-2 pt-0.5">
            <span className="font-code-md text-[9.5px] tracking-widest text-[#a09ca8] uppercase mr-1">
              SELECT:
            </span>
            <div className="flex items-center gap-1.5 bg-[#0c0c0f] p-1 border border-[#23232b] rounded-sm">
              {missionIds.map((id, idx) => {
                const isSelected = activeCardIndex === idx;
                const m = MISSIONS_DATA[id];
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => rotateToCardIndex(idx)}
                    aria-pressed={isSelected}
                    aria-label={`Select Mission ${m?.num || idx + 1}: ${m?.title || ''}`}
                    className={`font-code-md text-xs px-3.5 py-1.5 rounded-sm border transition-all cursor-pointer font-bold ${
                      isSelected
                        ? 'border-[#ff1e27] text-white bg-[#ff1e27] shadow-[0_0_8px_rgba(255,30,39,0.5)]'
                        : 'border-[#26262e] text-[#909099] hover:text-white bg-[#141418]'
                    }`}
                  >
                    {m?.num || `0${idx + 1}`}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. UNIFIED 3D CIRCULAR MISSION CAROUSEL (RESPONSIVE ACROSS ALL SCREENS)
          Preserved 3D depth, fluid 60fps RAF rotation, active-card emphasis,
          smooth touch/mouse swiping with inertia, and synchronized selectors
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div
        className="w-full relative flex items-center justify-center overflow-visible"
        style={{
          height: `${stageHeight}px`,
          perspective: `${dimensions.perspective}px`,
          perspectiveOrigin: '50% 50%',
        }}
      >
        {/* Subtle Central Cylindrical Ground Glow */}
        <div
          className="absolute pointer-events-none rounded-full blur-3xl opacity-30"
          style={{
            width: `${dimensions.radius * 1.5}px`,
            height: `${dimensions.radius * 0.55}px`,
            background: 'radial-gradient(ellipse at center, rgba(255, 30, 39, 0.3) 0%, rgba(120, 15, 20, 0.06) 55%, transparent 70%)',
            transform: `translateY(${dimensions.isMobile ? Math.round(maxCardHeight * 0.38) : 160}px) rotateX(75deg)`,
          }}
        />

        {/* 3 Cards Ring */}
        {missionIds.map((id, index) => {
          const m = MISSIONS_DATA[id];
          if (!m) return null;

          const isVaultActive = activeMissionId === m.id;
          const isFront = activeCardIndex === index;
          const thisCardHeight = cardHeights[index] || (dimensions.isMobile ? 440 : 420);

          return (
            <div
              key={m.id}
              ref={(el) => (cardElementsRef.current[index] = el)}
              role="group"
              aria-roledescription="slide"
              aria-label={`Mission ${m.num}: ${m.title}`}
              aria-hidden={!isFront}
              tabIndex={isFront ? 0 : -1}
              onKeyDown={(e) => {
                if (!isFront && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  rotateToCardIndex(index);
                }
              }}
              onClick={(e) => {
                if (dragMovedRef.current) return;
                if (!isFront) {
                  e.stopPropagation();
                  rotateToCardIndex(index);
                }
              }}
              style={{
                width: `${dimensions.cardWidth}px`,
                height: `${thisCardHeight}px`,
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: `-${thisCardHeight / 2}px`,
                marginLeft: `-${dimensions.cardWidth / 2}px`,
                willChange: 'transform, opacity',
              }}
              className="group/card"
            >
              {/* Authentic Mission Card (Content-driven natural flow, zero truncation, zero collision) */}
              <div
                className={`mission-card relative bg-[#121215] border border-[#2a2a30] flex flex-col justify-start min-h-full h-auto p-3.5 sm:p-5 rounded-sm select-none transition-shadow duration-300 gap-2.5 sm:gap-3 ${
                  isVaultActive ? 'active-breach' : ''
                }`}
                data-mission-id={m.id}
              >
                {/* 1. Header: Number, Day Track & Category Badge */}
                <div className="flex justify-between items-start border-b border-[#212127] pb-2 sm:pb-2.5 shrink-0">
                  <div className="flex items-baseline gap-2">
                    <span className="font-headline-md text-2xl sm:text-3xl text-[#ff1e27] font-bold tracking-tight leading-none">
                      {m.num}
                    </span>
                    <span className="font-code-md text-[10px] text-[#ff544b] tracking-wider uppercase font-semibold">
                      {m.day}
                    </span>
                  </div>

                  <span className="font-label-sm text-[9px] sm:text-[10px] tracking-[0.18em] text-[#909099] uppercase bg-[#1a1a20] px-2 py-0.5 border border-[#2d2d35] shrink-0">
                    {m.categoryBadge}
                  </span>
                </div>

                {/* 2. Middle Content: Normal Flow Vertical Stacking */}
                <div className="flex flex-col justify-start gap-2 min-[380px]:gap-2.5 py-0.5 sm:py-1">
                  {/* Event Title & Short Description */}
                  <div className="shrink-0">
                    <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
                      <span className="material-symbols-outlined text-[#ff544b] text-[18px] sm:text-[21px] shrink-0">
                        {m.icon}
                      </span>
                      <h4 className="font-headline-sm text-[15px] sm:text-[18px] text-white uppercase tracking-[0.05em] leading-tight font-bold">
                        {m.title}
                      </h4>
                    </div>
                    <p className="font-body-sm text-[10.5px] sm:text-[11.5px] text-[#b0aeb5] leading-snug">
                      {m.shortDesc || m.briefing}
                    </p>
                  </div>

                  {/* Mission 02 Prominent Working Prototype Banner (Independent Block) */}
                  {m.id === 'mission-02' && (
                    <div className="px-2.5 py-1.5 bg-[#241315] border border-[#ff1e27]/60 rounded-sm flex items-center gap-2 shrink-0">
                      <span className="material-symbols-outlined text-[13px] text-[#ff1e27] shrink-0">warning</span>
                      <span className="font-code-md text-[9.5px] sm:text-[10px] text-[#ffdad6] font-bold uppercase tracking-wider">
                        WORKING PROTOTYPE MANDATORY
                      </span>
                    </div>
                  )}

                  {/* Schedule Banner: Date & Time (Independent Block) */}
                  <div className="flex items-center justify-between px-2.5 py-1.5 bg-[#16161c] border border-[#23222a] rounded-sm font-code-md text-[9.5px] sm:text-[10px] shrink-0">
                    <div className="flex items-center gap-1.5 text-[#c8c5ca] font-medium tracking-wide">
                      <span className="material-symbols-outlined text-[12px] sm:text-[13px] text-[#ff544b]">calendar_today</span>
                      <span>{m.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#ffdad6] font-semibold tracking-wide bg-[#1c1b22] px-2 py-0.5 rounded border border-[#ff1e27]/30">
                      <span className="material-symbols-outlined text-[11px] text-[#ff544b]">schedule</span>
                      <span>{m.time}</span>
                    </div>
                  </div>

                  {/* Event-Specific Key Highlights / Metadata (Responsive, Never Colliding, Never Truncated) */}
                  {(() => {
                    const rawSpecs = m.cardSpecs || [];
                    const specs = m.id === 'mission-02'
                      ? rawSpecs.filter((s) => s.label !== 'CRITICAL REQ')
                      : rawSpecs;
                    if (!specs.length) return null;

                    return (
                      <div className="flex flex-col gap-1.5 shrink-0">
                        {specs.map((spec, sIdx) => (
                          <div
                            key={sIdx}
                            className="flex items-start justify-between gap-2.5 px-2.5 py-1 sm:py-1.5 bg-[#141418] border border-[#202026] rounded-sm text-[9px] sm:text-[10px] font-code-md"
                          >
                            <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                              <span className="material-symbols-outlined text-[11px] sm:text-[12px] text-[#ff544b]">
                                {spec.icon}
                              </span>
                              <span className="text-[#8e8d95] tracking-wider uppercase text-[8px] sm:text-[9px] font-semibold whitespace-nowrap">
                                {spec.label}
                              </span>
                            </div>
                            <span className="flex-1 min-w-0 text-right text-[#e2dfe5] font-medium tracking-wide break-words whitespace-normal leading-tight">
                              {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>

                {/* 3. Card Bottom: Reward/Certificate Banner + VIEW INTEL (Independent Blocks, Clear Separation) */}
                <div className="pt-2 sm:pt-2.5 border-t border-[#1f1e24] flex flex-col gap-2 shrink-0 mt-auto">
                  {/* Reward / Prize / Certificate Banner */}
                  {m.prizePool ? (
                    <div className="flex items-center justify-between gap-2 px-2.5 py-1.5 bg-[#ff1e27]/10 border border-[#ff1e27]/30 rounded-sm shrink-0">
                      <div className="flex items-center gap-1.5 flex-1 min-w-0">
                        <span className="material-symbols-outlined text-[12px] sm:text-[14px] text-[#ff544b] shrink-0">workspace_premium</span>
                        <span className="font-code-md text-[9px] sm:text-[10px] text-[#ffdad6] uppercase font-bold tracking-wider break-words whitespace-normal leading-tight">
                          {m.prizePool}
                        </span>
                      </div>
                      <span className="font-code-md text-[8.5px] text-[#ff544b] uppercase tracking-widest font-semibold shrink-0 whitespace-nowrap">
                        PRIZE
                      </span>
                    </div>
                  ) : m.poweredBy ? (
                    <div className="flex items-center justify-between gap-2 px-2.5 py-1.5 bg-[#0e1c12] border border-[#2f8d46]/40 rounded-sm shrink-0">
                      <div className="flex items-center gap-1.5 flex-1 min-w-0">
                        <img src={gfgLogo} alt="GeeksforGeeks" className="h-3 w-auto object-contain shrink-0" />
                        <span className="font-code-md text-[9px] sm:text-[10px] text-[#48bb78] uppercase font-bold tracking-wider break-words whitespace-normal leading-tight">
                          GEEKSFORGEEKS COUPONS
                        </span>
                      </div>
                      <span className="font-code-md text-[8.5px] text-[#48bb78] uppercase tracking-widest font-semibold shrink-0 whitespace-nowrap">
                        REWARDS
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-2 px-2.5 py-1.5 bg-[#16161f] border border-[#2d2d38] rounded-sm shrink-0">
                      <div className="flex items-center gap-1.5 flex-1 min-w-0">
                        <span className="material-symbols-outlined text-[12px] sm:text-[14px] text-[#ff544b] shrink-0">verified</span>
                        <span className="font-code-md text-[9px] sm:text-[10px] text-[#e2dfe5] uppercase font-semibold tracking-wider break-words whitespace-normal leading-tight">
                          PARTICIPATION CERTIFICATES
                        </span>
                      </div>
                      <span className="font-code-md text-[8.5px] text-[#a0a0aa] uppercase tracking-widest font-semibold shrink-0 whitespace-nowrap">
                        ALL ATTENDEES
                      </span>
                    </div>
                  )}

                  {/* Participation & VIEW INTEL Trigger (Full Text, Never Truncated) */}
                  <div className="flex items-center justify-between gap-2 pt-0.5">
                    <div className="flex items-center gap-1.5 min-w-0 flex-1 pr-1.5">
                      <span className="font-code-md text-[8px] min-[380px]:text-[8.5px] sm:text-[9px] text-[#909099] uppercase tracking-wider shrink-0 whitespace-nowrap">
                        PARTICIPATION:
                      </span>
                      <span className="font-code-md text-[9.5px] sm:text-[10.5px] text-[#ffdad6] font-semibold whitespace-normal break-words leading-tight">
                        {m.participation}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectMission(m.id);
                      }}
                      className="font-code-md text-[10.5px] sm:text-[11.5px] tracking-[0.16em] uppercase font-bold flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-sm transition-all bg-[#ff1e27] text-white hover:brightness-110 shadow-[0_0_12px_rgba(255,30,39,0.4)] cursor-pointer shrink-0 ml-auto"
                    >
                      <span>VIEW INTEL</span>
                      <span className="text-xs">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Manual Step Controls (Under Carousel - Desktop & Tablet) */}
      <div className="flex items-center gap-4 mt-3 sm:mt-4 md:mt-6 z-20">
        <button
          type="button"
          onClick={() => stepCard(-1)}
          aria-label="Rotate previous mission"
          className="flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-[#121216] border border-[#2a2a32] hover:border-[#ff1e27] text-[#c8c5ca] hover:text-white font-code-md text-xs uppercase tracking-wider transition-colors rounded-sm cursor-pointer"
        >
          <span>← PREV</span>
        </button>

        <div className="flex items-center gap-1 text-[11px] font-code-md text-[#ff544b] uppercase tracking-widest px-2">
          <span>MISSION</span>
          <span className="font-bold text-white">0{activeCardIndex + 1}</span>
          <span>/ 03</span>
        </div>

        <button
          type="button"
          onClick={() => stepCard(1)}
          aria-label="Rotate next mission"
          className="flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-[#121216] border border-[#2a2a32] hover:border-[#ff1e27] text-[#c8c5ca] hover:text-white font-code-md text-xs uppercase tracking-wider transition-colors rounded-sm cursor-pointer"
        >
          <span>NEXT →</span>
        </button>
      </div>
    </div>
  );
}
