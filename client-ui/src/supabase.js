import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gjtorgemgwnxzzpuxywh.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqdG9yZ2VtZ3dueHp6cHV4eXdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc4MTUzMjAsImV4cCI6MjAxMzM5MTMyMH0.OMHn__SnZ7mLdrBMzZZ8L89gaZYTMHheYBVjC8dX3nE'
const supabase = createClient(supabaseUrl, supabaseAnonKey)
export default supabase