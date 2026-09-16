import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Hero, Overview, Services, Contact, Testimonials } from "@/components/site/Sections";

const title = "Build Financial Wellness — Financial Coaching in Fort Wayne";
const description =
  "Judgment-free financial coaching, budgeting workshops, and group money mixers that help you build habits, confidence, and a stronger financial future.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-slate-50 font-cabin">
      <Header />
      <main>
        <Hero />
        <Overview />
        <Services />
        <Contact />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
