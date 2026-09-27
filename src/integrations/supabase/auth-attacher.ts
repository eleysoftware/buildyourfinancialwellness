import { createMiddleware } from "@tanstack/react-start";

import { supabase } from "./client";

/** Attaches the current session's bearer token to every server-fn call. */
export const attachSupabaseAuth = createMiddleware({ type: "function" }).client(async ({ next }) => {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) return next();
  return next({
    headers: { Authorization: `Bearer ${token}` },
  });
});
