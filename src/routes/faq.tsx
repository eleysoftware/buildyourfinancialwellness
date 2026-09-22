import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

const title = "FAQ — Build Financial Wellness";
const description =
  "Answers to common questions about financial coaching, sessions, confidentiality, and who benefits most from working with a coach.";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Faq,
});

const faqs: { id: string; question: string; answer: string[]; highlight?: boolean }[] = [
  {
    id: "who-can-benefit",
    question: "Who can benefit from financial coaching?",
    answer: [
      "Anyone! Whether you’re just starting, trying to get back on track, or working toward bigger goals, coaching is for individuals who want support, structure, and accountability in managing their finances.",
    ],
    highlight: true,
  },
  {
    id: "what-is-financial-coaching",
    question: "What is financial coaching?",
    answer: [
      "Financial coaching is a collaborative process that helps you clarify your financial goals, build better money habits, and develop personalized strategies to manage your finances with confidence.",
    ],
  },
  {
    id: "coaching-vs-advising",
    question: "How is financial coaching different from financial advising?",
    answer: [
      "Financial coaches focus on how you behave with money—helping you build better habits, improve decision-making, and take consistent action toward your goals.",
      "Financial advisors focus on how your money behaves—typically offering guidance on investing, retirement planning, and asset management.",
      "While there may be some overlap, financial coaching is action-oriented and educational, centered on behavior change and empowerment rather than product sales or clinical therapy.",
    ],
  },
  {
    id: "one-time-or-ongoing",
    question: "Do you offer one-time sessions or ongoing support?",
    answer: [
      "Yes to both. Some clients benefit from a single session to get organized, while others prefer ongoing coaching to stay on track and make deeper progress.",
    ],
  },
  {
    id: "finances-in-order",
    question: "Do I need to have my finances in order before booking a session?",
    answer: [
      "Not at all. Financial coaching is designed to meet you where you are—no judgment, just support.",
    ],
  },
  {
    id: "confidential",
    question: "Is my financial information kept confidential?",
    answer: [
      "Absolutely. Your privacy and trust are essential. All information you share is kept confidential and secure.",
    ],
  },
  {
    id: "virtual-or-in-person",
    question: "Are sessions held virtually or in person?",
    answer: [
      "Most sessions are held virtually for flexibility and convenience. However, The Budget Mixer—our group workshop—can also be held in person for workplaces, community groups, or social gatherings, depending on location and availability.",
    ],
  },
];

function Faq() {
  return (
    <div className="flex min-h-screen flex-col bg-color-white font-cabin">
      <Header />
      <main className="flex-1 px-5 py-14 lg:px-[60px] lg:py-[85px] 2xl:px-[140px]">
        <div className="mx-auto w-full max-w-[1160px]">
          <h1 className="text-3xl leading-tight text-navy-blue sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h1>

          <div className="mt-10 space-y-3">
            {faqs.map((item, index) => (
              <section
                key={item.id}
                id={item.id}
                className={`scroll-mt-[110px] rounded px-2 py-5 sm:px-4 ${
                  item.highlight ? "bg-[#d6ebe0]" : ""
                }`}
              >
                <h2 className="text-xl leading-snug text-navy-blue sm:text-2xl lg:text-[32px]">
                  {index + 1}. {item.question}
                </h2>
                <div className="mt-3 space-y-4">
                  {item.answer.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 32)}
                      className="text-base leading-relaxed text-[#6d7d8b] lg:text-lg"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
