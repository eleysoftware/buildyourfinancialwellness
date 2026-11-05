import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
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
  const [showPassword, setShowPassword] = useState(false);
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
    "h-14 w-full rounded border-2 border-white bg-white px-4 text-base font-semibold text-navy-blue placeholder:text-[#bbc8d4] focus:outline-none focus:ring-2 focus:ring-white";

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-cabin">
      <Header />
      <main className="flex flex-1 items-center justify-center px-5 py-14 lg:py-[85px]">
        <section className="w-full max-w-[520px] rounded-[10px] bg-sky-blue px-8 py-10 text-white shadow-big-shadow lg:px-12 lg:py-12">
          <h1 className="text-[2.25rem] font-normal leading-tight lg:text-5xl">
            {mode === "sign-in" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-4 text-lg">
            {mode === "sign-in"
              ? "Sign in to access your Employee Resource Library account."
              : "Join Build Financial Wellness to start your journey."}
          </p>
          <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
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
          <div className="relative">
            <label className="sr-only" htmlFor="auth-password">
              Password
            </label>
            <input
              id="auth-password"
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className={`${inputClass} pr-12`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              aria-controls="auth-password"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-blue transition hover:text-sage-green-sat50"
            >
              {showPassword ? <EyeOff className="size-5" aria-hidden="true" /> : <Eye className="size-5" aria-hidden="true" />}
            </button>
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
              className={`rounded bg-white px-3 py-2 text-center text-sm font-semibold ${
                status === "error" ? "text-burnt-orange" : "text-navy-blue"
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
          className="mt-6 w-full text-center text-sm font-bold text-white underline-offset-2 transition hover:underline"
        >
          {mode === "sign-in"
            ? "New here? Create an account"
            : "Already have an account? Sign in"}
        </button>
        </section>
      </main>
      <Footer />
    </div>
  );
}
