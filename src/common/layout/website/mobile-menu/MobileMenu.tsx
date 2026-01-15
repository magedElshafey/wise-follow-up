import React, { useEffect, useRef } from "react";
import NavbarLanguageToggle from "../navbar/lang-menu/LangMenu";
import { NavLinkItem } from "../navbar/data/navbarData";
import { Link, NavLink, useLocation } from "react-router-dom";
import MainBtn from "@/common/components/buttons/MainBtn";
import { useTranslation } from "react-i18next";
type MobileMenuProps = {
  isOpen: boolean;
  links: NavLinkItem[];
  toggleMenu: () => void;
};

const NAVBAR_HEIGHT = 64; // عدّلها لو عندك navbar height مختلف

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  links,
  toggleMenu,
}) => {
  const { t } = useTranslation();
  const location = useLocation();
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  const isActiveLink = (href: string) => {
    const url = new URL(href, window.location.origin);
    return (
      location.pathname === url.pathname &&
      new URLSearchParams(location.search).get("type") ===
        url.searchParams.get("type")
    );
  };

  useEffect(() => {
    if (isOpen) {
      firstLinkRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <div
      id="primary-mobile-nav"
      aria-hidden={!isOpen}
      className={`
        md:hidden
        absolute left-0 right-0
        bg-bg-surface
        border-t border-border-subtle
        overflow-hidden
        transition-all duration-300 ease-out
        ${isOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"}
      `}
      style={{ top: NAVBAR_HEIGHT }}
    >
      <nav aria-label="Mobile main navigation" className="pt-3 space-y-3">
        <ul className="space-y-1">
          {links.map((link, index) => (
            <li key={link.id}>
              <NavLink
                onClick={toggleMenu}
                ref={index === 0 ? firstLinkRef : undefined}
                to={link.href}
                className={`block w-full text-start px-4 py-2 rounded-card
                  transition-colors focus:outline-none
                  ${
                    isActiveLink(link.href)
                      ? "text-primary font-semibold"
                      : "text-text-muted hover:text-text-main"
                  }`}
              >
                {t(link.label)}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="pt-3 border-t flex items-center justify-between gap-3 px-4 pb-4">
          <NavbarLanguageToggle />
          <Link onClick={toggleMenu} to="/leaflets">
            <MainBtn
              variant="primary"
              className="text-xs sm:text-sm px-4 py-2 sm:px-5 sm:py-2.5"
            >
              {t("Browse leaflets")}
            </MainBtn>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default React.memo(MobileMenu);
