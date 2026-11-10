import { motion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  Calculator,
  Check,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingDown,
  Zap,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { cn, formatCOP, initials, monthlyPayment } from '../../lib/format'
import { PRODUCTS } from '../../lib/products'
import { useStore } from '../../lib/store'
import type { ProductKey } from '../../lib/types'
import { useQuote } from '../quote/QuoteProvider'

export function Hero() {
  const { content } = useStore()
  const { openQuote } = useQuote()
  const [tab, setTab] = useState<'seguro' | 'credito'>('seguro')
  const [selected, setSelected] = useState<ProductKey>('vehicular')

  const simulator = content.simulator
  const payment = monthlyPayment(simulator.defaultAmount, simulator.annualRate, simulator.defaultMonths)
  const selectedProduct = PRODUCTS.find((product) => product.key === selected) ?? PRODUCTS[0]

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_75%_0%,#e6f8fb_0%,#f4fafb_45%,#ffffff_100%)]" />
      <div className="grid-bg absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 animate-pulse-soft rounded-full bg-brand/15 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-mint/15 blur-3xl" />

      <div className="container-x relative grid items-center gap-12 pb-16 pt-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:pb-24 lg:pt-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white/80 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-700 shadow-sm backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            {content.heroBadge}
          </span>

          <h1 className="mt-5 text-balance text-[2.6rem] font-black leading-[1.02] tracking-tight sm:text-5xl lg:text-[3.55rem]">
            {content.heroTitle} <span className="grad-text">{content.heroHighlight}</span>
          </h1>

          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink/60 sm:text-base">
            {content.heroSubtitle}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={() => openQuote()} className="btn-primary px-7 py-3.5 text-[15px]">
              Cotizar gratis <ArrowRight className="h-4 w-4" />
            </button>
            <Link to="/credito" className="btn-ghost px-6 py-3.5 text-[15px]">
              <Calculator className="h-4 w-4 text-brand" /> Simular crédito
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center">
              {content.testimonials.slice(0, 4).map((testimonial, index) => (
                <span
                  key={testimonial.id}
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-[linear-gradient(135deg,#0c1a2e,#14506a)] text-[10px] font-bold text-white shadow-sm',
                    index > 0 && '-ml-2.5',
                  )}
                >
                  {initials(testimonial.name)}
                </span>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-3.5 w-3.5 fill-sun text-sun" />
                ))}
                <span className="ml-1 text-xs font-bold text-ink">4.9/5</span>
              </div>
              <p className="mt-0.5 text-xs text-ink/50">+8.500 clientes acompañados</p>
            </div>
            <div className="hidden items-center gap-2 rounded-2xl border border-line bg-white/70 px-3 py-2 text-xs font-semibold text-ink/60 backdrop-blur sm:flex">
              <ShieldCheck className="h-4 w-4 text-mint-600" /> Aliados vigilados por la SFC
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="absolute -inset-4 rounded-[2.6rem] bg-[linear-gradient(120deg,rgba(0,168,197,0.18),rgba(0,192,139,0.18))] blur-2xl" />

          <div className="card relative z-10 overflow-hidden p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-700">Cotizador express</p>
                <h2 className="mt-1 text-xl font-extrabold">¿Qué necesitas hoy?</h2>
              </div>
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                <Zap className="h-5 w-5" />
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-1.5 rounded-2xl bg-cream p-1.5">
              <button
                type="button"
                onClick={() => setTab('seguro')}
                className={cn(
                  'rounded-xl px-3 py-2 text-sm font-semibold transition',
                  tab === 'seguro' ? 'bg-white text-ink shadow-sm' : 'text-ink/50 hover:text-ink',
                )}
              >
                Seguros
              </button>
              <button
                type="button"
                onClick={() => setTab('credito')}
                className={cn(
                  'rounded-xl px-3 py-2 text-sm font-semibold transition',
                  tab === 'credito' ? 'bg-white text-ink shadow-sm' : 'text-ink/50 hover:text-ink',
                )}
              >
                Crédito
              </button>
            </div>

            {tab === 'seguro' ? (
              <div className="mt-4">
                <div className="grid grid-cols-2 gap-2">
                  {PRODUCTS.map((product) => {
                    const Icon = product.icon
                    const active = product.key === selected
                    return (
                      <button
                        key={product.key}
                        type="button"
                        onClick={() => setSelected(product.key)}
                        className={cn(
                          'flex items-center gap-2 rounded-xl border px-2.5 py-2 text-left text-[11px] font-semibold transition',
                          active
                            ? 'border-brand/40 bg-brand-50 text-brand-700'
                            : 'border-line bg-white text-ink/60 hover:border-brand/25 hover:text-ink',
                        )}
                      >
                        <span
                          className={cn(
                            'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white',
                            product.gradient,
                          )}
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        <span className="truncate">
                          {product.name
                            .replace('Seguro de ', '')
                            .replace('Seguro ', '')
                            .replace('Póliza de ', '')
                            .replace(/^./, (letter) => letter.toLowerCase())}
                        </span>
                      </button>
                    )
                  })}
                  <div className="flex items-center gap-2 rounded-xl border border-dashed border-line px-2.5 py-2 text-[11px] font-semibold text-ink/40">
                    <BadgeCheck className="h-4 w-4 text-mint-600" /> 12 aseguradoras
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between rounded-xl bg-cream/70 px-3 py-2.5 text-xs">
                  <span className="text-ink/50">Desde</span>
                  <span className="font-bold text-ink">{selectedProduct.from}</span>
                </div>

                <button
                  type="button"
                  onClick={() => openQuote({ product: selected })}
                  className="btn-primary mt-3 w-full py-3"
                >
                  Cotizar {selectedProduct.name.toLowerCase()} <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="mt-4">
                <div className="rounded-2xl bg-[linear-gradient(135deg,#0c1a2e,#14506a)] p-4 text-white">
                  <div className="flex items-center justify-between text-[11px] text-white/60">
                    <span>Crédito vehicular</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-mint">
                      <Check className="h-3 w-3" /> Preaprobado
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-white/60">Cuota mensual estimada</p>
                  <p className="mt-0.5 text-3xl font-black tracking-tight">{formatCOP(payment)}</p>
                  <div className="mt-3 flex items-center gap-3 border-t border-white/10 pt-3 text-[11px] text-white/60">
                    <span>{formatCOP(simulator.defaultAmount)}</span>
                    <span className="h-1 w-1 rounded-full bg-white/30" />
                    <span>{simulator.defaultMonths} meses</span>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <Link to="/credito" className="btn-ghost justify-center px-3 py-2.5 text-xs">
                    Personalizar
                  </Link>
                  <button
                    type="button"
                    onClick={() => openQuote({ type: 'Crédito' })}
                    className="btn-primary justify-center px-3 py-2.5 text-xs"
                  >
                    Solicitar <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}

            <p className="mt-3 flex items-center justify-center gap-1.5 text-[10px] font-medium text-ink/40">
              <ShieldCheck className="h-3 w-3" /> Sin costo y sin afectar tu historial de crédito
            </p>
          </div>

          <div className="absolute -right-3 -top-6 z-20 hidden animate-float rounded-2xl border border-line bg-white/95 p-3 shadow-soft backdrop-blur lg:block">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mint-50 text-mint-600">
                <BadgeCheck className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[11px] font-bold text-ink">Crédito aprobado</p>
                <p className="text-[10px] text-ink/45">en menos de 24 horas</p>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 -left-4 z-20 hidden animate-float-slow rounded-2xl border border-line bg-white/95 p-3 shadow-soft backdrop-blur lg:block">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                <TrendingDown className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[11px] font-bold text-ink">Ahorro promedio</p>
                <p className="text-[10px] text-ink/45">32% vs. ir banco por banco</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
