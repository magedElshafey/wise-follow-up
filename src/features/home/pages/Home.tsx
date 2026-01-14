import Hero from "../components/hero/Hero";
import FeaturedLeafletsSection from "../components/featured-leaflets/FeaturedLeafletsSection";
import BrowseByBodySection from "../components/browse-by-body/BrowseByBodySection";
import { DUMMY_BODY_SYSTEMS } from "../components/browse-by-body/dummyData";
import TrustSection from "../components/trust/TrustSection";
import { DUMMY_TRUST_PILLARS } from "../components/trust/dummyTrust";
import TestimonialsSection from "../components/testimonails/TestimonialsSection";
import { DUMMY_TESTIMONIALS } from "../components/testimonails/dummyTestimonials";
import BlogsHomeSection from "../components/blogs/BlogsHomeSection";
import { DUMMY_BLOGS } from "../components/blogs/dummyBlogs";
import useGetAllProducts from "@/features/products/api/useGetAllProducts";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
const Home = () => {
  const query = useGetAllProducts({ featured: true });
  console.log("feat query", query?.data);
  return (
    <>
      <Hero />
      <div className="min-h-7">
        <FetchHandler queryResult={query} skeletonType="product">
          {query?.data && query?.data?.length > 0 && (
            <FeaturedLeafletsSection leaflets={query?.data} />
          )}
        </FetchHandler>
      </div>

      <BrowseByBodySection systems={DUMMY_BODY_SYSTEMS} />
      <TrustSection pillars={DUMMY_TRUST_PILLARS} />
      <TestimonialsSection items={DUMMY_TESTIMONIALS} />
      {/* <RecentlyUpdatedSection items={DUMMY_RECENT_UPDATES} /> */}
      <BlogsHomeSection posts={DUMMY_BLOGS} />
    </>
  );
};

export default Home;
