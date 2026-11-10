import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Check,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Logo } from '../../components/ui/Logo'
import { useToast } from '../../components/ui/Toaster'
import { AUTH_KEY } from './auth'

export default function AdminLogin() {
  const navigate = useNavigate()
  const { notify } = useToast()
  const [email, setEmail] = useState('admin@puntoaliado.com')
  const [password, setPassword] = useState('demo123')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  if (sessionStorage.getItem(AUTH_KEY) === '1') return <Navigate to="/admin" replace />

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!email.includes('@') || password !== 'demo123') {
      setError('Usa el correo demo y la contraseña demo123.')
      return
    }
    sessionStorage.setItem(AUTH_KEY, '1')
    notify('Bienvenido al CRM de Punto Aliado.')
    navigate('/admin', { replace: true })
  }

  return (
    <div className="grid min-h-screen bg-white lg:grid-cols-[1.05fr_0.95fr]">
      <div className="grad-navy relative hidden flex-col justify-between overflow-hidden p-10 text-white lg:flex xl:p-14">
        <div className="dot-bg pointer-events-none absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute -right-24 top-1/4 h-80 w-80 rounded-full bg-brand/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-mint/20 blur-3xl" />

        <div className="relative">
          <Logo inverted className="h-9" />
          <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/80">
            <Sparkles className="h-3 w-3 text-mint" /> CRM demo
          </span>

          <h1 className="mt-8 max-w-md text-balance text-4xl font-black leading-[1.06]">
            Todo el negocio, <span className="text-mint">bajo control</span>
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
            Administra promociones, leads y contenido del sitio desde un solo lugar. Los cambios se
            reflejan al instante en la página pública.
          </p>

          <div className="mt-9 grid max-w-md grid-cols-3 gap-3">
            {[
              { icon: Users, value: '24', label: 'Leads' },
              { icon: BarChart3, value: '3', label: 'Promos activas' },
              { icon: ShieldCheck, value: '100%', label: 'Local y seguro' },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur">
                <Icon className="h-4 w-4 text-mint" />
                <p className="mt-2 text-lg font-extrabold">{value}</p>
                <p className="text-[9px] uppercase tracking-widest text-white/40">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative space-y-2 text-xs text-white/45">
          {['Leads y pipeline en tiempo real', 'Promociones editables sin tocar código', 'Contenido y simulador configurables'].map(
            (item) => (
              <p key={item} className="flex items-center gap-2">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-mint/20">
                  <Check className="h-2.5 w-2.5 text-mint" />
                </span>
                {item}
              </p>
            ),
          )}
        </div>
      </div>

      <div className="relative flex flex-col justify-center px-5 py-10 sm:px-10">
        <Link
          to="/"
          className="absolute left-5 top-6 inline-flex items-center gap-1.5 text-xs font-semibold text-ink/45 transition hover:text-brand-700 sm:left-10"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Volver al sitio
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto w-full max-w-sm"
        >
          <div className="lg:hidden">
            <Logo className="h-8" />
          </div>
          <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-700">
            Acceso administrador
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight">Entra a tu CRM</h2>
          <p className="mt-1.5 text-sm text-ink/50">Gestiona el sitio, las promociones y los leads.</p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <div>
              <label className="label" htmlFor="crm-email">Correo</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />
                <input
                  id="crm-email"
                  type="email"
                  required
                  className="field pl-10"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="label" htmlFor="crm-password">Contraseña</label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />
                <input
                  id="crm-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="field px-10"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-ink/30 transition hover:text-ink"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-xl bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600">{error}</p>
            )}

            <button type="submit" className="btn-primary w-full py-3.5">
              Entrar al CRM <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-6 rounded-2xl border border-dashed border-brand/25 bg-brand-50/60 p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-700">Credenciales demo</p>
            <div className="mt-2 space-y-1 font-mono text-xs text-ink/65">
              <p>admin@puntoaliado.com</p>
              <p>demo123</p>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-ink/45">
              Ya están precargadas: solo pulsa “Entrar al CRM”. Los datos son locales de este navegador.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
