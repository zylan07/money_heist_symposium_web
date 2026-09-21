/**
 * THE HEIST — UNIFIED CINEMATIC MOTION SYSTEM
 * Standardized easing curves, durations, and motion tokens.
 */

export const MOTION_EASING = {
  cinematic: 'cubic-bezier(0.22, 1, 0.36, 1)',
  outExpo: 'cubic-bezier(0.16, 1, 0.3, 1)',
  inOutSmooth: 'cubic-bezier(0.65, 0, 0.35, 1)',
};

export const MOTION_DURATIONS = {
  micro: 200,
  fast: 380,
  normal: 650,
  cinematic: 1050,
  slow: 1600,
  pageFormation: 2200,
};

export const MOTION = {
  easeCinematic: MOTION_EASING.cinematic,
  easeOutExpo: MOTION_EASING.outExpo,
  easeInOutSmooth: MOTION_EASING.inOutSmooth,
  durations: MOTION_DURATIONS,
};

/**
 * Analytical cubic-bezier solver for high-performance RAF animation loops.
 */
export function createCubicBezierSolver(p1x, p1y, p2x, p2y) {
  const cx = 3 * p1x;
  const bx = 3 * (p2x - p1x) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * p1y;
  const by = 3 * (p2y - p1y) - cy;
  const ay = 1 - cy - by;

  function sampleX(t) {
    return ((ax * t + bx) * t + cx) * t;
  }
  function sampleY(t) {
    return ((ay * t + by) * t + cy) * t;
  }
  function sampleDerivX(t) {
    return (3 * ax * t + 2 * bx) * t + cx;
  }

  return function solve(x) {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    // Newton-Raphson iteration
    for (let i = 0; i < 8; i++) {
      const x2 = sampleX(t) - x;
      if (Math.abs(x2) < 1e-5) return sampleY(t);
      const d2 = sampleDerivX(t);
      if (Math.abs(d2) < 1e-5) break;
      t -= x2 / d2;
    }
    // Fallback binary subdivision if Newton diverges
    let t0 = 0;
    let t1 = 1;
    t = x;
    while (t0 < t1) {
      const x2 = sampleX(t);
      if (Math.abs(x2 - x) < 1e-4) return sampleY(t);
      if (x > x2) t0 = t;
      else t1 = t;
      t = (t1 - t0) * 0.5 + t0;
      if (Math.abs(t1 - t0) < 1e-4) break;
    }
    return sampleY(t);
  };
}

export const easeCinematic = createCubicBezierSolver(0.22, 1, 0.36, 1);


