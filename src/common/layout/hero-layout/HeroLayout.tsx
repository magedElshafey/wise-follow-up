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
      role="banner"
      className={`
        relative
        ${minHeight}
        flex items-center
        overflow-hidden

        /* smooth single gradient */
        bg-gradient-to-b
        from-primary/20
        via-primary/10
        to-bg-page
      `}
    >
      {/* soft ambient blobs – no hard edges */}
      <span
        aria-hidden
        className="
          pointer-events-none
          absolute -top-40 -right-40
          h-[32rem] w-[32rem]
          rounded-full
          bg-primary/20
          blur-[120px]
        "
      />

      <span
        aria-hidden
        className="
          pointer-events-none
          absolute -bottom-40 -left-40
          h-[32rem] w-[32rem]
          rounded-full
          bg-accent/20
          blur-[120px]
        "
      />

      {/* content */}
      <div className="containerr relative w-full">{children}</div>
    </section>
  );
};

export default HeroLayout;
