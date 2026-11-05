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
      await notifyDeliveryFailure(data, "MAKE_WEBHOOK_URL is not set.");
      return { ok: false as const, delivered: false as const };
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
        const reason = `Make webhook responded with ${res.status}`;
        console.error(reason);
        await notifyDeliveryFailure(data, reason);
        return { ok: false as const, delivered: false as const };
      }
      return { ok: true as const, delivered: true as const };
    } catch (error) {
      const reason = error instanceof Error ? error.message : "Make webhook request failed";
      console.error("Make webhook request failed", error);
      await notifyDeliveryFailure(data, reason);
      return { ok: false as const, delivered: false as const };
    }
  });

const ALERT_EMAIL = "eleysoftware@gmail.com";

async function notifyDeliveryFailure(data: SubscribeInput, reason: string) {
  try {
    await fetch(`https://formsubmit.co/ajax/${ALERT_EMAIL}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        _subject: "BFW form could not reach Make",
        _template: "box",
        _captcha: "false",
        formTag: data.formTag,
        email: data.email,
        reason,
      }),
      signal: AbortSignal.timeout(8000),
    });
  } catch (error) {
    console.error("Failure notice could not be sent", error);
  }
}
