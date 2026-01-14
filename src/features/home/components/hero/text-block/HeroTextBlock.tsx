const HeroTextBlock: React.FC = () => {
  return (
    <div className="space-y-3 md:space-y-4 flex flex-col items-center gap-3 text-center">
      <h1
        id="home-hero-heading"
        className="
            text-2xl sm:text-3xl md:text-4xl lg:text-5xl
            font-bold tracking-tight text-text-main
          "
      >
        Clear patient leaflets{" "}
        <span className="text-primary">and healthcare tools</span> in one place.
      </h1>

      <p
        id="home-hero-description"
        className="max-w-2xl text-sm sm:text-base text-text-muted"
      >
        Wise Follow Up helps patients and carers find UK-friendly leaflets,
        tools, and explanations they can actually understand – reviewed by
        clinicians, written in plain language.
      </p>
    </div>
  );
};

export default HeroTextBlock;
