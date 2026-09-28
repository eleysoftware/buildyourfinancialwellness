import { supabase } from "@/integrations/supabase/client";
import sepThumb from "@/assets/newsletter-september-2026.jpg.asset.json";
import augThumb from "@/assets/newsletter-august-2026.jpg.asset.json";
import julThumb from "@/assets/newsletter-july-2026.jpg.asset.json";
import sepPdf from "@/assets/financially-well-september-2026.pdf.asset.json";
import augPdf from "@/assets/financially-well-august-2026.pdf.asset.json";
import julPdf from "@/assets/financially-well-july-2026.pdf.asset.json";

export type Newsletter = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  issue_year: number;
  issue_month: number;
  thumbnail_url: string | null;
  pdf_url: string | null;
  author_name: string;
  published: boolean;
};

export const NEWSLETTERS_PER_PAGE = 9;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "mmm yyyy", e.g. "Sep 2026" */
export function formatIssue(year: number, month: number) {
  return `${MONTHS[month - 1] ?? ""} ${year}`;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Built-in copies of the launch issues. Shown only when the Supabase
// newsletters table isn't reachable yet (e.g. setup SQL not run).
export const FALLBACK_NEWSLETTERS: Newsletter[] = [
  {
    id: "seed-2026-09",
    slug: "september-2026-a-more-manageable-way-to-tackle-debt",
    title: "September 2026 - A More Manageable Way to Tackle Debt",
    excerpt:
      "Debt can make it feel like you should be doing more. Discover a steadier, more manageable approach that helps your efforts add up.",
    issue_year: 2026,
    issue_month: 9,
    thumbnail_url: sepThumb.url,
    pdf_url: sepPdf.url,
    author_name: "TaMara West",
    published: true,
  },
  {
    id: "seed-2026-08",
    slug: "august-2026-find-your-financial-rhythm-again",
    title: "August 2026 - Find Your Financial Rhythm Again",
    excerpt:
      "As summer winds down and routines return, reconnect with the simple habits that help your money feel in step again.",
    issue_year: 2026,
    issue_month: 8,
    thumbnail_url: augThumb.url,
    pdf_url: augPdf.url,
    author_name: "TaMara West",
    published: true,
  },
  {
    id: "seed-2026-07",
    slug: "july-2026-where-does-your-paycheck-go",
    title: "July 2026 - Where Does Your Paycheck Go?",
    excerpt:
      "Financial confidence doesn't always start with earning more. Sometimes it starts with understanding how your money moves through your life.",
    issue_year: 2026,
    issue_month: 7,
    thumbnail_url: julThumb.url,
    pdf_url: julPdf.url,
    author_name: "TaMara West",
    published: true,
  },
];

const COLUMNS =
  "id, slug, title, excerpt, issue_year, issue_month, thumbnail_url, pdf_url, author_name, published";

export async function fetchPublishedNewsletters(): Promise<Newsletter[]> {
  const { data, error } = await supabase
    .from("newsletters")
    .select(COLUMNS)
    .eq("published", true)
    .order("issue_year", { ascending: false })
    .order("issue_month", { ascending: false });
  if (error) return FALLBACK_NEWSLETTERS;
  return data as Newsletter[];
}

export async function fetchNewsletterBySlug(slug: string): Promise<Newsletter | null> {
  const { data, error } = await supabase
    .from("newsletters")
    .select(COLUMNS)
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error) return FALLBACK_NEWSLETTERS.find((n) => n.slug === slug) ?? null;
  return (data as Newsletter | null) ?? null;
}
