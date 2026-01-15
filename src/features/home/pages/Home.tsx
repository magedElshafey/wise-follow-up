import Hero from "../components/hero/Hero";
import FeaturedLeafletsSection from "../components/featured-leaflets/FeaturedLeafletsSection";
import BrowseByBodySection from "../components/browse-by-body/BrowseByBodySection";
import TrustSection from "../components/trust/TrustSection";
import { DUMMY_TRUST_PILLARS } from "../components/trust/dummyTrust";
import TestimonialsSection from "../components/testimonails/TestimonialsSection";
import BlogsHomeSection from "../components/blogs/BlogsHomeSection";
import { DUMMY_BLOGS } from "../components/blogs/dummyBlogs";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import useGetDepartments from "@/features/uk-hierarchy/api/useGetDepartments";
import useGetAllLeaflets from "@/features/leaflets/api/useGetAllLeaflets";
const Home = () => {
  const query = useGetAllLeaflets({ featured: true });
  const departmentQuery = useGetDepartments();
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
      <div className="min-h-7">
        <FetchHandler queryResult={departmentQuery} skeletonType="product">
          {departmentQuery?.data && departmentQuery?.data?.length > 0 && (
            <BrowseByBodySection systems={departmentQuery?.data} />
          )}
        </FetchHandler>
      </div>

      <TrustSection pillars={DUMMY_TRUST_PILLARS} />

      <TestimonialsSection />

      {/* <RecentlyUpdatedSection items={DUMMY_RECENT_UPDATES} /> */}
      <BlogsHomeSection posts={DUMMY_BLOGS} />
    </>
  );
};

export default Home;
