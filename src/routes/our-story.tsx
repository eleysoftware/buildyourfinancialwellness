import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import storyImage from "@/assets/our-story-image.png.asset.json";

const title = "The BFW Story — Build Financial Wellness";
const description =
  "How TaMara West turned two decades of healthcare financial leadership into Build Financial Wellness — judgment-free coaching that helps people build systems for clarity and confidence.";

export const Route = createFileRoute("/our-story")({
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
  component: OurStory,
});

const paragraphClass = "text-base leading-[1.9] text-[#6d7d8b] lg:text-[17px]";

function OurStory() {
  return (
    <div className="flex min-h-screen flex-col bg-color-white font-cabin">
      <Header />

      <main className="flex-1">
        <div className="relative mx-auto w-full max-w-[1440px]">
          {/* Story image */}
          <div className="relative mt-8 px-5 lg:absolute lg:right-0 lg:top-0 lg:mt-0 lg:w-[54%] lg:px-0">
            <img
              src={storyImage.url}
              alt="TaMara West, founder of Build Financial Wellness"
              className="w-full rounded-lg object-cover lg:rounded-none"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 22%), linear-gradient(to bottom, black 88%, transparent 100%)",
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 22%), linear-gradient(to bottom, black 88%, transparent 100%)",
                WebkitMaskComposite: "source-in",
                maskComposite: "intersect",
              }}
            />
          </div>

          {/* Story content */}
          <div className="relative z-10 px-5 pb-16 pt-12 lg:px-[60px] lg:pb-28 lg:pt-[70px] 2xl:px-[140px]">
            <h1 className="text-[2.25rem] font-normal leading-tight text-navy-blue lg:text-5xl">
              The <em className="not-italic text-sky-blue">BFW</em> Story
            </h1>

            <div className="mt-10 max-w-[651px] space-y-7">
              <p className={paragraphClass}>
                Like many people, I didn’t grow up with a strong foundation in personal finance.
                Managing money wasn’t something we talked about at home, and my K–12 education
                didn’t fill in the gaps. But life has a way of teaching you what school doesn’t.
              </p>
              <p className={paragraphClass}>
                I’m <strong className="font-bold text-[#5c6c7a]">TaMara West</strong>. Over the
                course of earning my master’s degree in health services administration and building
                a 20-year career in healthcare leadership, I gained hands-on experience managing
                financial operations for clinics and departments. I learned how to build budgets,
                streamline systems, and lead with financial clarity. Over time, I began applying
                those same principles to my household finances, with the same purpose and structure
                I used at work.
              </p>
              <p className={paragraphClass}>
                What began as a personal journey quickly turned into a calling. I started helping
                family and friends navigate the financial side of their lives and businesses.
                That’s when I realized something powerful: managing a household is a lot like
                managing a small business. And with the right tools and support, anyone can learn
                to do it well.
              </p>
              <p className={paragraphClass}>
                That’s what inspired me to create Build Financial Wellness.
              </p>
              <p className={paragraphClass}>
                Today, Build Financial Wellness empowers people to take control of their financial
                futures with confidence. We believe true financial wellness goes beyond the
                numbers—it’s about habits, mindsets, and intentional choices that support your
                goals and values.
              </p>
              <p className={paragraphClass}>
                Our mission is simple: to help people build financial systems that bring clarity,
                reduce stress, and create space for what matters most. Whether you're starting
                fresh, getting back on track, or ready to level up-we’ll walk with you, every step
                of the way.
              </p>
              <p className={paragraphClass}>
                <em className="font-bold italic text-[#5c6c7a]">
                  Build Financial Wellness isn’t just our name
                </em>
                —it’s an invitation to take the next step—and a promise that you won’t have to take
                it alone.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
