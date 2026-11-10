import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  Lock,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  User,
  X,
} from 'lucide-react'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react'
import { useStore } from '../../lib/store'
import { PRODUCTS } from '../../lib/products'
import type { LeadType, ProductKey } from '../../lib/types'
import { useToast } from '../ui/Toaster'

interface QuoteOptions {
  type?: LeadType
  product?: ProductKey
}

interface QuoteValue {
  openQuote: (options?: QuoteOptions) => void
  closeQuote: () => void
}

const QuoteContext = createContext<QuoteValue | null>(null)

export function QuoteProvider({ children }: { children: ReactNode }) {
  const { addLead, content } = useStore()
  const { notify } = useToast()

  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [type, setType] = useState<LeadType>('Seguro')
  const [product, setProduct] = useState(PRODUCTS[0].name)
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '', consent: false })

  const resetForm = useCallback(() => {
    setForm({ name: '', phone: '', email: '', message: '', consent: false })
    setSubmitted(false)
  }, [])

  const openQuote = useCallback(
    (options?: QuoteOptions) => {
      const nextType = options?.type ?? 'Seguro'
      setType(nextType)
      if (nextType === 'Crédito') {
        setProduct('Crédito vehicular')
      } else if (options?.product) {
        const found = PRODUCTS.find((item) => item.key === options.product)
        setProduct(found?.name ?? PRODUCTS[0].name)
      } else {
        setProduct(PRODUCTS[0].name)
      }
      resetForm()
      setOpen(true)
    },
    [resetForm],
  )

  const closeQuote = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeQuote()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, closeQuote])

  const handleType = (next: LeadType) => {
    setType(next)
    setProduct(next === 'Crédito' ? 'Crédito vehicular' : PRODUCTS[0].name)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!form.consent) {
      notify('Debes autorizar el tratamiento de datos para continuar.', 'error')
      return
    }
    addLead({
      name: form.name,
      email: form.email,
      phone: form.phone,
      type,
      product,
      message: form.message,
      source: 'Sitio web',
      value: type === 'Crédito' ? 45_000_000 : 650_000,
    })
    notify('¡Solicitud recibida! Un asesor te contactará muy pronto.')
    setSubmitted(true)
  }

  const options = type === 'Crédito' ? ['Crédito vehicular'] : PRODUCTS.map((item) => item.name)

  return (
    <QuoteContext.Provider value={{ openQuote, closeQuote }}>
      {children}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[110] flex items-end justify-center bg-navy/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeQuote()
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Formulario de cotización"
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 30, opacity: 0, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
              className="relative max-h-[94vh] w-full max-w-4xl overflow-hidden rounded-t-4xl bg-white shadow-2xl sm:rounded-4xl"
            >
              <button
                type="button"
                onClick={closeQuote}
                className="absolute right-4 top-4 z-20 rounded-full bg-white/80 p-2 text-ink/50 shadow-sm transition hover:bg-white hover:text-ink sm:right-5 sm:top-5"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid max-h-[94vh] overflow-y-auto sm:max-h-none sm:grid-cols-[0.9fr_1.1fr] sm:overflow-visible">
                <aside className="grad-navy relative hidden flex-col justify-between overflow-hidden p-8 text-white sm:flex">
                  <div className="dot-bg absolute inset-0 opacity-50" />
                  <div className="relative">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white/80">
                      <Sparkles className="h-3.5 w-3.5 text-mint" /> Cotiza gratis
                    </span>
                    <h3 className="mt-6 text-3xl font-extrabold leading-[1.1]">
                      Un solo formulario.
                      <br />
                      <span className="text-mint">Muchas opciones.</span>
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/65">
                      Comparamos seguros y crédito entre las mejores entidades del país para que elijas
                      con información clara.
                    </p>
                  </div>
                  <ul className="relative mt-8 space-y-3 text-sm text-white/80">
                    {['Sin costo y sin compromiso', 'Respuesta el mismo día', 'Asesoría humana real', 'Datos protegidos'].map(
                      (item) => (
                        <li key={item} className="flex items-center gap-2.5">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-mint/20">
                            <Check className="h-3 w-3 text-mint" />
                          </span>
                          {item}
                        </li>
                      ),
                    )}
                  </ul>
                </aside>

                <div className="p-6 sm:p-8">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex min-h-[420px] flex-col items-center justify-center text-center"
                    >
                      <motion.div
                        initial={{ scale: 0.5, rotate: -12 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                        className="flex h-20 w-20 items-center justify-center rounded-full bg-mint-50"
                      >
                        <CheckCircle2 className="h-11 w-11 text-mint-600" />
                      </motion.div>
                      <h3 className="mt-6 text-2xl font-extrabold">¡Recibimos tu solicitud!</h3>
                      <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink/60">
                        Gracias {form.name.split(' ')[0] || ''}. Un asesor de Punto Aliado te contactará al{' '}
                        <strong className="text-ink">{form.phone}</strong> muy pronto.
                      </p>
                      <div className="mt-7 flex flex-col gap-2 sm:flex-row">
                        <a
                          href={`https://wa.me/${content.whatsapp}?text=${encodeURIComponent('Hola, acabo de solicitar una cotización en la página web.')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-primary"
                        >
                          <MessageCircle className="h-4 w-4" /> Hablar por WhatsApp
                        </a>
                        <button type="button" onClick={closeQuote} className="btn-ghost">
                          Cerrar
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <>
                      <div className="mb-5">
                        <h3 className="text-2xl font-extrabold">Cuéntanos qué necesitas</h3>
                        <p className="mt-1 text-sm text-ink/55">Te contactamos con opciones reales, sin letra menuda.</p>
                      </div>

                      <div className="mb-5 grid grid-cols-2 gap-2 rounded-2xl bg-cream p-1.5">
                        {(['Seguro', 'Crédito'] as LeadType[]).map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => handleType(option)}
                            className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                              type === option
                                ? 'bg-white text-ink shadow-sm'
                                : 'text-ink/50 hover:text-ink'
                            }`}
                          >
                            {option === 'Seguro' ? 'Quiero un seguro' : 'Quiero un crédito'}
                          </button>
                        ))}
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-3.5">
                        <div className="grid gap-3.5 sm:grid-cols-2">
                          <div>
                            <label className="label" htmlFor="quote-name">Nombre completo</label>
                            <div className="relative">
                              <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />
                              <input
                                id="quote-name"
                                required
                                className="field pl-10"
                                placeholder="Tu nombre"
                                value={form.name}
                                onChange={(event) => setForm({ ...form, name: event.target.value })}
                              />
                            </div>
                          </div>
                          <div>
                            <label className="label" htmlFor="quote-phone">Teléfono / WhatsApp</label>
                            <div className="relative">
                              <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />
                              <input
                                id="quote-phone"
                                required
                                className="field pl-10"
                                placeholder="300 000 0000"
                                value={form.phone}
                                onChange={(event) => setForm({ ...form, phone: event.target.value })}
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="label" htmlFor="quote-email">Correo electrónico</label>
                          <div className="relative">
                            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />
                            <input
                              id="quote-email"
                              type="email"
                              required
                              className="field pl-10"
                              placeholder="tu@correo.com"
                              value={form.email}
                              onChange={(event) => setForm({ ...form, email: event.target.value })}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="label" htmlFor="quote-product">
                            {type === 'Seguro' ? 'Producto de interés' : 'Tipo de crédito'}
                          </label>
                          <select
                            id="quote-product"
                            className="field"
                            value={product}
                            onChange={(event) => setProduct(event.target.value)}
                          >
                            {options.map((option) => (
                              <option key={option}>{option}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="label" htmlFor="quote-message">Cuéntanos un poco más (opcional)</label>
                          <textarea
                            id="quote-message"
                            rows={2}
                            className="field resize-none"
                            placeholder="Ej: quiero asegurar mi carro 2023..."
                            value={form.message}
                            onChange={(event) => setForm({ ...form, message: event.target.value })}
                          />
                        </div>

                        <label className="flex cursor-pointer items-start gap-2.5 rounded-2xl bg-cream/70 p-3 text-[11px] leading-relaxed text-ink/55">
                          <input
                            type="checkbox"
                            className="mt-0.5 h-4 w-4 shrink-0 rounded border-line accent-brand"
                            checked={form.consent}
                            onChange={(event) => setForm({ ...form, consent: event.target.checked })}
                          />
                          Autorizo el tratamiento de mis datos personales conforme a la política de Punto Aliado.
                        </label>

                        <button type="submit" className="btn-primary w-full py-3.5">
                          Solicitar cotización <ArrowRight className="h-4 w-4" />
                        </button>

                        <div className="flex items-center justify-center gap-4 pt-1 text-[11px] font-medium text-ink/40">
                          <span className="inline-flex items-center gap-1"><Lock className="h-3 w-3" /> Datos seguros</span>
                          <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> Respuesta hoy</span>
                          <span className="inline-flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> Sin costo</span>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </QuoteContext.Provider>
  )
}

export function useQuote() {
  const context = useContext(QuoteContext)
  if (!context) throw new Error('useQuote debe usarse dentro de QuoteProvider')
  return context
}
