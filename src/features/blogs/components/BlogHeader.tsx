import { useTranslation } from "react-i18next";
import CategoryPill from "./CategoryPill";
import type { Articles } from "../types/blog.types";
import MetaItem from "./MetaItem";
import { formatDate } from "@/utils/formatDate";
import HeroLayout from "@/common/layout/hero-layout/HeroLayout";

const BlogHeader: React.FC<{ post: Articles }> = ({ post }) => {
  const { t } = useTranslation();

  return (
    <HeroLayout minHeight="min-h-[30vh]">
      <header>
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex flex-col gap-4">
            {post.category && <CategoryPill label={post.category.name} />}

            <h1 className="text-2xl md:text-3xl font-bold text-text-main">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="max-w-3xl text-text-muted">{post.excerpt}</p>
            )}
          </div>
          <div className="space-y-1">
            <div className="flex gap-2">
              {post.author?.image && (
                <MetaItem>
                  <img
                    alt={post.author.name}
                    src={post.author.image}
                    className="w-12 h-12 rounded-full object-contain"
                  />
                </MetaItem>
              )}

              <div className="flex flex-col gap-[2px] italic">
                {post.author?.name && (
                  <MetaItem>
                    <span className="font-semibold text-sm text-text-main">
                      {t("Blog.by", "By")}: {post.author.name}
                    </span>
                  </MetaItem>
                )}

                <span className="text-xs text-text-muted">
                  {post.author?.affiliation}
                </span>

                {post.published_at && (
                  <MetaItem>
                    <time dateTime={formatDate(post.published_at)}>
                      {formatDate(post.published_at)}
                    </time>
                  </MetaItem>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </HeroLayout>
  );
};

export default BlogHeader;
