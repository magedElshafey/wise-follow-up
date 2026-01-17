// import { FC, memo } from "react";
// import { useTranslation } from "react-i18next";
// import { useSearchParams } from "react-router-dom";

// import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
// import useInfiniteLeaflets from "../api/useInfiniteLeaflets";
// import MainBtn from "@/common/components/buttons/MainBtn";
// import ProductSkelton from "@/common/components/loader/skeltons/ProductSkelton";
// import FeaturedLeafletCard from "@/features/home/components/featured-leaflets/FeaturedLeafletCard";
// import type { LeafletType } from "../types/leaflets.types";
// const LeafletsList: FC = () => {
//   const { t } = useTranslation();

//   const [searchParams, setSearchParams] = useSearchParams();
//   const pageFromUrl = Number(searchParams.get("page")) || 1;

//   const queryResult = useInfiniteLeaflets();
//   const leaflets = (queryResult.data?.pages || []).flatMap((page) => page.data);
//   return (
//     <div className="w-full flex-1">
//       <div className="bg-white rounded-lg">
//         <FetchHandler queryResult={queryResult} skeletonType="leaflet">
//           {leaflets.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//               {leaflets.map((leaflet: LeafletType) => (
//                 <FeaturedLeafletCard key={leaflet?.id} leaflet={leaflet} />
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-12 space-y-2">
//               <p className="text-lg font-medium text-text-main">
//                 No leaflets match your filters
//               </p>
//               <p className="text-sm text-text-muted">
//                 Try adjusting or clearing some filters to see more results.
//               </p>
//             </div>
//           )}

//           {queryResult.isFetchingNextPage && <ProductSkelton />}

//           {queryResult.hasNextPage && !queryResult.isFetchingNextPage && (
//             <div className="py-10 flex-center">
//               <MainBtn
//                 onClick={() => {
//                   const nextPage = pageFromUrl + 1;

//                   // update URL
//                   setSearchParams(
//                     (prev) => {
//                       const params = new URLSearchParams(prev);
//                       params.set("page", String(nextPage));
//                       return params;
//                     },
//                     { replace: true }
//                   );

//                   queryResult.fetchNextPage();
//                 }}
//               >
//                 {t("load more")}
//               </MainBtn>
//             </div>
//           )}
//         </FetchHandler>
//       </div>
//     </div>
//   );
// };

// export default memo(LeafletsList);
// import { FC, memo } from "react";
// import { useTranslation } from "react-i18next";
// import { useSearchParams } from "react-router-dom";
// import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
// import useInfiniteLeaflets from "../api/useInfiniteLeaflets";
// import MainBtn from "@/common/components/buttons/MainBtn";
// import FeaturedLeafletCard from "@/features/home/components/featured-leaflets/FeaturedLeafletCard";
// import type { LeafletType } from "../types/leaflets.types";

// const LeafletsList: FC = () => {
//   const { t } = useTranslation();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const pageFromUrl = Number(searchParams.get("page")) || 1;

//   const queryResult = useInfiniteLeaflets();
//   const leaflets = (queryResult.data?.pages || []).flatMap((page) => page.data);

//   return (
//     <div className="w-full flex-1">
//       <FetchHandler queryResult={queryResult} skeletonType="leaflet">
//         {queryResult.isFetching && !queryResult.isFetchingNextPage && (
//           <p className="text-xs text-text-muted mb-3">Updating results…</p>
//         )}

//         {leaflets.length > 0 ? (
//           <>
//             <div className="flex items-center justify-between mb-4">
//               <p className="text-sm text-text-muted">
//                 Showing {leaflets.length} leaflets
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//               {leaflets.map((leaflet: LeafletType) => (
//                 <FeaturedLeafletCard key={leaflet.id} leaflet={leaflet} />
//               ))}
//             </div>
//           </>
//         ) : (
//           <div className="text-center py-12 space-y-2">
//             <p className="text-lg font-medium text-text-main">
//               No leaflets match your filters
//             </p>
//             <p className="text-sm text-text-muted">
//               Try adjusting or clearing some filters to see more results.
//             </p>
//           </div>
//         )}

//         {queryResult.hasNextPage && !queryResult.isFetchingNextPage && (
//           <div className="py-10 flex-center">
//             <MainBtn
//               onClick={() => {
//                 const nextPage = pageFromUrl + 1;
//                 setSearchParams(
//                   (prev) => {
//                     const params = new URLSearchParams(prev);
//                     params.set("page", String(nextPage));
//                     return params;
//                   },
//                   { replace: true }
//                 );
//                 queryResult.fetchNextPage();
//               }}
//             >
//               {t("load more")}
//             </MainBtn>
//           </div>
//         )}
//       </FetchHandler>
//     </div>
//   );
// };

// export default memo(LeafletsList);

import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import useInfiniteLeaflets from "../api/useInfiniteLeaflets";
import MainBtn from "@/common/components/buttons/MainBtn";
import FeaturedLeafletCard from "@/features/home/components/featured-leaflets/FeaturedLeafletCard";
import type { LeafletType } from "../types/leaflets.types";
import ResultsToolbar from "./ResultsToolbar";
const LeafletsList: FC = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = Number(searchParams.get("page")) || 1;

  const queryResult = useInfiniteLeaflets();
  const leaflets = (queryResult.data?.pages || []).flatMap((page) => page.data);

  return (
    <div className="w-full flex-1">
      <FetchHandler queryResult={queryResult} skeletonType="card">
        {/* Updating feedback */}
        {queryResult.isFetching && !queryResult.isFetchingNextPage && (
          <p className="text-xs text-text-muted mb-3">Updating results…</p>
        )}

        {leaflets.length > 0 ? (
          <>
            <ResultsToolbar resultsCount={leaflets.length} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {leaflets.map((leaflet: LeafletType) => (
                <FeaturedLeafletCard key={leaflet.id} leaflet={leaflet} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12 space-y-2">
            <p className="text-lg font-medium text-text-main">
              No leaflets match your filters
            </p>
            <p className="text-sm text-text-muted">
              Try adjusting or clearing some filters to see more results.
            </p>
          </div>
        )}

        {/* Load more */}
        {queryResult.hasNextPage && !queryResult.isFetchingNextPage && (
          <div className="py-10 flex-center">
            <MainBtn
              onClick={() => {
                const nextPage = pageFromUrl + 1;

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
  );
};

export default memo(LeafletsList);
