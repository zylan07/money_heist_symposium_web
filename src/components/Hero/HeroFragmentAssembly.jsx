import React, { useRef, useEffect } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { easeCinematic } from '../../utils/motion';

// Deterministic pseudo-random noise for reproducible, organic fragment distribution
function pseudoNoise(seed) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453123;
  return x - Math.floor(x);
}

export default function HeroFragmentAssembly({
  imageSrc,
  onComplete,
  className = '',
}) {
  const canvasRef = useRef(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      onComplete?.();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = null;
    let disposed = false;

    // Load source image
    const img = new Image();
    img.src = imageSrc;

    const startAssembly = () => {
      if (disposed) return;

      let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
      let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // Responsive fragment grid: fine detail on desktop, lighter on mobile
      const isDesktop = width >= 1024;
      const isTablet = width >= 640 && width < 1024;
      const cols = isDesktop ? 30 : isTablet ? 20 : 12;
      const rows = isDesktop ? 18 : isTablet ? 12 : 8;

      // Match cover/contain focal alignment of hero operatives image
      const nw = img.naturalWidth || 1920;
      const nh = img.naturalHeight || 1080;
      const tr = width / height;
      const ir = nw / nh;

      let sx, sy, sw, sh;
      let dx = 0, dy = 0, dw = width, dh = height;

      // Match cover/top focal alignment of hero operatives image across all viewports
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
      dx = 0;
      dy = 0;
      dw = width;
      dh = height;

      const cellW = dw / cols;
      const cellH = dh / rows;
      const srcCellW = sw / cols;
      const srcCellH = sh / rows;

      // Construct unified continuous fragment field
      const fragments = [];
      const TOTAL_DURATION = 2000; // 2.0s continuous assembly duration

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const index = r * cols + c;
          const targetX = dx + c * cellW;
          const targetY = dy + r * cellH;
          const sourceX = sx + c * srcCellW;
          const sourceY = sy + r * srcCellH;

          // Normalized coordinates for continuous wave/focal weighting
          const normX = c / (cols - 1);
          const normY = r / (rows - 1);
          const distFromFocal = Math.hypot(normX - 0.5, normY - 0.35);

          const noise1 = pseudoNoise(index * 1.37);
          const noise2 = pseudoNoise(index * 2.73 + 17.5);
          const noise3 = pseudoNoise(index * 4.19 + 53.1);

          // Gentle phase wave: center operatives wake slightly first, then outer field
          // Phase ranges between 0.0 and ~0.20 of the master timeline
          const phase = Math.min(0.20, distFromFocal * 0.13 + noise1 * 0.07);

          // Subtle spatial offsets: fragments enter smoothly from varied depths
          const maxDisplacement = isDesktop ? 50 : 32;
          const startOffsetX = (noise2 - 0.5) * 2 * maxDisplacement;
          const startOffsetY = (noise3 - 0.5) * 2 * maxDisplacement;
          const startScale = 0.88 + noise1 * 0.22;
          const startAlpha = 0.08 + noise2 * 0.12;

          fragments.push({
            targetX,
            targetY,
            sourceX,
            sourceY,
            startOffsetX,
            startOffsetY,
            startScale,
            startAlpha,
            phase,
          });
        }
      }

      const startTime = performance.now();

      const render = (now) => {
        if (disposed) return;
        const elapsed = now - startTime;
        const masterT = Math.min(1, Math.max(0, elapsed / TOTAL_DURATION));

        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < fragments.length; i++) {
          const frag = fragments[i];

          // Normalized progress: every fragment reaches 1.0 synchronously at masterT = 1.0
          let localProgress = 0;
          if (masterT > frag.phase) {
            localProgress = (masterT - frag.phase) / (1 - frag.phase);
          }

          // Single continuous cinematic ease-out curve — no pauses, no mid-animation dead zones
          const eased = easeCinematic(localProgress);

          const currentX = frag.targetX + frag.startOffsetX * (1 - eased);
          const currentY = frag.targetY + frag.startOffsetY * (1 - eased);
          const currentAlpha = frag.startAlpha + (1 - frag.startAlpha) * Math.min(1, eased * 1.25);
          const currentScale = frag.startScale + (1 - frag.startScale) * eased;

          ctx.save();
          ctx.globalAlpha = Math.min(1, Math.max(0, currentAlpha));

          if (Math.abs(currentScale - 1) > 0.005) {
            const centerX = currentX + cellW / 2;
            const centerY = currentY + cellH / 2;
            ctx.translate(centerX, centerY);
            ctx.scale(currentScale, currentScale);
            ctx.translate(-centerX, -centerY);
          }

          // Subpixel padding (0.6px) prevents hairline gaps as fragments settle
          ctx.drawImage(
            img,
            frag.sourceX,
            frag.sourceY,
            srcCellW,
            srcCellH,
            currentX,
            currentY,
            cellW + 0.6,
            cellH + 0.6
          );

          ctx.restore();
        }

        if (masterT < 1) {
          animId = requestAnimationFrame(render);
        } else {
          // Completed clean assembly: draw one final 100% clean whole frame then complete
          ctx.clearRect(0, 0, width, height);
          for (let i = 0; i < fragments.length; i++) {
            const f = fragments[i];
            ctx.drawImage(
              img,
              f.sourceX,
              f.sourceY,
              srcCellW,
              srcCellH,
              f.targetX,
              f.targetY,
              cellW + 0.6,
              cellH + 0.6
            );
          }
          onComplete?.();
        }
      };

      animId = requestAnimationFrame(render);
    };

    if (img.complete && img.naturalWidth > 0) {
      startAssembly();
    } else {
      img.onload = startAssembly;
      img.onerror = () => onComplete?.();
    }

    return () => {
      disposed = true;
      if (animId) cancelAnimationFrame(animId);
    };
  }, [imageSrc, prefersReduced, onComplete]);

  if (prefersReduced) return null;

  return (
    <canvas
      ref={canvasRef}
      id="hero-fragment-assembly-canvas"
      className={`absolute inset-0 w-full h-full pointer-events-none z-20 transition-opacity duration-500 ${className}`}
      aria-hidden="true"
    />
  );
}
