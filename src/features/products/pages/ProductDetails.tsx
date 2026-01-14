import { FC, useMemo } from "react";
import { useParams } from "react-router-dom";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import useGetProductDetails from "../api/useGetProductDetails";
import { formatDate } from "@/utils/formatDate";

const LeafletDetailsPage: FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const queryResult = useGetProductDetails({
    slug: slug || "",
  });

  const { data: leaflet } = queryResult;
  const pdfUrl = useMemo(() => leaflet?.pdf_url, [leaflet]);

  return (
    <div className="bg-bg-page min-h-screen pb-10">
      <div className="containerr pt-10">
        <FetchHandler queryResult={queryResult} skeletonType="hero">
          {/* ===== Header ===== */}
          <header className="mb-6 rounded-card bg-bg-surface p-6 shadow-soft">
            <h1 className="text-xl font-bold text-text-main">
              {leaflet?.title}
            </h1>

            <p className="mt-1 text-sm text-text-muted">
              {leaflet?.organization?.name} · {leaflet?.department?.name}
            </p>
          </header>

          {/* ===== Content ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-card-gap">
            {/* ===== Main (PDF) ===== */}
            <section
              className="lg:col-span-3 rounded-card bg-bg-surface shadow-soft overflow-hidden"
              aria-label="PDF document viewer"
            >
              {!pdfUrl ? (
                <EmptyPdfState />
              ) : (
                <>
                  {/* ===== Desktop only ===== */}
                  <iframe
                    src={pdfUrl}
                    title={leaflet?.title}
                    loading="lazy"
                    className="hidden lg:block h-screen w-full"
                  />

                  {/* ===== Mobile only ===== */}
                  <div className="block lg:hidden p-6 text-center">
                    <p className="text-sm text-text-muted mb-3">
                      PDF viewing is available in full screen
                    </p>

                    <a
                      href={pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        inline-flex items-center justify-center
                        rounded-pill bg-primary px-5 py-2
                        text-sm font-medium text-white
                        transition hover:bg-primary-dark
                        focus-visible:ring-2 focus-visible:ring-primary
                        focus-visible:ring-offset-2
                      "
                    >
                      Open PDF
                    </a>
                  </div>
                </>
              )}
            </section>

            {/* ===== Sidebar ===== */}
            <aside className="rounded-card bg-bg-surface p-5 shadow-soft space-y-4">
              <MetaItem label="Version" value={leaflet?.version} />
              <MetaItem label="Status" value={leaflet?.status} />
              <MetaItem label="Reviewed by" value={leaflet?.reviewed_by} />
              <MetaItem
                label="Publication date"
                value={formatDate(leaflet?.publication_date || "")}
              />

              {pdfUrl && (
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center justify-center w-full
                    rounded-pill bg-primary px-4 py-2
                    text-sm font-medium text-white
                    transition hover:bg-primary-dark
                    focus-visible:ring-2 focus-visible:ring-primary
                    focus-visible:ring-offset-2
                  "
                >
                  Open PDF in new tab
                </a>
              )}
            </aside>
          </div>
        </FetchHandler>
      </div>
    </div>
  );
};

export default LeafletDetailsPage;

/* ===== Helpers ===== */

const EmptyPdfState = () => (
  <div className="flex h-[60vh] items-center justify-center text-center p-6">
    <div>
      <p className="text-sm font-medium text-text-main">PDF not available</p>
      <p className="mt-1 text-xs text-text-muted">
        This document does not have a PDF version yet.
      </p>
    </div>
  </div>
);

type MetaValue = string | number | undefined | null;

const MetaItem: FC<{ label: string; value?: MetaValue }> = ({
  label,
  value,
}) => {
  if (!value) return null;

  return (
    <div>
      <p className="text-[11px] uppercase tracking-wide text-text-muted">
        {label}
      </p>
      <p className="text-sm font-medium text-text-main">{value}</p>
    </div>
  );
};
