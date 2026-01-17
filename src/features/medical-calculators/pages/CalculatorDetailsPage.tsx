import { useParams } from "react-router-dom";
import PageSeo from "@/common/components/seo/PageSeo";
import { calculators } from "../data/calculators";
import CalculatorForm from "../components/CalculatorForm";

const CalculatorDetailsPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const calculator = calculators.find((c) => c.slug === slug);

  if (!calculator) return null;

  return (
    <>
      <PageSeo
        title={calculator.title}
        description={calculator.description}
        canonicalPath={`/medical-calculators/${calculator.slug}`}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "MedicalCalculator",
          name: calculator.title,
          description: calculator.description,
        }}
      />

      <main className="containerr py-section-y max-w-xl">
        <h1 className="text-2xl font-semibold">{calculator.title}</h1>
        <p className="text-text-muted mb-6">{calculator.description}</p>

        <CalculatorForm calculator={calculator} />
      </main>
    </>
  );
};

export default CalculatorDetailsPage;
