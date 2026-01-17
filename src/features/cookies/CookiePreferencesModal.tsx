import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { useCookieConsent } from "./CookieConsentProvider";
import type { CookiePreferences } from "./cookie-consent";

type Props = { open: boolean; onClose: () => void };

const CookiePreferencesModal: React.FC<Props> = ({ open, onClose }) => {
  const { prefs, savePrefs, acceptAll } = useCookieConsent();
  const titleId = useId();
  const descId = useId();
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const [draft, setDraft] = useState<Omit<CookiePreferences, "essential">>({
    analytics: prefs.analytics,
    functional: prefs.functional,
    marketing: prefs.marketing,
  });

  useEffect(() => {
    setDraft({
      analytics: prefs.analytics,
      functional: prefs.functional,
      marketing: prefs.marketing,
    });
  }, [prefs.analytics, prefs.functional, prefs.marketing]);

  // focus management
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const el = dialogRef.current;
    el?.querySelector<HTMLElement>("button, input")?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !el) return;

      // simple focus trap
      const focusables = Array.from(
        el.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      prev?.focus();
    };
  }, [open, onClose]);

  const canSave = useMemo(() => {
    return (
      draft.analytics !== prefs.analytics ||
      draft.functional !== prefs.functional ||
      draft.marketing !== prefs.marketing
    );
  }, [draft, prefs]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto">
      <button
        aria-label="Close cookie settings"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      <div className="absolute inset-x-0 top-12 sm:top-16 mx-auto w-[min(92vw,42rem)]">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descId}
          className="rounded-card border border-border-subtle bg-bg-surface shadow-soft p-5 sm:p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id={titleId} className="text-lg font-semibold text-text-main">
                Cookie settings
              </h2>
              <p
                id={descId}
                className="mt-1 text-sm text-text-muted leading-relaxed"
              >
                Choose which optional cookies you allow. Essential cookies are
                always on to keep the site working.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="
                rounded-pill border border-border-subtle bg-bg-page
                px-3 py-1.5 text-xs font-semibold text-text-main
                hover:bg-primary-soft hover:text-primary
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                focus-visible:ring-offset-2 focus-visible:ring-offset-bg-surface
              "
            >
              Close
            </button>
          </div>

          <div className="mt-5 space-y-3">
            <PrefRow
              title="Essential"
              description="Required for basic functionality and security."
              checked
              disabled
              onChange={() => {}}
            />

            <PrefRow
              title="Analytics"
              description="Helps us understand usage and improve search and navigation."
              checked={draft.analytics}
              onChange={(v) => setDraft((d) => ({ ...d, analytics: v }))}
            />

            <PrefRow
              title="Functional"
              description="Remembers preferences like language and UI settings."
              checked={draft.functional}
              onChange={(v) => setDraft((d) => ({ ...d, functional: v }))}
            />

            <PrefRow
              title="Marketing"
              description="Used for marketing or third-party tracking (optional)."
              checked={draft.marketing}
              onChange={(v) => setDraft((d) => ({ ...d, marketing: v }))}
            />
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-2 sm:justify-end">
            {/* <button
              type="button"
              onClick={rejectNonEssential}
              className="
                rounded-pill border border-border-subtle bg-bg-page
                px-4 py-2 text-sm font-semibold text-text-main
                hover:bg-primary-soft hover:text-primary
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                focus-visible:ring-offset-2 focus-visible:ring-offset-bg-surface
              "
            >
              Reject non-essential
            </button> */}

            <button
              type="button"
              onClick={acceptAll}
              className="
                rounded-pill border border-border-subtle bg-bg-surface
                px-4 py-2 text-sm font-semibold text-text-main
                hover:bg-bg-page
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                focus-visible:ring-offset-2 focus-visible:ring-offset-bg-surface
              "
            >
              Accept all
            </button>

            <button
              type="button"
              disabled={!canSave}
              onClick={() => {
                savePrefs(draft);
                onClose();
              }}
              className="
                rounded-pill bg-primary px-4 py-2 text-sm font-semibold text-white
                shadow-soft hover:brightness-110 disabled:opacity-60
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                focus-visible:ring-offset-2 focus-visible:ring-offset-bg-surface
              "
            >
              Save settings
            </button>
          </div>

          <p className="mt-3 text-[11px] text-text-muted leading-relaxed">
            Learn more in our{" "}
            <a className="text-primary hover:underline" href="/cookies">
              Cookies Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default CookiePreferencesModal;

function PrefRow(props: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}) {
  const id = useId();
  return (
    <div className="rounded-card border border-border-subtle bg-bg-page p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <label htmlFor={id} className="text-sm font-semibold text-text-main">
            {props.title}
          </label>
          <p className="mt-1 text-xs text-text-muted leading-relaxed">
            {props.description}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            id={id}
            type="checkbox"
            checked={props.checked}
            disabled={props.disabled}
            onChange={(e) => props.onChange(e.target.checked)}
            className="
              h-5 w-5 accent-[color:var(--primary)]
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
              focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page
            "
          />
        </div>
      </div>
    </div>
  );
}
