import { ArrowRight, BadgeCheck, Check, FileText, MessageCircle } from 'lucide-react'
import { useQuote } from '../components/quote/QuoteProvider'
import { CtaBand } from '../components/sections/CtaBand'
import { CreditSimulator } from '../components/sections/CreditSimulator'
import { FaqSection } from '../components/sections/FaqSection'
import { Partners } from '../components/sections/Partners'
import { Steps } from '../components/sections/Steps'
import { PageHeader } from '../components/ui/PageHeader'
import { Reveal } from '../components/ui/Reveal'
import { useStore } from '../lib/store'

const requirements = [
  'Documento de identidad vigente.',
  'Certificado laboral o soporte de ingresos.',
  'Extractos bancarios de los últimos 3 meses.',
  'Proforma del vehículo o documentos del carro.',
  'Certificado de cámara de comercio (si eres independiente).',
]

export default function Credito() {
  const { openQuote } = useQuote()
  const { content } = useStore()
  const whatsapp = `https://wa.me/${content.whatsapp}?text=${encodeURIComponent(
    'Hola, quiero asesoría para solicitar un crédito vehicular.',
  )}`

  return (
    <>
      <PageHeader
        breadcrumb="Crédito"
        eyebrow="Un formulario, muchas entidades"
        title="Tu crédito vehicular,"
        highlight="sin recorrer bancos"
        subtitle="Simula tu cuota, radica en línea y deja que más de 20 entidades financieras compitan por darte la mejor condición."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={() => openQuote({ type: 'Crédito' })} className="btn-primary px-6 py-3">
            Solicitar mi crédito <ArrowRight className="h-4 w-4" />
          </button>
          <a href="#credito" className="btn-ghost px-6 py-3">
            <BadgeCheck className="h-4 w-4 text-brand" /> Simular primero
          </a>
        </div>
      </PageHeader>

      <CreditSimulator />
      <Steps />

      <section className="pb-20 sm:pb-24">
        <div className="container-x grid gap-8 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <div className="h-full rounded-4xl border border-line/80 bg-white p-7 shadow-card sm:p-9">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-700">
                <FileText className="h-3.5 w-3.5" /> Requisitos
              </span>
              <h2 className="mt-4 text-2xl font-extrabold">Ten listos estos documentos</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink/55">
                Con estos soportes tu solicitud avanza más rápido. Si te falta alguno, un asesor te ayuda a
                resolverlo.
              </p>
              <ul className="mt-6 space-y-3">
                {requirements.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-ink/70">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint-50">
                      <Check className="h-3 w-3 text-mint-600" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="grad-navy relative flex h-full flex-col justify-between overflow-hidden rounded-4xl p-7 text-white shadow-soft sm:p-9">
              <div className="dot-bg pointer-events-none absolute inset-0 opacity-40" />
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-mint/20 blur-3xl" />
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/80">
                  Asesoría sin costo
                </span>
                <h2 className="mt-4 text-2xl font-extrabold leading-tight">
                  ¿Dudas con tu perfil o tu cuota?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  No todas las entidades evalúan igual. Te ayudamos a encontrar la que mejor se adapte a tu
                  situación real.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {[
                    { value: '+20', label: 'Entidades aliadas' },
                    { value: '24-72h', label: 'Tiempo de respuesta' },
                    { value: '100%', label: 'Digital' },
                    { value: '$0', label: 'Costo de asesoría' },
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur">
                      <p className="text-lg font-extrabold text-mint">{item.value}</p>
                      <p className="text-[10px] uppercase tracking-widest text-white/40">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
                className="relative mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-ink transition hover:-translate-y-0.5 hover:bg-mint hover:text-white"
              >
                <MessageCircle className="h-4 w-4" /> Hablar con un asesor
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <Partners />
      <FaqSection />
      <CtaBand />
    </>
  )
}
