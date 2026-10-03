import { useState, useEffect } from 'react'
import { UserPlus, Trash2, Loader2, ShieldCheck, Eye, EyeOff, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '../../lib/supabase'

interface AdminUser {
  user_id: string
  role: string
  created_at: string
  email?: string
}

export default function SettingsAdmin() {
  const [admins, setAdmins] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [revoking, setRevoking] = useState<string | null>(null)

  // Form state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('admin')
  const [showPass, setShowPass] = useState(false)

  // Current session user ID (to prevent self-removal)
  const currentUserId = sessionStorage.getItem('adminSessionUserId')

  useEffect(() => {
    loadAdmins()
  }, [])

  async function loadAdmins() {
    setLoading(true)
    try {
      // email is stored in admin_roles when users are created via this form
      const { data, error } = await supabase
        .from('admin_roles')
        .select('user_id, role, created_at, email')
        .order('created_at', { ascending: true })

      if (error) throw error
      setAdmins(
        (data || []).map((a: any) => ({
          user_id: a.user_id,
          role: a.role,
          created_at: a.created_at,
          email: a.email ?? null,
        }))
      )
    } catch (err) {
      console.error(err)
      toast.error('Failed to load admin users.')
    } finally {
      setLoading(false)
    }
  }

  async function handleCreateAdmin(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password || !confirmPassword) {
      toast.error('Please fill in all fields.')
      return
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.')
      return
    }
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters.')
      return
    }

    setSubmitting(true)
    try {
      // Step 1: Create the Supabase auth user
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: undefined,
        },
      })

      if (signUpError || !signUpData.user) {
        throw new Error(signUpError?.message ?? 'Failed to create account.')
      }

      const newUserId = signUpData.user.id

      // Step 2: Insert into admin_roles
      const { error: roleError } = await supabase
        .from('admin_roles')
        .insert({ user_id: newUserId, role, email })

      if (roleError) {
        throw new Error('Account created but failed to assign admin role: ' + roleError.message)
      }

      toast.success(`Admin user "${email}" created successfully.`)
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setRole('admin')
      setShowForm(false)
      await loadAdmins()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred.'
      toast.error(msg)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleRevoke(userId: string) {
    if (userId === currentUserId) {
      toast.error("You cannot revoke your own admin access.")
      return
    }
    if (!confirm('Remove this admin user? They will no longer be able to access the dashboard.')) return

    setRevoking(userId)
    try {
      const { error } = await supabase
        .from('admin_roles')
        .delete()
        .eq('user_id', userId)

      if (error) throw error
      toast.success('Admin access revoked.')
      setAdmins(prev => prev.filter(a => a.user_id !== userId))
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to revoke access.'
      toast.error(msg)
    } finally {
      setRevoking(null)
    }
  }

  function roleColor(r: string) {
    if (r === 'super_admin') return 'badge-gold'
    if (r === 'admin') return 'badge-green'
    return ''
  }

  return (
    <div>
      <div className="dash-header">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <h1>Platform Settings</h1>
            <p>Manage admin users and global site configuration.</p>
          </div>
          <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
            <button
              id="refresh-admins-btn"
              className="btn btn-ghost"
              style={{ fontSize: '0.8125rem', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6 }}
              onClick={() => loadAdmins()}
              disabled={loading}
            >
              <RefreshCw size={14} />
              Refresh
            </button>
            <button
              id="add-admin-btn"
              className="btn btn-gold"
              style={{ fontSize: '0.8125rem', padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 8 }}
              onClick={() => setShowForm(f => !f)}
            >
              <UserPlus size={15} />
              Add Admin User
            </button>
          </div>
        </div>
      </div>

      {/* ===== ADD ADMIN FORM ===== */}
      {showForm && (
        <div
          id="add-admin-form-panel"
          className="table-wrap"
          style={{ padding: 28, marginBottom: 28, borderLeft: '3px solid var(--gold)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <ShieldCheck size={18} style={{ color: 'var(--gold)' }} />
            <h3 style={{ margin: 0 }}>Create New Admin User</h3>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: 24 }}>
            This will create a Supabase Auth account and grant it dashboard access. The user will receive a confirmation email.
          </p>

          <form
            id="create-admin-form"
            onSubmit={handleCreateAdmin}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}
          >
            {/* Email */}
            <div className="field-group">
              <label className="field-label" htmlFor="admin-email">Email Address</label>
              <input
                id="admin-email"
                className="field-input"
                type="email"
                placeholder="newadmin@sikapitch.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Role */}
            <div className="field-group">
              <label className="field-label" htmlFor="admin-role">Role</label>
              <select
                id="admin-role"
                className="field-input"
                value={role}
                onChange={e => setRole(e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
                <option value="viewer">Viewer (Read-only)</option>
              </select>
            </div>

            {/* Password */}
            <div className="field-group">
              <label className="field-label" htmlFor="admin-password">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="admin-password"
                  className="field-input"
                  type={showPass ? 'text' : 'password'}
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  style={{ paddingRight: 44 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(p => !p)}
                  style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer' }}
                  tabIndex={-1}
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="field-group">
              <label className="field-label" htmlFor="admin-confirm-password">Confirm Password</label>
              <input
                id="admin-confirm-password"
                className="field-input"
                type={showPass ? 'text' : 'password'}
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/* Actions — full width row */}
            <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 12, justifyContent: 'flex-end', paddingTop: 4 }}>
              <button
                id="cancel-add-admin-btn"
                type="button"
                className="btn btn-ghost"
                style={{ fontSize: '0.8125rem' }}
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button
                id="submit-add-admin-btn"
                type="submit"
                className="btn btn-gold"
                style={{ fontSize: '0.8125rem', display: 'flex', alignItems: 'center', gap: 8 }}
                disabled={submitting}
              >
                {submitting ? (
                  <><Loader2 size={14} className="spin" /> Creating...</>
                ) : (
                  <><UserPlus size={14} /> Create Admin</>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ===== ADMIN USERS TABLE ===== */}
      <div className="table-wrap">
        <div className="table-wrap-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Admin Users</h3>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            {admins.length} {admins.length === 1 ? 'user' : 'users'}
          </span>
        </div>

        {loading ? (
          <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-muted)' }}>
            <Loader2 size={20} className="spin" style={{ margin: '0 auto 12px', display: 'block' }} />
            Loading admin users...
          </div>
        ) : admins.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-muted)' }}>
            No admin users found. Use the button above to add one.
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Email / User ID</th>
                <th>Role</th>
                <th>Added</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map(a => (
                <tr key={a.user_id}>
                  <td>
                    <div>
                      {a.email ? (
                        <span style={{ fontWeight: 600, color: 'var(--white)' }}>{a.email}</span>
                      ) : (
                        <span style={{ fontWeight: 600, color: 'var(--white)', fontFamily: 'monospace', fontSize: '0.8125rem' }}>
                          {a.user_id.slice(0, 8)}…{a.user_id.slice(-6)}
                        </span>
                      )}
                      {a.user_id === currentUserId && (
                        <span style={{ marginLeft: 8, fontSize: '0.6875rem', color: 'var(--gold)', fontWeight: 700, opacity: 0.85 }}>(you)</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${roleColor(a.role)}`} style={{ textTransform: 'capitalize' }}>
                      {a.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    {new Date(a.created_at).toLocaleDateString()}
                  </td>
                  <td>
                    <button
                      id={`revoke-admin-${a.user_id}`}
                      className="btn btn-ghost"
                      style={{
                        fontSize: '0.75rem', padding: '6px 10px',
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        color: a.user_id === currentUserId ? 'var(--text-muted)' : '#ef4444',
                        borderColor: 'transparent',
                        opacity: a.user_id === currentUserId ? 0.4 : 1,
                        cursor: a.user_id === currentUserId ? 'not-allowed' : 'pointer',
                      }}
                      disabled={revoking === a.user_id || a.user_id === currentUserId}
                      onClick={() => handleRevoke(a.user_id)}
                    >
                      {revoking === a.user_id ? (
                        <Loader2 size={13} className="spin" />
                      ) : (
                        <Trash2 size={13} />
                      )}
                      Revoke
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ===== INFO NOTE ===== */}
      <div style={{ marginTop: 20, padding: '14px 18px', borderRadius: 8, background: 'rgba(201,162,39,0.06)', border: '1px solid rgba(201,162,39,0.15)', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
        <strong style={{ color: 'var(--gold)' }}>Note:</strong> Admin users are stored in the <code>admin_roles</code> table. Revoking access removes the row but does not delete the Supabase Auth account. To fully remove the user, delete them from Supabase Auth separately.
      </div>
    </div>
  )
}
