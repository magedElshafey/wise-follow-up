import React from "react";
import type { TrustPillar } from "./trust.types";
import SectionHeader from "@/common/components/section-header/SectionHeader";

type Props = {
  pillars: TrustPillar[];
};

const TrustSection: React.FC<Props> = ({ pillars }) => {
  return (
    <section
      aria-labelledby="trust-heading"
      className="
        section-shell
        bg-bg-alt
      "
    >
      <div className="containerr">
        <div
          className="
            rounded-card border border-border-subtle
            bg-bg-surface shadow-soft
            p-5 md:p-6
          "
        >
          <SectionHeader
            title="Trusted patient information"
            titleId="trust-heading"
            description="Clear leaflets and tools to support safer follow-up decisions."
            hasViewAll={false}
          />

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {pillars.map((p) => (
              <div
                key={p.id}
                className="
                  rounded-card
                  bg-bg-alt
                  border border-border-subtle
                  p-4
                  hover:bg-bg-page
                  transition-colors
                "
              >
                <div className="flex items-start gap-3">
                  <div
                    className="
                      flex h-10 w-10 items-center justify-center
                      rounded-xl
                      bg-primary/10 text-primary
                      ring-1 ring-primary/10
                      text-lg
                    "
                    aria-hidden="true"
                  >
                    {p.icon}
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-text-main">
                      {p.title}
                    </h3>
                    <p className="text-xs text-text-muted leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* NHS-style reassurance note */}
          <div
            role="note"
            className="
              mt-5 rounded-card
              border border-primary/20
              bg-primary/10
              p-4
            "
          >
            <p className="text-xs text-text-muted leading-relaxed">
              <span className="font-semibold text-text-main">Important:</span>{" "}
              Information on this website is for guidance only and does not
              replace medical advice. If you are worried about sudden symptoms,
              seek urgent care.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
