// lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL; // From Supabase Dashboard
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY; // From Supabase Dashboard

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
