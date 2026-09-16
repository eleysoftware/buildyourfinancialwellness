import { createFileRoute } from "@tanstack/react-router";

import { PageShell } from "@/components/site/PageShell";

const title = "FAQ — Build Financial Wellness";
const description =
  "Answers to common questions about financial coaching, budgeting workshops, and who benefits most from working with a coach.";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Faq,
});

function Faq() {
  return (
    <PageShell
      title="Frequently Asked Questions"
      intro="Questions and answers are coming soon. Send us the list you'd like covered here."
    />
  );
}
