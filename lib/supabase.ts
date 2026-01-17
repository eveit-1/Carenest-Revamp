import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (!supabaseClient) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // If env vars are missing, use placeholder values to prevent build failures
    // Vercel will set proper env vars at runtime, so this is only for build-time
    if (!supabaseUrl || !supabaseAnonKey) {
      // Use placeholder values that won't cause createClient to throw
      // The actual API calls will fail at runtime if env vars are still missing,
      // which is the expected behavior
      supabaseClient = createClient(
        supabaseUrl || 'https://placeholder.supabase.co',
        supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwiaWF0IjoxNjQwMTk5MjAwLCJleHAiOjE5NTU3NzUyMDB9.placeholder'
      );
    } else {
      supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
    }
  }

  return supabaseClient;
}

// Lazy export - only creates client when property is accessed
// This prevents initialization during build if env vars are missing
const supabaseProxy = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getSupabaseClient();
    const value = client[prop as keyof SupabaseClient];
    // If it's a function, bind it to the client
    if (typeof value === 'function') {
      return value.bind(client);
    }
    return value;
  },
});

export const supabase = supabaseProxy;
