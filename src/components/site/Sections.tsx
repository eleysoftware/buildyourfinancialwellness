import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";

import heroImage from "@/assets/bfw-hero-image.avif.asset.json";
import overviewImage from "@/assets/section-services-image-jpg.png.asset.json";
import thumb1 from "@/assets/service-thumbnail.png.asset.json";
import thumb2 from "@/assets/service-thumbnail-2.png.asset.json";
import thumb3 from "@/assets/service-thumbnail-3.png.asset.json";
import iconLocation from "@/assets/iconcommunicationlocationon24px.png.asset.json";
import iconCall from "@/assets/iconcommunicationcall24px.png.asset.json";
import iconEmail from "@/assets/iconcommunicationemail24px.png.asset.json";
import iconBusiness from "@/assets/iconcommunicationbusiness24px.png.asset.json";
import star from "@/assets/star.png.asset.json";
import avatar1 from "@/assets/avatar.png.asset.json";
import avatar2 from "@/assets/avatar-2.png.asset.json";
import avatar3 from "@/assets/avatar-3.png.asset.json";
import avatar4 from "@/assets/ellipse.png.asset.json";
import avatar5 from "@/assets/ellipse-2.png.asset.json";
import avatar6 from "@/assets/kj-testimonial.png.asset.json";

import { DotGrid } from "./DotGrid";
import { SubscribeForm } from "./SubscribeForm";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={heroImage.url}
        alt="Smiling woman in conversation"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[60%_center]"
      />
      <div className="absolute inset-0 -z-10 bg-navy-blue/15" />
      <div className="mx-auto max-w-[1440px] px-5 py-24 lg:px-[150px] lg:py-[117px]">
        <div className="max-w-[664px]">
          <h1 className="text-4xl font-bold leading-[0.95] text-white sm:text-5xl lg:text-6xl lg:leading-[0.83]">
            BUILD A STRONGER
            <br />
            <span className="text-burnt-orange">FINANCIAL FUTURE</span>
            <br />
            STARTING TODAY
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-color-white lg:text-2xl">
            Step into your era of financial confidence—judgment-free guidance, expert tools, and a
            clear path to the future you deserve.
          </p>
          <div className="mt-10">
            <SubscribeForm formTag="GetStarted" variant="hero" submitLabel="Get Started!" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Overview() {
  return (
    <section id="overview" className="scroll-mt-24 bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 lg:grid-cols-[788px_1fr] lg:gap-16 lg:px-0">
        <div className="relative">
          <DotGrid color="orange" rows={10} cols={10} className="absolute -top-10 left-8 hidden lg:grid" />
          <img
            src={overviewImage.url}
            alt="Notebook reading 'My secret plan to conquer the world'"
            className="w-full rounded-r shadow-big-shadow lg:max-w-[745px]"
          />
          <DotGrid
            color="sage"
            rows={10}
            cols={10}
            className="absolute -bottom-10 right-4 hidden lg:grid"
          />
        </div>

        <div className="px-0 lg:pr-[150px]">
          <h2 className="text-[22px] font-bold leading-tight text-navy-blue sm:text-3xl lg:text-[38px] lg:leading-[0.94]">
            <span className="block whitespace-nowrap"><span className="text-sky-blue">Build</span> Habits.</span>
            <span className="block whitespace-nowrap"><span className="text-sky-blue">Build</span> Confidence.</span>
            <span className="block whitespace-nowrap"><span className="text-sky-blue">Build</span> Financial Wellness.</span>
          </h2>
          <p className="mt-8 text-lg leading-loose text-navy-blue-sat50 lg:text-xl">
            Financial wellness goes beyond the numbers. It's about shifting mindsets, creating
            healthy financial habits, and building confidence.
          </p>
          <p className="mt-4 text-lg leading-loose text-navy-blue-sat50 lg:text-xl">Together we'll:</p>
          <ul className="mt-6 space-y-4">
            {[
              "Clarify what's holding you back and highlight what's possible",
              "Turn uncertainty into a clear, achievable financial plan",
              "Build habits and systems that support long-term success",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-base text-navy-blue-sat50 lg:text-lg">
                <span className="mt-1 h-4 w-4 shrink-0 rounded-full bg-sage-green-sat50" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 space-y-3">
            <Link to="/faq" className="block text-lg font-semibold text-sky-blue hover:underline">
              Learn More (FAQ) →
            </Link>
            <Link
              to="/faq"
              hash="who-can-benefit"
              className="block text-lg font-semibold text-sage-green-sat50 hover:underline"
            >
              Who can benefit from financial coaching? →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const services = [
  {
    title: "The Build Journey",
    image: thumb1,
    lead: "Start your journey to financial clarity and confidence.",
    body: "This ongoing coaching experience helps you shift your money mindset, build strong habits, and make confident financial decisions. Start with a FREE CONSULTATION to explore your goals and see if coaching is the right next step.",
    meta: "Own your journey | Build a future | Stay empowered",
    cta: "Book Your Free Consultation",
    ctaClass: "bg-navy-blue underline",
    recommended: true,
  },
  {
    title: "The Budget Build",
    image: thumb2,
    lead: "Build a budget that supports your real life.",
    body: "This one-time, hands-on workshop helps individuals, couples, and families create a personalized, goals-based budget and gain the confidence to stick with it. Want continued support? We're here to help you keep building.",
    meta: "One session | Real-life tools | Optional next steps",
    cta: "Book The Budget Build",
    ctaClass: "bg-sky-blue",
    recommended: false,
  },
  {
    title: "The Budget Mixer",
    image: thumb3,
    lead: "Bring your people—we'll bring the budgeting tools.",
    body: "Whether it's a girls' night, team event, or family meetup, The Budget Mixer turns money talk into a fun, judgment-free group experience. Spark connection, build confidence, and leave with practical tools you can actually use.",
    meta: "Learn together | Budget better | Leave empowered",
    cta: "Explore or Plan Your Mixer",
    ctaClass: "bg-sky-blue",
    recommended: false,
  },
];

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-slate-50 pb-24 pt-10 lg:pb-32">
      <div className="mx-auto max-w-[1200px] px-5">
        <h2 className="text-3xl font-bold text-navy-blue lg:text-5xl">
          Support for Every Step of <span className="text-sky-blue">Your</span> Journey.
        </h2>

        <div className="mt-12 grid auto-rows-fr gap-x-8 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="relative flex h-full min-w-0 px-4 pb-4 pt-14"
            >
              {service.recommended ? (
                <div className="absolute inset-0 rounded bg-dusty-rose-sat67 shadow-big-shadow">
                  <p className="flex h-14 items-center justify-center text-center text-xl font-bold text-color-white lg:text-[27px]">
                    RECOMMENDED
                  </p>
                </div>
              ) : null}
              <article className="relative z-10 flex h-full min-w-0 flex-col overflow-hidden rounded bg-white shadow-big-shadow transition hover:shadow-[8px_8px_8px_0px_rgb(50_153_233)]">
                <img
                  src={service.image.url}
                  alt={service.title}
                  className="h-[168px] w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-[22px] font-semibold text-navy-blue-sat85-bright79">
                    {service.title}
                    <sup className="ml-1 text-xs text-color-grey">™</sup>
                  </h3>
                  <p className="mt-4 text-sm font-semibold text-dusty-rose-sat67">{service.lead}</p>
                  <p className="mt-4 text-sm leading-relaxed text-navy-blue-sat50">{service.body}</p>
                  <p className="mt-auto pt-6 text-sm font-medium text-sky-blue">{service.meta}</p>
                  <a
                    href="#contact"
                    className={`mt-6 flex h-14 items-center justify-center rounded-[80px] px-4 text-center text-base font-bold text-white shadow-[0px_4px_3px_0px_rgb(0_0_0_/_0.35)] transition hover:brightness-110 ${service.ctaClass}`}
                  >
                    {service.cta}
                  </a>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const contactDetails = [
  { icon: iconBusiness, text: "Build Financial Wellness", href: undefined },
  {
    icon: iconEmail,
    text: "info@buildyourfinancialwellness.com",
    href: "mailto:info@buildyourfinancialwellness.com",
  },
  { icon: iconCall, text: "1 (888) 225-0352", href: "tel:18882250352" },
  { icon: iconLocation, text: "429 E Dupont Rd, Unit #2052\nFort Wayne, IN 46825", href: undefined },
];

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto grid max-w-[1200px] items-center gap-14 px-5 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold text-navy-blue lg:text-5xl">
            Get in <span className="text-sky-blue">Touch</span>.
          </h2>
          <ul className="mt-10 space-y-6">
            {contactDetails.map((detail) => (
              <li key={detail.text} className="flex items-start gap-4">
                <img src={detail.icon.url} alt="" aria-hidden="true" className="mt-1 h-6 w-6" />
                {detail.href ? (
                  <a
                    href={detail.href}
                    className="text-lg text-navy-blue-sat50 hover:text-sky-blue lg:text-2xl"
                  >
                    {detail.text}
                  </a>
                ) : (
                  <p className="whitespace-pre-line text-lg text-navy-blue-sat50 lg:text-2xl">
                    {detail.text}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <DotGrid
            color="sky"
            rows={10}
            cols={10}
            className="absolute -left-6 -top-10 hidden lg:grid"
          />
          <div className="relative rounded-[10px] bg-sage-green-sat50 p-8 shadow-big-shadow lg:p-12">
            <p className="text-center text-xl text-color-white lg:text-2xl">
              <span className="font-bold">Download</span> your special edition of the Financially
              Well newsletter:
              <br />
              <em>"Budgeting When Prices Won't Sit Still"</em>
            </p>
            <SubscribeForm formTag="Newsletter" variant="newsletter" withFirstName />
          </div>
          <DotGrid
            color="orange"
            rows={10}
            cols={10}
            className="absolute -bottom-12 right-0 hidden lg:grid"
          />
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    quote:
      "TaMara genuinely wants to help. She gets to the root of the problem and we accomplished a lot in the first session. I'm excited for the next. I'm glad she's my financial coach!",
    name: "Lavonda K.",
    role: "Package Handler at UPS",
    avatar: avatar1,
  },
  {
    quote:
      "TaMara is excellent at setting attainable goals to achieve. We now have concrete steps to meet our financial goals. 5/5 recommended!",
    name: "Lauren F.",
    role: "Bird Feeding Expert at WBU",
    avatar: avatar3,
    second: { name: "Brandon F.", role: "eBayer & Private Music Educator", avatar: avatar2 },
  },
  {
    quote:
      "TaMara is our first experience with a financial coach. We have been very pleased. Highly encourage you to meet one time with her—glad we did.",
    name: "Melissa W.",
    role: "Director of Women's Health at Parkview",
    avatar: avatar5,
    second: { name: "Dustin W.", role: "Vice President at Onxx Tool", avatar: avatar4 },
  },
  {
    quote:
      "TaMara's organized, attention to detail, and well-thought-out plan made for a very pleasant experience collaborating with her. She's A1 and I highly recommend her services!",
    name: "K. J.",
    role: "Technology Consultant",
    avatar: avatar6,
  },
];

function Person({
  avatar,
  name,
  role,
}: {
  avatar: { url: string };
  name: string;
  role: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <img src={avatar.url} alt={name} className="h-[50px] w-[50px] rounded-full object-cover" />
      <div>
        <p className="text-base font-bold text-[#697694]">{name}</p>
        <p className="text-xs text-[#697694]">{role}</p>
      </div>
    </div>
  );
}

export function Testimonials() {
  const scroller = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [updateArrows]);

  const scrollByAmount = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const firstCard = el.firstElementChild;
    const cardWidth = firstCard?.getBoundingClientRect().width ?? 320;
    const gap = Number.parseFloat(window.getComputedStyle(el).columnGap) || 24;
    el.scrollBy({ left: (cardWidth + gap) * dir, behavior: "smooth" });
  };

  return (
    <section id="testimonials" className="scroll-mt-24 bg-slate-50 pb-24 lg:pb-32">
      <div className="mx-auto max-w-[1200px] px-5">
        <h2 className="text-3xl font-bold text-navy-blue lg:text-5xl">
          What People Are Saying About{" "}
          <span className="text-sky-blue">Build Financial Wellness</span>.
        </h2>

        <div className="relative mt-12">
          <div
            ref={scroller}
            onScroll={updateArrows}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-20 lg:pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {testimonials.map((item) => (
              <article
                key={item.name}
                className="flex w-[300px] shrink-0 snap-start flex-col rounded bg-white p-8 shadow-big-shadow sm:w-[340px]"
              >
                <div className="flex gap-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <img key={i} src={star.url} alt="" aria-hidden="true" className="h-3.5 w-3.5" />
                  ))}
                </div>
                <p className="mt-6 flex-1 text-lg leading-normal text-[#697694]">{item.quote}</p>
                <div className="mt-8 space-y-4">
                  {item.second ? <Person {...item.second} /> : null}
                  <Person avatar={item.avatar} name={item.name} role={item.role} />
                </div>
              </article>
            ))}
          </div>

          <button
            aria-label="Previous testimonials"
            onClick={() => scrollByAmount(-1)}
            className={`absolute bottom-1 left-0 flex h-11 w-11 items-center justify-center rounded-full bg-light-gray/80 text-white shadow-big-shadow transition hover:bg-light-gray lg:bottom-auto lg:top-1/2 lg:h-12 lg:w-12 lg:-translate-y-1/2 ${
              canScrollLeft ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            aria-label="Next testimonials"
            onClick={() => scrollByAmount(1)}
            className={`absolute bottom-1 right-0 flex h-11 w-11 items-center justify-center rounded-full bg-light-gray/80 text-white shadow-big-shadow transition hover:bg-light-gray lg:bottom-auto lg:top-1/2 lg:h-12 lg:w-12 lg:-translate-y-1/2 ${
              canScrollRight ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
