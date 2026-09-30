import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";

import { NewsletterList } from "@/components/site/NewsletterList";
import { PageShell } from "@/components/site/PageShell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const title = "Resource Library — Build Financial Wellness";
const description = "Tools and newsletters to help you build financial wellness.";

const tabTrigger =
  "rounded-md px-5 py-2 text-base font-bold text-navy-blue data-[state=active]:bg-navy-blue data-[state=active]:text-white data-[state=active]:shadow-none";

export const Route = createFileRoute("/resources")({
  validateSearch: z.object({
    tab: z.enum(["tools", "newsletters"]).optional().catch(undefined),
    page: z.number().int().min(1).optional().catch(undefined),
  }),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Resources,
});

function Resources() {
  const { tab, page = 1 } = Route.useSearch();
  const navigate = useNavigate();
  const active = tab === "newsletters" ? "newsletters" : "tools";

  function selectTab(value: string) {
    navigate({
      to: "/resources",
      search: value === "newsletters" ? { tab: "newsletters" } : { tab: "tools" },
    });
  }

  return (
    <PageShell title="Resource Library" intro={description}>
      <Tabs value={active} onValueChange={selectTab} className="mt-10">
        <TabsList className="h-auto w-full justify-start gap-1 bg-white p-1 shadow-big-shadow sm:w-auto">
          <TabsTrigger value="tools" className={tabTrigger}>
            Tools
          </TabsTrigger>
          <TabsTrigger value="newsletters" className={tabTrigger}>
            Newsletters
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tools">
          <p className="mt-10 text-lg text-navy-blue-sat50">Tools will be added here.</p>
        </TabsContent>
        <TabsContent value="newsletters">
          <NewsletterList page={page} to="/resources" />
        </TabsContent>
      </Tabs>
    </PageShell>
  );
}
