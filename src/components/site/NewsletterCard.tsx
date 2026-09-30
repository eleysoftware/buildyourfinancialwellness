import { Link } from "@tanstack/react-router";

import authorAvatar from "@/assets/newsletter-author.png";
import { formatIssue, type Newsletter } from "@/lib/newsletters";

export function NewsletterMeta({ newsletter }: { newsletter: Newsletter }) {
  return (
    <div className="flex items-center gap-2">
      <img src={authorAvatar} alt={newsletter.author_name} className="size-[30px] rounded-full object-cover" />
      <span className="text-xs text-[#697694]">{newsletter.author_name}</span>
      <span className="px-2 text-[11px] font-semibold text-[#bbc8d4]">|</span>
      <span className="text-xs text-[#697694]">{formatIssue(newsletter.issue_year, newsletter.issue_month)}</span>
    </div>
  );
}

export function NewsletterCard({ newsletter }: { newsletter: Newsletter }) {
  return (
    <Link
      to="/newsletters/$slug"
      params={{ slug: newsletter.slug }}
      className="group flex h-full flex-col overflow-hidden rounded bg-white shadow-[0px_15px_35px_0px_rgb(0_0_0_/_0.1)] transition hover:shadow-[0px_15px_35px_0px_rgb(50_153_233_/_0.35)]"
    >
      {newsletter.thumbnail_url ? (
        <img
          src={newsletter.thumbnail_url}
          alt=""
          loading="lazy"
          className="h-[200px] w-full object-cover object-top"
        />
      ) : (
        <div className="h-[200px] w-full bg-light-gray" />
      )}
      <div className="flex flex-1 flex-col px-5 pb-5 pt-5">
        <h2 className="text-[22px] font-semibold leading-snug text-[#6d7d8b] group-hover:text-navy-blue">
          {newsletter.title}
        </h2>
        <p className="mt-4 text-sm leading-normal text-[#697694]">{newsletter.excerpt}</p>
        <div className="mt-auto pt-8">
          <NewsletterMeta newsletter={newsletter} />
        </div>
      </div>
    </Link>
  );
}
