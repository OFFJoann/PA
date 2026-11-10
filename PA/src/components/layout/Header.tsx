import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, LayoutDashboard, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { cn } from '../../lib/format'
import { useQuote } from '../quote/QuoteProvider'
import { Logo } from '../ui/Logo'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/seguros', label: 'Seguros' },
  { to: '/credito', label: 'Crédito' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const { openQuote } = useQuote()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b transition-all duration-300',
        scrolled
          ? 'border-line/80 bg-white/85 shadow-[0_10px_30px_-24px_rgba(12,26,46,0.4)] backdrop-blur-xl'
          : 'border-transparent bg-white/60 backdrop-blur-md',
      )}
    >
      <div className="container-x flex h-[72px] items-center justify-between gap-4">
        <Link to="/" className="flex shrink-0 items-center" aria-label="Punto Aliado, inicio">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                cn(
                  'relative rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                  isActive ? 'text-brand-700' : 'text-ink/60 hover:text-ink',
                )
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute inset-x-0 -bottom-0.5 mx-auto h-1 w-1 rounded-full bg-brand"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/admin"
            className="hidden items-center gap-1.5 rounded-full border border-line px-3 py-2 text-xs font-semibold text-ink/55 transition hover:border-brand/30 hover:text-brand-700 md:inline-flex"
            title="Entrar al CRM demo"
          >
            <LayoutDashboard className="h-3.5 w-3.5" />
            CRM
            <span className="h-1.5 w-1.5 rounded-full bg-mint" />
          </Link>
          <button type="button" onClick={() => openQuote()} className="btn-primary hidden px-5 py-2.5 sm:inline-flex">
            Cotizar ahora <ArrowRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink lg:hidden"
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-white lg:hidden"
          >
            <div className="container-x flex flex-col gap-1 py-4">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'rounded-2xl px-4 py-3 text-sm font-semibold transition',
                      isActive ? 'bg-brand-50 text-brand-700' : 'text-ink/65 hover:bg-cream',
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Link to="/admin" className="rounded-2xl px-4 py-3 text-sm font-semibold text-ink/65 hover:bg-cream">
                CRM demo
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false)
                  openQuote()
                }}
                className="btn-primary mt-2 w-full"
              >
                Cotizar ahora <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
