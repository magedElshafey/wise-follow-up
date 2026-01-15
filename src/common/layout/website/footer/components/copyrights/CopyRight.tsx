import { Link } from "react-router-dom";
import { FooterLink } from "../../types/footer.types";
import { openCookieSettings } from "@/features/cookies/CookieConsentProvider";
import useGetAllPolicies from "@/features/policies/api/useGetAllPolicies";
import { useMemo } from "react";

const CopyRight = () => {
  const year = new Date().getFullYear();
  const { data } = useGetAllPolicies();
  console.log("policy data", data);
  const policyLinks = useMemo<FooterLink[]>(() => {
    if (!data?.length) return [];

    return data.map((policy) => ({
      label: policy.title,
      href: `/policies/${policy.slug}`,
    }));
  }, [data]);
  const linksToRender = policyLinks.length ? policyLinks : [];

  return (
    <div
      className="
            mt-6 pt-4 border-t border-border-subtle
            flex flex-col gap-3 md:flex-row md:items-center md:justify-between
          "
    >
      <div className="text-xs text-text-muted">
        <p className="mb-1">
          &copy; {year} Wise Follow Up. All rights reserved.
        </p>
        <p className="text-[11px] leading-relaxed">
          Information on this website is for general education only and does not
          replace advice from your own doctor or healthcare team.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 md:justify-end">
        {/* Small pills for policies */}
        {linksToRender?.length > 0 && (
          <ul className="flex flex-wrap items-center gap-2 text-xs">
            {linksToRender.map((item, index) => (
              <li key={item.href + index}>
                <Link
                  to={item.href}
                  aria-label={item.label}
                  className="
                      inline-flex items-center rounded-pill
                      border border-border-subtle
                      px-3 py-1
                      text-[11px] text-text-muted
                      hover:text-text-main hover:bg-bg-page
                      focus-visible:outline-none focus-visible:ring-2
                      focus-visible:ring-primary focus-visible:ring-offset-2
                      focus-visible:ring-offset-bg-surface
                    "
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        )}

        <button
          type="button"
          onClick={openCookieSettings}
          className="
    inline-flex items-center rounded-pill border border-border-subtle
    px-3 py-1 text-[11px] text-text-muted
    hover:bg-bg-page hover:text-text-main
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
    focus-visible:ring-offset-2 focus-visible:ring-offset-bg-surface
  "
        >
          Cookie settings
        </button>
        {/* Back to top */}
        <a
          href="#top"
          className="
                inline-flex items-center gap-1 rounded-pill
                bg-bg-page px-3 py-1.5 text-[11px] text-text-muted
                hover:bg-primary-soft hover:text-primary
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-primary focus-visible:ring-offset-2
                focus-visible:ring-offset-bg-surface
              "
        >
          <span aria-hidden="true">↑</span>
          <span>Back to top</span>
        </a>
      </div>
    </div>
  );
};

export default CopyRight;
