import { ArrowRight, LayoutDashboard, Tag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/format'
import { useStore } from '../../lib/store'
import { promoThemeClass } from '../../lib/themes'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function PromoSection() {
  const { livePromos, trackPromo } = useStore()
  const promos = livePromos.filter(
    (promo) => promo.placement === 'section' || promo.placement === 'both',
  )

  if (promos.length === 0) return null

  return (
    <section className="relative pb-20 pt-4 sm:pb-24">
      <div className="container-x">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Promociones activas"
            title="Beneficios que están"
            highlight="pasando ahora"
            subtitle="Ofertas administradas en tiempo real desde el CRM de Punto Aliado."
          />
          <Reveal delay={0.1}>
            <Link
              to="/admin/promociones"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink/60 shadow-sm transition hover:border-brand/30 hover:text-brand-700"
            >
              <LayoutDashboard className="h-3.5 w-3.5" /> Administrar promociones
            </Link>
          </Reveal>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {promos.map((promo, index) => (
            <Reveal key={promo.id} delay={index * 0.06}>
              <a
                href={promo.ctaHref}
                onClick={() => trackPromo(promo.id)}
                className={cn(
                  'group relative flex h-full flex-col justify-between overflow-hidden rounded-4xl p-6 text-white shadow-soft transition-transform duration-300 hover:-translate-y-1 sm:p-8',
                  promoThemeClass[promo.theme],
                  promos.length % 2 === 1 && index === promos.length - 1 && 'md:col-span-2',
                )}
              >
                <div className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl transition-transform duration-500 group-hover:scale-125" />
                <div className="pointer-events-none absolute -bottom-20 right-24 h-40 w-40 rounded-full border border-white/10" />
                <div className="pointer-events-none absolute -bottom-24 right-10 h-52 w-52 rounded-full border border-white/10" />

                <div className="relative">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] backdrop-blur">
                    <Tag className="h-3 w-3" /> {promo.badge}
                  </span>
                  <h3 className="mt-4 max-w-xl text-balance text-2xl font-extrabold leading-tight sm:text-[1.7rem]">
                    {promo.title}
                  </h3>
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/75">{promo.description}</p>
                </div>

                <div className="relative mt-6 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-bold text-ink transition group-hover:bg-navy group-hover:text-white">
                    {promo.ctaLabel} <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                  <span className="hidden text-[10px] font-semibold uppercase tracking-widest text-white/50 sm:block">
                    Vigente hasta {new Date(promo.endDate).toLocaleDateString('es-CO', { day: '2-digit', month: 'short' })}
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
