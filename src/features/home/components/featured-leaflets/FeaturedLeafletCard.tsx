import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import type { LeafletType } from "@/features/leaflets/types/leaflets.types";

type Props = {
  leaflet: LeafletType;
};

const LeafletCard: React.FC<Props> = ({ leaflet }) => {
  const isAvailable = Boolean(leaflet.pdf_url);

  const reviewDate =
    leaflet.reviewed_at || leaflet.publication_date || leaflet.updated_at;

  const content = (
    <article className="flex h-full flex-col gap-4">
      {/* ================= Header ================= */}
      <header>
        <h3 className="text-sm font-semibold leading-snug text-text-main line-clamp-2">
          {leaflet.title}
        </h3>
      </header>

      {/* ================= Description ================= */}
      <p className="text-xs leading-relaxed text-text-muted line-clamp-2">
        {leaflet.short_description}
      </p>

      {/* ================= Meta ================= */}
      <footer className="mt-auto pt-3 border-t border-border-subtle flex flex-wrap items-center gap-2 text-[11px]">
        {/* Organization */}
        {leaflet.organization?.name && (
          <span
            className="
              inline-flex items-center rounded-pill
              bg-bg-page px-2.5 py-0.5
              font-medium text-text-main
            "
          >
            {leaflet.organization.name}
          </span>
        )}

        {/* Review date */}
        {reviewDate && (
          <time
            dateTime={reviewDate}
            className="flex items-center gap-1 text-text-muted"
          >
            <span aria-hidden className="text-[10px]">
              🕒
            </span>
            Reviewed{" "}
            {new Date(reviewDate).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "short",
            })}
          </time>
        )}
      </footer>
    </article>
  );

  const baseClasses = clsx(
    "card-base border transition",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
    {
      "hover:-translate-y-0.5 hover:shadow-soft": isAvailable,
      "opacity-60 cursor-not-allowed": !isAvailable,
    }
  );

  if (!isAvailable) {
    return (
      <div className={baseClasses} aria-disabled="true" role="article">
        {content}
      </div>
    );
  }

  return (
    <Link
      to={`/leaflets/${leaflet.slug}`}
      className={baseClasses}
      aria-label={`Open leaflet: ${leaflet.title}`}
    >
      {content}
    </Link>
  );
};

export default React.memo(LeafletCard);
