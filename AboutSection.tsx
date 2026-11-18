import { portfolioData } from '../data/portfolioData';

export function AboutSection() {
  const { about } = portfolioData;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-16 bg-[#F4F3EF] text-[#0B0B0B] border-t border-[#0B0B0B]/15"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-36">
        <p className="text-xs sm:text-sm font-medium tracking-wide text-[#5B5A56] mb-6 sm:mb-8">
          {about.sectionLabel}
        </p>

        <h2
          id="about-heading"
          className="font-display font-medium tracking-tight text-[#0B0B0B] leading-[1.08] text-[clamp(1.75rem,4.2vw,3.75rem)] max-w-5xl [text-wrap:balance]"
        >
          {about.statement}
        </h2>

        <div className="mt-14 sm:mt-20 pt-8 sm:pt-10 border-t border-[#0B0B0B]/15 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          <div className="md:col-span-4">
            <p className="text-xs sm:text-sm font-medium text-[#5B5A56]">
              Practice & Approach
            </p>
          </div>
          <div className="md:col-span-8">
            <p className="text-base sm:text-lg leading-[1.7] text-[#0B0B0B]/90 max-w-2xl">
              {about.approachParagraph}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
