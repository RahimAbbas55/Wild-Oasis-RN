import 'react-native-url-polyfill';
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const supabase = createClient(
 'YOUR-SUPABASE-URL',
  process.env.SUPABASE_KEY,
  {auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }}
);
