import { createClient } from "@supabase/supabase-js";

import type { Database } from "./database.types";

// External Supabase project (user-managed). The publishable key is public by
// design and safe to ship in browser code; RLS enforces access.
export const SUPABASE_URL = "https://kbtwskvjxdhjrnrdthua.supabase.co";
export const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_P--oL8-yx9VZU1Gs7rDVFw_MvF59rRT";

const RECOVERY_KEY = "bfw-password-recovery";

function rememberRecoveryFromUrl() {
  if (typeof window === "undefined") return;
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const search = new URLSearchParams(window.location.search);
  if (hash.get("type") === "recovery" || search.get("type") === "recovery") {
    sessionStorage.setItem(RECOVERY_KEY, "1");
  }
}

rememberRecoveryFromUrl();

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

if (typeof window !== "undefined") {
  supabase.auth.onAuthStateChange((event) => {
    if (event === "PASSWORD_RECOVERY") sessionStorage.setItem(RECOVERY_KEY, "1");
    if (event === "SIGNED_OUT") sessionStorage.removeItem(RECOVERY_KEY);
  });
}

export function isPasswordRecovery() {
  return typeof window !== "undefined" && sessionStorage.getItem(RECOVERY_KEY) === "1";
}

export function clearPasswordRecovery() {
  if (typeof window !== "undefined") sessionStorage.removeItem(RECOVERY_KEY);
}
