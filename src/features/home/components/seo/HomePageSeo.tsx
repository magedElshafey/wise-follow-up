import React from "react";
import { useTranslation } from "react-i18next";

import PageSeo from "@/common/components/seo/PageSeo";
import { seoConfig } from "@/common/components/seo/seo.config";
const HomePageSeo = () => {
  const { i18n } = useTranslation();
  const { siteUrl, siteName, defaultOgImage } = seoConfig;

  const isArabic = i18n.language === "ar";

  const title = isArabic
    ? "نشرات طبية موثوقة ومعلومات صحية للمرضى"
    : "Trusted Medical Leaflets & Patient Information";

  const description = isArabic
    ? "تصفح نشرات طبية موثوقة ومراجَعة إكلينيكيًا. ابحث حسب الأعراض أو المؤلف أو رقم Trust أو التاريخ."
    : "Browse trusted, clinically reviewed medical leaflets and patient information. Search by symptom, author, Trust ID, or date.";

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/leaflets?filter-search={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ];

  return (
    <PageSeo
      title={title}
      description={description}
      canonicalPath="/"
      ogType="website"
      ogImage={defaultOgImage}
      structuredData={structuredData}
    />
  );
};

export default React.memo(HomePageSeo);
