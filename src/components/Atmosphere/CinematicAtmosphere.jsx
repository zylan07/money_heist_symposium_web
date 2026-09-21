import React, { useRef, useEffect } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import AeroShards from './AeroShards';

export default function CinematicAtmosphere() {
  const canvasRef = useRef(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animId = null;
    let isVisible = true;

    // Device-aware particle count
    const isMobile = width < 640;
    const isTablet = width >= 640 && width < 1024;
    const PARTICLE_COUNT = isMobile ? 35 : isTablet ? 75 : 130;

    // Generate initial particulates
    const startTime = performance.now();
    const FORMATION_DURATION = 2200; // 2.2s gentle coalescence

    const particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Color palette: mostly warm dust, slate gray, and rare crimson motes
      const isCrimson = Math.random() < 0.12;
      const color = isCrimson
        ? 'rgba(255, 50, 60,'
        : Math.random() < 0.5
        ? 'rgba(230, 226, 220,'
        : 'rgba(160, 165, 175,';

      // Start position (scattered widely across or slightly beyond edges)
      const startX = Math.random() * width;
      const startY = Math.random() * height;

      // Target settled position
      const targetX = Math.random() * width;
      const targetY = Math.random() * height;

      particles.push({
        startX,
        startY,
        targetX,
        targetY,
        x: startX,
        y: startY,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.18 - 0.05, // very gentle upward drift
        size: Math.random() * 1.3 + 0.8, // 0.8px - 2.1px soft micro-mote
        baseAlpha: Math.random() * 0.35 + 0.15,
        color,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const onVisibilityChange = () => {
      isVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    function render(time) {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const elapsed = time - startTime;
      const formProgress = Math.min(1, elapsed / FORMATION_DURATION);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - formProgress, 3);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (formProgress < 1) {
          // Formation phase: ease from start position to settled position
          p.x = p.startX + (p.targetX - p.startX) * ease;
          p.y = p.startY + (p.targetY - p.startY) * ease;
        } else {
          // Settled phase: slow ambient Brownian drift
          p.x += p.vx;
          p.y += p.vy;

          // Wrap edges smoothly
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;
        }

        // Subtle atmospheric brightness fluctuation
        const pulse = Math.sin(time * 0.0015 + p.pulseOffset) * 0.08;
        const currentAlpha = Math.max(0.04, Math.min(0.55, (p.baseAlpha + pulse) * (formProgress > 0 ? ease : 0)));

        ctx.fillStyle = `${p.color} ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [prefersReduced]);

  return (
    <div
      id="cinematic-atmosphere-layer"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 0. Fullscreen Interactive AeroShards Background */}
      <AeroShards
        backgroundColor="#120F17"
        shardColor="#6b0606"
        accentColor="#ff0000"
        placement="full"
        flow="stream"
        material="pearl"
        detail="balanced"
        effect="none"
        scale={1}
        spread={1}
        depth={1}
        speed={1}
        spin={1}
        interaction="repel"
        density={1.5}
        shardSize={1.1}
        stretch={1}
        turbulence={1}
        glow={1}
        edgeSoftness={2}
        bloom={0.5}
        grain={0.05}
        chromaticAberration={0.0075}
        transitionDuration={1}
        interactionRadius={1.5}
        interactionStrength={0.5}
        rippleIntensity={1}
        holdToGather={true}
        className="w-full h-full"
      />

      {/* 1. Subtle Procedural Film Grain Overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-screen"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.45) 1px, transparent 0)`,
          backgroundSize: '3px 3px'
        }}
      />

      {/* 2. Classified Security Grid & Crosshair Registration Marks */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
        {/* Subtle grid lines */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)',
            backgroundSize: '140px 140px'
          }}
        />
        {/* Corner registration crosshairs */}
        <div className="absolute top-12 left-12 text-white font-mono text-xs">+</div>
        <div className="absolute top-12 right-12 text-white font-mono text-xs">+</div>
        <div className="absolute bottom-12 left-12 text-white font-mono text-xs">+</div>
        <div className="absolute bottom-12 right-12 text-white font-mono text-xs">+</div>
      </div>

      {/* 3. Ultra-Slow Ambient Crimson Glow Drift */}
      <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[120vw] h-[60vh] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,30,39,0.06)_0%,transparent_70%)] animate-pulse duration-[8000ms]" />

      {/* 4. Canvas Floating Dust Motes Engine */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
}
