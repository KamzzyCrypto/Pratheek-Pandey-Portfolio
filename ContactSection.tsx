import { useRef, useState } from 'react';
import { ArrowUpRight, Eye, Phone } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { PdfPreviewModal } from './PdfPreviewModal';

export function ContactSection() {
  const { contact, siteMeta } = portfolioData;
  const [pdfOpen, setPdfOpen] = useState(false);
  const previewTriggerRef = useRef<HTMLButtonElement>(null);

  const portfolioPdfUrl = contact.portfolioPdf.url.trim();
  const hasPortfolioPdf = portfolioPdfUrl.length > 0;
  const phoneText = contact.phone.trim();
  const phoneHref = phoneText.replace(/[^\d+]/g, '');
  const visibleLinks = contact.optionalLinks.filter(
    (link) => link.url.trim().length > 0
  );

  const handleClosePdf = () => {
    setPdfOpen(false);
    requestAnimationFrame(() => {
      previewTriggerRef.current?.focus();
    });
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-16 bg-[#F4F3EF] text-[#0B0B0B] border-t border-[#0B0B0B]/15"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-5">
            <p className="text-xs sm:text-sm font-medium tracking-wide text-[#5B5A56] mb-4">
              {contact.sectionLabel}
            </p>
            <h2
              id="contact-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#0B0B0B]"
            >
              {contact.heading}
            </h2>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-8">
            <p className="text-base sm:text-lg leading-relaxed text-[#0B0B0B]/90 max-w-xl">
              {contact.invitation}
            </p>

            <div className="pt-2 flex flex-col items-start gap-3">
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-3 min-h-[48px] py-2 font-display text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#0B0B0B] border-b border-[#0B0B0B] hover:opacity-70 transition-opacity duration-150 break-all"
              >
                <span>{contact.email}</span>
                <ArrowUpRight className="w-6 h-6 shrink-0" aria-hidden="true" />
              </a>

              {phoneText.length > 0 && (
                <a
                  href={phoneHref ? `tel:${phoneHref}` : '#contact'}
                  className="inline-flex items-center gap-3 min-h-[44px] py-1.5 font-display text-lg sm:text-xl font-medium tracking-tight text-[#0B0B0B] hover:opacity-70 transition-opacity duration-150 tabular-nums"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" aria-hidden="true" />
                  <span>{phoneText}</span>
                </a>
              )}

              <p className="mt-1 text-xs sm:text-sm text-[#5B5A56]">
                {siteMeta.location}
              </p>
            </div>

            {(hasPortfolioPdf || visibleLinks.length > 0) && (
              <div className="pt-6 border-t border-[#0B0B0B]/15 flex flex-col gap-6">
                {hasPortfolioPdf && (
                  <div>
                    <button
                      ref={previewTriggerRef}
                      type="button"
                      onClick={() => setPdfOpen(true)}
                      className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 border border-[#0B0B0B] text-xs font-medium uppercase tracking-wider text-[#0B0B0B] hover:bg-[#0B0B0B] hover:text-[#FFFFFF] transition-colors duration-150 whitespace-nowrap"
                    >
                      <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Preview {contact.portfolioPdf.label}</span>
                    </button>
                  </div>
                )}

                {visibleLinks.length > 0 && (
                  <ul className="flex flex-wrap items-center gap-6">
                    {visibleLinks.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.url}
                          target={link.isExternal ? '_blank' : undefined}
                          rel={link.isExternal ? 'noopener noreferrer' : undefined}
                          className="inline-flex items-center gap-1.5 min-h-[44px] text-sm font-medium text-[#0B0B0B] hover:underline underline-offset-4"
                        >
                          <span>{link.label}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <PdfPreviewModal
        isOpen={pdfOpen}
        title={`${siteMeta.name} — ${contact.portfolioPdf.label}`}
        pdfUrl={portfolioPdfUrl}
        onClose={handleClosePdf}
      />
    </section>
  );
}
