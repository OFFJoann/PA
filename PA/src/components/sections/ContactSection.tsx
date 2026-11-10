import { motion } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { PRODUCTS } from '../../lib/products'
import { useStore } from '../../lib/store'
import type { LeadType } from '../../lib/types'
import { useToast } from '../ui/Toaster'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function ContactSection({ showHeading = true }: { showHeading?: boolean }) {
  const { content, addLead } = useStore()
  const { notify } = useToast()
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'Seguro' as LeadType,
    product: PRODUCTS[0].name,
    message: '',
    consent: false,
  })

  const options = form.type === 'Crédito' ? ['Crédito vehicular'] : PRODUCTS.map((product) => product.name)

  const changeType = (type: LeadType) =>
    setForm((current) => ({
      ...current,
      type,
      product: type === 'Crédito' ? 'Crédito vehicular' : PRODUCTS[0].name,
    }))

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
      type: form.type,
      product: form.product,
      message: form.message,
      source: 'Formulario de contacto',
      value: form.type === 'Crédito' ? 45_000_000 : 650_000,
    })
    notify('¡Mensaje enviado! Te contactaremos muy pronto.')
    setSent(true)
  }

  const reset = () => {
    setSent(false)
    setForm({
      name: '',
      email: '',
      phone: '',
      type: 'Seguro',
      product: PRODUCTS[0].name,
      message: '',
      consent: false,
    })
  }

  const whatsapp = `https://wa.me/${content.whatsapp}?text=${encodeURIComponent(
    'Hola Punto Aliado, quiero que me asesoren.',
  )}`

  const infoCards = [
    {
      icon: Phone,
      title: 'Llámanos',
      lines: [content.phone],
      href: `tel:${content.phone.replace(/\s/g, '')}`,
    },
    {
      icon: Mail,
      title: 'Escríbenos',
      lines: [content.email],
      href: `mailto:${content.email}`,
    },
    {
      icon: MapPin,
      title: 'Oficinas',
      lines: [`Medellín · ${content.addressMedellin}`, `Bogotá · ${content.addressBogota}`],
    },
    {
      icon: Clock,
      title: 'Horario',
      lines: [content.schedule],
    },
  ]

  return (
    <section id="contacto" className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
      <div className="container-x relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          {showHeading ? (
            <SectionHeading
              align="left"
              eyebrow="Hablemos"
              title="Tu próxima decisión,"
              highlight="con acompañamiento"
              subtitle="Cuéntanos qué necesitas y un asesor te contactará con opciones reales. Sin costo y sin compromiso."
            />
          ) : (
            <h2 className="text-2xl font-extrabold">Canales de atención</h2>
          )}

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {infoCards.map(({ icon: Icon, title, lines, href }, index) => (
              <Reveal key={title} delay={index * 0.05}>
                <div className="h-full rounded-3xl border border-line/80 bg-white p-5 shadow-card">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <p className="mt-3 text-sm font-extrabold">{title}</p>
                  {lines.map((line) =>
                    href ? (
                      <a
                        key={line}
                        href={href}
                        className="mt-1 block break-words text-xs leading-relaxed text-ink/55 transition hover:text-brand-700"
                      >
                        {line}
                      </a>
                    ) : (
                      <p key={line} className="mt-1 break-words text-xs leading-relaxed text-ink/55">
                        {line}
                      </p>
                    ),
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <a
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
              className="mt-3 flex items-center justify-between gap-3 rounded-3xl bg-[#25D366] p-5 text-white shadow-[0_16px_30px_-18px_rgba(37,211,102,0.9)] transition hover:-translate-y-0.5"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                  <MessageCircle className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-extrabold">WhatsApp directo</span>
                  <span className="block text-[11px] text-white/80">Respuesta en minutos</span>
                </span>
              </span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="card relative overflow-hidden p-5 sm:p-7">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex min-h-[420px] flex-col items-center justify-center text-center"
              >
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-mint-50">
                  <CheckCircle2 className="h-11 w-11 text-mint-600" />
                </span>
                <h3 className="mt-6 text-2xl font-extrabold">¡Mensaje enviado!</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink/55">
                  Gracias {form.name.split(' ')[0] || ''}. Tu solicitud quedó registrada en nuestro CRM y un
                  asesor te contactará al {form.phone}.
                </p>
                <div className="mt-7 flex flex-col gap-2 sm:flex-row">
                  <button type="button" onClick={reset} className="btn-primary">
                    Enviar otra solicitud <Send className="h-4 w-4" />
                  </button>
                  <a href={whatsapp} target="_blank" rel="noreferrer" className="btn-ghost">
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </a>
                </div>
              </motion.div>
            ) : (
              <>
                <div className="mb-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-700">
                    Solicitud rápida
                  </p>
                  <h3 className="mt-1 text-xl font-extrabold">Déjanos tus datos</h3>
                  <p className="mt-1 text-sm text-ink/50">Te contactamos con opciones reales, sin letra menuda.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="grid gap-3.5 sm:grid-cols-2">
                    <div>
                      <label className="label" htmlFor="contact-name">Nombre</label>
                      <input
                        id="contact-name"
                        required
                        className="field"
                        placeholder="Tu nombre completo"
                        value={form.name}
                        onChange={(event) => setForm({ ...form, name: event.target.value })}
                      />
                    </div>
                    <div>
                      <label className="label" htmlFor="contact-phone">Teléfono</label>
                      <input
                        id="contact-phone"
                        required
                        className="field"
                        placeholder="300 000 0000"
                        value={form.phone}
                        onChange={(event) => setForm({ ...form, phone: event.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label" htmlFor="contact-email">Correo</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      className="field"
                      placeholder="tu@correo.com"
                      value={form.email}
                      onChange={(event) => setForm({ ...form, email: event.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 rounded-2xl bg-cream p-1.5">
                    {(['Seguro', 'Crédito'] as LeadType[]).map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => changeType(option)}
                        className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${
                          form.type === option ? 'bg-white text-ink shadow-sm' : 'text-ink/50'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="label" htmlFor="contact-product">Producto de interés</label>
                    <select
                      id="contact-product"
                      className="field"
                      value={form.product}
                      onChange={(event) => setForm({ ...form, product: event.target.value })}
                    >
                      {options.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="label" htmlFor="contact-message">Mensaje</label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      className="field resize-none"
                      placeholder="Cuéntanos qué necesitas..."
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
                    Enviar solicitud <Send className="h-4 w-4" />
                  </button>
                </form>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
