import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PublicLayout, ScrollToTop } from './components/layout/PublicLayout'
import { ToastProvider } from './components/ui/Toaster'
import { StoreProvider } from './lib/store'
import Contacto from './pages/Contacto'
import Credito from './pages/Credito'
import Home from './pages/Home'
import Nosotros from './pages/Nosotros'
import NotFound from './pages/NotFound'
import Seguros from './pages/Seguros'

// The CRM (and its charting library) is loaded on demand so the public site
// stays lean and fast for visitors.
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'))
const ContentEditor = lazy(() => import('./pages/admin/ContentEditor'))
const Dashboard = lazy(() => import('./pages/admin/Dashboard'))
const Leads = lazy(() => import('./pages/admin/Leads'))
const Promotions = lazy(() => import('./pages/admin/Promotions'))
const SettingsPage = lazy(() => import('./pages/admin/SettingsPage'))

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f8fa]">
      <div className="flex flex-col items-center gap-3">
        <span className="h-9 w-9 animate-spin rounded-full border-2 border-brand/25 border-t-brand" />
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/40">Cargando CRM…</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <ToastProvider>
          <ScrollToTop />
          <Routes>
            <Route element={<PublicLayout />}>
              <Route index element={<Home />} />
              <Route path="seguros" element={<Seguros />} />
              <Route path="credito" element={<Credito />} />
              <Route path="nosotros" element={<Nosotros />} />
              <Route path="contacto" element={<Contacto />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route
              path="/admin/login"
              element={
                <Suspense fallback={<LoadingScreen />}>
                  <AdminLogin />
                </Suspense>
              }
            />
            <Route
              path="/admin"
              element={
                <Suspense fallback={<LoadingScreen />}>
                  <AdminLayout />
                </Suspense>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="promociones" element={<Promotions />} />
              <Route path="leads" element={<Leads />} />
              <Route path="contenido" element={<ContentEditor />} />
              <Route path="ajustes" element={<SettingsPage />} />
            </Route>
          </Routes>
        </ToastProvider>
      </StoreProvider>
    </BrowserRouter>
  )
}
