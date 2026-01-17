// src/components/about/MissionVisionMessage.tsx
const items = [
  {
    title: "Our Mission",
    text: "To provide clear, reliable, and patient-friendly medical information that improves understanding and safety.",
  },
  {
    title: "Our Vision",
    text: "A healthcare system where every patient leaves with clarity, confidence, and trust.",
  },
  {
    title: "Our Message",
    text: "Patients deserve information that respects their intelligence and supports better decisions.",
  },
];

export default function MissionVisionMessage() {
  return (
    <section className="py-5 md:my-6 lg:py-7 xl:py-8 2xl:py-10">
      <div className="containerr">
        <div className="grid gap-8 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-card bg-bg-surface p-8 shadow-soft"
            >
              <h3 className="text-xl font-semibold text-secondary">
                {item.title}
              </h3>
              <p className="mt-4 text-text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
