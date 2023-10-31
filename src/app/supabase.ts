import { createClient } from '@supabase/supabase-js'
import { environment } from 'src/environments/environment'

export default createClient(environment.supabase.url, environment.supabase.apiKey)