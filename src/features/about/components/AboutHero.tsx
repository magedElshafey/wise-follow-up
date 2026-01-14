import HeroLayout from "@/common/layout/hero-layout/HeroLayout";
import { founders } from "../data/team";
export default function FoundersHero() {
  return (
    <HeroLayout>
      {/* Background */}

      <div className="relative containerr py-section-y">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Text */}
          <div>
            <h1 className="text-4xl font-bold leading-tight text-secondary md:text-5xl">
              Built by doctors who believe
              <span className="text-primary"> patients deserve clarity</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-text-muted">
              WiseFollowUp was created by medical graduates who experienced
              firsthand how unclear patient information can affect safety,
              confidence, and outcomes.
            </p>
          </div>

          {/* Founders Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {founders.map((founder) => (
              <div
                key={founder.name}
                className="rounded-card bg-bg-surface p-4 shadow-soft"
              >
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="h-[450px] lg:h-[550px] w-full rounded-card object-cover"
                />
                <h3 className="mt-4 font-medium text-secondary">
                  {founder.name}
                </h3>
                <p className="text-sm text-text-muted">{founder.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </HeroLayout>
  );
}
