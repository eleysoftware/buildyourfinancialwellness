import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";

import { submitForm } from "@/lib/subscribe.functions";

type Variant = "hero" | "newsletter" | "footer";

interface SubscribeFormProps {
  formTag: string;
  variant: Variant;
  withFirstName?: boolean;
  submitLabel?: string;
}

export function SubscribeForm({
  formTag,
  variant,
  withFirstName = false,
  submitLabel = "Submit",
}: SubscribeFormProps) {
  const send = useServerFn(submitForm);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    try {
      const result = await send({ data: { formTag, email, firstName } });
      if (result.ok) {
        setStatus("done");
        setMessage("Thank you! We'll be in touch shortly.");
        setEmail("");
        setFirstName("");
      } else {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Please try again.");
    }
  }

  const sending = status === "sending";

  if (variant === "hero") {
    return (
      <form onSubmit={onSubmit} className="w-full max-w-[564px]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input type="hidden" name="formTag" value={formTag} />
          <label className="sr-only" htmlFor="hero-email">
            Email
          </label>
          <input
            id="hero-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="h-14 w-full rounded border-2 border-[#bbc8d4] bg-white px-4 text-base font-semibold text-navy-blue placeholder:text-[#bbc8d4] focus:outline-none focus:ring-2 focus:ring-sky-blue sm:max-w-[366px]"
          />
          <button
            type="submit"
            disabled={sending}
            className="h-[54px] shrink-0 rounded-[80px] bg-burnt-orange px-10 text-base font-bold text-white shadow-[0px_4px_3px_0px_rgb(0_0_0_/_0.35)] transition hover:brightness-110 disabled:opacity-70"
          >
            {sending ? "Sending…" : submitLabel}
          </button>
        </div>
        {message ? (
          <p className="mt-3 text-sm font-semibold text-white drop-shadow">{message}</p>
        ) : null}
      </form>
    );
  }

  if (variant === "footer") {
    return (
      <form onSubmit={onSubmit} className="mt-3 w-full max-w-[320px]">
        <input type="hidden" name="formTag" value={formTag} />
        <div className="relative">
          <label className="sr-only" htmlFor="footer-email">
            Email
          </label>
          <input
            id="footer-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="h-[50px] w-full rounded border border-white/30 bg-white/10 pl-4 pr-12 text-xs text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-sky-blue"
          />
          <button
            type="submit"
            disabled={sending}
            aria-label="Subscribe"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-white/60 transition hover:text-white"
          >
            <svg width="24" height="16" viewBox="0 0 24 16" fill="none" aria-hidden="true">
              <path
                d="M22.7075 7.14726L15.8568 0.312743C15.4388 -0.104248 14.761 -0.104248 14.343 0.312743C13.9249 0.72982 13.9249 1.40592 14.343 1.823L19.3663 6.8345H1.07042C0.47929 6.8345 0 7.31266 0 7.90239C0 8.49204 0.47929 8.97028 1.07042 8.97028H19.3663L14.3432 13.9818C13.9251 14.3989 13.9251 15.075 14.3432 15.492C14.5521 15.7004 14.8261 15.8048 15.1001 15.8048C15.374 15.8048 15.648 15.7004 15.857 15.492L22.7075 8.65752C23.1255 8.24044 23.1255 7.56434 22.7075 7.14726Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
        {message ? <p className="mt-2 text-xs text-white">{message}</p> : null}
      </form>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 w-full">
      <input type="hidden" name="formTag" value={formTag} />
      {withFirstName ? (
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-4">
          <label
            htmlFor="newsletter-first-name"
            className="pt-4 text-base font-extrabold uppercase tracking-[0.1em] text-color-white sm:w-[130px] sm:text-right"
          >
            First name:
            <span className="block text-xs font-semibold normal-case tracking-normal">
              (optional)
            </span>
          </label>
          <input
            id="newsletter-first-name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="first name"
            className="h-14 w-full rounded bg-white px-4 text-base font-semibold text-navy-blue placeholder:text-light-gray focus:outline-none focus:ring-2 focus:ring-navy-blue sm:max-w-[290px]"
          />
        </div>
      ) : null}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <label
          htmlFor="newsletter-email"
          className="text-base font-extrabold uppercase tracking-[0.1em] text-color-white sm:w-[130px] sm:text-right"
        >
          Email:
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email address"
          className="h-14 w-full rounded bg-white px-4 text-base font-semibold text-navy-blue placeholder:text-light-gray focus:outline-none focus:ring-2 focus:ring-navy-blue sm:max-w-[290px]"
        />
      </div>
      <div className="mt-8 flex justify-center">
        <button
          type="submit"
          disabled={sending}
          className="h-14 rounded-[80px] bg-white/10 px-16 text-base font-bold text-white shadow-[0px_4px_3px_0px_rgb(0_0_0_/_0.35)] transition hover:bg-white/30 disabled:opacity-70"
        >
          {sending ? "Sending…" : submitLabel}
        </button>
      </div>
      {message ? <p className="mt-4 text-center text-sm text-white">{message}</p> : null}
    </form>
  );
}
