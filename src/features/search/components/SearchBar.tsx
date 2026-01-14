import React, { useState, useEffect, FormEvent } from "react";
import { useSearchSuggestions } from "../hooks/useSearchSuggestions";
import { useTranslation } from "react-i18next";
import Loader from "@/common/components/loader/spinner/Loader";
import EmptyData from "@/common/components/empty-data/EmptyData";
import { useNavigate } from "react-router-dom";
type SearchBarVariant = "hero" | "compact";
type SuggestionItem = {
  name: string;
};
type SearchBarProps = {
  variant?: SearchBarVariant;
  initialQuery?: string;

  label?: string;
  description?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({
  variant = "compact",
  initialQuery = "",
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [query, setQuery] = useState(initialQuery);
  const [open, setOpen] = useState(false);
  const queryResult = useSearchSuggestions(query);
  const navigateToExplore = (value: string) => {
    if (!value.trim()) return;

    navigate(`/leaflets?filter-search=${encodeURIComponent(value.trim())}`);
  };

  useEffect(() => setQuery(initialQuery), [initialQuery]);

  const isHero = variant === "hero";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpen(false);
    navigateToExplore(query);
  };

  const handleSelect = (item: SuggestionItem) => {
    setOpen(false);
    navigateToExplore(item.name); // or use the correct property name from SuggestionItem
  };

  return (
    <div
      className="relative space-y-3"
      aria-labelledby="home-hero-search-label"
    >
      <form
        role="search"
        aria-label="Search patient leaflets and tools"
        aria-describedby="home-hero-description"
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <div className="relative flex-1">
          <input
            id="hero-search"
            type="search"
            autoComplete="off"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => query && setOpen(true)}
            placeholder={
              isHero ? "Search symptoms, or conditions …" : "Refine search…"
            }
            className={`w-full rounded-pill border border-border-subtle bg-bg-surface px-4 py-2.5 pr-10 text-sm text-text-main shadow-soft/40 placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg-page ${
              isHero
                ? "px-4 py-2.5 pr-10 text-sm md:text-base"
                : "px-3 py-2 pr-9 text-sm"
            }
            `}
          />

          {/* زرار Search جوه الـ input على الشاشات الصغيرة */}
          <button
            type="submit"
            className="
              absolute right-2 top-1/2 -translate-y-1/2
              inline-flex items-center justify-center
              rounded-pill bg-primary text-white
              text-xs font-semibold
              px-3 py-1
              shadow-soft
              sm:hidden
            "
          >
            Search
          </button>

          {/* أيكون 🔍 على الشاشات الكبيرة فقط */}
          <span className="hidden sm:block absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
            🔍
          </span>

          {/* Dropdown */}
          {open && queryResult && query?.trim()?.length > 1 && (
            <ul
              className="
                absolute z-20 mt-2 w-full rounded-card border border-border-subtle
                bg-bg-surface shadow-soft max-h-72 overflow-auto
              "
            >
              {queryResult?.isLoading && (
                <li className="px-4 py-2 w-full h-full flex-center">
                  <Loader />
                </li>
              )}

              {!queryResult?.isLoading && queryResult?.data?.length === 0 && (
                <li className="px-4 py-2 w-full h-full flex-center">
                  <EmptyData />
                </li>
              )}

              {!queryResult?.isLoading &&
                queryResult?.data?.length > 0 &&
                queryResult?.data.map((item: any) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => handleSelect(item)}
                      className="
                        w-full text-start text-sm
                        hover:bg-primary-soft hover:text-primary
                      "
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </div>

        {/* زرار Search الخارجي يظهر فقط من أول sm وطالع */}
        <button
          type="submit"
          className={`
            rounded-pill bg-primary text-white shadow-soft hover:brightness-110
            hidden sm:inline-flex items-center justify-center
            ${isHero ? "px-5 py-2.5" : "px-4 py-2"}
          `}
        >
          {t("Search")}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
