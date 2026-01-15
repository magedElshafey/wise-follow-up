import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import useGetOrgnizationTypes from "@/features/uk-hierarchy/api/useGetOrgnizationTypes";
import FilterItem from "../../common/FilterItem";
import { useLeafletsFilters } from "../providers/LeafletsFiltersProvider";
const OrgnizationTypesFilter: FC = () => {
  const { t } = useTranslation();

  const {
    filters: { organization_type_id },
    handleChangeFilters,
  } = useLeafletsFilters();

  const queryResult = useGetOrgnizationTypes();
  const types = queryResult.data ?? [];

  return (
    <FetchHandler queryResult={queryResult} skeletonType="list">
      {types.length === 0 ? (
        <div className="py-4 text-center text-sm text-text-muted">
          {t("No countries available")}
        </div>
      ) : (
        types.map((type) => {
          const isSelected = organization_type_id === String(type.id);

          return (
            <FilterItem
              key={type.id}
              label={type.name}
              selected={isSelected}
              checkbox
              onToggle={() => {
                handleChangeFilters(
                  "organization_type_id",
                  isSelected ? undefined : String(type.id)
                );

                // reset dependent filter
                handleChangeFilters("organization_id", undefined);
              }}
            />
          );
        })
      )}
    </FetchHandler>
  );
};

export default memo(OrgnizationTypesFilter);
