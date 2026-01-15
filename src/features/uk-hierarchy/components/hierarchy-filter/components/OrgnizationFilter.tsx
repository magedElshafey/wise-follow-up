import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import useGetOrgs from "@/features/uk-hierarchy/api/useGetOrgs";
import FilterItem from "../../common/FilterItem";
import { useLeafletsFilters } from "../providers/LeafletsFiltersProvider";
const OrgFilter: FC = () => {
  const { t } = useTranslation();

  const {
    filters: { country_id, county_id, organization_type_id, organization_id },
    handleChangeFilters,
  } = useLeafletsFilters();

  const queryResult = useGetOrgs({
    country_id,
    county_id,
    organization_type_id,
  });

  const orgs = queryResult.data ?? [];

  return (
    <FetchHandler queryResult={queryResult} skeletonType="list">
      {orgs.length === 0 ? (
        <div className="py-4 text-center text-sm text-text-muted">
          {t("no brands available")}
        </div>
      ) : (
        orgs.map((org) => {
          const isSelected = organization_id === String(org.id);

          return (
            <FilterItem
              key={org.id}
              label={org.name}
              checkbox
              selected={isSelected}
              onToggle={() =>
                handleChangeFilters(
                  "organization_id",
                  isSelected ? undefined : String(org.id)
                )
              }
            />
          );
        })
      )}
    </FetchHandler>
  );
};

export default memo(OrgFilter);
