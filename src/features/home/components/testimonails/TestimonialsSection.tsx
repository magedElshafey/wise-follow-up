import React from "react";
import SectionHeader from "@/common/components/section-header/SectionHeader";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import useGetAllReviews from "../../api/reveiws/useGetAllReviews";
import { Link } from "react-router-dom";
import MainBtn from "@/common/components/buttons/MainBtn";
import type { Reviews } from "../../types/reviews.types";

const MAX_REVIEWS = 4;

const TestimonialsSection: React.FC = () => {
  const query = useGetAllReviews();
  const reviews = (query.data ?? []) as Reviews[];

  return (
    <FetchHandler queryResult={query} skeletonType="card">
      {reviews.length > 0 && (
        <section
          aria-labelledby="reviews-heading"
          className="section-shell bg-bg-alt"
        >
          <div className="containerr space-y-6">
            <SectionHeader
              title="What people say"
              titleId="reviews-heading"
              description="Feedback from people who have used our patient leaflets."
              hasViewAll={false}
            />

            {/* Reviews grid */}
            <ul
              role="list"
              className="
                grid gap-4
                sm:grid-cols-2
                lg:grid-cols-3 xl:grid-cols-4
              "
            >
              {reviews.slice(0, MAX_REVIEWS).map((review) => (
                <li
                  key={review.id}
                  className="
                    rounded-card
                    border border-border-subtle
                    bg-bg-surface
                    p-5
                    flex flex-col
                    gap-3
                  "
                >
                  {/* Comment */}
                  <p className="text-sm text-text-main leading-relaxed">
                    “{review.comment}”
                  </p>

                  {/* Author */}
                  <div className="mt-auto text-xs text-text-muted">
                    <span className="font-medium text-text-main">
                      {review.reviewer_name}
                    </span>
                    <span aria-hidden> · </span>
                    <time dateTime={review.created_at}>
                      {new Date(review.created_at).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "short",
                      })}
                    </time>
                  </div>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="flex justify-center md:justify-end">
              <Link to="/submit-review">
                <MainBtn
                  variant="primary"
                  className="text-xs sm:text-sm px-4 py-2 sm:px-5 sm:py-2.5"
                >
                  Share your experience
                </MainBtn>
              </Link>
            </div>
          </div>
        </section>
      )}
    </FetchHandler>
  );
};

export default TestimonialsSection;
