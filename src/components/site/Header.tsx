import { useState } from "react";
import { Link } from "@tanstack/react-router";

import logo from "@/assets/logo-transparent-png.png.asset.json";

const linkClass =
  "text-base font-bold text-navy-blue transition-colors hover:text-sage-green-sat50";

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Header() {
  const [supportOpen, setSupportOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sectionLinks = [
    { id: "overview", label: "Overview" },
    { id: "services", label: "Services" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-[#3299e9] bg-white">
      <div className="mx-auto flex h-[85px] max-w-[1440px] items-center justify-between px-5 lg:px-[141px]">
        <Link to="/" className="shrink-0">
          <img
            src={logo.url}
            alt="Build Financial Wellness — our name is our mission"
            className="h-[52px] w-auto lg:h-[78px]"
          />
        </Link>

        <nav className="hidden items-center gap-7 xl:flex">
          {sectionLinks.map((item) => (
            <button key={item.id} className={linkClass} onClick={() => scrollToSection(item.id)}>
              {item.label}
            </button>
          ))}
          <Link to="/our-story" className={linkClass}>
            Our Story
          </Link>
          <button className={linkClass} onClick={() => scrollToSection("testimonials")}>
            Testimonials
          </button>
          <div
            className="relative"
            onMouseEnter={() => setSupportOpen(true)}
            onMouseLeave={() => setSupportOpen(false)}
          >
            <button
              className={`${linkClass} flex items-center gap-1`}
              onClick={() => setSupportOpen((v) => !v)}
              aria-expanded={supportOpen}
            >
              Support
              <span className="text-sage-green-sat50">^</span>
            </button>
            {supportOpen ? (
              <div className="absolute left-0 top-full z-50 w-52 rounded border border-light-gray bg-white py-2 shadow-big-shadow">
                <button
                  className="block w-full px-4 py-2 text-left text-sm font-bold text-navy-blue hover:bg-color-white"
                  onClick={() => {
                    setSupportOpen(false);
                    scrollToSection("contact");
                  }}
                >
                  Contact Us
                </button>
                <Link
                  to="/faq"
                  className="block px-4 py-2 text-sm font-bold text-navy-blue hover:bg-color-white"
                >
                  FAQ
                </Link>
                <Link
                  to="/resources"
                  className="block px-4 py-2 text-sm font-bold text-navy-blue hover:bg-color-white"
                >
                  Resources
                </Link>
                <Link
                  to="/blog"
                  className="block px-4 py-2 text-sm font-bold text-navy-blue hover:bg-color-white"
                >
                  Blog
                </Link>
              </div>
            ) : null}
          </div>
          <button
            onClick={() => scrollToSection("contact")}
            className="h-[38px] rounded-[80px] bg-navy-blue px-4 text-base font-bold text-white shadow-[0px_4px_3px_0px_rgb(0_0_0_/_0.35)] transition hover:bg-[#57ae83]"
          >
            BOOK A FREE CONSULTATION
          </button>
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
                scrollToSection(item.id);
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
              scrollToSection("testimonials");
            }}
          >
            Testimonials
          </button>
          <button
            className={`${linkClass} py-2 text-left`}
            onClick={() => {
              setMobileOpen(false);
              scrollToSection("contact");
            }}
          >
            Contact Us
          </button>
          <Link to="/faq" className={`${linkClass} py-2`} onClick={() => setMobileOpen(false)}>
            FAQ
          </Link>
          <Link to="/resources" className={`${linkClass} py-2`} onClick={() => setMobileOpen(false)}>
            Resources
          </Link>
          <Link to="/blog" className={`${linkClass} py-2`} onClick={() => setMobileOpen(false)}>
            Blog
          </Link>
          <button
            onClick={() => {
              setMobileOpen(false);
              scrollToSection("contact");
            }}
            className="mt-3 h-[44px] rounded-[80px] bg-navy-blue px-4 text-base font-bold text-white shadow-[0px_4px_3px_0px_rgb(0_0_0_/_0.35)]"
          >
            BOOK A FREE CONSULTATION
          </button>
        </nav>
      ) : null}
    </header>
  );
}
