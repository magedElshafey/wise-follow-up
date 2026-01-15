import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import useInfiniteLeaflets from "../api/useInfiniteLeaflets";
import MainBtn from "@/common/components/buttons/MainBtn";
import ProductSkelton from "@/common/components/loader/skeltons/ProductSkelton";
import FeaturedLeafletCard from "@/features/home/components/featured-leaflets/FeaturedLeafletCard";
import type { LeafletType } from "../types/leaflets.types";
const LeafletsList: FC = () => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = Number(searchParams.get("page")) || 1;

  const queryResult = useInfiniteLeaflets();
  const leaflets = (queryResult.data?.pages || []).flatMap((page) => page.data);
  return (
    <div className="w-full flex-1">
      <div className="bg-white rounded-lg">
        <FetchHandler queryResult={queryResult} skeletonType="product">
          {leaflets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {leaflets.map((leaflet: LeafletType) => (
                <FeaturedLeafletCard key={leaflet?.id} leaflet={leaflet} />
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

export default memo(LeafletsList);
