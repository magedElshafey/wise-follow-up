import { useState, FormEvent, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchSuggestions } from "@/features/search-advanced/hooks/useSearchSuggestions";
import type { SearchPayload } from "../types/search.types";

type Params = {
  mode: "normal" | "advanced";
  initialPayload?: SearchPayload;
};

export function useSearchController({ mode, initialPayload }: Params) {
  const navigate = useNavigate();

  const [payload, setPayload] = useState<SearchPayload>(
    initialPayload ?? { value: "" }
  );
  const [open, setOpen] = useState(false);

  /**
   * 👇 هنا استخدام mode فعليًا
   * - normal  => نتجاهل key
   * - advanced => نبعث key + value
   */
  const effectivePayload = useMemo<SearchPayload>(() => {
    if (mode === "normal") {
      return {
        value: typeof payload.value === "string" ? payload.value : "",
      };
    }

    // advanced
    return payload;
  }, [mode, payload]);

  /**
   * 👇 suggestions تختلف حسب mode
   */
  const suggestions = useSearchSuggestions(effectivePayload);

  /**
   * ✅ behavior موحد
   */
  const navigateToExplore = (value: string) => {
    if (!value.trim()) return;

    navigate(`/leaflets?filter-search=${encodeURIComponent(value.trim())}`);
  };

  /**
   * submit (enter / search button)
   */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setOpen(false);

    if (typeof effectivePayload.value === "string") {
      navigateToExplore(effectivePayload.value);
    }
  };

  /**
   * select from suggestions
   */
  const handleSelect = (value: string) => {
    setOpen(false);
    navigateToExplore(value);
  };

  return {
    payload,
    setPayload,
    open,
    setOpen,
    suggestions,
    handleSubmit,
    handleSelect,
  };
}
