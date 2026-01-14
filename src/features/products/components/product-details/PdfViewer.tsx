import { FC, useState, useCallback } from "react";
import { Document, Page } from "react-pdf";

type PdfViewerProps = {
  url: string;
};

const PdfViewer: FC<PdfViewerProps> = ({ url }) => {
  const [numPages, setNumPages] = useState(0);

  const onLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  }, []);

  const onLoadError = useCallback((error: Error) => {
    console.error("PDF load error:", error);
  }, []);

  return (
    <div
      className="h-[80vh] overflow-y-auto px-2 py-4"
      aria-label="PDF document viewer"
    >
      <Document
        file={{
          url,
        }}
        onLoadSuccess={onLoadSuccess}
        onLoadError={onLoadError}
        loading={<PdfSkeleton />}
        error={<PdfError />}
      >
        {Array.from({ length: numPages }).map((_, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            width={Math.min(window.innerWidth - 32, 900)}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="mx-auto mb-6 shadow-soft"
          />
        ))}
      </Document>
    </div>
  );
};

export default PdfViewer;

/* ===== Helpers ===== */

const PdfSkeleton = () => (
  <div className="space-y-4">
    {Array.from({ length: 3 }).map((_, i) => (
      <div
        key={i}
        className="mx-auto h-[420px] w-full max-w-[900px] animate-pulse rounded-card bg-bg-alt"
      />
    ))}
  </div>
);

const PdfError = () => (
  <div className="flex h-[60vh] items-center justify-center text-center">
    <p className="text-sm text-text-muted">Failed to load PDF document.</p>
  </div>
);
