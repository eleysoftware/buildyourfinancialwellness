import { createFileRoute, Link } from "@tanstack/react-router";

import { AdminPageTitle } from "@/components/site/AdminNav";
import { PageShell } from "@/components/site/PageShell";
import { useIsAdmin } from "@/hooks/useIsAdmin";

export const Route = createFileRoute("/_authenticated/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard | Build Financial Wellness" },
      { name: "description", content: "Administrator dashboard." },
      { property: "og:title", content: "Admin Dashboard | Build Financial Wellness" },
      { property: "og:description", content: "Administrator dashboard." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminDashboard,
});

const areas = [
  {
    to: "/admin/newsletters",
    title: "Newsletters",
    text: "Create, edit, and publish newsletter issues.",
  },
  {
    to: "/admin/tools",
    title: "Financial Tools",
    text: "Upload, replace, and publish the tool PDFs.",
  },
  {
    to: "/admin/kit",
    title: "Savings Reset Kit",
    text: "Replace the PDF visitors receive from the contact form.",
  },
] as const;

function AdminDashboard() {
  const { user } = Route.useRouteContext();
  const { data: isAdmin, isLoading: checking } = useIsAdmin(user.id);

  if (checking) {
    return <PageShell adminNav heading={<AdminPageTitle before="Admin " accent="Dashboard" />} intro="Checking access…" />;
  }
  if (!isAdmin) {
    return (
      <PageShell adminNav heading={<AdminPageTitle before="Admin " accent="Dashboard" />} intro="This area is for site administrators only.">
        <Link to="/account" className="mt-6 inline-block font-bold text-sky-blue">
          ← Back to My Account
        </Link>
      </PageShell>
    );
  }

  return (
    <PageShell
      adminNav
      heading={<AdminPageTitle before="Admin " accent="Dashboard" />}
      intro="Newsletters, financial tools, and the Savings Reset Kit are managed from here."
    >
      <ul className="mt-10 grid gap-4 sm:grid-cols-3">
        {areas.map((area) => (
          <li key={area.to}>
            <Link
              to={area.to}
              className="group flex h-full flex-col rounded bg-white p-6 shadow-big-shadow transition hover:bg-[#57ae83]"
            >
              <span className="text-lg font-bold text-navy-blue group-hover:text-white">{area.title}</span>
              <span className="mt-2 text-sm text-navy-blue/80 group-hover:text-white">{area.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
