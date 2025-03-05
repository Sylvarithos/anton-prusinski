// lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.supabaseUrl; // From Supabase Dashboard
const supabaseAnonKey = process.env.supabaseKey; // From Supabase Dashboard

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
