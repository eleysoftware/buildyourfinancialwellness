import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { NewsletterList } from "@/components/site/NewsletterList";

const title = "Newsletters — Build Financial Wellness";
const description =
  "Monthly Financially Well newsletters from TaMara West with practical steps for building financial wellness.";

export const Route = createFileRoute("/newsletters/")({
  validateSearch: z.object({ page: z.number().int().min(1).optional().catch(undefined) }),
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
  component: NewslettersPage,
});

function NewslettersPage() {
  const { page = 1 } = Route.useSearch();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-cabin">
      <Header />
      <main className="mx-auto w-full max-w-[1200px] flex-1 px-5 py-20 lg:py-[88px]">
        <h1 className="text-4xl font-medium text-navy-blue lg:text-5xl">Newsletters</h1>
        <p className="mt-4 text-xl text-navy-blue-sat50 lg:text-[32px] lg:leading-tight">
          The latest articles and news on building financial wellness.
        </p>
        <NewsletterList page={page} to="/newsletters" />
      </main>
      <Footer />
    </div>
  );
}
