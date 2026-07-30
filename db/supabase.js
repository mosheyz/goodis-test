import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_KEY)

export const budgets = supabase.from("budgets")

export const spends = supabase.from("spends")