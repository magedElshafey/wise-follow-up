import { FC, memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import MainBtn from "@/common/components/buttons/MainBtn";
import CountriesFilter from "./CountriesFilter";
import CountiesFilter from "./BrandFilter";
import OrgnizationTypesFilter from "./OrgnizationTypesFilter";
import OrgnizationFilter from "./OrgnizationFilter";
import DepartmentFilter from "./DepartmentFilter";
import YearFilter from "@/common/components/years-filter/YearFilter";
import { useProductsFilters } from "../../providers/ProductsFiltersProvider";

const ProductsFilters: FC = () => {
  const { t } = useTranslation();
  const { isDrawerOpen, setIsDrawerOpen, filters, resetFilters } =
    useProductsFilters();

  const isThereFilters = Object.values(filters).some((value) => {
    if (Array.isArray(value)) return value.length > 0;
    return value !== undefined && value !== null && value !== "";
  });

  /**
   * Prevent body scroll when drawer is open
   * (No CLS – no width changes)
   */
  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen]);

  return (
    <aside className="w-full lg:w-1/4 relative">
      {/* Overlay (Mobile / Tablet) */}
      {isDrawerOpen && (
        <div
          className="
            fixed inset-0 z-40
            bg-black/40
            lg:hidden
          "
          onClick={() => setIsDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar / Drawer */}
      <div
        className={`
          fixed lg:relative
          inset-y-0 left-0
          z-50 lg:z-auto
          w-[85vw] max-w-[380px] lg:w-full
          bg-bg-surface lg:bg-transparent
          transform transition-transform duration-300 ease-in-out
          ${
            isDrawerOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Card */}
        <div
          className="
            h-full
            lg:h-auto
            lg:sticky lg:top-24
            rounded-none lg:rounded-card
            shadow-none lg:shadow-soft
            border-0 lg:border border-border-subtle
            overflow-y-auto
          "
        >
          <div className="flex flex-col gap-5 p-4">
            {/* Header */}
            <header className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-text-main">
                {t("filters")}
              </h3>

              <MainBtn
                onClick={resetFilters}
                disabled={!isThereFilters}
                className="!px-3 !py-1.5 text-sm"
              >
                {t("clear")}
              </MainBtn>
            </header>

            <Divider />

            {/* Price */}
            <FilterSection title={t("Publication Year")}>
              <YearFilter />
            </FilterSection>

            <FilterSection>
              <CountriesFilter />
            </FilterSection>

            <FilterSection>
              <CountiesFilter />
            </FilterSection>

            <FilterSection>
              <OrgnizationTypesFilter />
            </FilterSection>

            <FilterSection>
              <OrgnizationFilter />
            </FilterSection>

            <FilterSection>
              <DepartmentFilter />
            </FilterSection>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default memo(ProductsFilters);

/* ========================= */
/* ===== Sub Components ==== */
/* ========================= */

const Divider = () => <div className="h-px w-full bg-border-subtle" />;

const FilterSection: FC<{ title?: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <section
    className="
      bg-bg-alt
      rounded-card
      border border-border-subtle
      p-4
      space-y-3
    "
  >
    {title && <h4 className="text-sm font-medium text-text-main">{title}</h4>}
    {children}
  </section>
);
