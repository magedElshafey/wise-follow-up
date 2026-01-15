import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import SortDropdown from "./SortDropdown";
import { HiFilter } from "react-icons/hi";
import { useLeafletsFilters } from "../providers/LeafletsFiltersProvider";
const AllLeafletsHeader: FC = () => {
  const { t } = useTranslation();
  const { isDrawerOpen, setIsDrawerOpen } = useLeafletsFilters();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="flex-between py-10">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={toggleDrawer}
          className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orangeColor focus:border-transparent transition-colors"
          aria-label={`Toggle ${t("filters")}`}
        >
          <HiFilter size={18} />
          <span className="text-sm font-medium hidden sm:inline">
            {t("filters")}
          </span>
        </button>
        <h1 className="text-3xl font-bold hidden lg:block">{t("leaflets")}</h1>
      </div>

      <div>
        <div className="flex items-center gap-4">
          <span className="font-medium text-text-gray hidden sm:inline">
            {t("sort_by")}
          </span>
          <SortDropdown />
        </div>
      </div>
    </div>
  );
};

export default memo(AllLeafletsHeader);
