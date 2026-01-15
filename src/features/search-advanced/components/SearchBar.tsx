import React from "react";
import { useTranslation } from "react-i18next";
import Loader from "@/common/components/loader/spinner/Loader";
import EmptyData from "@/common/components/empty-data/EmptyData";
import { useSearchController } from "@/features/search-advanced/hooks/useSearchController";
import i18n from "@/lib/i18n/i18n";
type SearchBarVariant = "hero" | "compact";

type SuggestionItem = {
  id: string;
  title: string;
};

type SearchBarProps = {
  variant?: SearchBarVariant;
  controller: ReturnType<typeof useSearchController>;
};

const SearchBar: React.FC<SearchBarProps> = ({
  variant = "compact",
  controller,
}) => {
  const { t } = useTranslation();

  const {
    payload,
    setPayload,
    open,
    setOpen,
    suggestions,
    handleSubmit,
    handleSelect,
  } = controller;

  const query = typeof payload.value === "string" ? payload.value : "";
  const hasData =
    suggestions.isLoading ||
    (Array.isArray(suggestions.data) && suggestions.data.length > 0);

  const isHero = variant === "hero";

  return (
    <div className="relative space-y-3">
      <form
        role="search"
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <div className="relative flex-1">
          <input
            type="search"
            autoComplete="off"
            value={query}
            onChange={(e) => {
              setPayload({ ...payload, value: e.target.value });
              setOpen(true);
            }}
            onFocus={() => query && setOpen(true)}
            placeholder={
              isHero
                ? t("Search symptoms, or conditions …")
                : t("Refine search…")
            }
            className={`w-full rounded-pill border border-border-subtle bg-bg-surface px-4 py-2.5 ${
              i18n.language === "en" ? "pr-10" : "pe-10"
            } text-sm text-text-main shadow-soft/40 placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg-page ${
              isHero
                ? "px-4 py-2.5 pr-10 text-sm md:text-base"
                : "px-3 py-2 pr-9 text-sm"
            }`}
          />

          {/* mobile submit */}
          <button
            type="submit"
            className={`absolute ${
              i18n.language === "en" ? "right-2" : "left-2"
            } top-1/2 -translate-y-1/2 rounded-pill bg-primary text-white text-xs px-3 py-1 sm:hidden`}
          >
            {t("Search")}
          </button>

          {/* icon */}
          <span
            className={`hidden sm:block absolute ${
              i18n.language === "en" ? "right-3" : "left-3"
            } top-1/2 -translate-y-1/2 text-text-muted`}
          >
            🔍
          </span>

          {/* suggestions dropdown */}
          {open && query.trim().length > 1 && hasData && (
            <ul className="absolute z-30 mt-2 w-full rounded-card border border-border-subtle bg-bg-surface shadow-soft max-h-72 overflow-auto">
              {suggestions.isLoading && (
                <li className="p-4 flex-center">
                  <Loader />
                </li>
              )}

              {!suggestions.isLoading && suggestions.data?.length === 0 && (
                <li className="p-4 flex-center">
                  <EmptyData />
                </li>
              )}

              {!suggestions.isLoading &&
                suggestions.data?.map((item: SuggestionItem) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => handleSelect(item.title)}
                      className="w-full px-4 py-2 text-start text-sm transition hover:bg-primary-soft hover:text-primary"
                    >
                      {item.title}
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          className={`rounded-pill bg-primary text-white shadow-soft hidden sm:inline-flex items-center justify-center ${
            isHero ? "px-5 py-2.5" : "px-4 py-2"
          }`}
        >
          {t("Search")}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
