import React from "react";
import BrandBlock from "./components/brand-block/BrandBlock";
import { type FooterLinkGroup as FooterLinkGroupT } from "./types/footer.types";
import FooterLinkGroup from "./components/footer-links/FooterLinkGroup";
import SafetyNote from "./components/note/SafetyNote";
import CopyRight from "./components/copyrights/CopyRight";
import FooterConnectSection from "./components/connect/FooterConnectSection";
const LINK_GROUPS: FooterLinkGroupT[] = [
  {
    id: "leaflets",
    title: "Patient leaflets",
    links: [
      { label: "All leaflets", href: "/leaflets" },
      {
        label: "Eye conditions",
        href: "/explore?type=leaflets&category=eye-conditions",
      },
      {
        label: "Procedures & surgery",
        href: "/explore?type=leaflets&category=procedures",
      },
      {
        label: "Medications",
        href: "/explore?type=leaflets&category=medications",
      },
    ],
  },

  {
    id: "about",
    title: "About Wise Follow Up",
    links: [
      { label: "About this website", href: "/about" },
      { label: "For clinicians", href: "/for-clinicians" },
      { label: "Accessibility", href: "/accessibility" },
      { label: "Feedback & suggestions", href: "/contact" },
    ],
  },
];

const Footer: React.FC = () => {
  return (
    <footer
      className="
        mt-10 border-t border-border-subtle
        bg-bg-surface
      "
      aria-label="Site footer"
    >
      <div className="containerr py-8 md:py-10 lg:py-12">
        {/* Top section */}
        <div className="grid gap-8 lg:gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1.4fr)] items-start">
          <BrandBlock />

          {/* Links groups */}
          <nav
            aria-label="Footer navigation"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {LINK_GROUPS.map((group) => (
              <FooterLinkGroup key={group.id} group={group} />
            ))}
          </nav>
        </div>

        {/* Middle section: safety note */}
        <SafetyNote />
        <FooterConnectSection buyMeCoffeeUrl="https://www.buymeacoffee.com/yourPage" />
        {/* copyRight */}
        <CopyRight />
      </div>
    </footer>
  );
};

export default Footer;

/* =========================
   Sub components
   ========================= */
