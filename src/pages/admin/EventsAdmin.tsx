import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import toast from 'react-hot-toast'

interface EventData {
  id: string
  title: string
  date: string
  location: string
  status: string
}

export default function EventsAdmin() {
  const [events, setEvents] = useState<EventData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true })

      if (error) throw error
      setEvents(data || [])
    } catch (err: any) {
      toast.error('Failed to load events: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="dash-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Events</h1>
          <p>Manage platform events, summits, and pitch days.</p>
        </div>
        <button className="btn btn-gold" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Plus size={16} /> New Event
        </button>
      </div>
      <div className="table-wrap">
        {loading ? (
          <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-muted)' }}>Loading events...</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {events.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: 24, color: 'var(--text-muted)' }}>
                    No events found.
                  </td>
                </tr>
              ) : events.map(e => (
                <tr key={e.id}>
                  <td style={{ fontWeight: 600, color: 'var(--white)' }}>{e.title}</td>
                  <td>{new Date(e.date).toLocaleDateString()}</td>
                  <td>{e.location}</td>
                  <td>
                    <span className={`badge ${e.status === 'Upcoming' ? 'badge-green' : 'badge-grey'}`}>
                      {e.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

