import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { PageShell } from "@/components/site/PageShell";
import { supabase } from "@/integrations/supabase/client";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { type SavingsResetKit } from "@/lib/savings-reset-kit";

export const Route = createFileRoute("/_authenticated/admin/kit")({
  head: () => ({
    meta: [
      { title: "Manage Savings Reset Kit | Build Financial Wellness" },
      { name: "description", content: "Administrator Savings Reset Kit PDF management." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminKit,
});

const inputClass = "mt-1 block text-sm";
const btn =
  "inline-flex h-[40px] items-center rounded-[80px] px-5 text-sm font-bold transition disabled:opacity-50";

async function uploadPdf(file: File) {
  const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
  const { error } = await supabase.storage.from("savings-reset-kit").upload(path, file, { upsert: false });
  if (error) throw error;
  return supabase.storage.from("savings-reset-kit").getPublicUrl(path).data.publicUrl;
}

function AdminKit() {
  const { user } = Route.useRouteContext();
  const { data: isAdmin, isLoading: checking } = useIsAdmin(user.id);
  const queryClient = useQueryClient();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const { data: kit, error: loadError } = useQuery({
    queryKey: ["admin-savings-reset-kit"],
    enabled: isAdmin === true,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("savings_reset_kit")
        .select("id, title, pdf_url")
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data as SavingsResetKit | null;
    },
  });

  function refresh() {
    queryClient.invalidateQueries({ queryKey: ["admin-savings-reset-kit"] });
    queryClient.invalidateQueries({ queryKey: ["savings-reset-kit"] });
  }

  if (checking) return <PageShell title="Manage Savings Reset Kit" intro="Checking access…" />;
  if (!isAdmin) {
    return (
      <PageShell title="Manage Savings Reset Kit" intro="This area is for site administrators only.">
        <Link to="/account" className="mt-6 inline-block font-bold text-sky-blue">
          ← Back to My Account
        </Link>
      </PageShell>
    );
  }

  const currentUrl = pdfUrl ?? kit?.pdf_url ?? null;

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setMessage(null);
    try {
      const url = await uploadPdf(file);
      setPdfUrl(url);
      setMessage("PDF uploaded. Save to use it on the contact form.");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  async function save() {
    if (!currentUrl) return setMessage("Please upload a PDF.");
    setBusy(true);
    setMessage(null);
    const row = { title: "Savings Reset Kit", pdf_url: currentUrl };
    const { error } = kit?.id
      ? await supabase.from("savings_reset_kit").update(row).eq("id", kit.id)
      : await supabase.from("savings_reset_kit").insert(row);
    setBusy(false);
    if (error) return setMessage(error.message);
    setPdfUrl(null);
    setMessage("Saved. The contact form now downloads this PDF.");
    refresh();
  }

  return (
    <PageShell
      title="Manage Savings Reset Kit"
      intro="Replace the PDF visitors receive after they submit the contact form."
    >
      <div className="mt-8">
        <a href="/#contact" className="text-sm font-bold text-sky-blue hover:text-navy-blue">
          View contact section →
        </a>
      </div>
      {message ? <p className="mt-4 text-sm font-bold text-navy-blue">{message}</p> : null}
      {loadError ? (
        <p className="mt-4 text-sm text-dusty-rose-sat67">
          Couldn't load the kit. Make sure the Savings Reset Kit setup SQL has been run in Supabase.
        </p>
      ) : null}

      <div className="mt-8 max-w-[760px] rounded bg-white p-6 shadow-big-shadow">
        <label className="text-sm font-bold text-navy-blue">
          Savings Reset Kit PDF
          <input
            type="file"
            accept="application/pdf"
            className={inputClass}
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </label>
        {currentUrl ? (
          <a href={currentUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sky-blue">
            Current PDF
          </a>
        ) : (
          <p className="mt-3 text-sm text-[#697694]">No PDF is saved yet. The site file is used until you save one.</p>
        )}
        <div className="mt-6">
          <button disabled={busy || !pdfUrl} className={`${btn} bg-navy-blue text-white hover:bg-[#57ae83]`} onClick={save}>
            {busy ? "Working…" : "Save"}
          </button>
        </div>
      </div>
    </PageShell>
  );
}
