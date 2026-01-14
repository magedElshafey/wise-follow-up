import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import useInfiniteProducts from "../../api/useInfiniteProducts";
import MainBtn from "@/common/components/buttons/MainBtn";
import ProductSkelton from "@/common/components/loader/skeltons/ProductSkelton";
import { LeafletType } from "@/features/home/components/featured-leaflets/featuredLeaflet.types";
import FeaturedLeafletCard from "@/features/home/components/featured-leaflets/FeaturedLeafletCard";

const ProductsList: FC = () => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = Number(searchParams.get("page")) || 1;

  const queryResult = useInfiniteProducts();
  const products = (queryResult.data?.pages || []).flatMap((page) => page.data);
  return (
    <div className="w-full flex-1">
      <div className="bg-white rounded-lg">
        <FetchHandler queryResult={queryResult} skeletonType="product">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((product: LeafletType) => (
                <FeaturedLeafletCard key={product?.id} leaflet={product} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center py-12">
              <div className="text-gray-500 text-2xl xl:text-4xl">
                {t("No products found")}
              </div>
            </div>
          )}

          {queryResult.isFetchingNextPage && <ProductSkelton />}

          {queryResult.hasNextPage && !queryResult.isFetchingNextPage && (
            <div className="py-10 flex-center">
              <MainBtn
                onClick={() => {
                  const nextPage = pageFromUrl + 1;

                  // update URL
                  setSearchParams(
                    (prev) => {
                      const params = new URLSearchParams(prev);
                      params.set("page", String(nextPage));
                      return params;
                    },
                    { replace: true }
                  );

                  queryResult.fetchNextPage();
                }}
              >
                {t("load more")}
              </MainBtn>
            </div>
          )}
        </FetchHandler>
      </div>
    </div>
  );
};

export default memo(ProductsList);
