// // src/features/leaflets/components/LeafletShareActions.tsx
// import { FC } from "react";

// type Props = {
//   title: string;
// };

// const LeafletShareActions: FC<Props> = ({ title }) => {
//   const url = typeof window !== "undefined" ? window.location.href : "";

//   const encodedTitle = encodeURIComponent(title);
//   const encodedUrl = encodeURIComponent(url);

//   return (
//     <div className="space-y-2">
//       <p className="text-[11px] uppercase tracking-wide text-text-muted">
//         Share leaflet
//       </p>

//       <div className="flex flex-wrap gap-2">
//         <button
//           onClick={() => navigator.clipboard.writeText(url)}
//           className="rounded-pill border border-border-subtle px-3 py-1 text-xs hover:bg-bg-page"
//         >
//           Copy link
//         </button>

//         <a
//           href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="rounded-pill border border-border-subtle px-3 py-1 text-xs hover:bg-bg-page"
//         >
//           WhatsApp
//         </a>

//         <a
//           href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
//           className="rounded-pill border border-border-subtle px-3 py-1 text-xs hover:bg-bg-page"
//         >
//           Email
//         </a>
//       </div>
//     </div>
//   );
// };

// export default LeafletShareActions;
// src/features/leaflets/components/LeafletShareActions.tsx
import { FC, useMemo } from "react";

type Props = {
  title: string;
};

const LeafletShareActions: FC<Props> = ({ title }) => {
  const url = typeof window !== "undefined" ? window.location.href : "";

  const message = useMemo(() => {
    return `
📄 ${title}

Read the leaflet on Wise Follow Up 👇
${url}
    `.trim();
  }, [title, url]);

  const encodedMessage = encodeURIComponent(message);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      // لو عندك toast system سيبه هنا
    } catch {
      // silent fail
    }
  };

  return (
    <div className="space-y-2" aria-label="Share leaflet">
      <p className="text-[11px] uppercase tracking-wide text-text-muted">
        Share leaflet
      </p>

      <div className="flex flex-wrap gap-2">
        {/* Copy link */}
        <button
          type="button"
          onClick={handleCopy}
          className="
            rounded-pill
            border border-border-subtle
            px-3 py-1
            text-xs text-text-main
            hover:bg-bg-page
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-primary
            focus-visible:ring-offset-2
            focus-visible:ring-offset-bg-surface
          "
          aria-label="Copy leaflet link"
        >
          Copy link
        </button>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/?text=${encodedMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="
            rounded-pill
            border border-border-subtle
            px-3 py-1
            text-xs text-text-main
            hover:bg-bg-page
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-primary
            focus-visible:ring-offset-2
            focus-visible:ring-offset-bg-surface
          "
          aria-label="Share leaflet on WhatsApp"
        >
          WhatsApp
        </a>

        {/* Email */}
        <a
          href={`mailto:?subject=${encodedTitle}&body=${encodedMessage}`}
          className="
            rounded-pill
            border border-border-subtle
            px-3 py-1
            text-xs text-text-main
            hover:bg-bg-page
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-primary
            focus-visible:ring-offset-2
            focus-visible:ring-offset-bg-surface
          "
          aria-label="Share leaflet by email"
        >
          Email
        </a>
      </div>
    </div>
  );
};

export default LeafletShareActions;
