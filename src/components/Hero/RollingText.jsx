import React from 'react';

/**
 * Skiper27-Style RollingText Component
 * 
 * Features:
 * - Per-letter vertical rolling reveal with center-out stagger
 * - Zero layout shift or baseline dropping: uses clip-path masking on inline-block 
 *   elements so the browser maintains true font baseline alignment at all times.
 * - Consistent DOM structure throughout animation and in resting state.
 * - Ultra-smooth cinematic easing: cubic-bezier(0.16, 1, 0.3, 1)
 * - Respects prefers-reduced-motion.
 */
export default function RollingText({
  text,
  className = '',
  active = false,
  isComplete = false,
  reducedMotion = false,
  stagger = 0.045,      // seconds between center-out ripple steps
  duration = 0.85,      // seconds per character roll transition
  delay = 0,            // base delay in seconds
  centerOut = true,     // true: center resolves first, outward ripple
  rollDistance = '118%',// vertical offset below mask
}) {
  const isStatic = isComplete || reducedMotion;

  // Split text into words and characters to ensure responsive wrapping at spaces
  const words = text.split(' ');
  const totalChars = Array.from(text).length;
  const centerIndex = (totalChars - 1) / 2;

  let runningCharIndex = 0;

  return (
    <span className={`${className} inline-block select-none`}>
      {words.map((word, wordIdx) => {
        const chars = Array.from(word);

        const wordElements = (
          <span key={`word-${wordIdx}`} className="inline-block whitespace-nowrap">
            {chars.map((char, charIdx) => {
              const currentGlobalIndex = runningCharIndex++;
              
              // Center-out stagger calculation (Skiper27 signature characteristic)
              const distFromCenter = centerOut
                ? Math.abs(currentGlobalIndex - centerIndex)
                : currentGlobalIndex;

              const charDelay = Number((delay + distFromCenter * stagger).toFixed(3));

              return (
                <span
                  key={`char-${wordIdx}-${charIdx}`}
                  className="inline-block align-baseline"
                  style={{
                    verticalAlign: 'baseline',
                    // Using clip-path instead of overflow:hidden preserves the natural font baseline!
                    clipPath: isStatic ? 'none' : 'inset(-0.3em 0% 0% 0%)',
                  }}
                >
                  <span
                    className="inline-block will-change-transform"
                    style={{
                      transform: isStatic || active ? 'translate3d(0, 0%, 0)' : `translate3d(0, ${rollDistance}, 0)`,
                      opacity: isStatic || active ? 1 : 0,
                      transition: !isStatic && active
                        ? `transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${charDelay}s, opacity ${duration * 0.75}s cubic-bezier(0.16, 1, 0.3, 1) ${charDelay}s`
                        : 'none',
                    }}
                  >
                    {char}
                  </span>
                </span>
              );
            })}
          </span>
        );

        // Account for space between words
        if (wordIdx < words.length - 1) {
          runningCharIndex++; // account for the space character
          return (
            <React.Fragment key={`frag-${wordIdx}`}>
              {wordElements}
              <span className="inline-block">&nbsp;</span>
            </React.Fragment>
          );
        }

        return wordElements;
      })}
    </span>
  );
}
