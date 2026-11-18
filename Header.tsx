import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleButtonRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      firstMobileLinkRef.current?.focus();
    }
  }, [menuOpen]);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B0B0B]/95 backdrop-blur-sm text-[#F4F3EF] border-b border-white/12">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Wordmark */}
        <a
          href="#top"
          className="font-display text-sm sm:text-base font-semibold tracking-tight text-[#FFFFFF] whitespace-nowrap shrink-0 hover:opacity-80 transition-opacity duration-150"
        >
          {portfolioData.siteMeta.name}
        </a>

        {/* Zone 2: Desktop Navigation Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-8 text-sm text-[#F4F3EF]"
        >
          {portfolioData.navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap shrink-0 py-2 border-b border-transparent hover:border-[#FFFFFF] text-[#F4F3EF]/85 hover:text-[#FFFFFF] transition-colors duration-150"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action (Desktop) / Menu Toggle (Mobile) */}
        <div className="flex items-center shrink-0">
          <a
            href="#contact"
            className="hidden md:inline-flex items-center justify-center px-4 py-2 text-xs font-medium tracking-wide uppercase border border-white/30 text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#0B0B0B] transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            Inquire
          </a>

          <button
            ref={toggleButtonRef}
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center min-h-[44px] min-w-[44px] -mr-2 px-2 text-[#FFFFFF] hover:opacity-80 transition-opacity duration-150"
          >
            {menuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Navigation Panel */}
      {menuOpen && (
        <nav
          id="mobile-navigation-drawer"
          aria-label="Mobile navigation"
          className="md:hidden bg-[#0B0B0B] border-t border-white/12 px-5 py-6"
        >
          <ul className="flex flex-col divide-y divide-white/10">
            {portfolioData.navigation.map((item, idx) => (
              <li key={item.href}>
                <a
                  ref={idx === 0 ? firstMobileLinkRef : undefined}
                  href={item.href}
                  onClick={handleLinkClick}
                  className="flex items-center justify-between min-h-[48px] py-3 font-display text-lg text-[#F4F3EF] hover:text-[#FFFFFF] transition-colors duration-150"
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-[#8A8985] tabular-nums">
                    0{idx + 1}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
