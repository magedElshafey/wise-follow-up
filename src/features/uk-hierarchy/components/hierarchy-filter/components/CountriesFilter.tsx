import { FC, memo } from "react";
import { useTranslation } from "react-i18next";

import useGetAllCountries from "@/features/uk-hierarchy/api/useGetAllCountries";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import FilterItem from "../../common/FilterItem";
import { useLeafletsFilters } from "../providers/LeafletsFiltersProvider";
const CountriesFilter: FC = () => {
  const { t } = useTranslation();

  const {
    filters: { country_id },
    handleChangeFilters,
  } = useLeafletsFilters();

  const queryResult = useGetAllCountries();
  const countries = queryResult.data ?? [];

  return (
    <FetchHandler queryResult={queryResult} skeletonType="list">
      {countries.length === 0 ? (
        <div className="py-4 text-center text-sm text-text-muted">
          {t("No countries available")}
        </div>
      ) : (
        countries.map((country) => {
          const isSelected = country_id === String(country.id);

          return (
            <FilterItem
              key={country.id}
              label={country.name}
              selected={isSelected}
              checkbox
              onToggle={() => {
                handleChangeFilters(
                  "country_id",
                  isSelected ? undefined : String(country.id)
                );

                // Reset dependent filters
                handleChangeFilters("county_id", undefined);
                handleChangeFilters("organization_id", undefined);
              }}
            />
          );
        })
      )}
    </FetchHandler>
  );
};

export default memo(CountriesFilter);
