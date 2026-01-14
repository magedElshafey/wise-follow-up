import ScrollToTopButton from "./scroll-to-top/ScrollToTopButton";
import StickyNavbar from "./sticky-navbar/StickyNavbar";
import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import CookieBanner from "@/features/cookies/CookieBanner";

const WebsiteLayout = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden mt-[60px]">
      <ScrollToTopButton />

      <StickyNavbar logo={""} />

      <main className="grow py-2 flex flex-col">
        <Outlet />
      </main>
      <Footer />
      <CookieBanner />
      {/* {isLoading ? (
        <FooterSkeleton />
      ) : (
        <Footer
          site_logo={data?.site_logo || "/images/logo.png"}
          contact_phone={data?.contact_phone || ""}
          contact_email={data?.contact_email || ""}
          contact_address={data?.contact_address || ""}
          social_facebook={data?.social_facebook || null}
          social_twitter={data?.social_twitter || null}
          social_instagram={data?.social_instagram || null}
          site_description={
            (language === "ar"
              ? data?.site_description_ar
              : data?.site_description) || ""
          }
        />
      )} */}
    </div>
  );
};

export default WebsiteLayout;
