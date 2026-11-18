import { portfolioData } from '../data/portfolioData';

export function ServicesSection() {
  const { services } = portfolioData;

  return (
    <section
      id="expertise"
      aria-labelledby="expertise-heading"
      className="scroll-mt-16 bg-[#FFFFFF] text-[#0B0B0B] border-t border-[#0B0B0B]/15"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-5">
            <p className="text-xs sm:text-sm font-medium tracking-wide text-[#5B5A56] mb-4">
              {services.sectionLabel}
            </p>
            <h2
              id="expertise-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#0B0B0B]"
            >
              {services.heading}
            </h2>
          </div>

          <div className="lg:col-span-7">
            <p className="text-base sm:text-lg leading-[1.7] text-[#0B0B0B]/90 max-w-2xl">
              {services.collaborationNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
