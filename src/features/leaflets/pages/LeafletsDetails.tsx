import { FC, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import useGetLeafletsDetails from "../api/useGetLeafletsDetails";
import { formatDate } from "@/utils/formatDate";
import PageSeo from "@/common/components/seo/PageSeo";
import LeafletShareActions from "../components/LeafletShareActions";
import ReadingProgress from "@/common/reading-progress/ReadingProgress";

/* -------------------------------------------------------------------------- */
/*                                   Page                                     */
/* -------------------------------------------------------------------------- */

const LeafletDetailsPage: FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const queryResult = useGetLeafletsDetails({ slug: slug || "" });
  const leaflet = queryResult.data;

  const pdfUrl = useMemo(() => leaflet?.pdf_url, [leaflet]);

  /* ------------------------------- SEO JSON-LD ------------------------------ */

  const structuredData = leaflet
    ? {
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        name: leaflet.title,
        description: leaflet.short_description,
        datePublished: leaflet.publication_date,
        dateModified: leaflet.reviewed_at || leaflet.updated_at,
        publisher: {
          "@type": "Organization",
          name: leaflet.organization?.name,
        },
      }
    : undefined;

  return (
    <>
      {leaflet && (
        <PageSeo
          title={leaflet.title}
          description={leaflet.short_description}
          canonicalPath={`/leaflets/${leaflet.slug}`}
          ogType="article"
          publishedTime={leaflet.publication_date}
          structuredData={structuredData}
        />
      )}

      <FetchHandler queryResult={queryResult} skeletonType="page">
        {leaflet && (
          <>
            <ReadingProgress />
            {/* ================= Medical Header ================= */}
            <header className="bg-bg-page border-b border-border-subtle">
              <div className="containerr py-8 space-y-2">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-text-main">
                  {leaflet.title}
                </h1>

                <p className="text-sm text-text-muted">
                  {leaflet.organization?.name}
                  {leaflet.department?.name && (
                    <>
                      <span aria-hidden> · </span>
                      {leaflet.department.name}
                    </>
                  )}
                </p>

                <p className="text-xs text-text-muted">
                  Clinically reviewed · Written in plain language
                </p>
              </div>
            </header>

            {/* ================= Content ================= */}
            <main className="containerr py-8">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-card-gap">
                {/* ================= Main ================= */}
                <section
                  className="lg:col-span-3 space-y-6"
                  aria-labelledby="leaflet-content-heading"
                >
                  <h2 id="leaflet-content-heading" className="sr-only">
                    Leaflet content
                  </h2>

                  {/* At a glance */}
                  <section
                    className="rounded-card border border-border-subtle bg-bg-surface p-5"
                    aria-label="Leaflet summary"
                  >
                    <h3 className="text-sm font-semibold text-text-main mb-2">
                      At a glance
                    </h3>

                    <p className="text-sm text-text-muted leading-relaxed">
                      {leaflet.short_description ||
                        "This leaflet provides patient information reviewed by healthcare professionals."}
                    </p>
                  </section>

                  {/* PDF */}
                  <section
                    className="rounded-card bg-bg-surface shadow-soft overflow-hidden"
                    aria-label="Patient leaflet document"
                  >
                    {!pdfUrl ? (
                      <EmptyPdfState />
                    ) : (
                      <>
                        {/* Desktop */}
                        <iframe
                          src={pdfUrl}
                          title={leaflet.title}
                          loading="lazy"
                          className="hidden lg:block h-[85vh] w-full"
                        />

                        {/* Mobile */}
                        <div className="block lg:hidden p-6 text-center">
                          <p className="text-sm text-text-muted mb-3">
                            This leaflet is available as a PDF.
                          </p>

                          <a
                            href={pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-pill bg-primary px-5 py-2 text-sm font-medium text-white"
                          >
                            Open PDF
                          </a>
                        </div>
                      </>
                    )}
                  </section>

                  {/* When to seek urgent help */}
                  <section
                    className="rounded-card border border-primary/20 bg-primary/5 p-5"
                    role="note"
                  >
                    <h3 className="text-sm font-semibold text-text-main mb-1">
                      When to seek urgent help
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                      If symptoms worsen suddenly, do not improve, or you are
                      concerned about your health, seek urgent medical advice or
                      emergency care.
                    </p>
                  </section>

                  {/* Related leaflets */}
                  {leaflet?.related_leaflets &&
                    leaflet.related_leaflets.length > 0 && (
                      <section aria-labelledby="related-leaflets-heading">
                        <h3
                          id="related-leaflets-heading"
                          className="text-sm font-semibold text-text-main mb-3"
                        >
                          Related leaflets
                        </h3>

                        <div className="grid gap-3 sm:grid-cols-2">
                          {leaflet.related_leaflets.slice(0, 4).map((item) => (
                            <Link
                              key={item.id}
                              to={`/leaflets/${item.slug}`}
                              className="rounded-card border border-border-subtle bg-bg-surface p-4 hover:shadow-soft transition"
                            >
                              <p className="text-sm font-medium text-text-main">
                                {item.title}
                              </p>
                              <p className="text-xs text-text-muted line-clamp-2">
                                {item.short_description}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </section>
                    )}
                </section>

                {/* ================= Sidebar ================= */}
                <aside
                  className="rounded-card bg-bg-surface p-5 shadow-soft space-y-4"
                  aria-label="Clinical information"
                >
                  <MetaItem
                    label="Last reviewed"
                    value={formatDate(leaflet.reviewed_at)}
                  />

                  <MetaItem
                    label="Next review"
                    value={formatDate(leaflet.next_review_date)}
                  />

                  <MetaItem
                    label="Publication date"
                    value={formatDate(leaflet.publication_date)}
                  />

                  <MetaItem label="Version" value={leaflet.version} />

                  {pdfUrl && (
                    <>
                      <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex w-full items-center justify-center rounded-pill bg-primary px-4 py-2 text-sm font-medium text-white"
                      >
                        Open PDF in new tab
                      </a>
                      <LeafletShareActions title={leaflet.title} />
                      <button
                        onClick={() => window.print()}
                        className="w-full text-xs text-primary underline"
                      >
                        Print leaflet
                      </button>
                    </>
                  )}
                </aside>
              </div>
            </main>
          </>
        )}
      </FetchHandler>
    </>
  );
};

export default LeafletDetailsPage;

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

const EmptyPdfState = () => (
  <div className="flex h-[50vh] items-center justify-center text-center p-6">
    <div>
      <p className="text-sm font-medium text-text-main">PDF not available</p>
      <p className="mt-1 text-xs text-text-muted">
        This leaflet does not currently have a PDF version.
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
