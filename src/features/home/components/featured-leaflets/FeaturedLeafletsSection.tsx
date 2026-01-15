// src/features/home/featured-leaflets/FeaturedLeafletsSection.tsx
import React from "react";
import FeaturedLeafletCard from "./FeaturedLeafletCard";
import type { LeafletType } from "../../../leaflets/types/featuredLeaflet.types";
import SectionHeader from "@/common/components/section-header/SectionHeader";

type Props = {
  leaflets: LeafletType[];
  isLoading?: boolean;
};

const FeaturedLeafletsSection: React.FC<Props> = ({
  leaflets,
  isLoading = false,
}) => {
  return (
    <section
      aria-labelledby="featured-leaflets-heading"
      className="section-shell"
    >
      <div className="containerr">
        <SectionHeader
          title="Featured leaflets"
          titleId="featured-leaflets-heading"
          description="Common topics patients often look for"
          hasViewAll={true}
          path="/explore?type=leaflets"
        />
        {/* Grid */}
        <div
          className="
            grid gap-4
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="card-base animate-pulse h-40" />
              ))
            : leaflets.map((leaflet) => (
                <FeaturedLeafletCard key={leaflet.id} leaflet={leaflet} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedLeafletsSection;
