import { Link } from "@tanstack/react-router";

import { SubscribeForm } from "./SubscribeForm";

const columnTitle = "text-lg font-medium text-dusty-rose";
const itemClass = "block text-xs leading-[1.7] text-white transition hover:text-sky-blue";

export function Footer() {
  return (
    <footer className="bg-navy-blue px-5 py-14 text-white lg:px-[140px]">
      <div className="mx-auto grid max-w-[1160px] gap-10 md:grid-cols-2 xl:grid-cols-5">
        <div>
          <p className="text-2xl font-bold tracking-[-0.03em] text-sky-blue">
            Build Financial Wellness
          </p>
          <a
            href="#"
            className="mt-6 inline-block text-lg text-burnt-orange underline underline-offset-4"
          >
            Privacy &amp; Terms
          </a>
        </div>

        <div>
          <p className={columnTitle}>Company</p>
          <div className="mt-5 space-y-2">
            <a href="#testimonials" className={itemClass}>
              Testimonials
            </a>
            <Link to="/our-story" className={itemClass}>
              Our Story
            </Link>
            <Link to="/faq" className={itemClass}>
              FAQ
            </Link>
            <Link to="/resources" className={`${itemClass} font-bold`}>
              Resources
            </Link>
            <Link to="/blog" className={`${itemClass} font-bold`}>
              Blog
            </Link>
          </div>
        </div>

        <div>
          <p className={columnTitle}>Services</p>
          <div className="mt-5 space-y-2">
            <a href="#overview" className={itemClass}>
              Overview
            </a>
            <a href="#services" className={itemClass}>
              The Build Journey
            </a>
            <a href="#services" className={itemClass}>
              The Budget Build
            </a>
            <a href="#services" className={itemClass}>
              The Budget Mixer
            </a>
          </div>
        </div>

        <div>
          <p className={columnTitle}>Contact Us</p>
          <div className="mt-5 space-y-2">
            <a href="mailto:info@buildyourfinancialwellness.com" className={itemClass}>
              Email Build Financial Wellness
            </a>
            <a href="tel:18882250352" className={itemClass}>
              1-888-225-0352
            </a>
            <p className="text-xs leading-[1.7] text-white">
              429 E Dupont Rd, Unit #2052
              <br />
              Fort Wayne, IN 46825
            </p>
          </div>
        </div>

        <div>
          <p className={columnTitle}>Stay up to date</p>
          <p className="mt-5 text-xs leading-[1.7] text-white">Subscribe to our newsletter</p>
          <SubscribeForm formTag="SubscribeOnly" variant="footer" />
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-[1160px] flex-col gap-3 text-xs sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Build Financial Wellness, LLC. All rights reserved.</p>
        <p className="text-base">
          Website designer{" "}
          <span className="ml-1 inline-block rounded bg-white px-3 py-1 text-xl font-bold text-navy-blue">
            BLEXware
          </span>
        </p>
      </div>
    </footer>
  );
}
