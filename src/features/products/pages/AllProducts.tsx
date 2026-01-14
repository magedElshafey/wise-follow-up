import { FC } from "react";
import AllProductsHeader from "../components/all-products/AllProductsHeader";
import ProductsFilters from "../components/all-products/ProductsFilters";
import ProductsList from "../components/all-products/ProductsList";
import ProductsFiltersProvider from "../providers/ProductsFiltersProvider";
import HeroLayout from "@/common/layout/hero-layout/HeroLayout";
import SearchBar from "@/features/search/components/SearchBar";
import { useSearchParams } from "react-router-dom";
const AllProducts: FC = () => {
  const [params] = useSearchParams();
  console.log(params.get("filter-search"));
  return (
    <>
      <HeroLayout>
        <div>
          <h1 className="text-3xl text-center font-bold text-text-main">
            Browse all leaflets
          </h1>

          <p className="my-2  text-text-muted max-w-xl">
            Explore trusted medical information curated by professionals.
          </p>

          <div>
            <SearchBar
              variant="hero"
              initialQuery={params.get("filter-search") || ""}
            />
          </div>
        </div>
      </HeroLayout>
      <div className="containerr">
        <ProductsFiltersProvider>
          <AllProductsHeader />
          <div className="flex flex-col lg:flex-row gap-4">
            <ProductsFilters />
            <ProductsList />
          </div>
        </ProductsFiltersProvider>
      </div>
    </>
  );
};

export default AllProducts;
