import React, { useRef, useEffect } from 'react';

/**
 * Single Vertical Hanging Prize Pool Banner / Veil
 * 
 * Features:
 * - Ceiling attachment fixture & suspension cable visually originating from the Hero top
 * - Narrow vertical classified veil with dark translucent black-red material & subtle scanlines
 * - Small horizontal technical "PRIZE POOL" label with subtle ₹ prefix (compact, zero clipping)
 * - Large visually dominant 5-digit stack: 5 / 0 / 0 / 0 / 0 (clearly ₹50,000)
 * - Tactical swallowtail/chevron bottom cut with micro status indicators
 * - Smooth drop entrance on load, settling into a silky subtle ambient sway
 * - Wrapped with a dedicated physics spring ref for fluid cursor-responsive sway & cloth-veil flex
 */
function HangingBanner({ side, entranceComplete, prefersReducedMotion, interactiveRef }) {
  const isLeft = side === 'left';
  const digits = ['5', '0', '0', '0', '0'];

  return (
    <div
      className={`absolute top-0 pointer-events-none z-20 flex flex-col items-center will-change-[transform,opacity] ${
        isLeft
          ? 'left-3 xl:left-5 2xl:left-8'
          : 'right-3 xl:right-5 2xl:right-8'
      }`}
      style={{
        transform:
          prefersReducedMotion || entranceComplete
            ? 'translate3d(0, 0, 0)'
            : 'translate3d(0, -45px, 0)',
        opacity: prefersReducedMotion || entranceComplete ? 1 : 0,
        transition:
          prefersReducedMotion
            ? 'none'
            : `transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) ${isLeft ? '150ms' : '280ms'}, opacity 0.95s cubic-bezier(0.16, 1, 0.3, 1) ${isLeft ? '150ms' : '280ms'}`,
      }}
      aria-label={`Prize Pool ₹50,000 classified banner (${side})`}
    >
      {/* 1. TOP CEILING ATTACHMENT FIXTURE & SUSPENSION CABLE */}
      {/* Originates visually from the very top ceiling of the Hero */}
      <div className="flex flex-col items-center">
        {/* Ceiling Mount Bracket */}
        <div className="h-1 w-7 xl:w-8 bg-[#1f0e13] border-b border-[#ff1e27]/60 shadow-[0_0_8px_rgba(255,30,39,0.4)]" />
        {/* Slender high-tensile suspension cable dropping comfortably below the 80px navbar */}
        <div className="w-[1px] h-24 xl:h-28 bg-gradient-to-b from-[#ff1e27]/80 via-[#ff1e27]/30 to-[#ff1e27]/70" />
        {/* Banner Suspension Clamp / Bracket with micro glowing rivet */}
        <div className="flex items-center justify-center w-9 xl:w-10 h-3 bg-[#160a0f] border border-[#ff1e27]/50 rounded-t-sm shadow-[0_0_10px_rgba(255,30,39,0.3)] relative">
          <div className="w-1.5 h-1.5 rounded-full bg-[#ff1e27] shadow-[0_0_6px_#ff1e27]" />
        </div>
      </div>

      {/* 2. DYNAMIC CURSOR-RESPONSIVE INTERACTIVE WRAPPER (PHYSICAL SPRING SWAY) */}
      <div
        ref={interactiveRef}
        className="will-change-transform"
        style={{ transformOrigin: '50% 0%' }}
      >
        {/* 3. MAIN VERTICAL HANGING VEIL / BANNER BODY */}
        <div
          className={`relative flex flex-col items-center select-none w-[56px] xl:w-[62px] h-[440px] xl:h-[480px] ${
            isLeft ? 'animate-hero-banner-left' : 'animate-hero-banner-right'
          }`}
          style={{
            /* Dark translucent black-red material */
            background:
              'linear-gradient(180deg, rgba(22, 9, 13, 0.94) 0%, rgba(14, 5, 9, 0.88) 45%, rgba(10, 4, 7, 0.82) 80%, rgba(7, 3, 5, 0.55) 100%)',
            backdropFilter: 'blur(3px)',
            clipPath:
              'polygon(0% 0%, 100% 0%, 100% calc(100% - 15px), 50% 100%, 0% calc(100% - 15px))',
          }}
        >
          {/* Fine Technical Grid / Scanline Texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, rgba(255, 30, 39, 0.06) 0px, rgba(255, 30, 39, 0.06) 1px, transparent 1px, transparent 4px)',
            }}
          />

          {/* Thin Red Lateral Borders & Inset Hairlines */}
          <div className="absolute inset-0 border-x border-t border-[#ff1e27]/35 pointer-events-none" />
          <div className="absolute inset-y-1 left-1 w-[1px] bg-gradient-to-b from-[#ff1e27]/25 via-[#ff1e27]/10 to-transparent pointer-events-none" />
          <div className="absolute inset-y-1 right-1 w-[1px] bg-gradient-to-b from-[#ff1e27]/25 via-[#ff1e27]/10 to-transparent pointer-events-none" />

          {/* Tactical Corner Accents */}
          <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#ff1e27]" />
          <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-[#ff1e27]" />

          {/* TOP CLASSIFIED LABEL REGION */}
          <div className="w-full pt-2 pb-1.5 px-0.5 flex flex-col items-center border-b border-[#ff1e27]/25 relative z-10 overflow-hidden">
            {/* Micro Classification Serial */}
            <span className="font-code-md text-[6.5px] xl:text-[7px] text-[#ff544b]/75 tracking-[0.2em] uppercase leading-none">
              {isLeft ? 'SEC // L-01' : 'SEC // R-01'}
            </span>

            {/* PRIZE POOL horizontal text with subtle ₹ prefix */}
            <div className="flex items-center justify-center gap-0.5 mt-1 max-w-full">
              <span className="font-code-md text-[7px] xl:text-[7.5px] text-[#ff544b] font-bold leading-none shrink-0">
                ₹
              </span>
              <span className="font-code-md text-[6.5px] xl:text-[7.5px] tracking-[0.10em] xl:tracking-[0.14em] text-[#ffdad6] font-bold uppercase leading-none whitespace-nowrap">
                PRIZE POOL
              </span>
            </div>

            {/* Hairline Divider Accent */}
            <div className="w-5 xl:w-6 h-[1px] bg-gradient-to-r from-transparent via-[#ff1e27]/60 to-transparent mt-1" />
          </div>

          {/* THE FIVE VERTICALLY STACKED LARGE DIGITS: 5 - 0 - 0 - 0 - 0 */}
          <div className="w-full flex-1 flex flex-col items-center justify-around py-1 xl:py-2 relative z-10">
            {digits.map((digit, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center h-[18%] w-full relative"
              >
                <span
                  className={`font-headline-lg text-[30px] xl:text-[36px] leading-none font-bold tracking-tight select-none ${
                    idx === 0
                      ? 'text-white drop-shadow-[0_0_12px_rgba(255,84,75,0.7)]'
                      : 'text-[#f5f1f3] drop-shadow-[0_2px_8px_rgba(255,30,39,0.35)]'
                  }`}
                >
                  {digit}
                </span>
              </div>
            ))}
          </div>

          {/* BOTTOM METADATA & SWALLOWTAIL TERMINATION */}
          <div className="w-full pb-3.5 pt-1 flex flex-col items-center border-t border-[#ff1e27]/20 relative z-10">
            <span className="font-code-md text-[6.5px] xl:text-[7px] text-[#ffdad6]/60 tracking-[0.15em] uppercase">
              ₹50,000
            </span>
            <div className="flex items-center gap-1 mt-0.5">
              <div className="w-1 h-1 rounded-full bg-[#ff1e27] shadow-[0_0_4px_#ff1e27]" />
              <div className="w-1 h-1 rounded-full bg-[#ff544b]/50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroPrizeBanners({ entranceComplete, prefersReducedMotion }) {
  const leftInteractiveRef = useRef(null);
  const rightInteractiveRef = useRef(null);

  useEffect(() => {
    // Accessibility: complete stillness if reduced motion preferred
    if (prefersReducedMotion) return;

    let animId = null;
    let isRunning = false;
    let lastTime = performance.now();

    // Cursor tracking state
    let cursorX = -9999;
    let cursorY = -9999;
    let prevCursorX = -9999;
    let prevCursorY = -9999;
    let cursorVelX = 0;
    let cursorVelY = 0;
    let lastMoveTime = performance.now();

    // Cached anchor pivot coordinates (avoids layout thrashing in RAF)
    let leftPivot = { x: 0, y: 0 };
    let rightPivot = { x: 0, y: 0 };

    function updatePivots() {
      if (leftInteractiveRef.current) {
        const r = leftInteractiveRef.current.getBoundingClientRect();
        leftPivot = { x: r.left + r.width / 2, y: r.top + 80 };
      }
      if (rightInteractiveRef.current) {
        const r = rightInteractiveRef.current.getBoundingClientRect();
        rightPivot = { x: r.left + r.width / 2, y: r.top + 80 };
      }
    }

    // Measure initially and on window resize/scroll
    updatePivots();
    window.addEventListener('resize', updatePivots, { passive: true });
    window.addEventListener('scroll', updatePivots, { passive: true });

    // Physical state for Left Banner
    const leftState = {
      x: 0,
      vx: 0,
      y: 0,
      vy: 0,
      rot: 0,
      vRot: 0,
      skew: 0,
      vSkew: 0,
      targetX: 0,
      targetY: 0,
      targetRot: 0,
      targetSkew: 0,
    };

    // Physical state for Right Banner
    const rightState = {
      x: 0,
      vx: 0,
      y: 0,
      vy: 0,
      rot: 0,
      vRot: 0,
      skew: 0,
      vSkew: 0,
      targetX: 0,
      targetY: 0,
      targetRot: 0,
      targetSkew: 0,
    };

    const PROXIMITY_RADIUS = 350; // Influence zone around banner in px

    function computeTargets(pivot, isLeft) {
      if (cursorX < -500 || cursorY < -500) {
        return { targetX: 0, targetY: 0, targetRot: 0, targetSkew: 0 };
      }

      const dx = cursorX - pivot.x;
      const dy = cursorY - pivot.y;
      const dist = Math.hypot(dx, dy);

      if (dist >= PROXIMITY_RADIUS) {
        return { targetX: 0, targetY: 0, targetRot: 0, targetSkew: 0 };
      }

      // Cubic smooth proximity falloff
      const norm = 1 - dist / PROXIMITY_RADIUS;
      const proximity = norm * norm * (3 - 2 * norm);

      // 1. Proximity repulsive draft:
      // If cursor approaches from inner side (dx > 0 for left, dx < 0 for right),
      // pushes slightly away towards the margin.
      const dirX = dx === 0 ? (isLeft ? -1 : 1) : -Math.sign(dx);
      const pushMag = proximity * 6.0;
      const pushX = dirX * pushMag;

      // 2. Velocity kinetic impulse:
      // Fast cursor movement imparts aerodynamic wake & sway
      const clampedVelX = Math.max(-2.5, Math.min(2.5, cursorVelX));
      const velImpulse = clampedVelX * proximity * 3.5;

      // Combine push + velocity, clamped to subtle maximum
      let targetX = pushX + velImpulse;
      targetX = Math.max(-8.5, Math.min(8.5, targetX));

      // 3. Rotation around top suspension anchor (max ±2.2°)
      const targetRot = (targetX / 8.5) * 2.2;

      // 4. Subtle vertical lift as pendulum swings upward (max 1.5px)
      const targetY = (Math.abs(targetRot) / 2.2) * 1.5;

      // 5. Subtle organic fabric skew (max ±0.85°)
      const targetSkew = (targetRot / 2.2) * 0.85;

      return { targetX, targetY, targetRot, targetSkew };
    }

    function stepPhysics(state, targets, dtFactor) {
      // Damped harmonic oscillator step
      state.targetX = targets.targetX;
      state.targetY = targets.targetY;
      state.targetRot = targets.targetRot;
      state.targetSkew = targets.targetSkew;

      const ax = (state.targetX - state.x) * (0.10 * dtFactor);
      state.vx = (state.vx + ax) * Math.pow(0.86, dtFactor);
      state.x += state.vx * dtFactor;

      const aRot = (state.targetRot - state.rot) * (0.10 * dtFactor);
      state.vRot = (state.vRot + aRot) * Math.pow(0.86, dtFactor);
      state.rot += state.vRot * dtFactor;

      const ay = (state.targetY - state.y) * (0.10 * dtFactor);
      state.vy = (state.vy + ay) * Math.pow(0.86, dtFactor);
      state.y += state.vy * dtFactor;

      const aSkew = (state.targetSkew - state.skew) * (0.09 * dtFactor);
      state.vSkew = (state.vSkew + aSkew) * Math.pow(0.85, dtFactor);
      state.skew += state.vSkew * dtFactor;
    }

    function renderPhysics() {
      if (leftInteractiveRef.current) {
        leftInteractiveRef.current.style.transform = `translate3d(${leftState.x.toFixed(2)}px, ${leftState.y.toFixed(2)}px, 0) rotate(${leftState.rot.toFixed(2)}deg) skewX(${leftState.skew.toFixed(2)}deg)`;
      }
      if (rightInteractiveRef.current) {
        rightInteractiveRef.current.style.transform = `translate3d(${rightState.x.toFixed(2)}px, ${rightState.y.toFixed(2)}px, 0) rotate(${rightState.rot.toFixed(2)}deg) skewX(${rightState.skew.toFixed(2)}deg)`;
      }
    }

    function tick(now) {
      const dt = Math.min(32, Math.max(8, now - lastTime));
      lastTime = now;
      const dtFactor = dt / 16.67; // Normalized to 60fps frame delta

      // Velocity decays if cursor stopped moving
      if (now - lastMoveTime > 60) {
        cursorVelX *= 0.85;
        cursorVelY *= 0.85;
      }

      // Compute targets for both banners
      const leftTargets = computeTargets(leftPivot, true);
      const rightTargets = computeTargets(rightPivot, false);

      stepPhysics(leftState, leftTargets, dtFactor);
      stepPhysics(rightState, rightTargets, dtFactor);

      renderPhysics();

      // Check if both banners have settled back to zero rest
      const isLeftSettled =
        Math.abs(leftState.x) < 0.02 &&
        Math.abs(leftState.vx) < 0.01 &&
        Math.abs(leftState.rot) < 0.02 &&
        leftTargets.targetX === 0;

      const isRightSettled =
        Math.abs(rightState.x) < 0.02 &&
        Math.abs(rightState.vx) < 0.01 &&
        Math.abs(rightState.rot) < 0.02 &&
        rightTargets.targetX === 0;

      if (isLeftSettled && isRightSettled) {
        // Snap to exact resting baseline and sleep RAF loop
        leftState.x = 0;
        leftState.y = 0;
        leftState.rot = 0;
        leftState.skew = 0;
        rightState.x = 0;
        rightState.y = 0;
        rightState.rot = 0;
        rightState.skew = 0;
        renderPhysics();
        isRunning = false;
        animId = null;
        return;
      }

      animId = requestAnimationFrame(tick);
    }

    function startLoop() {
      if (!isRunning) {
        isRunning = true;
        lastTime = performance.now();
        animId = requestAnimationFrame(tick);
      }
    }

    function onPointerMove(e) {
      // Ignore touch devices completely — strictly maintain normal resting state
      if (e.pointerType === 'touch') return;

      const now = performance.now();
      const dt = Math.max(8, now - lastMoveTime);
      lastMoveTime = now;

      const x = e.clientX;
      const y = e.clientY;

      if (prevCursorX !== -9999) {
        cursorVelX = ((x - prevCursorX) / dt) * 16.67;
        cursorVelY = ((y - prevCursorY) / dt) * 16.67;
      }

      prevCursorX = cursorX;
      prevCursorY = cursorY;
      cursorX = x;
      cursorY = y;

      startLoop();
    }

    function onPointerLeave() {
      cursorX = -9999;
      cursorY = -9999;
      prevCursorX = -9999;
      prevCursorY = -9999;
      cursorVelX = 0;
      cursorVelY = 0;
      startLoop();
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave, { passive: true });
    window.addEventListener('blur', onPointerLeave, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('blur', onPointerLeave);
      window.removeEventListener('resize', updatePivots);
      window.removeEventListener('scroll', updatePivots);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      className="hidden min-[1200px]:block absolute inset-0 pointer-events-none overflow-hidden select-none z-20"
      aria-hidden="true"
    >
      <HangingBanner
        side="left"
        entranceComplete={entranceComplete}
        prefersReducedMotion={prefersReducedMotion}
        interactiveRef={leftInteractiveRef}
      />
      <HangingBanner
        side="right"
        entranceComplete={entranceComplete}
        prefersReducedMotion={prefersReducedMotion}
        interactiveRef={rightInteractiveRef}
      />
    </div>
  );
}
