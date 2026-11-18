import { ArrowUp } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export function Footer() {
  const { siteMeta, navigation, footer } = portfolioData;
  const currentYear = new Date().getFullYear();

  const handleBackToTop = () => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReduced ? 'auto' : 'smooth',
    });
  };

  return (
    <footer className="bg-[#0B0B0B] text-[#F4F3EF] border-t border-white/15">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-14 sm:pt-20 pb-8 sm:pb-12">
        {/* Compact Footer Controls & Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 pb-12 sm:pb-16 border-b border-white/15">
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex items-center min-h-[40px] text-[#F4F3EF]/85 hover:text-[#FFFFFF] hover:underline underline-offset-4 transition-colors duration-150"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-between sm:justify-end gap-6">
            <p className="text-xs sm:text-sm text-[#8A8985] tabular-nums">
              © {currentYear} {siteMeta.name}
            </p>

            <button
              type="button"
              onClick={handleBackToTop}
              className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 border border-white/25 text-xs font-medium uppercase tracking-wider text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#0B0B0B] transition-colors duration-150 whitespace-nowrap shrink-0"
            >
              <span>{footer.backToTopLabel}</span>
              <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Oversized Typographic Footer Wordmark */}
        <div className="pt-10 sm:pt-14">
          <p className="font-display font-semibold tracking-tight text-[#FFFFFF] leading-[0.92] text-[clamp(2.125rem,8vw,7.25rem)] break-words">
            {siteMeta.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
