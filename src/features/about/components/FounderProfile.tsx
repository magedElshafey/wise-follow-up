// src/components/about/FounderProfile.tsx
import { FaLinkedin, FaXTwitter } from "react-icons/fa6";

type Props = {
  name: string;
  role: string;
  image: string;
  bio: string;
  socials: {
    linkedin?: string;
    twitter?: string;
  };
  reverse?: boolean;
};

export default function FounderProfile({
  name,
  role,
  image,
  bio,
  socials,
  reverse = false,
}: Props) {
  return (
    <section className="bg-bg-surface py-section-y">
      <div
        className={`
          containerr
          grid gap-12 items-center
          lg:grid-cols-2
          ${reverse ? "lg:[&>*:first-child]:order-2" : ""}
        `}
      >
        {/* Image */}
        <div className="relative">
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="
              w-full
              h-[420px] md:h-[480px]
              object-cover
              rounded-card
              shadow-soft
            "
          />
        </div>

        {/* Content */}
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-4xl font-semibold text-secondary">
            {name}
          </h2>

          <p className="mt-1 text-primary font-medium text-sm md:text-base">
            {role}
          </p>

          <p className="mt-6 text-base md:text-lg text-text-muted leading-relaxed whitespace-pre-line">
            {bio}
          </p>

          {/* Social links */}
          {(socials.linkedin || socials.twitter) && (
            <div className="mt-6 flex items-center gap-3">
              {socials.linkedin && (
                <SocialButton href={socials.linkedin} label="LinkedIn profile">
                  <FaLinkedin size={18} />
                  <span>LinkedIn</span>
                </SocialButton>
              )}

              {socials.twitter && (
                <SocialButton
                  href={socials.twitter}
                  label="X / Twitter profile"
                >
                  <FaXTwitter size={18} />
                  <span>X (Twitter)</span>
                </SocialButton>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Social Btn                                  */
/* -------------------------------------------------------------------------- */

function SocialButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="
        inline-flex items-center gap-2
        rounded-pill
        border border-border-subtle
        bg-bg-page
        px-4 py-2
        text-sm font-medium text-text-main
        hover:bg-primary-soft hover:text-primary
        transition
        focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-primary
        focus-visible:ring-offset-2 focus-visible:ring-offset-bg-surface
      "
    >
      {children}
    </a>
  );
}
