import { useEffect, useRef, useState } from 'react';
import { Eye, Image as ImageIcon, X } from 'lucide-react';
import type { ProjectItem } from '../data/portfolioData';
import { EditorialImage } from './EditorialImage';
import { InlinePdfViewer } from './InlinePdfViewer';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const pdfUrl = project?.pdfUrl?.trim() ?? '';
  const hasPdf = pdfUrl.length > 0;
  const [viewMode, setViewMode] = useState<'image' | 'pdf'>(
    hasPdf ? 'pdf' : 'image'
  );

  useEffect(() => {
    setViewMode(project?.pdfUrl?.trim() ? 'pdf' : 'image');
  }, [project?.id, project?.pdfUrl]);

  useEffect(() => {
    if (!project) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus the close button when dialog opens
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, iframe, object, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-[#0B0B0B]/85"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        aria-describedby="project-modal-description"
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-[#FFFFFF] text-[#0B0B0B] border border-[#0B0B0B]/20"
      >
        {/* Modal Header Bar */}
        <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-4 px-5 sm:px-8 py-4 bg-[#FFFFFF] border-b border-[#0B0B0B]/15">
          <div className="flex items-center gap-3 text-xs sm:text-sm text-[#5B5A56] tabular-nums">
            <span className="font-medium text-[#0B0B0B]">{project.category}</span>
            {project.year?.trim() && (
              <>
                <span aria-hidden="true">·</span>
                <span>{project.year}</span>
              </>
            )}
            {hasPdf && (
              <>
                <span aria-hidden="true">·</span>
                <span>Lookbook PDF</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            {hasPdf && (
              <div
                role="group"
                aria-label="Project media view"
                className="flex items-center border border-[#0B0B0B]/20"
              >
                <button
                  type="button"
                  aria-pressed={viewMode === 'image'}
                  onClick={() => setViewMode('image')}
                  className={`inline-flex items-center gap-1.5 min-h-[40px] px-3 text-xs font-medium transition-colors duration-150 whitespace-nowrap ${
                    viewMode === 'image'
                      ? 'bg-[#0B0B0B] text-[#FFFFFF]'
                      : 'bg-[#FFFFFF] text-[#0B0B0B] hover:bg-[#F4F3EF]'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Frame</span>
                </button>
                <button
                  type="button"
                  aria-pressed={viewMode === 'pdf'}
                  onClick={() => setViewMode('pdf')}
                  className={`inline-flex items-center gap-1.5 min-h-[40px] px-3 text-xs font-medium border-l border-[#0B0B0B]/20 transition-colors duration-150 whitespace-nowrap ${
                    viewMode === 'pdf'
                      ? 'bg-[#0B0B0B] text-[#FFFFFF]'
                      : 'bg-[#FFFFFF] text-[#0B0B0B] hover:bg-[#F4F3EF]'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>PDF Preview</span>
                </button>
              </div>
            )}

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] min-w-[44px] px-3 border border-[#0B0B0B]/20 text-xs font-medium uppercase tracking-wider text-[#0B0B0B] hover:bg-[#0B0B0B] hover:text-[#FFFFFF] transition-colors duration-150"
            >
              <span className="hidden sm:inline">Close</span>
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-7 bg-[#F4F3EF] border-b lg:border-b-0 lg:border-r border-[#0B0B0B]/15">
            {hasPdf && viewMode === 'pdf' ? (
              <div className="h-[68vh] min-h-[420px] w-full">
                <InlinePdfViewer pdfUrl={pdfUrl} title={project.title} />
              </div>
            ) : (
              <div className="aspect-[4/3] lg:aspect-auto lg:h-[62vh] w-full">
                <EditorialImage
                  src={project.image}
                  alt={project.alt}
                  surface="light"
                  loading="eager"
                  fallbackTitle={project.title}
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-8">
            <div>
              <h3
                id="project-modal-title"
                className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#0B0B0B]"
              >
                {project.title}
              </h3>

              <p className="mt-4 text-base font-medium leading-relaxed text-[#0B0B0B]">
                {project.summary}
              </p>

              <p
                id="project-modal-description"
                className="mt-4 text-sm sm:text-base leading-relaxed text-[#5B5A56]"
              >
                {project.detailDescription}
              </p>

              {hasPdf && (
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() =>
                      setViewMode((prev) => (prev === 'pdf' ? 'image' : 'pdf'))
                    }
                    className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 border border-[#0B0B0B] text-xs font-medium uppercase tracking-wider text-[#0B0B0B] hover:bg-[#0B0B0B] hover:text-[#FFFFFF] transition-colors duration-150"
                  >
                    <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>
                      {viewMode === 'pdf' ? 'View Editorial Frame' : 'Preview PDF'}
                    </span>
                  </button>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-[#0B0B0B]/15 text-xs text-[#5B5A56] space-y-2">
              <div className="flex items-center justify-between gap-4">
                <span>Category</span>
                <span className="text-[#0B0B0B] font-medium">{project.category}</span>
              </div>
              {project.year?.trim() && (
                <div className="flex items-center justify-between gap-4">
                  <span>Year</span>
                  <span className="text-[#0B0B0B] font-medium tabular-nums">
                    {project.year}
                  </span>
                </div>
              )}
              <p className="pt-3 text-[11px] text-[#5B5A56]">
                {project.placeholderNotice}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
