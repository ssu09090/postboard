import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://xpcmyjuoztxkpzpfwplt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhwY215anVvenR4a3B6cGZ3cGx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwMzI0NjAsImV4cCI6MjA2NTYwODQ2MH0.bos4C9Kd_TgdItTqVrbNtFXu-7pq403jnLLBjOi3oO0";
export const supabase = createClient(supabaseUrl, supabaseKey)