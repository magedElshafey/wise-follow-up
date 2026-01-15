import { FC } from "react";
import AllLeafletsHeader from "../../uk-hierarchy/components/hierarchy-filter/components/AllLeafletsHeader";
import LeafletsFilters from "../../uk-hierarchy/components/hierarchy-filter/components/LeafletsFilters";
import LeafletsList from "../components/LeafletsList";
import LeafletsFiltersProvider from "../../uk-hierarchy/components/hierarchy-filter/providers/LeafletsFiltersProvider";
import HeroLayout from "@/common/layout/hero-layout/HeroLayout";
import SearchBar from "@/features/search-advanced/components/SearchBar";
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSearchController } from "@/features/search-advanced/hooks/useSearchController";
const AllLeaflets: FC = () => {
  const [params] = useSearchParams();
  const { t } = useTranslation();
  const searchController = useSearchController({
    mode: "normal",
    initialPayload: {
      value: params.get("filter-search") || "",
    },
  });
  return (
    <>
      <HeroLayout minHeight="min-h-[30vh] lg:min-h-[50vh]">
        <div>
          <h1 className="text-3xl text-center font-bold text-text-main">
            Browse all leaflets
          </h1>

          <p className="my-2  text-text-muted max-w-xl">
            Explore trusted medical information curated by professionals.
          </p>

          <div>
            <SearchBar variant="hero" controller={searchController} />
            <Link
              to="/search-advanced"
              className="block w-fit mt-2 capitalize duration-300 transition-all hover:underline  text-text-main"
            >
              {t("advanced search")}
            </Link>
          </div>
        </div>
      </HeroLayout>
      <div className="containerr">
        <LeafletsFiltersProvider>
          <AllLeafletsHeader />
          <div className="flex flex-col lg:flex-row gap-4">
            <LeafletsFilters />
            <LeafletsList />
          </div>
        </LeafletsFiltersProvider>
      </div>
    </>
  );
};

export default AllLeaflets;
