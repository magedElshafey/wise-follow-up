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
import RecentlyUpdatedSection from "../components/recent-updates/RecentlyUpdatedSection";
import HomePageSeo from "../components/seo/HomePageSeo";
import ReadingProgress from "@/common/reading-progress/ReadingProgress";
const Home = () => {
  const query = useGetAllLeaflets({ is_featured: true });
  const recentQuery = useGetAllLeaflets({ is_recently: true });
  const departmentQuery = useGetDepartments();
  return (
    <>
      <HomePageSeo />
      <ReadingProgress />
      <Hero />
      <div className="min-h-7">
        <FetchHandler queryResult={query} skeletonType="card">
          {query?.data && query?.data?.length > 0 && (
            <FeaturedLeafletsSection leaflets={query?.data} />
          )}
        </FetchHandler>
      </div>
      <div className="min-h-7">
        <FetchHandler queryResult={departmentQuery} skeletonType="card">
          {departmentQuery?.data && departmentQuery?.data?.length > 0 && (
            <BrowseByBodySection systems={departmentQuery?.data} />
          )}
        </FetchHandler>
      </div>

      <TrustSection pillars={DUMMY_TRUST_PILLARS} />
      <div className="min-h-7">
        <FetchHandler queryResult={recentQuery} skeletonType="card">
          {recentQuery?.data && recentQuery.data?.length > 0 && (
            <RecentlyUpdatedSection leaflets={recentQuery.data} />
          )}
        </FetchHandler>
      </div>

      <TestimonialsSection />

      {/* <RecentlyUpdatedSection items={DUMMY_RECENT_UPDATES} /> */}
      <BlogsHomeSection posts={DUMMY_BLOGS} />
    </>
  );
};

export default Home;
