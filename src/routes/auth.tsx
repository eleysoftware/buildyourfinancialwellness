import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { PageShell } from "@/components/site/PageShell";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign In | Build Financial Wellness" },
      {
        name: "description",
        content:
          "Sign in or create your Build Financial Wellness account to access your profile and member resources.",
      },
      { property: "og:title", content: "Sign In | Build Financial Wellness" },
      {
        property: "og:description",
        content:
          "Sign in or create your Build Financial Wellness account to access your profile and member resources.",
      },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "confirm">("idle");
  const [message, setMessage] = useState("");

  if (!loading && user) {
    navigate({ to: "/account", replace: true });
    return null;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    if (mode === "sign-up") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { display_name: displayName.trim() || undefined },
          emailRedirectTo: window.location.origin,
        },
      });
      if (error) {
        setStatus("error");
        setMessage(error.message);
      } else if (!data.session) {
        setStatus("confirm");
        setMessage("Check your email to confirm your account, then sign in.");
      } else {
        navigate({ to: "/account" });
      }
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setStatus("error");
      setMessage(error.message);
    } else {
      navigate({ to: "/account" });
    }
  }

  const sending = status === "sending";

  const inputClass =
    "h-14 w-full rounded border-2 border-[#bbc8d4] bg-white px-4 text-base font-semibold text-navy-blue placeholder:text-[#bbc8d4] focus:outline-none focus:ring-2 focus:ring-sky-blue";

  return (
    <PageShell>
      <section className="mx-auto flex w-full max-w-[520px] flex-col px-5 py-16 lg:py-24">
        <h1 className="text-center text-3xl font-bold text-navy-blue lg:text-4xl">
          {mode === "sign-in" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="mt-3 text-center text-base text-navy-blue/80">
          {mode === "sign-in"
            ? "Sign in to access your Build Financial Wellness account."
            : "Join Build Financial Wellness to start your journey."}
        </p>

        <form onSubmit={onSubmit} className="mt-10 flex flex-col gap-4">
          {mode === "sign-up" ? (
            <div>
              <label className="sr-only" htmlFor="auth-name">
                Display name
              </label>
              <input
                id="auth-name"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Display name (optional)"
                className={inputClass}
              />
            </div>
          ) : null}
          <div>
            <label className="sr-only" htmlFor="auth-email">
              Email
            </label>
            <input
              id="auth-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className={inputClass}
            />
          </div>
          <div>
            <label className="sr-only" htmlFor="auth-password">
              Password
            </label>
            <input
              id="auth-password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className={inputClass}
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="mt-2 h-[54px] rounded-[80px] bg-burnt-orange px-10 text-base font-bold text-white shadow-[0px_4px_3px_0px_rgb(0_0_0_/_0.35)] transition hover:brightness-110 disabled:opacity-70"
          >
            {sending ? "Please wait…" : mode === "sign-in" ? "Sign In" : "Sign Up"}
          </button>
          {message ? (
            <p
              className={`text-center text-sm font-semibold ${
                status === "error" ? "text-burnt-orange" : "text-sage-green-sat50"
              }`}
            >
              {message}
            </p>
          ) : null}
        </form>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "sign-in" ? "sign-up" : "sign-in");
            setMessage("");
            setStatus("idle");
          }}
          className="mt-6 text-center text-sm font-bold text-sky-blue transition hover:text-navy-blue"
        >
          {mode === "sign-in"
            ? "New here? Create an account"
            : "Already have an account? Sign in"}
        </button>
      </section>
    </PageShell>
  );
}
