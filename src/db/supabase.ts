import { createClient } from "@supabase/supabase-js";
import { getSupabaseUrl, getSupabaseAnonKey } from "@/config/envconfig";

export const supabase = createClient(getSupabaseUrl(), getSupabaseAnonKey());

console.log("Supabase client initialized successfully");
