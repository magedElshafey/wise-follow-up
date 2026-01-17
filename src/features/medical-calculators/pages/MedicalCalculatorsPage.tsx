import { Link } from "react-router-dom";
import PageSeo from "@/common/components/seo/PageSeo";
import { calculators } from "../data/calculators";

const MedicalCalculatorsPage = () => {
  return (
    <>
      <PageSeo
        title="Medical calculators"
        description="Trusted medical calculators for patients and clinicians."
        canonicalPath="/medical-calculators"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Medical calculators",
        }}
      />

      <main className="containerr py-section-y">
        <h1 className="text-3xl font-semibold">Medical calculators</h1>
        <p className="text-text-muted mt-2 max-w-xl">
          Evidence-based tools to support understanding and follow-up.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {calculators.map((calc) => (
            <Link
              key={calc.id}
              to={`/medical-calculators/${calc.slug}`}
              className="rounded-card bg-bg-surface p-5 shadow-soft hover:shadow-lg transition"
            >
              <h2 className="font-semibold">{calc.title}</h2>
              <p className="text-xs text-text-muted mt-1">{calc.category}</p>
              <p className="text-sm text-text-muted mt-2">{calc.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
};

export default MedicalCalculatorsPage;
