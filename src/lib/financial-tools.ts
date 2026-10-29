import { supabase } from "@/integrations/supabase/client";

export type FinancialTool = {
  id: string;
  slug: string;
  title: string;
  pdf_url: string | null;
  published: boolean;
  sort_order: number;
};

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const FALLBACK_TOOLS: FinancialTool[] = [
  {
    id: "seed-50-30-20",
    slug: "50-30-20-budgeting-tool",
    title: "50/30/20 Budgeting Tool",
    pdf_url: "/tools/50-30-20-budgeting-tool.pdf",
    published: true,
    sort_order: 1,
  },
  {
    id: "seed-pay-conversion",
    slug: "pay-conversion-tool",
    title: "Pay Conversion Tool",
    pdf_url: "/tools/pay-conversion-tool.pdf",
    published: true,
    sort_order: 2,
  },
  {
    id: "seed-pay-yourself-first",
    slug: "pay-yourself-first-planning-tool",
    title: "Pay Yourself First Planning Tool",
    pdf_url: "/tools/pay-yourself-first-planning-tool.pdf",
    published: true,
    sort_order: 3,
  },
  {
    id: "seed-zero-based",
    slug: "zero-based-budgeting-tool",
    title: "Zero-Based Budgeting Tool",
    pdf_url: "/tools/zero-based-budgeting-tool.pdf",
    published: true,
    sort_order: 4,
  },
];

const COLUMNS = "id, slug, title, pdf_url, published, sort_order";

export async function fetchPublishedTools(): Promise<FinancialTool[]> {
  const { data, error } = await supabase
    .from("financial_tools")
    .select(COLUMNS)
    .eq("published", true)
    .order("sort_order", { ascending: true });
  if (error) return FALLBACK_TOOLS;
  return (data as FinancialTool[]) ?? [];
}

export function downloadFilename(tool: FinancialTool) {
  const fromUrl = tool.pdf_url?.split("/").pop()?.split("?")[0];
  if (fromUrl) return decodeURIComponent(fromUrl);
  return `${tool.slug}.pdf`;
}
