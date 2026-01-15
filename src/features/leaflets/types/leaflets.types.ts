import { sortableKeys } from "../constants/leaflets.constants";


type SortByKey<T> = T extends string ? `${T}-asc` | `${T}-desc` : never;
export type FeaturedLeaflet = {
  id: string;
  title: string;
  description: string;
  slug: string;
  updatedAt: string; // ISO
};

export interface LeafletType {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  content: string;
  version: string;
  status: string;
  type: string;
  organization: Organization;
  department: Organization;
  original_source_url: string;
  publication_date: string;
  review_date: string;
  next_review_date: string;
  reviewed_by: string;
  read_time_minutes: number;
  view_count: number;
  number_of_pages: number;
  trust_docs_id: string;
  reviewed_at: string;
  pdf_url?: string; // 👈 optional
  created_at: string;
  updated_at: string;
}

export type Organization = {
  name: string;
  slug: string;
  id: number;
};

export interface Filters {
  year_from?: string;
  year_to?: string;
  country_id?: string;
  county_id?: string;
  organization_type_id?: string;
  organization_id?: string;
  department_id?: string;

}

export interface LeafletsFiltersContext {
  sortBy?: SortByKey<(typeof sortableKeys)[number]>;
  filters: Filters;
  isDrawerOpen: boolean;
  setSortBy: (sortBy: LeafletsFiltersContext["sortBy"]) => void;
  setIsDrawerOpen: (isOpen: boolean) => void;
  handleChangeFilters: (
    key: keyof Filters,
    value: Filters[typeof key],
    debounce?: boolean
  ) => void;
  resetFilters: () => void;
  appliedFilters: Record<string, string | []>;
}

export interface LeafletsViewContext {
  view: "list" | "cards";
  setView: (view: LeafletsViewContext["view"]) => void;
}

// Legacy interface for backward compatibility if needed
export interface LeafletsContext
  extends LeafletsFiltersContext,
  LeafletsViewContext { }
