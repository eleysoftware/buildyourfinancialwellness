import { createClient } from "@supabase/supabase-js";

import type { Database } from "./database.types";

// External Supabase project (user-managed). The publishable key is public by
// design and safe to ship in browser code; RLS enforces access.
export const SUPABASE_URL = "https://kbtwskvjxdhjrnrdthua.supabase.co";
export const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_P--oL8-yx9VZU1Gs7rDVFw_MvF59rRT";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
