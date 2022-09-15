import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceSecret = process.env.SUPABASE_SERVICE_SECRET;

if (!supabaseUrl) throw new Error('Missing process.env.SUPABASE_URL');
if (!supabaseServiceSecret)
  throw new Error('Missing process.env.SUPABASE_SERVICE_SECRET');

export const supabase = createClient(supabaseUrl, supabaseServiceSecret);
