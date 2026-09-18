import { Routes, Route } from 'react-router-dom'
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

// New Admin System
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

function App() {
  return (
    <AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', borderRadius: '4px', background: '#1A1A1A', color: '#fff', border: '1px solid rgba(255,255,255,0.08)' },
          success: { iconTheme: { primary: '#B8962E', secondary: '#fff' } },
        }}
      />
      <Routes>
        {/* Admin Public Route */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Protected Routes */}
        <Route path="/admin/*" element={
          <AdminAuthWrapper>
            <AdminLayout />
          </AdminAuthWrapper>
        }>
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

        {/* Dashboard routes - no shared nav/footer */}
        <Route path="/dashboard/*" element={
          <ProtectedRoute role="startup">
            <StartupDashboard />
          </ProtectedRoute>
        } />
        <Route path="/investor-dashboard/*" element={
          <ProtectedRoute role="investor">
            <InvestorDashboard />
          </ProtectedRoute>
        } />

        {/* Public routes - with shared nav/footer */}
        <Route path="/*" element={
          <>
            <Nav />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/for-startups" element={<ForStartups />} />
                <Route path="/for-investors" element={<ForInvestors />} />
                <Route path="/about" element={<About />} />
                <Route path="/events" element={<Events />} />
                <Route path="/sponsorship" element={<Sponsorship />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </main>
            <Footer />
          </>
        } />
      </Routes>
    </AuthProvider>
  )
}

export default App
