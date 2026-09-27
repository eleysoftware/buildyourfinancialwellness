import { createMiddleware } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";

import type { Database } from "./database.types";
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from "./client";

/**
 * Server-fn middleware: validates the request bearer token with Supabase Auth
 * and injects a user-scoped client (RLS applies as that user), userId, claims.
 */
export const requireSupabaseAuth = createMiddleware({ type: "function" }).server(async ({ next }) => {
  const authHeader = getRequestHeader("authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) throw new Response("Unauthorized", { status: 401 });

  const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${token}` } },
  });

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) throw new Response("Unauthorized", { status: 401 });

  return next({
    context: {
      supabase,
      userId: data.user.id,
      claims: data.user,
    },
  });
});
