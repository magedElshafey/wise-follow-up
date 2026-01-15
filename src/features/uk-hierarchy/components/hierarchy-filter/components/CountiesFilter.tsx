import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import useGetCounties from "@/features/uk-hierarchy/api/useGetCounties";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import FilterItem from "../../common/FilterItem";
import { useLeafletsFilters } from "@/features/uk-hierarchy/components/hierarchy-filter/providers/LeafletsFiltersProvider";
const CountiesFilter: FC = () => {
  const { t } = useTranslation();
  const {
    filters: { country_id, county_id },
    handleChangeFilters,
  } = useLeafletsFilters();

  const queryResult = useGetCounties({ country: country_id });
  const counties = queryResult.data ?? [];

  return (
    <FetchHandler queryResult={queryResult} skeletonType="list">
      {counties.length === 0 ? (
        <div className="py-4 text-center text-sm text-text-muted">
          {t("no brands available")}
        </div>
      ) : (
        counties.map((county) => {
          const selected = county_id === String(county.id);

          return (
            <FilterItem
              key={county.id}
              label={county.name}
              checkbox
              selected={selected}
              onToggle={() => {
                handleChangeFilters(
                  "county_id",
                  selected ? undefined : String(county.id)
                );
                handleChangeFilters("organization_id", undefined);
              }}
            />
          );
        })
      )}
    </FetchHandler>
  );
};

export default memo(CountiesFilter);
