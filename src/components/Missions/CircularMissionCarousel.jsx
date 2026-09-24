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
    cardHeight: 440,
    perspective: 1600,
    isMobile: false,
    isTablet: false,
  });

  const dimensionsRef = useRef(dimensions);
  dimensionsRef.current = dimensions;

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

  // Update responsive dimensions
  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth;
      if (w < 400) {
        setDimensions({
          radius: 170,
          cardWidth: Math.min(270, w - 36),
          cardHeight: 410,
          perspective: 850,
          isMobile: true,
          isTablet: false,
        });
      } else if (w < 640) {
        setDimensions({
          radius: 210,
          cardWidth: 285,
          cardHeight: 430,
          perspective: 1000,
          isMobile: true,
          isTablet: false,
        });
      } else if (w < 1024) {
        setDimensions({
          radius: 310,
          cardWidth: 315,
          cardHeight: 440,
          perspective: 1300,
          isMobile: false,
          isTablet: true,
        });
      } else {
        setDimensions({
          radius: 380,
          cardWidth: 350,
          cardHeight: 440,
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
      if (!inView || document.hidden) {
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

    if (inView && !document.hidden) {
      animId = requestAnimationFrame(loop);
    }

    const handleVisibility = () => {
      if (!document.hidden && inView && !animId) {
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

  const activeMission = MISSIONS_DATA[missionIds[activeCardIndex]];

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col items-center select-none relative my-6"
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      style={{ touchAction: 'pan-y' }}
    >
      {/* Day Banner & Active Mission Telemetry */}
      <div className="w-full flex items-center justify-between bg-[#121216]/90 border border-[#26252d] px-4 sm:px-6 py-3 rounded-sm mb-6 z-20 backdrop-blur-sm shadow-md">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff1e27] shadow-[0_0_10px_#ff1e27] animate-pulse" />
          <h3 className="font-headline-sm text-lg sm:text-xl tracking-[0.16em] uppercase text-white font-bold">
            {dayTitle}
          </h3>
          <span className="hidden md:inline-block text-[#ff544b] font-code-md text-xs tracking-wider uppercase font-semibold pl-2 border-l border-[#2d2d35]">
            ACTIVE: [ {activeMission?.num} // {activeMission?.title} ]
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-code-md text-[10px] sm:text-xs tracking-[0.2em] text-[#ff544b] uppercase hidden sm:inline-block">
            {dayTag}
          </span>
          {/* Quick Direct 3-Card Indicators */}
          <div className="flex items-center gap-1.5">
            {missionIds.map((id, idx) => {
              const isSelected = activeCardIndex === idx;
              const m = MISSIONS_DATA[id];
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => rotateToCardIndex(idx)}
                  aria-label={`Select Mission ${m?.num}`}
                  className={`font-code-md text-[10px] px-2 py-0.5 rounded-sm border transition-all ${
                    isSelected
                      ? 'border-[#ff1e27] text-white bg-[#ff1e27] font-bold shadow-[0_0_8px_rgba(255,30,39,0.5)]'
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

      {/* 3D Circular Stage Viewport */}
      <div
        className="w-full relative flex items-center justify-center overflow-hidden sm:overflow-visible"
        style={{
          height: `${dimensions.cardHeight + 40}px`,
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
            transform: 'translateY(160px) rotateX(75deg)',
          }}
        />

        {/* 3 Cards Ring */}
        {missionIds.map((id, index) => {
          const m = MISSIONS_DATA[id];
          if (!m) return null;

          const isVaultActive = activeMissionId === m.id;

          return (
            <div
              key={m.id}
              ref={(el) => (cardElementsRef.current[index] = el)}
              onClick={(e) => {
                if (dragMovedRef.current) return;
                const isFront = activeCardIndexRef.current === index;
                if (!isFront) {
                  e.stopPropagation();
                  rotateToCardIndex(index);
                }
              }}
              style={{
                width: `${dimensions.cardWidth}px`,
                height: `${dimensions.cardHeight}px`,
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: `-${dimensions.cardHeight / 2}px`,
                marginLeft: `-${dimensions.cardWidth / 2}px`,
                willChange: 'transform, opacity',
              }}
              className="group/card"
            >
              {/* Preserved Authentic Mission Card */}
              <div
                className={`mission-card relative bg-[#121215] border border-[#2a2a30] flex flex-col justify-between h-full p-4 min-[380px]:p-5 sm:p-5.5 rounded-sm select-none transition-shadow duration-300 ${
                  isVaultActive ? 'active-breach' : ''
                }`}
                data-mission-id={m.id}
              >
                {/* 1. Card Top: Number, Day Track & Category Badge */}
                <div className="flex justify-between items-start border-b border-[#212127] pb-2 sm:pb-2.5 shrink-0">
                  <div className="flex items-baseline gap-2">
                    <span className="font-headline-md text-2xl sm:text-3xl text-[#ff1e27] font-bold tracking-tight leading-none">
                      {m.num}
                    </span>
                    <span className="font-code-md text-[10px] text-[#ff544b] tracking-wider uppercase font-semibold">
                      {m.day}
                    </span>
                  </div>

                  <span className="font-label-sm text-[9px] sm:text-[10px] tracking-[0.18em] text-[#909099] uppercase bg-[#1a1a20] px-2 py-0.5 border border-[#2d2d35]">
                    {m.categoryBadge}
                  </span>
                </div>

                {/* 2. Middle Content: Flex-1 to naturally fill available vertical card height */}
                <div className="flex-1 flex flex-col justify-between py-2.5 sm:py-3 min-h-0">
                  {/* Event Title & Short Description */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="material-symbols-outlined text-[#ff544b] text-[19px] sm:text-[21px] shrink-0">
                        {m.icon}
                      </span>
                      <h4 className="font-headline-sm text-[16px] min-[380px]:text-[17.5px] sm:text-[19px] text-white uppercase tracking-[0.05em] leading-tight font-bold">
                        {m.title}
                      </h4>
                    </div>
                    <p className="font-body-sm text-[11px] sm:text-[11.5px] text-[#b0aeb5] leading-snug">
                      {m.shortDesc || m.briefing}
                    </p>
                  </div>

                  {/* Schedule Banner: Date & Time */}
                  <div className="flex items-center justify-between px-2.5 py-1.5 bg-[#16161c] border border-[#23222a] rounded-sm font-code-md text-[9.5px] sm:text-[10px]">
                    <div className="flex items-center gap-1.5 text-[#c8c5ca] font-medium tracking-wide">
                      <span className="material-symbols-outlined text-[12px] sm:text-[13px] text-[#ff544b]">calendar_today</span>
                      <span>{m.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#ffdad6] font-semibold tracking-wide bg-[#1c1b22] px-2 py-0.5 rounded border border-[#ff1e27]/30">
                      <span className="material-symbols-outlined text-[11px] text-[#ff544b]">schedule</span>
                      <span>{m.time}</span>
                    </div>
                  </div>

                  {/* Event-Specific Key Highlights */}
                  {m.cardSpecs && m.cardSpecs.length > 0 && (
                    <div className="flex flex-col gap-1.5">
                      {m.cardSpecs.map((spec, sIdx) => (
                        <div
                          key={sIdx}
                          className="flex items-center justify-between px-2.5 py-1 sm:py-1.5 bg-[#141418] border border-[#202026] rounded-sm text-[9.5px] sm:text-[10px] font-code-md"
                        >
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="material-symbols-outlined text-[12px] text-[#ff544b]">
                              {spec.icon}
                            </span>
                            <span className="text-[#8e8d95] tracking-wider uppercase text-[8.5px] sm:text-[9px] font-semibold">
                              {spec.label}
                            </span>
                          </div>
                          <span className="text-[#e2dfe5] font-medium tracking-wide truncate ml-2 text-right">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 3. Card Bottom: Prize/Reward Banner + Participation & VIEW INTEL */}
                <div className="pt-2 sm:pt-2.5 border-t border-[#1f1e24] flex flex-col gap-2 shrink-0">
                  {/* Reward / Prize / Certificate Banner */}
                  {m.prizePool ? (
                    <div className="flex items-center justify-between px-2.5 py-1.5 bg-[#ff1e27]/10 border border-[#ff1e27]/30 rounded-sm">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[13px] sm:text-[14px] text-[#ff544b]">workspace_premium</span>
                        <span className="font-code-md text-[9.5px] sm:text-[10px] text-[#ffdad6] uppercase font-bold tracking-wider">
                          {m.prizePool}
                        </span>
                      </div>
                      <span className="font-code-md text-[8.5px] text-[#ff544b] uppercase tracking-widest font-semibold">
                        PRIZE
                      </span>
                    </div>
                  ) : m.poweredBy ? (
                    <div className="flex items-center justify-between px-2.5 py-1.5 bg-[#0e1c12] border border-[#2f8d46]/40 rounded-sm">
                      <div className="flex items-center gap-1.5">
                        <img src={gfgLogo} alt="GeeksforGeeks" className="h-3 w-auto object-contain" />
                        <span className="font-code-md text-[9.5px] sm:text-[10px] text-[#48bb78] uppercase font-bold tracking-wider">
                          GEEKSFORGEEKS COUPONS
                        </span>
                      </div>
                      <span className="font-code-md text-[8.5px] text-[#48bb78] uppercase tracking-widest font-semibold">
                        REWARDS
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between px-2.5 py-1.5 bg-[#16161f] border border-[#2d2d38] rounded-sm">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[13px] sm:text-[14px] text-[#ff544b]">verified</span>
                        <span className="font-code-md text-[9.5px] sm:text-[10px] text-[#e2dfe5] uppercase font-semibold tracking-wider">
                          PARTICIPATION CERTIFICATES
                        </span>
                      </div>
                      <span className="font-code-md text-[8.5px] text-[#a0a0aa] uppercase tracking-widest font-semibold">
                        ALL ATTENDEES
                      </span>
                    </div>
                  )}

                  {/* Participation & VIEW INTEL Trigger */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 min-w-0 pr-2">
                      <span className="font-code-md text-[8.5px] text-[#909099] uppercase tracking-wider shrink-0">
                        PARTICIPATION:
                      </span>
                      <span className="font-code-md text-[10px] sm:text-[10.5px] text-[#ffdad6] font-semibold truncate">
                        {m.participation === 'Individual participation' ? 'Individual' : m.participation}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectMission(m.id);
                      }}
                      className="font-code-md text-[10.5px] sm:text-[11.5px] tracking-[0.16em] uppercase font-bold flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-sm transition-all bg-[#ff1e27] text-white hover:brightness-110 shadow-[0_0_12px_rgba(255,30,39,0.4)] cursor-pointer shrink-0"
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

      {/* Manual Step Controls (Under Carousel) */}
      <div className="flex items-center gap-4 mt-6 z-20">
        <button
          type="button"
          onClick={() => stepCard(-1)}
          aria-label="Rotate previous mission"
          className="flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-[#121216] border border-[#2a2a32] hover:border-[#ff1e27] text-[#c8c5ca] hover:text-white font-code-md text-xs uppercase tracking-wider transition-colors rounded-sm"
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
          className="flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-[#121216] border border-[#2a2a32] hover:border-[#ff1e27] text-[#c8c5ca] hover:text-white font-code-md text-xs uppercase tracking-wider transition-colors rounded-sm"
        >
          <span>NEXT →</span>
        </button>
      </div>
    </div>
  );
}
