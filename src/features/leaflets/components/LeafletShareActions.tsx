// src/features/leaflets/components/LeafletShareActions.tsx
import { FC } from "react";

type Props = {
  title: string;
};

const LeafletShareActions: FC<Props> = ({ title }) => {
  const url = typeof window !== "undefined" ? window.location.href : "";

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  return (
    <div className="space-y-2">
      <p className="text-[11px] uppercase tracking-wide text-text-muted">
        Share leaflet
      </p>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => navigator.clipboard.writeText(url)}
          className="rounded-pill border border-border-subtle px-3 py-1 text-xs hover:bg-bg-page"
        >
          Copy link
        </button>

        <a
          href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-pill border border-border-subtle px-3 py-1 text-xs hover:bg-bg-page"
        >
          WhatsApp
        </a>

        <a
          href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
          className="rounded-pill border border-border-subtle px-3 py-1 text-xs hover:bg-bg-page"
        >
          Email
        </a>
      </div>
    </div>
  );
};

export default LeafletShareActions;
