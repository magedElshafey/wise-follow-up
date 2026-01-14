import React from "react";
import HeroTextBlock from "./text-block/HeroTextBlock";
import SearchBar from "@/features/search/components/SearchBar";
import HeroLayout from "@/common/layout/hero-layout/HeroLayout";

const HomeHero: React.FC = () => {
  return (
    <HeroLayout aria-labelledby="home-hero-heading">
      <HeroTextBlock />

      <div className="mt-8 md:mt-10 space-y-6">
        <SearchBar variant="hero" />
      </div>
    </HeroLayout>
  );
};

export default HomeHero;
