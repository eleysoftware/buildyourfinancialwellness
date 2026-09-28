import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { NewsletterMeta } from "@/components/site/NewsletterCard";
import { FALLBACK_NEWSLETTERS, fetchNewsletterBySlug } from "@/lib/newsletters";

export const Route = createFileRoute("/newsletters/$slug")({
  head: ({ params }) => {
    const known = FALLBACK_NEWSLETTERS.find((n) => n.slug === params.slug);
    const title = known ? `${known.title} | Build Financial Wellness` : "Newsletter | Build Financial Wellness";
    const description = known?.excerpt ?? "A Financially Well newsletter from Build Financial Wellness.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: NewsletterDetail,
});

function NewsletterDetail() {
  const { slug } = Route.useParams();
  const { data: newsletter, isLoading } = useQuery({
    queryKey: ["newsletters", "slug", slug],
    queryFn: () => fetchNewsletterBySlug(slug),
  });

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-cabin">
      <Header />
      <main className="mx-auto w-full max-w-[1000px] flex-1 px-5 py-16 lg:py-20">
        <Link to="/newsletters" className="text-sm font-bold text-sky-blue hover:text-navy-blue">
          ← Back to Newsletters
        </Link>

        {isLoading ? (
          <p className="mt-10 text-navy-blue-sat50">Loading…</p>
        ) : !newsletter ? (
          <div className="mt-10">
            <h1 className="text-3xl font-bold text-navy-blue">Newsletter not found</h1>
            <p className="mt-4 text-navy-blue-sat50">This newsletter may have been moved or is no longer available.</p>
          </div>
        ) : (
          <article className="mt-8">
            <h1 className="text-3xl font-semibold leading-tight text-navy-blue lg:text-[40px]">{newsletter.title}</h1>
            <div className="mt-5">
              <NewsletterMeta newsletter={newsletter} />
            </div>
            {newsletter.thumbnail_url ? (
              <img
                src={newsletter.thumbnail_url}
                alt=""
                className="mt-8 max-h-[420px] w-full rounded object-cover object-top shadow-[0px_15px_35px_0px_rgb(0_0_0_/_0.1)]"
              />
            ) : null}
            <p className="mt-8 text-lg text-[#697694]">{newsletter.excerpt}</p>

            {newsletter.pdf_url ? (
              <>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={newsletter.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-[42px] items-center rounded-[80px] bg-navy-blue px-5 text-base font-bold text-white shadow-[0px_4px_3px_0px_rgb(0_0_0_/_0.35)] transition hover:bg-[#57ae83]"
                  >
                    Open PDF
                  </a>
                  <a
                    href={newsletter.pdf_url}
                    download
                    className="inline-flex h-[42px] items-center rounded-[80px] border-2 border-navy-blue px-5 text-base font-bold text-navy-blue transition hover:bg-navy-blue hover:text-white"
                  >
                    Download PDF
                  </a>
                </div>
                <object
                  data={newsletter.pdf_url}
                  type="application/pdf"
                  className="mt-8 hidden h-[1100px] w-full rounded border border-light-gray bg-white md:block"
                  aria-label={newsletter.title}
                >
                  <p className="p-6 text-navy-blue-sat50">
                    Your browser can't show the PDF here. Use "Open PDF" above to read it.
                  </p>
                </object>
              </>
            ) : null}
          </article>
        )}
      </main>
      <Footer />
    </div>
  );
}
