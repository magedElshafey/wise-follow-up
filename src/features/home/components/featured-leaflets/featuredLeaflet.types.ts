import { Tags } from "@/types/tag.types";

export type FeaturedLeaflet = {
  id: string;
  title: string;
  description: string;
  slug: string;
  tags: Tags[];
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
