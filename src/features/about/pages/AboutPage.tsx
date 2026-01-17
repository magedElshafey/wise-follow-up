import AboutHero from "../components/AboutHero";
import MissionValues from "../components/MissionValues";
import MissionVisionMessage from "../components/MissionVisionMessage";
import FounderProfile from "../components/FounderProfile";
import { founders } from "../data/team";
import PageSeo from "@/common/components/seo/PageSeo";
import ReadingProgress from "@/common/reading-progress/ReadingProgress";
export default function AboutPage() {
  return (
    <>
      <PageSeo
        title="About wise followup"
        description="Learn more about Wise Followup – a specialist eye clinic providing evidence-based, patient-focused ophthalmology information and care in the UK."
        canonicalPath="/about"
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Wise Followup",
          url: "https://wisefollowup.com",
          description:
            "Specialist eye clinic providing evidence-based ophthalmology information and care in the UK.",
        }}
      />
      <ReadingProgress />
      <main>
        <AboutHero />

        <MissionVisionMessage />
        <FounderProfile {...founders[0]} />
        <FounderProfile {...founders[1]} reverse />

        <MissionValues />
      </main>
    </>
  );
}
