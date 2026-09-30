import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { fetchPublishedNewsletters, NEWSLETTERS_PER_PAGE } from "@/lib/newsletters";

import { NewsletterCard } from "./NewsletterCard";

type NewsletterListProps = {
  page: number;
  to: "/newsletters" | "/resources";
};

export function NewsletterList({ page, to }: NewsletterListProps) {
  const { data: newsletters = [], isLoading } = useQuery({
    queryKey: ["newsletters", "published"],
    queryFn: fetchPublishedNewsletters,
  });

  const totalPages = Math.max(1, Math.ceil(newsletters.length / NEWSLETTERS_PER_PAGE));
  const current = Math.min(page, totalPages);
  const visible = newsletters.slice((current - 1) * NEWSLETTERS_PER_PAGE, current * NEWSLETTERS_PER_PAGE);

  if (isLoading) {
    return <p className="mt-10 text-navy-blue-sat50">Loading newsletters…</p>;
  }

  if (visible.length === 0) {
    return <p className="mt-10 text-navy-blue-sat50">New newsletters are coming soon.</p>;
  }

  return (
    <>
      <div className="mt-10 grid gap-x-[30px] gap-y-[60px] md:grid-cols-2 lg:grid-cols-3">
        {visible.map((n) => (
          <NewsletterCard key={n.id} newsletter={n} />
        ))}
      </div>
      {totalPages > 1 ? (
        <nav aria-label="Newsletter pages" className="mt-16 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              to={to}
              search={
                to === "/resources"
                  ? { tab: "newsletters" as const, page: p === 1 ? undefined : p }
                  : { page: p === 1 ? undefined : p }
              }
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
    </>
  );
}
