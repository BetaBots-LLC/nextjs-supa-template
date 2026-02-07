import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database.types";

export function createClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable");
  }
  if (!process.env.NEXT_PUBLIC_PUBLISHABLE_KEY) {
    throw new Error("Missing NEXT_PUBLIC_PUBLISHABLE_KEY environment variable");
  }

  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  );
}
