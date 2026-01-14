import React from "react";
import { Link } from "react-router-dom";
import type { LeafletType } from "./featuredLeaflet.types";
import clsx from "clsx";

type Props = {
  leaflet: LeafletType;
};

const FeaturedLeafletCard: React.FC<Props> = ({ leaflet }) => {
  const isAvailable = Boolean(leaflet.pdf_url);

  const CardContent = (
    <>
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-text-main leading-snug">
          {leaflet.title}
        </h3>

        {!isAvailable && (
          <span
            className="shrink-0 rounded-full bg-gray-200 px-2 py-0.5 text-[10px] font-medium text-gray-600"
            aria-label="PDF not available"
          >
            Not available
          </span>
        )}
      </div>

      {/* Description */}
      <p className="mt-1 text-xs text-text-muted line-clamp-2">
        {leaflet.short_description}
      </p>

      {/* Meta */}
      <p className="mt-auto text-[11px] text-text-muted">
        Updated{" "}
        <time dateTime={leaflet.created_at}>
          {new Date(leaflet.created_at).toLocaleDateString()}
        </time>
      </p>
    </>
  );

  const baseClasses = clsx(
    "card-base border flex flex-col gap-2",
    "transition-transform transition-shadow",
    {
      "hover:-translate-y-0.5 hover:shadow-soft focus-visible:ring-2 focus-visible:ring-primary":
        isAvailable,
      "opacity-60 cursor-not-allowed": !isAvailable,
    }
  );

  if (!isAvailable) {
    return (
      <div className={baseClasses} aria-disabled="true" role="article">
        {CardContent}
      </div>
    );
  }

  return (
    <Link
      to={`/products/${leaflet.slug}`}
      className={baseClasses}
      aria-label={`Open leaflet ${leaflet.title}`}
    >
      {CardContent}
    </Link>
  );
};

export default React.memo(FeaturedLeafletCard);
