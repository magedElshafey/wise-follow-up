// import React, { useState } from "react";
// import NavbarLinks from "./links/NavbarLinks";
// import { type NavLinkItem, DEFAULT_LINKS } from "./data/navbarData";
// import Logo from "@/common/components/logo/Logo";
// import NavbarLanguageToggle from "./lang-menu/LangMenu";
// import NavbarCtaButton from "./cta/NavbarCtaButton";
// import MobileMenuButton from "./mobile-menu-button/MobileMenuButton";
// import MobileMenu from "../mobile-menu/MobileMenu";
// export type NavbarProps = {
//   links?: NavLinkItem[];
//   logo?: string;
// };
// const Navbar: React.FC<NavbarProps> = ({
//   links = DEFAULT_LINKS,
//   logo = "",
// }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <header
//       className="
//         z-40
//       bg-bg-surface/90 backdrop-blur
//     border-b border-border-subtle
//       "
//     >
//       <div className="containerr">
//         <nav
//           className="
//             flex items-center justify-between
//             py-3 md:py-3.5
//             gap-3
//           "
//           aria-label="Main navigation"
//         >
//           <Logo logo={logo} />

//           {/* Desktop nav */}
//           <div className="hidden md:flex md:items-center md:gap-6 lg:gap-8">
//             <NavbarLinks links={links} />
//           </div>

//           {/* Desktop actions (CTA + language placeholder) */}
//           <div className="hidden md:flex md:items-center md:gap-4">
//             <NavbarLanguageToggle />
//             <NavbarCtaButton />
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <MobileMenuButton
//               isOpen={isOpen}
//               onToggle={() => setIsOpen((prev) => !prev)}
//             />
//           </div>
//         </nav>

//         {/* Mobile menu panel */}
//         <MobileMenu isOpen={isOpen} links={links} />
//       </div>
//     </header>
//   );
// };

// export default Navbar;
import React, { useCallback, useEffect, useState } from "react";
import NavbarLinks from "./links/NavbarLinks";
import { type NavLinkItem, DEFAULT_LINKS } from "./data/navbarData";
import Logo from "@/common/components/logo/Logo";
import NavbarLanguageToggle from "./lang-menu/LangMenu";
import NavbarCtaButton from "./cta/NavbarCtaButton";
import MobileMenuButton from "./mobile-menu-button/MobileMenuButton";
import MobileMenu from "../mobile-menu/MobileMenu";

export type NavbarProps = {
  links?: NavLinkItem[];
  logo?: string;
};

const Navbar: React.FC<NavbarProps> = ({
  links = DEFAULT_LINKS,
  logo = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className="
        z-40
        bg-bg-surface/90 backdrop-blur
        border-b border-border-subtle
      "
    >
      <div className="containerr">
        <nav
          className="
            flex items-center justify-between
            py-3 md:py-3.5
            gap-3
          "
          aria-label="Main navigation"
        >
          <Logo logo={logo} />

          {/* Desktop nav */}
          <div className="hidden md:flex md:items-center md:gap-6 lg:gap-8">
            <NavbarLinks links={links} />
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex md:items-center md:gap-4">
            <NavbarLanguageToggle />
            <NavbarCtaButton />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <MobileMenuButton
              isOpen={isOpen}
              onToggle={toggleMenu}
              aria-expanded={isOpen}
              aria-controls="primary-mobile-nav"
            />
          </div>
        </nav>

        {/* Mobile menu */}
        <MobileMenu isOpen={isOpen} links={links} toggleMenu={toggleMenu} />
      </div>
    </header>
  );
};

export default Navbar;
