import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

// No cookies = safe with "use cache"
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_PUBLISHABLE_KEY as string,
);
