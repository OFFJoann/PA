import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  ExternalLink,
  FileText,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Menu,
  Settings,
  Users,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { Link, Navigate, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Logo } from '../../components/ui/Logo'
import { useToast } from '../../components/ui/Toaster'
import { cn } from '../../lib/format'
import { AUTH_KEY, logout } from './auth'

const navItems = [
  { to: '/admin', label: 'Resumen', icon: LayoutDashboard, end: true },
  { to: '/admin/promociones', label: 'Promociones', icon: Megaphone },
  { to: '/admin/leads', label: 'Leads', icon: Users },
  { to: '/admin/contenido', label: 'Contenido', icon: FileText },
  { to: '/admin/ajustes', label: 'Ajustes', icon: Settings },
]

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const navigate = useNavigate()
  const { notify } = useToast()

  const handleLogout = () => {
    logout()
    notify('Sesión cerrada.', 'info')
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="flex h-full flex-col">
      <div className="px-6 pb-6 pt-7">
        <Link to="/admin" onClick={onNavigate} aria-label="CRM Punto Aliado">
          <Logo inverted className="h-8" />
        </Link>
        <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white/60">
          <span className="h-1.5 w-1.5 rounded-full bg-mint" /> CRM · Demo
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'group flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-semibold transition-all',
                isActive
                  ? 'bg-white/10 text-white shadow-[inset_2px_0_0_0_#00c08b]'
                  : 'text-white/50 hover:bg-white/5 hover:text-white/85',
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={cn('h-[18px] w-[18px]', isActive ? 'text-mint' : 'text-white/40 group-hover:text-white/70')} />
                {label}
                {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-mint" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="m-3 rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="flex items-center gap-2 text-xs font-bold text-white/80">
          <span className="h-1.5 w-1.5 rounded-full bg-mint" /> Modo demostración
        </div>
        <p className="mt-1.5 text-[11px] leading-relaxed text-white/40">
          Los cambios se guardan en este navegador y se ven al instante en el sitio público.
        </p>
        <div className="mt-3 flex flex-col gap-2">
          <Link
            to="/"
            onClick={onNavigate}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-white/10 px-3 py-2 text-[11px] font-semibold text-white/80 transition hover:bg-white/15"
          >
            <ExternalLink className="h-3.5 w-3.5" /> Ver sitio público
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-[11px] font-semibold text-white/45 transition hover:bg-rose-500/10 hover:text-rose-300"
          >
            <LogOut className="h-3.5 w-3.5" /> Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  if (sessionStorage.getItem(AUTH_KEY) !== '1') {
    return <Navigate to="/admin/login" replace />
  }

  const current = navItems.find((item) =>
    item.end ? location.pathname === item.to : location.pathname.startsWith(item.to),
  )

  return (
    <div className="min-h-screen bg-[#f5f8fa]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 bg-navy lg:block">
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-navy/50 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-navy lg:hidden"
            >
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="absolute right-3 top-3 rounded-full p-1.5 text-white/50 hover:bg-white/10 hover:text-white"
                aria-label="Cerrar menú"
              >
                <X className="h-5 w-5" />
              </button>
              <SidebarContent onNavigate={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-line/80 bg-white/80 backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line text-ink/60 lg:hidden"
                aria-label="Abrir menú"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink/35">CRM Punto Aliado</p>
                <p className="truncate text-sm font-bold text-ink">{current?.label ?? 'Panel'}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="hidden items-center gap-1.5 rounded-full border border-line bg-white px-3 py-2 text-xs font-semibold text-ink/55 transition hover:border-brand/30 hover:text-brand-700 sm:inline-flex"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Ver sitio
              </Link>
              <div className="flex items-center gap-2 rounded-full border border-line bg-white py-1 pl-1 pr-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(135deg,#00a8c5,#00c08b)] text-[10px] font-bold text-white">
                  PA
                </span>
                <div className="hidden leading-tight sm:block">
                  <p className="text-[11px] font-bold text-ink">Admin</p>
                  <p className="text-[9px] text-ink/40">admin@puntoaliado.com</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
