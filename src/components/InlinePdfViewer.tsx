import { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { Minus, Plus, RotateCcw } from 'lucide-react';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

interface InlinePdfViewerProps {
  pdfUrl: string;
  title: string;
}

const MAX_CANVAS_AREA = 12_000_000;
const MAX_CANVAS_DIMENSION = 14_000;

export function InlinePdfViewer({ pdfUrl, title }: InlinePdfViewerProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const pagesHostRef = useRef<HTMLDivElement>(null);
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [containerWidth, setContainerWidth] = useState(0);
  const [progress, setProgress] = useState<number | null>(0);
  const [isRendering, setIsRendering] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  // Track container width for responsive fit-to-width rendering
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const updateWidth = () => {
      const next = Math.floor(el.clientWidth);
      if (next > 0) {
        setContainerWidth(next);
      }
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Load PDF document via PDF.js
  useEffect(() => {
    let cancelled = false;
    let loadedDoc: pdfjsLib.PDFDocumentProxy | null = null;

    setPdfDoc(null);
    setNumPages(0);
    setErrorMessage(null);
    setProgress(0);
    setZoom(1);

    const loadingTask = pdfjsLib.getDocument({
      url: pdfUrl,
      withCredentials: false,
    });

    loadingTask.onProgress = (data: { loaded: number; total?: number }) => {
      if (cancelled) return;
      if (data.total && data.total > 0) {
        setProgress(Math.min(99, Math.round((data.loaded / data.total) * 100)));
      }
    };

    loadingTask.promise
      .then((doc) => {
        if (cancelled) {
          void doc.cleanup();
          return;
        }
        loadedDoc = doc;
        setPdfDoc(doc);
        setNumPages(doc.numPages);
        setProgress(null);
      })
      .catch(() => {
        if (cancelled) return;
        setProgress(null);
        setErrorMessage('Unable to render this PDF inline. Please try again.');
      });

    return () => {
      cancelled = true;
      void loadingTask.destroy();
      if (loadedDoc) {
        void loadedDoc.cleanup();
      }
    };
  }, [pdfUrl, retryKey]);

  // Render all PDF pages to canvases sized safely within browser GPU limits
  useEffect(() => {
    if (!pdfDoc || containerWidth <= 0 || !pagesHostRef.current) return;

    let cancelled = false;
    const renderTasks: Array<{ cancel: () => void }> = [];
    const host = pagesHostRef.current;
    host.innerHTML = '';
    setIsRendering(true);

    const renderPages = async () => {
      const horizontalPadding = containerWidth < 480 ? 16 : 32;
      const availableWidth = Math.max(240, containerWidth - horizontalPadding);
      const deviceDpr = Math.min(window.devicePixelRatio || 1, 2);

      for (let pageNumber = 1; pageNumber <= pdfDoc.numPages; pageNumber++) {
        if (cancelled) return;

        const page = await pdfDoc.getPage(pageNumber);
        if (cancelled) return;

        const baseViewport = page.getViewport({ scale: 1 });
        const fitScale = (availableWidth / baseViewport.width) * zoom;
        const cssWidth = Math.floor(baseViewport.width * fitScale);
        const cssHeight = Math.floor(baseViewport.height * fitScale);

        // Clamp backing-store pixel dimensions so tall presentation boards never blank out
        let effectiveDpr = deviceDpr;
        const maxDim = Math.max(cssWidth * effectiveDpr, cssHeight * effectiveDpr);
        if (maxDim > MAX_CANVAS_DIMENSION) {
          effectiveDpr *= MAX_CANVAS_DIMENSION / maxDim;
        }
        const area = cssWidth * effectiveDpr * (cssHeight * effectiveDpr);
        if (area > MAX_CANVAS_AREA) {
          effectiveDpr *= Math.sqrt(MAX_CANVAS_AREA / area);
        }

        const renderViewport = page.getViewport({
          scale: fitScale * effectiveDpr,
        });

        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.floor(renderViewport.width));
        canvas.height = Math.max(1, Math.floor(renderViewport.height));
        canvas.style.width = `${cssWidth}px`;
        canvas.style.height = `${cssHeight}px`;
        canvas.className = 'block mx-auto bg-[#FFFFFF] border border-[#0B0B0B]/10';
        canvas.setAttribute('aria-label', `${title} — Page ${pageNumber}`);

        const context = canvas.getContext('2d');
        if (!context) continue;

        host.appendChild(canvas);

        const task = page.render({
          canvas,
          canvasContext: context,
          viewport: renderViewport,
        });
        renderTasks.push(task);

        try {
          await task.promise;
        } catch (err) {
          if (cancelled) return;
          const name = err instanceof Error ? err.name : '';
          if (name !== 'RenderingCancelledException') {
            setErrorMessage('Unable to render one or more pages of this PDF.');
            break;
          }
        }
      }

      if (!cancelled) {
        setIsRendering(false);
      }
    };

    renderPages();

    return () => {
      cancelled = true;
      renderTasks.forEach((task) => {
        try {
          task.cancel();
        } catch {
          // Ignore already-finished tasks
        }
      });
    };
  }, [pdfDoc, containerWidth, zoom, title]);

  const handleZoomOut = () =>
    setZoom((z) => Math.max(0.75, Math.round((z - 0.25) * 100) / 100));
  const handleZoomIn = () =>
    setZoom((z) => Math.min(2, Math.round((z + 0.25) * 100) / 100));
  const handleZoomReset = () => setZoom(1);

  return (
    <div className="flex flex-col w-full h-full bg-[#F4F3EF]">
      {/* Minimal Inline Viewer Toolbar */}
      <div className="flex items-center justify-between gap-3 px-4 py-2 bg-[#FFFFFF] border-b border-[#0B0B0B]/15 text-xs text-[#5B5A56] shrink-0">
        <span className="tabular-nums">
          {numPages > 0
            ? `${numPages} ${numPages === 1 ? 'page' : 'pages'}`
            : progress !== null
              ? `Loading PDF… ${progress}%`
              : 'Preparing PDF…'}
        </span>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleZoomOut}
            disabled={zoom <= 0.75 || !pdfDoc}
            aria-label="Zoom out"
            className="inline-flex items-center justify-center min-h-[32px] min-w-[32px] border border-[#0B0B0B]/15 text-[#0B0B0B] hover:bg-[#F4F3EF] disabled:opacity-40 transition-colors duration-150"
          >
            <Minus className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={handleZoomReset}
            disabled={!pdfDoc}
            aria-label="Reset zoom to 100 percent"
            className="min-h-[32px] px-2.5 border border-[#0B0B0B]/15 text-[#0B0B0B] hover:bg-[#F4F3EF] disabled:opacity-40 tabular-nums transition-colors duration-150"
          >
            {Math.round(zoom * 100)}%
          </button>
          <button
            type="button"
            onClick={handleZoomIn}
            disabled={zoom >= 2 || !pdfDoc}
            aria-label="Zoom in"
            className="inline-flex items-center justify-center min-h-[32px] min-w-[32px] border border-[#0B0B0B]/15 text-[#0B0B0B] hover:bg-[#F4F3EF] disabled:opacity-40 transition-colors duration-150"
          >
            <Plus className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Scrollable Canvas Viewport */}
      <div
        ref={scrollContainerRef}
        className="relative flex-1 min-h-0 overflow-auto p-2 sm:p-4"
      >
        {errorMessage ? (
          <div className="h-full min-h-[280px] flex flex-col items-center justify-center text-center p-6 gap-4">
            <p className="text-sm text-[#5B5A56] max-w-sm">{errorMessage}</p>
            <button
              type="button"
              onClick={() => setRetryKey((k) => k + 1)}
              className="inline-flex items-center gap-2 min-h-[40px] px-4 py-2 border border-[#0B0B0B] text-xs font-medium uppercase tracking-wider text-[#0B0B0B] hover:bg-[#0B0B0B] hover:text-[#FFFFFF] transition-colors duration-150"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Retry</span>
            </button>
          </div>
        ) : (
          <>
            {(progress !== null || (isRendering && numPages === 0)) && (
              <div className="h-full min-h-[280px] flex flex-col items-center justify-center gap-3 text-center p-6">
                <p className="font-display text-sm font-medium text-[#0B0B0B]">
                  Loading presentation board
                </p>
                <div className="w-48 h-1 bg-[#0B0B0B]/15 overflow-hidden">
                  <div
                    className="h-full bg-[#0B0B0B] transition-all duration-150"
                    style={{ width: `${Math.max(8, progress ?? 20)}%` }}
                  />
                </div>
                <p className="text-xs text-[#5B5A56] tabular-nums">
                  {progress !== null ? `${progress}%` : 'Rendering…'}
                </p>
              </div>
            )}
            <div ref={pagesHostRef} className="space-y-4" />
          </>
        )}
      </div>
    </div>
  );
}
