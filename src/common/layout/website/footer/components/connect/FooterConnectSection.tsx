import React, { useId } from "react";
import useNewsLetterLogic from "../../newsletter/logic/useNewsLetterLogic";
import { useTranslation } from "react-i18next";
import i18n from "@/lib/i18n/i18n";
type SocialLink = { label: string; href: string; icon?: string };

const SOCIAL_LINKS: SocialLink[] = [
  { label: "X (Twitter)", href: "https://x.com/", icon: "𝕏" },
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "in" },
  { label: "YouTube", href: "https://www.youtube.com/", icon: "▶" },
];

type FooterConnectSectionProps = {
  buyMeCoffeeUrl?: string;
};

const FooterConnectSection: React.FC<FooterConnectSectionProps> = ({
  buyMeCoffeeUrl = "https://www.buymeacoffee.com/",
}) => {
  const emailId = useId();
  const {
    states: { isValid, isTouched, email, isPending },
    handlers: { handleBlur, handleInputChange, handleSubmit },
  } = useNewsLetterLogic();
  const { t } = useTranslation();
  const showError = !isValid && isTouched;

  return (
    <section
      aria-label="Stay connected"
      className="mt-6 grid gap-3 md:grid-cols-3"
    >
      {/* Newsletter */}
      <div className="rounded-card border border-border-subtle bg-bg-page p-4 sm:p-5 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
          Newsletter
        </p>
        <h3 className="mt-2 text-sm font-semibold text-text-main">
          Stay in the loop
        </h3>
        <p className="mt-1 text-xs text-text-muted leading-relaxed">
          Occasional updates when we publish new leaflets or tools. No spam.
        </p>

        <form onSubmit={handleSubmit} className="mt-3">
          <label htmlFor={emailId} className="sr-only">
            Email address
          </label>

          <div className="relative">
            <input
              id={emailId}
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`  w-full rounded-pill border border-border-subtle bg-bg-surface
                px-3 py-2 ${
                  i18n.language === "en" ? "pr-24" : "pe-24"
                } text-sm text-text-main
                placeholder:text-text-muted
                focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary
                focus:ring-offset-2 focus:ring-offset-bg-page ${
                  showError ? "border-red-500" : ""
                }`}
            />

            <button
              type="submit"
              aria-busy={isPending}
              disabled={isPending || !email.trim() || !isValid}
              className={`absolute ${
                i18n.language === "en" ? "right-1" : "left-1"
              } top-1/2 -translate-y-1/2
                rounded-pill bg-primary px-3 py-1.5 text-xs font-semibold text-white
                shadow-soft hover:brightness-110 disabled:opacity-60
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page`}
            >
              {isPending ? "…" : "Subscribe"}
            </button>
          </div>
          {showError && (
            <span
              id="email-error"
              role="alert"
              className="text-xs text-red-600 mt-1 block"
            >
              {t("Please enter a valid email")}
            </span>
          )}
        </form>
      </div>

      {/* Social */}
      <div className="rounded-card border border-border-subtle bg-bg-page p-4 sm:p-5 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
          Social
        </p>
        <h3 className="mt-2 text-sm font-semibold text-text-main">
          Follow Wise Follow Up
        </h3>
        <p className="mt-1 text-xs text-text-muted leading-relaxed">
          New leaflets, updates, and improvements.
        </p>

        <ul className="mt-3 grid grid-cols-3 gap-2">
          {SOCIAL_LINKS.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="
                  group inline-flex w-full items-center justify-center gap-2
                  rounded-pill border border-border-subtle bg-bg-surface
                  px-3 py-2 text-xs text-text-muted
                  hover:bg-primary-soft hover:text-primary
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                  focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page
                "
                aria-label={s.label}
              >
                <span aria-hidden="true" className="text-[11px]">
                  {s.icon}
                </span>
                <span className="sr-only">{s.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Buy me a coffee */}
      <div className="rounded-card border border-border-subtle bg-bg-page p-4 sm:p-5 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
          Support
        </p>
        <h3 className="mt-2 text-sm font-semibold text-text-main">
          Help us keep it free
        </h3>
        <p className="mt-1 text-xs text-text-muted leading-relaxed">
          If you find the leaflets helpful, you can support maintenance and
          updates.
        </p>

        <a
          href={buyMeCoffeeUrl}
          target="_blank"
          rel="noreferrer"
          className="
            mt-3 inline-flex w-full items-center justify-center gap-2
            rounded-pill bg-primary px-4 py-2 text-sm font-semibold text-white
            shadow-soft hover:brightness-110
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
            focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page
          "
        >
          <span aria-hidden="true">☕</span>
          Buy me a coffee
        </a>

        <p className="mt-2 text-[11px] text-text-muted">
          Prefer email?{" "}
          <a
            href="/contact"
            className="
              text-primary hover:underline
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
              focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page
              rounded-sm
            "
          >
            Contact us
          </a>
          .
        </p>
      </div>
    </section>
  );
};

export default FooterConnectSection;
