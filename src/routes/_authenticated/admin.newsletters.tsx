import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { PageShell } from "@/components/site/PageShell";
import { supabase } from "@/integrations/supabase/client";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { formatIssue, slugify, withPortableNewsletterMedia, type Newsletter } from "@/lib/newsletters";

export const Route = createFileRoute("/_authenticated/admin/newsletters")({
  head: () => ({
    meta: [
      { title: "Manage Newsletters | Build Financial Wellness" },
      { name: "description", content: "Administrator newsletter management." },
      { property: "og:title", content: "Manage Newsletters | Build Financial Wellness" },
      { property: "og:description", content: "Administrator newsletter management." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminNewsletters,
});

type Draft = {
  id?: string;
  title: string;
  excerpt: string;
  issue_year: number;
  issue_month: number;
  thumbnail_url: string | null;
  pdf_url: string | null;
  published: boolean;
};

const now = new Date();
const emptyDraft: Draft = {
  title: "",
  excerpt: "",
  issue_year: now.getFullYear(),
  issue_month: now.getMonth() + 1,
  thumbnail_url: null,
  pdf_url: null,
  published: false,
};

const inputClass = "mt-1 w-full rounded border border-light-gray bg-white px-3 py-2 text-navy-blue";
const btn =
  "inline-flex h-[40px] items-center rounded-[80px] px-5 text-sm font-bold transition disabled:opacity-50";

async function uploadFile(file: File) {
  const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
  const { error } = await supabase.storage.from("newsletters").upload(path, file, { upsert: false });
  if (error) throw error;
  return supabase.storage.from("newsletters").getPublicUrl(path).data.publicUrl;
}

function AdminNewsletters() {
  const { user } = Route.useRouteContext();
  const { data: isAdmin, isLoading: checking } = useIsAdmin(user.id);
  const queryClient = useQueryClient();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const { data: items = [], error: loadError } = useQuery({
    queryKey: ["admin-newsletters"],
    enabled: isAdmin === true,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("newsletters")
        .select("*")
        .order("issue_year", { ascending: false })
        .order("issue_month", { ascending: false });
      if (error) throw error;
      return (data as Newsletter[]).map(withPortableNewsletterMedia);
    },
  });

  function refresh() {
    queryClient.invalidateQueries({ queryKey: ["admin-newsletters"] });
    queryClient.invalidateQueries({ queryKey: ["newsletters"] });
  }

  if (checking) return <PageShell title="Manage Newsletters" intro="Checking access…" />;
  if (!isAdmin) {
    return (
      <PageShell title="Manage Newsletters" intro="This area is for site administrators only.">
        <Link to="/account" className="mt-6 inline-block font-bold text-sky-blue">
          ← Back to My Account
        </Link>
      </PageShell>
    );
  }

  async function save() {
    if (!draft) return;
    if (!draft.title.trim()) return setMessage("Please enter a title.");
    setBusy(true);
    setMessage(null);
    const row = { ...draft, slug: slugify(draft.title) };
    delete (row as { id?: string }).id;
    const { error } = draft.id
      ? await supabase.from("newsletters").update(row).eq("id", draft.id)
      : await supabase.from("newsletters").insert(row);
    setBusy(false);
    if (error) return setMessage(error.message);
    setDraft(null);
    setMessage("Saved.");
    refresh();
  }

  async function togglePublished(n: Newsletter) {
    const { error } = await supabase.from("newsletters").update({ published: !n.published }).eq("id", n.id);
    if (error) return setMessage(error.message);
    refresh();
  }

  async function remove(n: Newsletter) {
    if (!window.confirm(`Delete "${n.title}"? This cannot be undone.`)) return;
    const { error } = await supabase.from("newsletters").delete().eq("id", n.id);
    if (error) return setMessage(error.message);
    refresh();
  }

  async function handleFile(kind: "thumbnail_url" | "pdf_url", file: File | undefined) {
    if (!file || !draft) return;
    setBusy(true);
    try {
      const url = await uploadFile(file);
      setDraft((d) => (d ? { ...d, [kind]: url } : d));
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <PageShell title="Manage Newsletters" intro="Create, edit, publish, or remove newsletters shown on the Newsletters page.">
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button className={`${btn} bg-navy-blue text-white hover:bg-[#57ae83]`} onClick={() => setDraft({ ...emptyDraft })}>
          + New newsletter
        </button>
        <Link to="/newsletters" className="text-sm font-bold text-sky-blue hover:text-navy-blue">
          View public page →
        </Link>
      </div>
      {message ? <p className="mt-4 text-sm font-bold text-navy-blue">{message}</p> : null}
      {loadError ? (
        <p className="mt-4 text-sm text-dusty-rose-sat67">
          Couldn't load newsletters. Make sure the newsletters setup SQL has been run in Supabase.
        </p>
      ) : null}

      {draft ? (
        <div className="mt-8 max-w-[760px] rounded bg-white p-6 shadow-big-shadow">
          <h2 className="text-xl font-bold text-navy-blue">{draft.id ? "Edit newsletter" : "New newsletter"}</h2>
          <div className="mt-4 grid gap-4">
            <label className="text-sm font-bold text-navy-blue">
              Title (e.g. "October 2026 - Headline")
              <input className={inputClass} value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
            </label>
            <label className="text-sm font-bold text-navy-blue">
              Short description
              <textarea rows={3} className={inputClass} value={draft.excerpt} onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })} />
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="text-sm font-bold text-navy-blue">
                Month
                <select className={inputClass} value={draft.issue_month} onChange={(e) => setDraft({ ...draft, issue_month: Number(e.target.value) })}>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {formatIssue(2000, i + 1).split(" ")[0]}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm font-bold text-navy-blue">
                Year
                <input type="number" className={inputClass} value={draft.issue_year} onChange={(e) => setDraft({ ...draft, issue_year: Number(e.target.value) })} />
              </label>
            </div>
            <label className="text-sm font-bold text-navy-blue">
              Thumbnail image
              <input type="file" accept="image/*" className="mt-1 block text-sm" onChange={(e) => handleFile("thumbnail_url", e.target.files?.[0])} />
              {draft.thumbnail_url ? <img src={draft.thumbnail_url} alt="" className="mt-2 h-24 rounded object-cover" /> : null}
            </label>
            <label className="text-sm font-bold text-navy-blue">
              Newsletter PDF
              <input type="file" accept="application/pdf" className="mt-1 block text-sm" onChange={(e) => handleFile("pdf_url", e.target.files?.[0])} />
              {draft.pdf_url ? (
                <a href={draft.pdf_url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sky-blue">
                  Current PDF
                </a>
              ) : null}
            </label>
            <label className="flex items-center gap-2 text-sm font-bold text-navy-blue">
              <input type="checkbox" checked={draft.published} onChange={(e) => setDraft({ ...draft, published: e.target.checked })} />
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
        {items.map((n) => (
          <li key={n.id} className="flex flex-col gap-4 rounded bg-white p-4 shadow-big-shadow sm:flex-row sm:items-center">
            {n.thumbnail_url ? <img src={n.thumbnail_url} alt="" className="h-16 w-24 rounded object-cover" /> : null}
            <div className="min-w-0 flex-1">
              <p className="font-bold text-navy-blue">{n.title}</p>
              <p className="text-sm text-[#697694]">
                {formatIssue(n.issue_year, n.issue_month)} · {n.published ? "Published" : "Draft"}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className={`${btn} border-2 border-navy-blue text-navy-blue`} onClick={() => setDraft({ ...n })}>
                Edit
              </button>
              <button className={`${btn} border-2 border-navy-blue text-navy-blue`} onClick={() => togglePublished(n)}>
                {n.published ? "Unpublish" : "Publish"}
              </button>
              <button className={`${btn} border-2 border-dusty-rose-sat67 text-dusty-rose-sat67`} onClick={() => remove(n)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
