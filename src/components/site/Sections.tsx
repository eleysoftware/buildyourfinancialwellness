import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Calendar, Check, ClipboardList, Route, Users } from "lucide-react";

import heroImage from "@/assets/bfw-hero-image.webp";
import overviewImage from "@/assets/section-services-image-jpg.png";
import individualsBanner from "@/assets/service-individuals-banner.jpg";
import employersBanner from "@/assets/service-employers-banner.jpg";
import iconLocation from "@/assets/iconcommunicationlocationon24px.png";
import iconCall from "@/assets/iconcommunicationcall24px.png";
import iconEmail from "@/assets/iconcommunicationemail24px.png";
import iconBusiness from "@/assets/iconcommunicationbusiness24px.png";
import star from "@/assets/star.png";
import avatar1 from "@/assets/avatar.png";
import avatar2 from "@/assets/avatar-2.png";
import avatar3 from "@/assets/avatar-3.png";
import avatar4 from "@/assets/ellipse.png";
import avatar5 from "@/assets/ellipse-2.png";
import avatar6 from "@/assets/kj-testimonial.png";

import { pageTitleAccentClass, pageTitleClass, pageTitlePeriodClass } from "./page-title";
import { DotGrid } from "./DotGrid";
import { SavingsResetKitForm } from "./SavingsResetKitForm";
import { SubscribeForm } from "./SubscribeForm";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={heroImage}
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
          <p className="mt-6 text-lg leading-relaxed text-color-white lg:text-2xl">
            Receive your free five-minute Financial Check-In to help you reflect, gain clarity, and
            discover your next financial step.
          </p>
          <div className="mt-8">
            <SubscribeForm
              formTag="GetStarted"
              variant="hero"
              submitLabel={"Get Your Free\nFinancial Check-In"}
              successMessage="Thank you! It's being delivered to your inbox."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Overview() {
  return (
    <section className="bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto grid max-w-[1440px] items-start gap-12 px-5 lg:grid-cols-[minmax(0,745px)_minmax(34rem,1fr)] lg:gap-6 lg:px-0">
        <div className="relative">
          <DotGrid color="orange" rows={10} cols={10} className="absolute -top-10 left-8 hidden lg:grid" />
          <img
            src={overviewImage}
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

        <div className="min-w-0 px-0 lg:pr-6">
          <h2 id="overview" className={`${pageTitleClass} scroll-mt-28 max-lg:text-[clamp(1.15rem,calc((100vw-2.5rem)/10.5),2.25rem)]`}>
            <span className="block whitespace-nowrap"><span className={pageTitleAccentClass}>Build</span> Habits<span className={pageTitlePeriodClass}>.</span></span>
            <span className="block whitespace-nowrap"><span className={pageTitleAccentClass}>Build</span> Confidence<span className={pageTitlePeriodClass}>.</span></span>
            <span className="block whitespace-nowrap"><span className={pageTitleAccentClass}>Build</span> Financial Wellness<span className={pageTitlePeriodClass}>.</span></span>
          </h2>
          <p className="mt-8 text-lg leading-loose text-navy-blue-sat50 lg:text-xl">
            Financial wellness goes beyond the numbers. It's about shifting mindsets, creating
            healthy financial habits, and building confidence.
          </p>
          <p className="mt-4 text-lg leading-loose text-navy-blue-sat50 lg:text-xl">Financial coaching can help:</p>
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

const householdOfferings = [
  {
    title: "The Build Journey",
    kicker: "Financial Coaching",
    text: "Personalized 1:1 financial coaching designed to help you navigate decisions, build healthy habits, and move forward with greater clarity and confidence.",
    icon: Route,
  },
  {
    title: "The Budget Build",
    kicker: "One-time budgeting session",
    text: "A one-time budgeting session where we work together to create a realistic spending plan that reflects your priorities and goals.",
    icon: ClipboardList,
  },
  {
    title: "The Budget Mixer",
    kicker: "Engaging group experience",
    text: "A collaborative experience that helps participants learn practical budgeting skills in a supportive, low-pressure environment.",
    icon: Users,
  },
];

const employerOfferings = [
  { title: "Financial Wellness Newsletter", text: "Monthly financial wellness tips and resources." },
  { title: "Interactive Workshops", text: "Engaging workshops on timely money topics" },
  { title: "Employee Coaching Access", text: "One-on-one coaching for employees" },
  { title: "Financial Wellness Challenges", text: "Fun, team-based experiences that drive engagement" },
  { title: "Customized Financial Wellness Support", text: "Solutions tailored to your organization's needs." },
];

const serviceButtonClass =
  "mt-auto inline-flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-[80px] px-4 text-center text-base font-bold text-white no-underline shadow-[0px_4px_3px_0px_rgb(0_0_0_/_0.35)] transition focus-visible:outline-2 focus-visible:outline-offset-2";

export function Services() {
  return (
    <section className="bg-slate-50 pb-24 pt-10 lg:pb-32">
      <div className="mx-auto max-w-[1200px] px-5">
        <h2 id="services" className={`${pageTitleClass} scroll-mt-28`}>
          Support for Every Step of <span className={pageTitleAccentClass}>Your</span> Journey<span className={pageTitlePeriodClass}>.</span>
        </h2>
        <p className="mt-8 text-lg leading-loose text-navy-blue-sat50 lg:text-xl">
          Whether you’re taking control of your personal finances or looking to support your team, we’re here with the tools, guidance, and expertise you need.
        </p>

        <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-2">
          <article className="flex h-full flex-col overflow-hidden rounded bg-white shadow-big-shadow">
            <div className="relative h-44">
              <img
                src={individualsBanner}
                alt="A family reviewing a tablet together"
                className="h-full w-full object-cover"
              />
              <h3 className="absolute inset-x-5 bottom-4 text-2xl font-bold leading-tight text-white">
                Support for Individuals and Households
              </h3>
            </div>
            <div className="flex flex-1 flex-col gap-5 p-6">
              {householdOfferings.map((item) => (
                <div key={item.title} className="flex gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sky-blue/15 text-navy-blue">
                    <item.icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-bold text-navy-blue">{item.title}</p>
                    <p className="text-base font-semibold text-burnt-orange">{item.kicker}</p>
                    <p className="mt-1 text-base leading-relaxed text-navy-blue-sat50">{item.text}</p>
                  </div>
                </div>
              ))}
              <a
                href="https://partners.simply.coach/tamara-west/free-consultation-9"
                target="_blank"
                rel="noopener noreferrer"
                className={`${serviceButtonClass} bg-navy-blue hover:bg-sky-blue focus-visible:bg-sky-blue focus-visible:outline-sky-blue`}
              >
                <Calendar className="size-4" aria-hidden />
                Schedule a Free Consultation
              </a>
              <p className="text-center text-base text-navy-blue-sat50">Let's find the right next step for you.</p>
            </div>
          </article>

          <article className="flex h-full flex-col overflow-hidden rounded bg-white shadow-big-shadow">
            <div className="relative h-44">
              <img
                src={employersBanner}
                alt="Coworkers talking together in an office"
                className="h-full w-full object-cover"
              />
              <h3 className="absolute inset-x-5 bottom-4 text-2xl font-bold leading-tight text-white">
                Support for Employers & Organizations
              </h3>
            </div>
            <div className="flex flex-1 flex-col gap-5 p-6">
              <p className="text-base leading-relaxed text-navy-blue-sat50">
                Financial wellness support that helps your team thrive - at work and at home.
              </p>
              <ul className="grid gap-4 sm:grid-cols-2">
                {employerOfferings.map((item) => (
                  <li key={item.title} className="flex gap-2">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-burnt-orange text-white">
                      <Check className="size-3" strokeWidth={3} aria-hidden />
                    </span>
                    <span>
                      <span className="block text-base font-bold text-navy-blue">{item.title}</span>
                      <span className="mt-1 block text-base leading-relaxed text-navy-blue-sat50">{item.text}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="https://partners.simply.coach/tamara-west/employer-information-session"
                target="_blank"
                rel="noopener noreferrer"
                className={`${serviceButtonClass} bg-sage-green-sat50 hover:bg-[hsl(150_35%_40%)] focus-visible:bg-[hsl(150_35%_40%)] focus-visible:outline-[hsl(150_35%_40%)]`}
              >
                <Calendar className="size-4" aria-hidden />
                Schedule a Free Information Session
              </a>
              <p className="text-center text-base text-navy-blue-sat50">
                Let's build a program that works for your people and your organization.
              </p>
            </div>
          </article>
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
  { icon: iconCall, text: "260-205-8206", href: "tel:2602058206" },
  { icon: iconLocation, text: "429 E Dupont Rd, Unit 2052\nFort Wayne, IN 46825", href: undefined },
];

export function Contact() {
  return (
    <section className="bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto grid max-w-[1200px] items-center gap-14 px-5 lg:grid-cols-2">
        <div>
          <h2 id="contact" className={`${pageTitleClass} scroll-mt-28`}>
            Get in <span className={pageTitleAccentClass}>Touch</span><span className={pageTitlePeriodClass}>.</span>
          </h2>
          <ul className="mt-10 space-y-6">
            {contactDetails.map((detail) => (
              <li key={detail.text} className="flex items-start gap-4">
                <img src={detail.icon} alt="" aria-hidden="true" className="mt-1 h-6 w-6" />
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
          <div className="relative z-10 rounded-[10px] bg-sage-green-sat50 p-8 shadow-big-shadow lg:p-12">
            <p className="text-center text-xl text-color-white lg:text-2xl">
              <span className="font-bold">Download</span> your Free Savings Reset Kit
            </p>
            <SavingsResetKitForm />
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
  avatar: string;
  name: string;
  role: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <img src={avatar} alt={name} className="h-[50px] w-[50px] rounded-full object-cover" />
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
        <h2 className={pageTitleClass}>
          What People Are Saying About{" "}
          <span className={pageTitleAccentClass}>Build Financial Wellness</span><span className={pageTitlePeriodClass}>.</span>
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
                    <img key={i} src={star} alt="" aria-hidden="true" className="h-3.5 w-3.5" />
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
