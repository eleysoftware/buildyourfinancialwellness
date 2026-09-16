import { createServerFn } from "@tanstack/react-start";

export type SubscribeInput = {
  formTag: string;
  email: string;
  firstName?: string;
};

export const submitForm = createServerFn({ method: "POST" })
  .inputValidator((data: SubscribeInput) => {
    const email = String(data?.email ?? "").trim();
    const formTag = String(data?.formTag ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Please enter a valid email address.");
    }
    if (!formTag) throw new Error("Missing form tag.");
    return {
      email,
      formTag,
      firstName: String(data?.firstName ?? "").trim(),
    };
  })
  .handler(async ({ data }) => {
    const webhookUrl = process.env["MAKE_WEBHOOK_URL"];
    if (!webhookUrl) {
      return { ok: true as const, delivered: false as const };
    }

    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          formTag: data.formTag,
          email: data.email,
          firstName: data.firstName,
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        console.error("Make webhook responded with", res.status);
        return { ok: false as const, delivered: false as const };
      }
      return { ok: true as const, delivered: true as const };
    } catch (error) {
      console.error("Make webhook request failed", error);
      return { ok: false as const, delivered: false as const };
    }
  });
