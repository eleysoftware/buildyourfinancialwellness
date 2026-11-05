import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { NewsletterMeta } from "@/components/site/NewsletterCard";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FALLBACK_NEWSLETTERS, fetchNewsletterBySlug, type Newsletter } from "@/lib/newsletters";

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

async function downloadNewsletterPdf(newsletter: Newsletter) {
  if (!newsletter.pdf_url) return;
  const filename = decodeURIComponent(
    newsletter.pdf_url.split("/").pop()?.split("?")[0] || `${newsletter.slug}.pdf`,
  );
  const link = document.createElement("a");
  link.rel = "noopener";
  link.download = filename;
  try {
    const response = await fetch(newsletter.pdf_url);
    if (!response.ok) throw new Error("unavailable");
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    link.href = objectUrl;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
  } catch {
    link.href = newsletter.pdf_url;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}

function NewsletterDetail() {
  const { slug } = Route.useParams();
  const [confirming, setConfirming] = useState(false);
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
                  <button
                    type="button"
                    onClick={() => setConfirming(true)}
                    className="inline-flex h-[42px] items-center rounded-[80px] border-2 border-navy-blue px-5 text-base font-bold text-navy-blue transition hover:bg-navy-blue hover:text-white"
                  >
                    Download PDF
                  </button>
                </div>
                <AlertDialog open={confirming} onOpenChange={setConfirming}>
                  <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-navy-blue">Download {newsletter.title}?</AlertDialogTitle>
                      <AlertDialogDescription className="text-navy-blue-sat50">
                        Save to your device. Then open in Adobe Acrobat. (The free version works)
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="rounded-[80px] border-2 border-navy-blue text-navy-blue">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="rounded-[80px] bg-navy-blue text-white hover:bg-[#57ae83]"
                        onClick={() => void downloadNewsletterPdf(newsletter)}
                      >
                        Download
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
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
