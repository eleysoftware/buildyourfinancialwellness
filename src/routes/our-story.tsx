import { createFileRoute } from "@tanstack/react-router";

import { PageShell } from "@/components/site/PageShell";

const title = "Our Story — Build Financial Wellness";
const description =
  "How Build Financial Wellness began and why judgment-free money coaching is at the heart of everything we do.";

export const Route = createFileRoute("/our-story")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: OurStory,
});

function OurStory() {
  return (
    <PageShell
      title="Our Story"
      intro="This page is ready for your story. Share it with us and we'll put it here."
    />
  );
}
