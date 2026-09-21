import React, { useRef, useEffect, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function OperationImageReveal({ src }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isFullyResolved, setIsFullyResolved] = useState(false);
  const prefersReduced = useReducedMotion();
  const hasTriggeredRef = useRef(false);
  const [imageInView, setImageInView] = useState(false);

  // Dedicated IntersectionObserver triggered ONLY when 25% of the actual image is in the viewport
  useEffect(() => {
    if (prefersReduced) {
      setIsFullyResolved(true);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.22 && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          setImageInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: [0.22, 0.3],
        rootMargin: '0px'
      }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [prefersReduced]);

  useEffect(() => {
    if (!imageInView || prefersReduced) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const img = new Image();
    img.src = src;

    let animId = null;
    let cancelled = false;

    img.onload = () => {
      if (cancelled) return;

      const rect = container.getBoundingClientRect();
      const width = (canvas.width = Math.round(rect.width));
      const height = (canvas.height = Math.round(rect.height));

      // Calculate object-cover crop coordinates for the source image
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = width / height;
      let sx, sy, sWidth, sHeight;

      if (imgAspect > canvasAspect) {
        sHeight = img.naturalHeight;
        sWidth = sHeight * canvasAspect;
        sx = (img.naturalWidth - sWidth) / 2;
        sy = 0;
      } else {
        sWidth = img.naturalWidth;
        sHeight = sWidth / canvasAspect;
        sx = 0;
        sy = (img.naturalHeight - sHeight) / 2;
      }

      // Draw the full base image onto an offscreen canvas for fast sampling
      const offscreen = document.createElement('canvas');
      offscreen.width = width;
      offscreen.height = height;
      const offCtx = offscreen.getContext('2d');
      offCtx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, width, height);

      // Grid setup: 32 columns x 20 rows for rich, computational resolution
      const COLS = 32;
      const ROWS = 20;
      const cellW = width / COLS;
      const cellH = height / ROWS;

      // Precalculate edge-to-center distance for each block
      const blocks = [];
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const u = (c + 0.5) / COLS;
          const v = (r + 0.5) / ROWS;

          // Normalized distance to the nearest outer border (0 at perimeter, 0.5 at center)
          const distToEdge = Math.min(u, 1 - u, v, 1 - v);
          const normDist = distToEdge / 0.5; // 0 to 1

          // Subtle organic pseudo-random jitter so edges resolve with computational aesthetics
          const pseudoRand = Math.sin(c * 12.9898 + r * 78.233) * 43758.5453;
          const jitter = (pseudoRand - Math.floor(pseudoRand)) * 0.14 - 0.07;
          const threshold = Math.max(0.02, Math.min(0.96, normDist + jitter));

          blocks.push({
            c,
            r,
            x: c * cellW,
            y: r * cellH,
            w: cellW + 0.5,
            h: cellH + 0.5,
            threshold
          });
        }
      }

      const startTime = performance.now();
      const DURATION = 2100; // 2.1s cinematic computational reconstruction

      function drawFrame(now) {
        if (cancelled) return;

        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / DURATION);

        // Smooth cinematic ease: progressive organic acceleration then settling
        const t =
          progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        // Fill background with dark tactical slate
        ctx.fillStyle = '#0b0b0d';
        ctx.fillRect(0, 0, width, height);

        // Draw resolved blocks
        for (let i = 0; i < blocks.length; i++) {
          const b = blocks[i];

          if (t >= b.threshold) {
            // Block is resolved: draw crisp source slice from offscreen
            ctx.drawImage(offscreen, b.x, b.y, b.w, b.h, b.x, b.y, b.w, b.h);

            // Subtle resolving edge shimmer
            const emergingWindow = t - b.threshold;
            if (emergingWindow < 0.12) {
              const glintAlpha = (1 - emergingWindow / 0.12) * 0.20;
              ctx.fillStyle = `rgba(255, 30, 39, ${glintAlpha})`;
              ctx.fillRect(b.x, b.y, b.w, b.h);
            }
          } else {
            // Block is not yet resolved: dark tactical fragment with faint telemetry grid
            const proximity = t / b.threshold;
            if (proximity > 0.5) {
              ctx.fillStyle = `rgba(20, 20, 26, ${(proximity - 0.5) * 1.4})`;
              ctx.fillRect(b.x, b.y, b.w, b.h);
            }
          }
        }

        if (progress < 1) {
          animId = requestAnimationFrame(drawFrame);
        } else {
          // Reconstruction complete: hand over to sharp native image
          setIsFullyResolved(true);
        }
      }

      animId = requestAnimationFrame(drawFrame);
    };

    return () => {
      cancelled = true;
      if (animId) cancelAnimationFrame(animId);
    };
  }, [imageInView, src, prefersReduced]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[3016/1576] overflow-hidden bg-[#0c0c0e] rounded-sm"
    >
      {/* 1. Native High-Resolution Image (displayed immediately if reduced motion or once reconstructed) */}
      <img
        alt="The Operation Briefing"
        src={src}
        className={`w-full h-full object-cover block filter brightness-[0.95] contrast-[1.05] transition-opacity duration-500 select-none ${
          isFullyResolved ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* 2. Edge-to-Center Canvas Reconstruction Layer */}
      {!isFullyResolved && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block pointer-events-none"
        />
      )}
    </div>
  );
}
