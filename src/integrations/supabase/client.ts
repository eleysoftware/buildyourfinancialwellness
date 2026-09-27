import { createClient } from "@supabase/supabase-js";

import type { Database } from "./database.types";

// External Supabase project (user-managed). The publishable key is public by
// design and safe to ship in browser code; RLS enforces access.
export const SUPABASE_URL = "https://kbtwskvjxdhjrnrdthua.supabase.co";
export const SUPABASE_PUBLISHABLE_KEY = "PASTE_PUBLISHABLE_KEY_HERE";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
