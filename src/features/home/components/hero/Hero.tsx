import React from "react";
import HeroTextBlock from "./text-block/HeroTextBlock";
import SearchBar from "@/features/search-advanced/components/SearchBar";
import HeroLayout from "@/common/layout/hero-layout/HeroLayout";
import { useSearchController } from "@/features/search-advanced/hooks/useSearchController";
const HomeHero: React.FC = () => {
  const searchController = useSearchController({
    mode: "normal",
  });
  return (
    <HeroLayout aria-labelledby="home-hero-heading">
      <HeroTextBlock />

      <div className="mt-8 md:mt-10 space-y-6">
        <SearchBar variant="hero" controller={searchController} />
      </div>
    </HeroLayout>
  );
};

export default HomeHero;
