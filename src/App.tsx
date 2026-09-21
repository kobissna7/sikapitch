import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import Nav from './components/Nav'
import Footer from './components/Footer'

// Public pages
import Home from './pages/Home'
import ForStartups from './pages/ForStartups'
import ForInvestors from './pages/ForInvestors'
import About from './pages/About'
import Events from './pages/Events'
import Sponsorship from './pages/Sponsorship'
import Contact from './pages/Contact'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import Login from './pages/Login'
import Register from './pages/Register'

// Dashboards
import StartupDashboard from './pages/dashboard/StartupDashboard'
import InvestorDashboard from './pages/dashboard/InvestorDashboard'

// Guards
import ProtectedRoute from './components/ProtectedRoute'

// Admin System
import AdminAuthWrapper from './components/admin/AdminAuthWrapper'
import AdminLayout from './components/admin/AdminLayout'
import AdminLogin from './pages/admin/AdminLogin'
import AdminOverview from './pages/admin/AdminOverview'
import StartupsAdmin from './pages/admin/StartupsAdmin'
import InvestorsAdmin from './pages/admin/InvestorsAdmin'
import PitchesAdmin from './pages/admin/PitchesAdmin'
import DocumentsAdmin from './pages/admin/DocumentsAdmin'
import EventsAdmin from './pages/admin/EventsAdmin'
import MatchingAdmin from './pages/admin/MatchingAdmin'
import EnquiriesAdmin from './pages/admin/EnquiriesAdmin'
import PaymentsAdmin from './pages/admin/PaymentsAdmin'
import SettingsAdmin from './pages/admin/SettingsAdmin'

// Public layout wrapper
function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: "'Poppins', sans-serif",
            fontSize: '0.9rem',
            borderRadius: '4px',
            background: '#1A1A1A',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.08)',
          },
          success: { iconTheme: { primary: '#B8962E', secondary: '#fff' } },
        }}
      />
      <Routes>
        {/* ===== ADMIN: Login (public) ===== */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ===== ADMIN: Protected layout with sub-routes ===== */}
        <Route
          path="/admin"
          element={
            <AdminAuthWrapper>
              <AdminLayout />
            </AdminAuthWrapper>
          }
        >
          <Route index element={<AdminOverview />} />
          <Route path="startups" element={<StartupsAdmin />} />
          <Route path="investors" element={<InvestorsAdmin />} />
          <Route path="pitches" element={<PitchesAdmin />} />
          <Route path="documents" element={<DocumentsAdmin />} />
          <Route path="events" element={<EventsAdmin />} />
          <Route path="matching" element={<MatchingAdmin />} />
          <Route path="enquiries" element={<EnquiriesAdmin />} />
          <Route path="payments" element={<PaymentsAdmin />} />
          <Route path="settings" element={<SettingsAdmin />} />
        </Route>

        {/* ===== DASHBOARDS (no nav/footer) ===== */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute role="startup">
              <StartupDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/investor-dashboard/*"
          element={
            <ProtectedRoute role="investor">
              <InvestorDashboard />
            </ProtectedRoute>
          }
        />

        {/* ===== PUBLIC ROUTES (with nav/footer) ===== */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/for-startups" element={<PublicLayout><ForStartups /></PublicLayout>} />
        <Route path="/for-investors" element={<PublicLayout><ForInvestors /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/events" element={<PublicLayout><Events /></PublicLayout>} />
        <Route path="/sponsorship" element={<PublicLayout><Sponsorship /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        <Route path="/terms" element={<PublicLayout><Terms /></PublicLayout>} />
        <Route path="/privacy" element={<PublicLayout><Privacy /></PublicLayout>} />
        <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
        <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />

        {/* ===== 404 FALLBACK ===== */}
        <Route path="*" element={
          <PublicLayout>
            <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 24px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>404</div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800, color: 'var(--white)', marginBottom: 16 }}>Page Not Found</h1>
              <p style={{ color: 'var(--text-muted)', marginBottom: 40, maxWidth: 400 }}>The page you're looking for doesn't exist or has been moved.</p>
              <a href="/" className="btn btn-gold">Go to Homepage</a>
            </div>
          </PublicLayout>
        } />
      </Routes>
    </AuthProvider>
  )
}

export default App
