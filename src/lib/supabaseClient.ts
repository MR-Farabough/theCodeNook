import { createClient } from '@supabase/supabase-js'

const supabaseUrl:string = import.meta.env.VITE_SUPABASE_URL as string
const supabaseKey:string = import.meta.env.VITE_PUBLIC_ANON as string
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase