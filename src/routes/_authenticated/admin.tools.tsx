import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { PageShell } from "@/components/site/PageShell";
import { supabase } from "@/integrations/supabase/client";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { slugify, type FinancialTool } from "@/lib/financial-tools";

export const Route = createFileRoute("/_authenticated/admin/tools")({
  head: () => ({
    meta: [
      { title: "Manage Financial Tools | Build Financial Wellness" },
      { name: "description", content: "Administrator financial tool management." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminTools,
});

type Draft = {
  id?: string;
  title: string;
  pdf_url: string | null;
  published: boolean;
  sort_order: number;
};

const emptyDraft: Draft = {
  title: "",
  pdf_url: null,
  published: false,
  sort_order: 1,
};

const inputClass = "mt-1 w-full rounded border border-light-gray bg-white px-3 py-2 text-navy-blue";
const btn =
  "inline-flex h-[40px] items-center rounded-[80px] px-5 text-sm font-bold transition disabled:opacity-50";

async function uploadPdf(file: File) {
  const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
  const { error } = await supabase.storage.from("financial-tools").upload(path, file, { upsert: false });
  if (error) throw error;
  return supabase.storage.from("financial-tools").getPublicUrl(path).data.publicUrl;
}

function AdminTools() {
  const { user } = Route.useRouteContext();
  const { data: isAdmin, isLoading: checking } = useIsAdmin(user.id);
  const queryClient = useQueryClient();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const { data: items = [], error: loadError } = useQuery({
    queryKey: ["admin-financial-tools"],
    enabled: isAdmin === true,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("financial_tools")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as FinancialTool[];
    },
  });

  function refresh() {
    queryClient.invalidateQueries({ queryKey: ["admin-financial-tools"] });
    queryClient.invalidateQueries({ queryKey: ["financial-tools"] });
  }

  if (checking) return <PageShell title="Manage Financial Tools" intro="Checking access…" />;
  if (!isAdmin) {
    return (
      <PageShell title="Manage Financial Tools" intro="This area is for site administrators only.">
        <Link to="/account" className="mt-6 inline-block font-bold text-sky-blue">
          ← Back to My Account
        </Link>
      </PageShell>
    );
  }

  async function save() {
    if (!draft) return;
    if (!draft.title.trim()) return setMessage("Please enter a title.");
    if (!draft.pdf_url) return setMessage("Please upload a PDF.");
    setBusy(true);
    setMessage(null);
    const row = {
      title: draft.title.trim(),
      slug: slugify(draft.title),
      pdf_url: draft.pdf_url,
      published: draft.published,
      sort_order: draft.sort_order,
    };
    const { error } = draft.id
      ? await supabase.from("financial_tools").update(row).eq("id", draft.id)
      : await supabase.from("financial_tools").insert(row);
    setBusy(false);
    if (error) return setMessage(error.message);
    setDraft(null);
    setMessage("Saved.");
    refresh();
  }

  async function togglePublished(tool: FinancialTool) {
    const { error } = await supabase
      .from("financial_tools")
      .update({ published: !tool.published })
      .eq("id", tool.id);
    if (error) return setMessage(error.message);
    refresh();
  }

  async function remove(tool: FinancialTool) {
    if (!window.confirm(`Delete "${tool.title}"? This cannot be undone.`)) return;
    const { error } = await supabase.from("financial_tools").delete().eq("id", tool.id);
    if (error) return setMessage(error.message);
    refresh();
  }

  async function handleFile(file: File | undefined) {
    if (!file || !draft) return;
    setBusy(true);
    try {
      const url = await uploadPdf(file);
      setDraft((current) => (current ? { ...current, pdf_url: url } : current));
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <PageShell
      title="Manage Financial Tools"
      intro="Upload, replace, publish, or remove the PDFs shown on the Tools tab."
    >
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button
          className={`${btn} bg-navy-blue text-white hover:bg-[#57ae83]`}
          onClick={() => setDraft({ ...emptyDraft, sort_order: items.length + 1 })}
        >
          + New tool
        </button>
        <Link to="/resources" search={{ tab: "tools" }} className="text-sm font-bold text-sky-blue hover:text-navy-blue">
          View public page →
        </Link>
      </div>
      {message ? <p className="mt-4 text-sm font-bold text-navy-blue">{message}</p> : null}
      {loadError ? (
        <p className="mt-4 text-sm text-dusty-rose-sat67">
          Couldn't load tools. Make sure the financial tools setup SQL has been run in Supabase.
        </p>
      ) : null}

      {draft ? (
        <div className="mt-8 max-w-[760px] rounded bg-white p-6 shadow-big-shadow">
          <h2 className="text-xl font-bold text-navy-blue">{draft.id ? "Edit tool" : "New tool"}</h2>
          <div className="mt-4 grid gap-4">
            <label className="text-sm font-bold text-navy-blue">
              Title
              <input
                className={inputClass}
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              />
            </label>
            <label className="text-sm font-bold text-navy-blue">
              Sort order
              <input
                type="number"
                className={inputClass}
                value={draft.sort_order}
                onChange={(e) => setDraft({ ...draft, sort_order: Number(e.target.value) })}
              />
            </label>
            <label className="text-sm font-bold text-navy-blue">
              Tool PDF
              <input
                type="file"
                accept="application/pdf"
                className="mt-1 block text-sm"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
              {draft.pdf_url ? (
                <a href={draft.pdf_url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sky-blue">
                  Current PDF
                </a>
              ) : null}
            </label>
            <label className="flex items-center gap-2 text-sm font-bold text-navy-blue">
              <input
                type="checkbox"
                checked={draft.published}
                onChange={(e) => setDraft({ ...draft, published: e.target.checked })}
              />
              Published (visible to visitors)
            </label>
          </div>
          <div className="mt-6 flex gap-3">
            <button disabled={busy} className={`${btn} bg-navy-blue text-white hover:bg-[#57ae83]`} onClick={save}>
              {busy ? "Working…" : "Save"}
            </button>
            <button className={`${btn} border-2 border-navy-blue text-navy-blue`} onClick={() => setDraft(null)}>
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      <ul className="mt-10 grid gap-4">
        {items.map((tool) => (
          <li key={tool.id} className="flex flex-col gap-4 rounded bg-white p-4 shadow-big-shadow sm:flex-row sm:items-center">
            <div className="min-w-0 flex-1">
              <p className="font-bold text-navy-blue">{tool.title}</p>
              <p className="text-sm text-[#697694]">{tool.published ? "Published" : "Draft"}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                className={`${btn} border-2 border-navy-blue text-navy-blue`}
                onClick={() =>
                  setDraft({
                    id: tool.id,
                    title: tool.title,
                    pdf_url: tool.pdf_url,
                    published: tool.published,
                    sort_order: tool.sort_order,
                  })
                }
              >
                Edit
              </button>
              <button className={`${btn} border-2 border-navy-blue text-navy-blue`} onClick={() => togglePublished(tool)}>
                {tool.published ? "Unpublish" : "Publish"}
              </button>
              <button className={`${btn} border-2 border-dusty-rose-sat67 text-dusty-rose-sat67`} onClick={() => remove(tool)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
