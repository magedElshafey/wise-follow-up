import React, { useMemo, useState } from "react";
import { BlogPost } from "@/features/home/components/blogs/blog.types";
import BlogCard from "@/features/home/components/blogs/BlogCard";
import { DUMMY_BLOGS } from "@/features/home/components/blogs/dummyBlogs";
import PageSeo from "@/common/components/seo/PageSeo";

const AllBlogsPage: React.FC = () => {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");

  const categories = useMemo(() => {
    const set = new Set(DUMMY_BLOGS.map((b) => b.category));
    return ["All", ...Array.from(set)];
  }, []);

  const filtered: BlogPost[] = useMemo(() => {
    const term = q.trim().toLowerCase();
    return DUMMY_BLOGS.filter((b) => {
      const matchesQ =
        !term ||
        b.title.toLowerCase().includes(term) ||
        b.excerpt.toLowerCase().includes(term);

      const matchesCat = cat === "All" || b.category === cat;
      return matchesQ && matchesCat;
    });
  }, [q, cat]);

  const hasActiveFilters = q.trim() !== "" || cat !== "All";

  return (
    <>
      <PageSeo
        title="patient leaflets Blogs"
        description="Read expert-written articles and insights about eye health, treatments, and patient education from Wise Followup."
        canonicalPath="/blogs"
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Wise Followup Blog",
          url: "https://wisefollowup.com/blogs",
          description:
            "Expert-written eye health articles and patient education content.",
        }}
      />
      <main className="section-shell">
        <div className="containerr space-y-6">
          {/* Header */}
          <header className="space-y-2">
            <h1 className="text-2xl font-bold text-text-main">
              All blog posts
            </h1>
            <p className="text-sm text-text-muted">
              Practical guidance for patients and clinicians.
            </p>
          </header>

          {/* Controls */}
          <div className="rounded-card border border-border-subtle bg-bg-surface shadow-soft p-4">
            <div className="grid gap-3 md:grid-cols-[1fr_auto_auto] items-center">
              {/* Search */}
              <div className="relative">
                <input
                  type="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search blog posts…"
                  className="
                  w-full rounded-pill border border-border-subtle bg-bg-page
                  px-4 py-2.5 text-sm text-text-main
                  focus:outline-none focus:ring-2 focus:ring-primary
                  focus:ring-offset-2 focus:ring-offset-bg-page
                "
                />
                <span
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted"
                  aria-hidden="true"
                >
                  🔎
                </span>
              </div>

              {/* Category */}
              <select
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="
                rounded-pill border border-border-subtle bg-bg-page
                px-4 py-2.5 text-sm text-text-main
                focus:outline-none focus:ring-2 focus:ring-primary
                focus:ring-offset-2 focus:ring-offset-bg-page
              "
                aria-label="Filter by category"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              {/* Reset */}
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={() => {
                    setQ("");
                    setCat("All");
                  }}
                  className="
                  rounded-pill border border-border-subtle bg-bg-page
                  px-4 py-2.5 text-sm font-medium text-text-muted
                  hover:bg-bg-surface hover:text-text-main
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-primary focus-visible:ring-offset-2
                  focus-visible:ring-offset-bg-page
                "
                >
                  Reset filters
                </button>
              )}
            </div>
          </div>

          {/* Results count */}
          <div aria-live="polite" className="flex items-center justify-between">
            <p className="text-sm text-text-muted">
              Showing{" "}
              <span className="font-semibold text-text-main">
                {filtered.length}
              </span>{" "}
              result{filtered.length !== 1 && "s"}
            </p>
          </div>

          {/* Results */}
          <section
            aria-label="Blog results"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((p) => (
              <BlogCard key={p.id} post={p} />
            ))}
          </section>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div
              role="status"
              className="
              rounded-card border border-border-subtle
              bg-bg-surface p-6 text-center
            "
            >
              <p className="text-sm font-semibold text-text-main">
                No posts found
              </p>
              <p className="mt-1 text-xs text-text-muted">
                Try a different keyword or category.
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default AllBlogsPage;
