import { createFileRoute } from "@tanstack/react-router";

import { PageShell } from "@/components/site/PageShell";

const title = "Resources — Build Financial Wellness";
const description =
  "Worksheets, guides, and tools to help you budget with confidence and build lasting money habits.";

export const Route = createFileRoute("/resources")({
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
  return (
    <PageShell
      title="Resources"
      intro="Downloads and guides will live here. Share the files you'd like to offer and we'll add them."
    />
  );
}
