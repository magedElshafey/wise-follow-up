import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import useGetDepartments from "@/features/uk-hierarchy/api/useGetDepartments";
import FilterItem from "../../common/FilterItem";
import { useLeafletsFilters } from "../providers/LeafletsFiltersProvider";
const DepartmentFilter: FC = () => {
  const { t } = useTranslation();

  const {
    filters: { department_id },
    handleChangeFilters,
  } = useLeafletsFilters();

  const queryResult = useGetDepartments();
  const departments = queryResult.data ?? [];

  return (
    <FetchHandler queryResult={queryResult} skeletonType="list">
      {departments.length === 0 ? (
        <div className="py-4 text-center text-sm text-text-muted">
          {t("No countries available")}
        </div>
      ) : (
        departments.map((department) => {
          const isSelected = department_id === String(department.id);

          return (
            <FilterItem
              key={department.id}
              label={department.name}
              selected={isSelected}
              checkbox
              onToggle={() =>
                handleChangeFilters(
                  "department_id",
                  isSelected ? undefined : String(department.id)
                )
              }
            />
          );
        })
      )}
    </FetchHandler>
  );
};

export default memo(DepartmentFilter);
