import React from "react";
import SectionHeader from "@/common/components/section-header/SectionHeader";
import type { BlogPost } from "./blog.types";
import BlogCard from "./BlogCard";

type Props = { posts: BlogPost[]; isLoading?: boolean };

const BlogsHomeSection: React.FC<Props> = ({ posts, isLoading = false }) => {
  return (
    <section aria-labelledby="blogs-heading" className="section-shell">
      <div className="containerr">
        <SectionHeader
          title="Blog"
          titleId="blogs-heading"
          description="Practical guidance written in calm, patient-friendly language"
          hasViewAll
          path="/blogs"
        />

        {isLoading ? (
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="card-base h-52 animate-pulse lg:col-span-2" />
            <div className="space-y-4">
              <div className="card-base h-24 animate-pulse" />
              <div className="card-base h-24 animate-pulse" />
            </div>
          </div>
        ) : (
          <div className="grid gap-4 md:gap-6 lg:gap-8 xl:gap-10 lg:grid-cols-3 items-start">
            {posts.map((p) => (
              <BlogCard key={p.id} post={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogsHomeSection;
