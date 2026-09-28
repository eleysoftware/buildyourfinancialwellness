import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { NewsletterCard } from "@/components/site/NewsletterCard";
import { fetchPublishedNewsletters, NEWSLETTERS_PER_PAGE } from "@/lib/newsletters";

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
  const { data: newsletters = [], isLoading } = useQuery({
    queryKey: ["newsletters", "published"],
    queryFn: fetchPublishedNewsletters,
  });

  const totalPages = Math.max(1, Math.ceil(newsletters.length / NEWSLETTERS_PER_PAGE));
  const current = Math.min(page, totalPages);
  const visible = newsletters.slice((current - 1) * NEWSLETTERS_PER_PAGE, current * NEWSLETTERS_PER_PAGE);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-cabin">
      <Header />
      <main className="mx-auto w-full max-w-[1200px] flex-1 px-5 py-20 lg:py-[88px]">
        <h1 className="text-4xl font-medium text-navy-blue lg:text-5xl">Newsletters</h1>
        <p className="mt-4 text-xl text-navy-blue-sat50 lg:text-[32px] lg:leading-tight">
          The latest articles and news on building financial wellness.
        </p>

        {isLoading ? (
          <p className="mt-16 text-navy-blue-sat50">Loading newsletters…</p>
        ) : visible.length === 0 ? (
          <p className="mt-16 text-navy-blue-sat50">New newsletters are coming soon.</p>
        ) : (
          <div className="mt-16 grid gap-x-[30px] gap-y-[60px] md:grid-cols-2 lg:grid-cols-3">
            {visible.map((n) => (
              <NewsletterCard key={n.id} newsletter={n} />
            ))}
          </div>
        )}

        {totalPages > 1 ? (
          <nav aria-label="Newsletter pages" className="mt-16 flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                to="/newsletters"
                search={{ page: p === 1 ? undefined : p }}
                aria-current={p === current ? "page" : undefined}
                className={`flex size-11 items-center justify-center rounded text-sm text-navy-blue ${
                  p === current ? "bg-light-gray font-bold" : "hover:bg-light-gray/60"
                }`}
              >
                {p}
              </Link>
            ))}
          </nav>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
