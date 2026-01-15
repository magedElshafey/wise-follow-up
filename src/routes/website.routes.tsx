import { lazyLoad } from "../utils/LazyLoad";
import type { RouteObject } from "react-router-dom";
import { apiRoutes } from "@/services/api-routes/apiRoutes";

export const websiteRoutes: RouteObject = {
  element: lazyLoad(() => import("../common/layout/website/WebsiteLayout")),
  children: [
    {
      index: true,
      element: lazyLoad(() => import("../features/home/pages/Home")),
    },

    {
      path: "about",
      element: lazyLoad(() => import("../features/about/pages/AboutPage")),
      handle: {
        breadcrumb: "About",
      },
    },
    {
      path: "search-advanced",
      element: lazyLoad(
        () => import("../features/search-advanced/pages/AdvancedSearch")
      ),
      handle: {
        breadcrumb: "About",
      },
    },
    {
      path: "policies/privacy-policy",
      element: lazyLoad(() => import("../features/policies/pages/PrivacyPage")),
      handle: {
        breadcrumb: "privacy",
      },
    },
    {
      path: "policies/cookies-policy",
      element: lazyLoad(() => import("../features/policies/pages/CookiesPage")),
      handle: {
        breadcrumb: "cookies",
      },
    },
    {
      path: "policies/terms-of-use",
      element: lazyLoad(() => import("../features/policies/pages/TermsPage")),
      handle: {
        breadcrumb: "terms",
      },
    },
    {
      path: "policies/medical-disclaimer",
      element: lazyLoad(() => import("../features/policies/pages/MedicalPage")),
      handle: {
        breadcrumb: "medical disclimar",
      },
    },
    {
      path: "leaflets",
      children: [
        {
          index: true,
          element: lazyLoad(
            () => import("../features/leaflets/pages/AllLeaflets")
          ),
        },
        {
          path: ":slug",
          element: lazyLoad(
            () => import("../features/leaflets/pages/LeafletsDetails")
          ),
          handle: {
            breadcrumb: "leaflet name",
            queryKey: [apiRoutes.leaflets],
          },
        },
      ],
      handle: {
        breadcrumb: "products",
      },
    },
    {
      path: "blogs",
      element: lazyLoad(() => import("../features/blogs/pages/AllBlogs")),
      handle: {
        breadcrumb: "blogs",
      },
    },
    {
      path: "blogs/:slugAndId",
      element: lazyLoad(
        () => import("../features/blogs/pages/BlogDetailsPage")
      ),
      handle: {
        breadcrumb: "blog name",
        queryKey: [apiRoutes.blogs],
      },
    },
  ],
};
