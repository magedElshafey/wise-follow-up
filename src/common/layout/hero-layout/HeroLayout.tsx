// components/hero/HeroLayout.tsx
import { FC, ReactNode } from "react";

type HeroLayoutProps = {
  children: ReactNode;
  minHeight?: string;
};

const HeroLayout: FC<HeroLayoutProps> = ({
  children,
  minHeight = "min-h-[60vh] lg:min-h-[80vh]",
}) => {
  return (
    <section
      className={`
        relative overflow-hidden
        bg-gradient-to-b
        from-primary/20
        via-bg-page
        to-bg-alt
        ${minHeight}
        flex items-center
      `}
      role="banner"
    >
      {/* Decorative layers */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-24 bg-primary/5"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32
        h-96 w-96 rounded-full bg-primary/25 blur-3xl"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32
        h-96 w-96 rounded-full bg-accent/20 blur-3xl"
      />

      {/* Content */}
      <div className="containerr relative w-full">{children}</div>
    </section>
  );
};

export default HeroLayout;
