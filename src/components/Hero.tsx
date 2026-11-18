import { ArrowDown } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { EditorialImage } from './EditorialImage';

export function Hero() {
  const { siteMeta, hero } = portfolioData;

  const handleScrollToManifesto = () => {
    const target = document.getElementById('about');
    if (target) {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
    }
  };

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative min-h-[calc(100svh-4rem)] bg-[#0B0B0B] text-[#FFFFFF] flex flex-col justify-between overflow-hidden"
    >
      {/* Full-bleed Monochrome Editorial Photograph */}
      <div className="absolute inset-0 z-0">
        <EditorialImage
          src={hero.image}
          alt={hero.alt}
          surface="dark"
          loading="eager"
          fallbackTitle={siteMeta.name}
          containerClassName="w-full h-full"
          className="w-full h-full object-cover object-[center_34%]"
        />
        {/* Flat monochrome contrast scrim (no gradients) */}
        <div
          className="absolute inset-0 bg-[#0B0B0B]/35"
          aria-hidden="true"
        />
      </div>

      {/* Upper Editorial Meta Strip */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12 pt-6 sm:pt-8">
        <div className="flex flex-wrap items-center justify-end gap-4 pb-4 border-b border-white/18 text-xs sm:text-sm tracking-wide text-[#F4F3EF]">
          <span className="text-[#F4F3EF]/90">{siteMeta.location}</span>
        </div>
      </div>

      {/* Bottom Typographic Anchor — positioned cleanly below subject face */}
      <div className="relative z-10 mt-auto bg-[#0B0B0B]/80 border-t border-white/15">
        <div className="max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12 pt-6 pb-8 sm:pt-8 sm:pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
            <div className="lg:col-span-9 min-w-0">
              <div className="flex flex-col gap-2 mb-4">
                <p className="font-display text-lg sm:text-xl lg:text-2xl font-medium tracking-tight text-[#FFFFFF]">
                  {siteMeta.role}
                </p>
                <p className="text-sm sm:text-base text-[#F4F3EF]/85 max-w-2xl">
                  {siteMeta.approachSentence}
                </p>
              </div>

              <h1 className="font-display font-semibold tracking-tight text-[#FFFFFF] leading-[0.94] text-[clamp(2.125rem,7vw,5.75rem)] break-words">
                {siteMeta.name}
              </h1>
            </div>

            <div className="lg:col-span-3 flex lg:justify-end">
              <button
                type="button"
                onClick={handleScrollToManifesto}
                className="inline-flex items-center gap-3 min-h-[44px] px-4 py-2.5 border border-white/30 bg-[#0B0B0B] text-xs sm:text-sm font-medium text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#0B0B0B] transition-colors duration-150 whitespace-nowrap"
              >
                <span>{hero.scrollCueLabel}</span>
                <ArrowDown className="w-4 h-4 shrink-0" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
