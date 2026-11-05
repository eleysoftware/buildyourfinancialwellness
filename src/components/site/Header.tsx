import { useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";

import logo from "@/assets/logo-transparent-png.png";
import { useAuth } from "@/hooks/useAuth";

const linkClass =
  "whitespace-nowrap text-base font-bold text-navy-blue transition-colors hover:text-sage-green-sat50";

export function Header() {
  const [supportOpen, setSupportOpen] = useState(false);
  const [supportMenuVisible, setSupportMenuVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  function scrollToTarget(id: string) {
    const target = document.getElementById(id);
    if (!target) return;
    const header = document.querySelector("header");
    const offset = (header?.getBoundingClientRect().height ?? 88) + 16;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }

  function goToSection(id: string) {
    if (pathname === "/") {
      scrollToTarget(id);
      return;
    }
    void navigate({ to: "/", hash: id }).then(() => {
      window.setTimeout(() => scrollToTarget(id), 50);
    });
  }

  const sectionLinks = [
    { id: "overview", label: "Overview" },
    { id: "services", label: "Services" },
  ];

  const submenuItemClass =
    "block w-full px-4 py-2 text-left text-sm font-bold text-navy-blue transition-colors hover:text-sage-green-sat50";
  const nestedItemClass =
    "block w-full py-2 pl-8 pr-4 text-left text-sm font-bold text-navy-blue transition-colors hover:text-sage-green-sat50";

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function openSupport() {
    setSupportOpen(true);
    if (prefersReducedMotion()) {
      setSupportMenuVisible(true);
    }
  }

  function closeSupport() {
    setSupportMenuVisible(false);
    setSupportOpen(false);
  }

  function toggleSupport() {
    if (supportOpen) {
      closeSupport();
    } else {
      openSupport();
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-[#3299e9] bg-white">
      <div className="mx-auto flex h-[85px] max-w-[1440px] items-center justify-between gap-6 px-5 lg:gap-10 lg:px-[60px] 2xl:px-[141px]">
        <Link
          to="/"
          className="shrink-0"
          onClick={(event) => {
            if (pathname === "/") {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <img
            src={logo}
            alt="Build Financial Wellness — our name is our mission"
            className="h-[52px] w-auto lg:h-[78px]"
          />
        </Link>

        <nav className="hidden translate-y-[9px] items-center gap-7 xl:flex">
          {sectionLinks.map((item) => (
            <button key={item.id} className={linkClass} onClick={() => goToSection(item.id)}>
              {item.label}
            </button>
          ))}
          <Link to="/our-story" className={linkClass}>
            Our Story
          </Link>
          <button className={linkClass} onClick={() => goToSection("testimonials")}>
            Testimonials
          </button>
          <div
            className="relative"
            onMouseEnter={openSupport}
            onMouseLeave={closeSupport}
          >
            <button
              className={`${linkClass} flex items-center gap-1`}
              onClick={toggleSupport}
              aria-expanded={supportOpen}
            >
              Resources
              <span
                aria-hidden="true"
                className={`inline-flex size-3.5 shrink-0 origin-center items-center justify-center text-sage-green-sat50 transition-transform duration-200 motion-reduce:transition-none ${
                  supportOpen ? "rotate-180" : "rotate-0"
                }`}
                onTransitionEnd={(event) => {
                  if ((event.propertyName === "rotate" || event.propertyName === "transform") && supportOpen) {
                    setSupportMenuVisible(true);
                  }
                }}
              >
                <svg viewBox="0 0 14 14" className="block size-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2.5 8.5 7 4l4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
            {supportMenuVisible ? (
              <div className="absolute left-0 top-full z-50 w-60 rounded border border-light-gray bg-white py-2 shadow-big-shadow">
                <Link to="/faq" className={submenuItemClass}>
                  FAQ
                </Link>
                <Link to="/resources" className={submenuItemClass}>
                  Resource Library
                </Link>
                <Link to="/resources" search={{ tab: "tools" }} className={nestedItemClass}>
                  Tools
                </Link>
                <Link to="/resources" search={{ tab: "newsletters" }} className={nestedItemClass}>
                  Newsletter
                </Link>
                <button
                  className={submenuItemClass}
                  onClick={() => {
                    closeSupport();
                    goToSection("contact");
                  }}
                >
                  Contact Us
                </button>
                <Link to="/privacy-terms" hash="privacy-policy" className={submenuItemClass}>
                  Privacy Policy
                </Link>
                <Link to="/privacy-terms" hash="terms-of-use" className={submenuItemClass}>
                  Terms of Use Policy
                </Link>
              </div>
            ) : null}
          </div>
          <Link
            to={user ? "/account" : "/auth"}
            className="inline-flex h-[38px] items-center rounded-[80px] bg-navy-blue px-4 text-base font-bold text-white shadow-[0px_4px_3px_0px_rgb(0_0_0_/_0.35)] transition hover:bg-[#57ae83]"
          >
            {user ? "My Account" : "Employee Login"}
          </Link>
        </nav>

        <button
          className="text-navy-blue xl:hidden"
          aria-label="Open menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {mobileOpen ? (
        <nav className="flex flex-col gap-1 border-t border-light-gray bg-white px-5 py-4 xl:hidden">
          {sectionLinks.map((item) => (
            <button
              key={item.id}
              className={`${linkClass} py-2 text-left`}
              onClick={() => {
                setMobileOpen(false);
                goToSection(item.id);
              }}
            >
              {item.label}
            </button>
          ))}
          <Link to="/our-story" className={`${linkClass} py-2`} onClick={() => setMobileOpen(false)}>
            Our Story
          </Link>
          <button
            className={`${linkClass} py-2 text-left`}
            onClick={() => {
              setMobileOpen(false);
              goToSection("testimonials");
            }}
          >
            Testimonials
          </button>
          <button
            className={`${linkClass} flex items-center gap-1 py-2 text-left`}
            aria-expanded={resourcesOpen}
            onClick={() => setResourcesOpen((open) => !open)}
          >
            Resources
            <span
              aria-hidden="true"
              className={`inline-flex size-3.5 items-center justify-center text-sage-green-sat50 transition-transform ${
                resourcesOpen ? "rotate-180" : ""
              }`}
            >
              <svg viewBox="0 0 14 14" className="block size-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2.5 8.5 7 4l4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
          {resourcesOpen ? (
            <>
              <Link to="/faq" className={`${linkClass} py-2 pl-4`} onClick={() => setMobileOpen(false)}>
                FAQ
              </Link>
              <Link to="/resources" className={`${linkClass} py-2 pl-4`} onClick={() => setMobileOpen(false)}>
                Resource Library
              </Link>
              <Link
                to="/resources"
                search={{ tab: "tools" }}
                className={`${linkClass} py-2 pl-8`}
                onClick={() => setMobileOpen(false)}
              >
                Tools
              </Link>
              <Link
                to="/resources"
                search={{ tab: "newsletters" }}
                className={`${linkClass} py-2 pl-8`}
                onClick={() => setMobileOpen(false)}
              >
                Newsletter
              </Link>
              <button
                className={`${linkClass} py-2 pl-4 text-left`}
                onClick={() => {
                  setMobileOpen(false);
                  goToSection("contact");
                }}
              >
                Contact Us
              </button>
              <Link
                to="/privacy-terms"
                hash="privacy-policy"
                className={`${linkClass} py-2 pl-4`}
                onClick={() => setMobileOpen(false)}
              >
                Privacy Policy
              </Link>
              <Link
                to="/privacy-terms"
                hash="terms-of-use"
                className={`${linkClass} py-2 pl-4`}
                onClick={() => setMobileOpen(false)}
              >
                Terms of Use Policy
              </Link>
            </>
          ) : null}
          <Link
            to={user ? "/account" : "/auth"}
            onClick={() => setMobileOpen(false)}
            className="mt-3 inline-flex h-[44px] items-center justify-center rounded-[80px] bg-navy-blue px-4 text-base font-bold text-white shadow-[0px_4px_3px_0px_rgb(0_0_0_/_0.35)]"
          >
            {user ? "My Account" : "Employee Login"}
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
