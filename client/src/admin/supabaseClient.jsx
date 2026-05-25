import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://iwlfokdsbfrpprxnzvju.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3bGZva2RzYmZycHByeG56dmp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1NjYxMjQsImV4cCI6MjA5NTE0MjEyNH0.TdBJ-z7EUn89W3bsU3-RyG1qUdGg6EQeIxOWaeLX_Mk'

export const supabase = createClient(supabaseUrl, supabaseKey)