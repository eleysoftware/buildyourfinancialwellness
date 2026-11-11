import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { clearPasswordRecovery, isPasswordRecovery, supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

type AuthMode = "sign-in" | "sign-up" | "forgot" | "reset";

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

function alreadyRegistered(message: string | undefined) {
  return /already registered|already exists|already been registered/i.test(message ?? "");
}

const expiredResetMessage =
  "This reset link is invalid or has expired. Enter your email to send a new one.";

function AuthPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<AuthMode>("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "confirm">("idle");
  const [message, setMessage] = useState("");
  const [checkedRecovery, setCheckedRecovery] = useState(false);

  useEffect(() => {
    if (isPasswordRecovery()) setMode("reset");
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setMode("reset");
    });
    setCheckedRecovery(true);
    return () => subscription.unsubscribe();
  }, []);

  const view: AuthMode = isPasswordRecovery() ? "reset" : mode;
  const resetLinkExpired = view === "reset" && !user;

  if (!checkedRecovery || loading) return null;

  if (user && view !== "reset") {
    navigate({ to: "/account", replace: true });
    return null;
  }

  function switchMode(next: AuthMode) {
    clearPasswordRecovery();
    setMode(next);
    setMessage("");
    setStatus("idle");
    setPassword("");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    if (view === "forgot" || resetLinkExpired) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth`,
      });
      if (error) {
        setStatus("error");
        setMessage(error.message);
      } else {
        clearPasswordRecovery();
        setMode("forgot");
        setStatus("confirm");
        setMessage("Check your email for a link to reset your password.");
      }
      return;
    }

    if (view === "reset") {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        clearPasswordRecovery();
        setMode("forgot");
        setStatus("error");
        setMessage(expiredResetMessage);
        return;
      }
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        const missingSession = /session missing/i.test(error.message);
        if (missingSession) {
          clearPasswordRecovery();
          setMode("forgot");
        }
        setStatus("error");
        setMessage(missingSession ? expiredResetMessage : error.message);
        return;
      }
      clearPasswordRecovery();
      navigate({ to: "/account" });
      return;
    }

    if (view === "sign-up") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { display_name: displayName.trim() || undefined },
          emailRedirectTo: window.location.origin,
        },
      });
      const duplicate = data.user?.identities?.length === 0 || alreadyRegistered(error?.message);
      if (duplicate) {
        setStatus("error");
        setMessage("This email is already in use. Sign in instead.");
      } else if (error) {
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
            {view === "sign-in"
              ? "Welcome back"
              : view === "sign-up"
                ? "Create your account"
                : view === "forgot" || resetLinkExpired
                  ? "Reset your password"
                  : "Choose a new password"}
          </h1>
          <p className="mt-4 text-lg">
            {view === "sign-in"
              ? "Sign in to access your Employee Resource Library account."
              : view === "sign-up"
                ? "Join Build Financial Wellness to start your journey."
                : resetLinkExpired
                  ? expiredResetMessage
                  : view === "forgot"
                    ? "Enter the email on your account and we'll send a link to choose a new password."
                    : "Enter a new password for your account."}
          </p>
          <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
          {view === "sign-up" ? (
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
          {view !== "reset" || resetLinkExpired ? (
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
          ) : null}
          {view !== "forgot" && !resetLinkExpired ? (
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
                placeholder={view === "reset" ? "New password" : "Password"}
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
          ) : null}
          {view === "sign-in" ? (
            <button
              type="button"
              onClick={() => switchMode("forgot")}
              className="self-start text-sm font-bold text-white underline-offset-2 transition hover:underline"
            >
              Forgot password?
            </button>
          ) : null}
          <button
            type="submit"
            disabled={sending}
            className="mt-2 h-[54px] rounded-[80px] bg-burnt-orange px-10 text-base font-bold text-white shadow-[0px_4px_3px_0px_rgb(0_0_0_/_0.35)] transition hover:brightness-110 disabled:opacity-70"
          >
            {sending
              ? "Please wait…"
              : view === "sign-in"
                ? "Sign In"
                : view === "sign-up"
                  ? "Sign Up"
                  : view === "forgot" || resetLinkExpired
                    ? "Send reset link"
                    : "Update password"}
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

        {view !== "reset" || resetLinkExpired ? (
          <button
            type="button"
            onClick={() => switchMode(view === "sign-in" ? "sign-up" : "sign-in")}
            className="mt-6 w-full text-center text-sm font-bold text-white underline-offset-2 transition hover:underline"
          >
            {view === "sign-in" ? "New here? Create an account" : "Already have an account? Sign in"}
          </button>
        ) : null}
        </section>
      </main>
      <Footer />
    </div>
  );
}
