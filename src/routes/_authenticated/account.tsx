import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { PageShell } from "@/components/site/PageShell";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/account")({
  head: () => ({
    meta: [
      { title: "My Account | Build Financial Wellness" },
      {
        name: "description",
        content: "View and manage your Build Financial Wellness account profile.",
      },
      { property: "og:title", content: "My Account | Build Financial Wellness" },
      {
        property: "og:description",
        content: "View and manage your Build Financial Wellness account profile.",
      },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: profile } = useQuery({
    queryKey: ["profile", user.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, display_name, avatar_url, created_at")
        .eq("id", user.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  const displayName = profile?.display_name ?? user.email?.split("@")[0] ?? "there";

  return (
    <PageShell
      title={`Welcome, ${displayName}!`}
      intro="This is your Build Financial Wellness account page."
    >
      <section className="w-full max-w-[720px]">
        <div className="mt-10 rounded bg-white p-6 shadow-big-shadow lg:p-8">
          <h2 className="text-xl font-bold text-navy-blue">Your profile</h2>
          <dl className="mt-4 flex flex-col gap-3 text-base">
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
              <dt className="w-32 shrink-0 font-bold text-navy-blue">Name</dt>
              <dd className="text-navy-blue/80">{profile?.display_name ?? "—"}</dd>
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
              <dt className="w-32 shrink-0 font-bold text-navy-blue">Email</dt>
              <dd className="text-navy-blue/80">{user.email}</dd>
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
              <dt className="w-32 shrink-0 font-bold text-navy-blue">Member since</dt>
              <dd className="text-navy-blue/80">
                {profile?.created_at
                  ? new Date(profile.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "—"}
              </dd>
            </div>
          </dl>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="mt-8 h-[50px] rounded-[80px] bg-navy-blue px-10 text-base font-bold text-white shadow-[0px_4px_3px_0px_rgb(0_0_0_/_0.35)] transition hover:bg-[#57ae83]"
        >
          Sign Out
        </button>
      </section>
    </PageShell>
  );
}
