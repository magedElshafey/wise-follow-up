// import HeroLayout from "@/common/layout/hero-layout/HeroLayout";
// import SearchBar from "@/features/search-advanced/components/SearchBar";
// import { useSearchController } from "../hooks/useSearchController";
// import MainDate from "@/common/components/inputs/MainDateInput";
// import MainSelect from "@/common/components/inputs/MainSelect";
// import { useTranslation } from "react-i18next";
// const SEARCH_TYPES = [
//   { id: 0, name: "Default search", key: undefined },
//   { id: 1, name: "Author", key: "author" },
//   { id: 2, name: "Organization", key: "country" },
//   { id: 3, name: "Date", key: "date" },
// ];

// const AdvancedSearch = () => {
//   const controller = useSearchController({
//     mode: "advanced",
//   });
//   const { t } = useTranslation();
//   const isDate = controller.payload.key === "date";

//   return (
//     <HeroLayout minHeight="min-h-[40vh]">
//       <div className="flex flex-wrap gap-4 items-center justify-center">
//         <div className="w-56">
//           <MainSelect
//             options={SEARCH_TYPES}
//             placeholder="Search type"
//             onSelect={(opt) =>
//               controller.setPayload({
//                 key: opt.key as any,
//                 value: "",
//               })
//             }
//           />
//         </div>

//         <div className="flex-1 min-w-[260px]">
//           {isDate ? (
//             <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-end gap-3">
//               <MainDate placeholder="From" />

//               <span className="text-sm text-text-muted pb-3 text-center">
//                 {t("to")}
//               </span>

//               <MainDate placeholder="To (optional)" />
//             </div>
//           ) : (
//             <SearchBar variant="compact" controller={controller} />
//           )}
//         </div>
//       </div>
//     </HeroLayout>
//   );
// };

// export default AdvancedSearch;
import HeroLayout from "@/common/layout/hero-layout/HeroLayout";
import SearchBar from "@/features/search-advanced/components/SearchBar";
import { useSearchController } from "../hooks/useSearchController";
import MainDate from "@/common/components/inputs/MainDateInput";
import MainSelect from "@/common/components/inputs/MainSelect";
import { useTranslation } from "react-i18next";

const SEARCH_TYPES = [
  { id: 0, name: "Default search", key: undefined },
  { id: 1, name: "Author", key: "author" },
  { id: 2, name: "Organization", key: "organization" },
  { id: 3, name: "Date", key: "date" },
];

const AdvancedSearch = () => {
  const controller = useSearchController({ mode: "advanced" });
  const { t } = useTranslation();

  const isDate = controller.payload.key === "date";

  return (
    <HeroLayout minHeight="min-h-[65vh]">
      <div>
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-text-main">
            {t("Advanced search")}
          </h1>
          <p className="mt-2 text-text-muted max-w-xl mx-auto">
            {t(
              "Refine your search using specific criteria like author, organization, or date."
            )}
          </p>
        </div>

        {/* Search Card */}
        <div
          className="
            bg-bg-surface
            rounded-card
            shadow-soft
            border border-border-subtle
            p-6 md:p-8
            space-y-6
          "
        >
          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6 items-end">
            {/* Search type */}
            <MainSelect
              options={SEARCH_TYPES}
              placeholder={t("Search type")}
              onSelect={(opt) =>
                controller.setPayload({
                  key: opt.key as any,
                  value: "",
                })
              }
            />

            {/* Dynamic field */}
            {isDate ? (
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-end gap-3">
                <MainDate placeholder={t("From")} />

                <span className="pb-3 text-sm text-text-muted text-center">
                  {t("to")}
                </span>

                <MainDate placeholder={t("To (optional)")} />
              </div>
            ) : (
              <SearchBar variant="compact" controller={controller} />
            )}
          </div>

          {/* Hint */}
          <div className="text-sm text-text-muted">
            {isDate
              ? t("Search by a specific date range.")
              : t("Start typing to see suggestions.")}
          </div>
        </div>
      </div>
    </HeroLayout>
  );
};

export default AdvancedSearch;
