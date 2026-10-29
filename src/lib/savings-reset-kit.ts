import { supabase } from "@/integrations/supabase/client";

export type SavingsResetKit = {
  id: string;
  title: string;
  pdf_url: string | null;
};

export const FALLBACK_KIT: SavingsResetKit = {
  id: "seed-savings-reset-kit",
  title: "Savings Reset Kit",
  pdf_url: "/kits/savings-reset-kit.pdf",
};

export async function fetchSavingsResetKit(): Promise<SavingsResetKit> {
  const { data, error } = await supabase
    .from("savings_reset_kit")
    .select("id, title, pdf_url")
    .limit(1)
    .maybeSingle();
  if (error || !data?.pdf_url) return FALLBACK_KIT;
  return data;
}

export async function downloadSavingsResetKit(pdfUrl: string) {
  const filename = decodeURIComponent(
    pdfUrl.split("/").pop()?.split("?")[0] || "savings-reset-kit.pdf",
  );
  const link = document.createElement("a");
  link.rel = "noopener";
  link.download = filename;
  try {
    const response = await fetch(pdfUrl);
    if (!response.ok) throw new Error("unavailable");
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    link.href = objectUrl;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
  } catch {
    link.href = pdfUrl;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}
