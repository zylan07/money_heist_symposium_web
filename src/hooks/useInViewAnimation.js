import { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * Custom hook to detect when an element scrolls into the viewport
 * for triggering one-shot cinematic reveal animations.
 *
 * @param {Object} options
 * @param {number} options.threshold - Visibility threshold (0.0 to 1.0)
 * @param {string} options.rootMargin - Margin around the root (e.g. "0px 0px -60px 0px")
 * @param {boolean} options.triggerOnce - Whether to only trigger once (default: true)
 */
export function useInViewAnimation({
  threshold = 0.15,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true
} = {}) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    // If reduced motion is preferred, immediately trigger without waiting
    if (prefersReduced) {
      setInView(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    // Check if IntersectionObserver is available
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setInView(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, prefersReduced]);

  return [ref, inView];
}
