import { ArrowRight, ArrowUpRight, CreditCard, MessageCircle } from 'lucide-react'
import { cn } from '../../lib/format'
import { PRODUCTS } from '../../lib/products'
import { useStore } from '../../lib/store'
import { useQuote } from '../quote/QuoteProvider'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function InsuranceGrid({ compact = false }: { compact?: boolean }) {
  const { openQuote } = useQuote()
  const { content } = useStore()
  const whatsapp = `https://wa.me/${content.whatsapp}?text=${encodeURIComponent(
    'Hola, quiero asesoría para elegir un seguro.',
  )}`

  return (
    <section id="seguros" className={cn('relative', compact ? 'py-14 sm:py-16' : 'py-20 sm:py-24')}>
      <div className="container-x">
        <SectionHeading
          eyebrow="Seguros a tu medida"
          title="Un seguro para cada"
          highlight="momento de tu vida"
          subtitle="Comparamos las mejores aseguradoras del país y te mostramos opciones claras, sin letra menuda y con acompañamiento real."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product, index) => {
            const Icon = product.icon
            return (
              <Reveal key={product.key} delay={index * 0.04}>
                <button
                  type="button"
                  onClick={() => openQuote({ product: product.key })}
                  className="group relative h-full w-full overflow-hidden rounded-3xl border border-line/80 bg-white p-6 text-left shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-soft"
                >
                  <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brand-50 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative flex items-start justify-between">
                    <span
                      className={cn(
                        'flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-[0_10px_20px_-10px_rgba(0,168,197,0.6)]',
                        product.gradient,
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink/30 transition-all group-hover:border-brand/30 group-hover:bg-brand group-hover:text-white">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                  <h3 className="relative mt-5 text-lg font-extrabold">{product.name}</h3>
                  <p className="relative mt-1.5 text-sm leading-relaxed text-ink/55">{product.tagline}</p>
                  <div className="relative mt-5 flex items-center justify-between border-t border-line/70 pt-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-ink/35">Desde</p>
                      <p className="text-sm font-extrabold text-brand-700">{product.from}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-ink/45 transition group-hover:text-brand-700">
                      Cotizar <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </button>
              </Reveal>
            )
          })}

          <Reveal delay={PRODUCTS.length * 0.04}>
            <a
              href="#pagos"
              onClick={(event) => event.preventDefault()}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-line/80 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-soft"
            >
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0c1a2e,#14506a)] text-white">
                  <CreditCard className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-extrabold">Pagos en línea</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/55">
                  Paga tu póliza o cuota de forma segura, 100% digital y sin filas.
                </p>
              </div>
              <span className="mt-5 inline-flex items-center gap-1 border-t border-line/70 pt-4 text-xs font-semibold text-ink/45 transition group-hover:text-brand-700">
                Ir a pagos <ArrowRight className="h-3 w-3" />
              </span>
            </a>
          </Reveal>

          <Reveal delay={(PRODUCTS.length + 1) * 0.04}>
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#0c1a2e_0%,#14506a_60%,#0a4a5c_100%)] p-6 text-white shadow-soft">
              <div className="dot-bg absolute inset-0 opacity-50" />
              <div className="relative">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-mint backdrop-blur">
                  <MessageCircle className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-extrabold">¿No sabes cuál elegir?</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/65">
                  Un asesor humano te ayuda a comparar y elegir la cobertura que de verdad necesitas.
                </p>
              </div>
              <a
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
                className="relative mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-bold text-ink transition hover:-translate-y-0.5 hover:bg-mint hover:text-white"
              >
                Hablar con un asesor <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
