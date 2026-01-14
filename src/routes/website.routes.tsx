import { lazyLoad } from "../utils/LazyLoad";
import type { RouteObject } from "react-router-dom";
import AllProducts from "@/features/products/pages/AllProducts";
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
      path: "privacy",
      element: lazyLoad(() => import("../features/policies/pages/PrivacyPage")),
      handle: {
        breadcrumb: "privacy",
      },
    },
    {
      path: "cookies",
      element: lazyLoad(() => import("../features/policies/pages/CookiesPage")),
      handle: {
        breadcrumb: "cookies",
      },
    },
    {
      path: "terms",
      element: lazyLoad(() => import("../features/policies/pages/TermsPage")),
      handle: {
        breadcrumb: "terms",
      },
    },
    {
      path: "faq",
      element: lazyLoad(() => import("../features/static-pages/pages/faq/Faq")),
      handle: {
        breadcrumb: "faq",
      },
    },
    {
      path: "static/:slug",
      element: lazyLoad(
        () => import("../features/static-pages/pages/static-pages/ShowPage")
      ),
      handle: {
        breadcrumb: "static page name",
        queryKey: [apiRoutes.static_page],
      },
    },

    {
      path: "contact-us",
      element: lazyLoad(
        () => import("../features/static-pages/pages/contact/Contact")
      ),

      handle: {
        breadcrumb: "contact",
      },
    },
    {
      path: "category/:slugAndId",

      element: lazyLoad(
        () => import("../features/categories/pages/CategoryDetails")
      ),

      handle: {
        breadcrumb: "category name",
      },
    },
    {
      path: "leaflets",
      children: [
        {
          index: true,
          element: <AllProducts />,
        },
        {
          path: ":slug",
          element: lazyLoad(
            () => import("../features/products/pages/ProductDetails")
          ),
          handle: {
            breadcrumb: "product name",
            queryKey: [apiRoutes.products],
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
