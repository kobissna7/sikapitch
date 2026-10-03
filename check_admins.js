import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_SERVICE_ROLE_KEY
)

async function run() {
  const { data: roles } = await supabase.from('admin_roles').select('*')
  console.log("Roles:", roles)
  
  const { data: { users }, error } = await supabase.auth.admin.listUsers()
  if (error) console.error("Error fetching users:", error)
  else {
    for (const role of roles) {
      const u = users.find(x => x.id === role.user_id)
      console.log(`Role: ${role.role}, User ID: ${role.user_id}, Email: ${u ? u.email : 'NOT FOUND'}`)
    }
  }
}
run()
