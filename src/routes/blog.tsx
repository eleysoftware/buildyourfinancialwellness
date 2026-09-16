import { createFileRoute } from "@tanstack/react-router";

import { PageShell } from "@/components/site/PageShell";

const title = "Blog — Build Financial Wellness";
const description =
  "Practical money insights, coaching notes, and encouragement from the Build Financial Wellness team.";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Blog,
});

function Blog() {
  return (
    <PageShell
      title="Blog"
      intro="Articles are on the way. Send us your first posts and we'll publish them here."
    />
  );
}
