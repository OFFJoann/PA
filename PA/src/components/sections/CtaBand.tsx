import { ArrowRight, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react'
import { useStore } from '../../lib/store'
import { useQuote } from '../quote/QuoteProvider'

export function CtaBand() {
  const { content } = useStore()
  const { openQuote } = useQuote()
  const whatsapp = `https://wa.me/${content.whatsapp}?text=${encodeURIComponent(
    'Hola, quiero que me ayuden a elegir el mejor seguro o crédito.',
  )}`

  return (
    <section className="pb-20 sm:pb-24">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-4xl bg-[linear-gradient(115deg,#00a8c5_0%,#00c08b_100%)] p-7 text-white shadow-glow sm:rounded-5xl sm:p-12">
          <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full border border-white/15" />
          <div className="pointer-events-none absolute -right-2 -top-8 h-40 w-40 rounded-full border border-white/15" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] backdrop-blur">
                <Sparkles className="h-3 w-3" /> Sin costo y sin compromiso
              </span>
              <h2 className="mt-4 text-balance text-3xl font-extrabold leading-[1.08] sm:text-4xl">
                Tu mejor opción está a un clic de distancia
              </h2>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/80">
                Cuéntanos qué necesitas y compara seguros y crédito con las mejores entidades del país.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <button
                type="button"
                onClick={() => openQuote()}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-ink transition hover:-translate-y-0.5 hover:bg-navy hover:text-white"
              >
                Cotizar ahora <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
              >
                <MessageCircle className="h-4 w-4" /> Hablar con un asesor
              </a>
            </div>
          </div>

          <div className="relative mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/20 pt-5 text-[11px] font-medium text-white/75">
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> Aliados vigilados por la SFC</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> Datos protegidos</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> Respuesta el mismo día</span>
          </div>
        </div>
      </div>
    </section>
  )
}
