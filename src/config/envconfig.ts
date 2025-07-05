export const getSupabaseUrl = (): string => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url)
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL is not set in environment variables"
    );
  return url;
};

export const getSupabaseAnonKey = (): string => {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!key)
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_ANON_KEY is not set in environment variables"
    );
  return key;
};
