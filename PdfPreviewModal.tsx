import { useEffect, useRef } from 'react';
import { FileText, X } from 'lucide-react';
import { InlinePdfViewer } from './InlinePdfViewer';

interface PdfPreviewModalProps {
  isOpen: boolean;
  title: string;
  pdfUrl: string;
  onClose: () => void;
}

export function PdfPreviewModal({
  isOpen,
  title,
  pdfUrl,
  onClose,
}: PdfPreviewModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])'
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
  }, [isOpen, onClose]);

  if (!isOpen || !pdfUrl) return null;

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
        aria-labelledby="pdf-modal-title"
        className="relative w-full max-w-5xl h-[88vh] flex flex-col bg-[#FFFFFF] text-[#0B0B0B] border border-[#0B0B0B]/20"
      >
        <div className="flex items-center justify-between gap-4 px-5 sm:px-8 py-4 bg-[#FFFFFF] border-b border-[#0B0B0B]/15 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <FileText className="w-4 h-4 shrink-0 text-[#5B5A56]" aria-hidden="true" />
            <h3
              id="pdf-modal-title"
              className="font-display text-sm sm:text-base font-medium tracking-tight text-[#0B0B0B] truncate"
            >
              {title}
            </h3>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close PDF preview"
            className="inline-flex items-center justify-center gap-2 min-h-[44px] min-w-[44px] px-3 border border-[#0B0B0B]/20 text-xs font-medium uppercase tracking-wider text-[#0B0B0B] hover:bg-[#0B0B0B] hover:text-[#FFFFFF] transition-colors duration-150 shrink-0"
          >
            <span className="hidden sm:inline">Close</span>
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 min-h-0">
          <InlinePdfViewer pdfUrl={pdfUrl} title={title} />
        </div>
      </div>
    </div>
  );
}
