import React, { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const progressBarRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    let lastScrolled = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const isScrolled = scrollY > 40;
          if (isScrolled !== lastScrolled) {
            lastScrolled = isScrolled;
            setScrolled(isScrolled);
          }
          if (progressBarRef.current) {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = totalHeight > 0 ? Math.min(1, Math.max(0, scrollY / totalHeight)) : 0;
            progressBarRef.current.style.transform = `scaleX(${progress})`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-[background-color,border-color,padding] duration-300 pointer-events-auto ${
        scrolled
          ? 'bg-[#08080A]/90 backdrop-blur-md border-b border-[#1c1b1e]/80 py-1'
          : 'bg-transparent py-0'
      }`}
    >
      {/* Subtle Scroll Progress Indicator */}
      <div 
        ref={progressBarRef}
        className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#ff1e27] via-[#ff544b] to-white pointer-events-none opacity-80 z-50 origin-left will-change-transform"
        style={{ transform: 'scaleX(0)' }}
        aria-hidden="true"
      />
      <div className="h-20 w-full px-3 sm:px-6 md:px-8 lg:px-12 flex items-center justify-between">
        <a className="flex items-center gap-1.5 sm:gap-2 group shrink-0 min-w-0" href="#">
          <span className="font-headline-md text-base min-[360px]:text-lg sm:text-2xl md:text-3xl text-[#e5e1e4] uppercase tracking-[0.08em] sm:tracking-[0.14em] group-hover:text-white transition-colors truncate">
            TECHBYTE
          </span>
          <span className="font-code-md text-[8px] min-[360px]:text-[9px] sm:text-[10px] tracking-[0.1em] sm:tracking-[0.2em] bg-[#ff1e27] text-white px-1 sm:px-2 py-0.5 rounded-sm font-bold uppercase shrink-0">
            SUMMIT '26
          </span>
        </a>

        <div className="flex items-center gap-2 sm:gap-6 md:gap-8">
          <nav className="hidden md:flex items-center gap-8">
            <a
              className="font-code-md text-xs tracking-[0.15em] uppercase text-[#e9bcb7] hover:text-white transition-colors"
              href="#the-operation"
            >
              THE OPERATION
            </a>
            <a
              className="font-code-md text-xs tracking-[0.15em] uppercase text-[#e9bcb7] hover:text-white transition-colors"
              href="#missions"
            >
              MISSIONS
            </a>
            <a
              className="font-code-md text-xs tracking-[0.15em] uppercase text-[#e9bcb7] hover:text-white transition-colors"
              href="#the-plan"
            >
              THE PLAN
            </a>
            <a
              className="font-code-md text-xs tracking-[0.15em] uppercase text-[#e9bcb7] hover:text-white transition-colors"
              href="#base-location"
            >
              BASE LOCATION
            </a>
            <a
              className="font-code-md text-xs tracking-[0.15em] uppercase text-[#e9bcb7] hover:text-white transition-colors"
              href="#command-channel"
            >
              COMMAND CHANNEL
            </a>
          </nav>

          <a
            className="inline-flex items-center justify-center px-2.5 sm:px-4 py-1.5 font-code-md text-[10px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.18em] text-white bg-black/60 border border-[#ff544b]/80 hover:bg-[#ff544b] hover:text-black transition-colors shadow-[0_0_15px_rgba(255,84,75,0.2)] shrink-0 whitespace-nowrap"
            href="#access"
          >
            GET ACCESS
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 sm:p-2 text-[#e5e1e4] hover:text-[#ff1e27] transition-colors shrink-0"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0d]/95 backdrop-blur-lg border-b border-[#202026] px-6 py-6 flex flex-col space-y-4">
          <a
            onClick={() => setMobileMenuOpen(false)}
            className="font-code-md text-sm tracking-[0.18em] uppercase text-[#e9bcb7] hover:text-white py-2 border-b border-[#1c1b20]"
            href="#the-operation"
          >
            THE OPERATION
          </a>
          <a
            onClick={() => setMobileMenuOpen(false)}
            className="font-code-md text-sm tracking-[0.18em] uppercase text-[#e9bcb7] hover:text-white py-2 border-b border-[#1c1b20]"
            href="#missions"
          >
            MISSIONS
          </a>
          <a
            onClick={() => setMobileMenuOpen(false)}
            className="font-code-md text-sm tracking-[0.18em] uppercase text-[#e9bcb7] hover:text-white py-2 border-b border-[#1c1b20]"
            href="#the-plan"
          >
            THE PLAN
          </a>
          <a
            onClick={() => setMobileMenuOpen(false)}
            className="font-code-md text-sm tracking-[0.18em] uppercase text-[#e9bcb7] hover:text-white py-2 border-b border-[#1c1b20]"
            href="#base-location"
          >
            BASE LOCATION
          </a>
          <a
            onClick={() => setMobileMenuOpen(false)}
            className="font-code-md text-sm tracking-[0.18em] uppercase text-[#e9bcb7] hover:text-white py-2"
            href="#command-channel"
          >
            COMMAND CHANNEL
          </a>
        </div>
      )}
    </header>
  );
}
