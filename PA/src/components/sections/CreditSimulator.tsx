import { motion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  Clock,
  Percent,
  ShieldCheck,
  Sparkles,
  Wallet,
} from 'lucide-react'
import { useState } from 'react'
import { formatCOP, monthlyPayment } from '../../lib/format'
import { useStore } from '../../lib/store'
import { useQuote } from '../quote/QuoteProvider'
import { Reveal } from '../ui/Reveal'

const bullets = [
  'Un solo formulario y más de 20 entidades comparando por ti.',
  'Tasas, plazos y cuotas reales, sin sorpresas al final.',
  'Aprobación en 24 a 72 horas con acompañamiento humano.',
]

export function CreditSimulator() {
  const { content } = useStore()
  const { openQuote } = useQuote()
  const simulator = content.simulator

  const [amount, setAmount] = useState(simulator.defaultAmount)
  const [months, setMonths] = useState(simulator.defaultMonths)

  const payment = monthlyPayment(amount, simulator.annualRate, months)
  const total = payment * months
  const interest = total - amount
  const principalShare = Math.max(4, Math.round((amount / total) * 100))

  const amountPercent = ((amount - simulator.minAmount) / (simulator.maxAmount - simulator.minAmount)) * 100
  const monthsPercent = ((months - simulator.minMonths) / (simulator.maxMonths - simulator.minMonths)) * 100

  return (
    <section id="credito" className="py-20 sm:py-24">
      <div className="container-x">
        <Reveal>
          <div className="grad-navy relative overflow-hidden rounded-4xl p-6 text-white shadow-soft sm:rounded-5xl sm:p-10 lg:p-14">
            <div className="dot-bg pointer-events-none absolute inset-0 opacity-40" />
            <div className="pointer-events-none absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-mint/15 blur-3xl" />

            <div className="relative grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white/80 backdrop-blur">
                  <Sparkles className="h-3.5 w-3.5 text-mint" /> Crédito vehicular
                </span>
                <h2 className="mt-5 text-balance text-3xl font-extrabold leading-[1.06] sm:text-4xl lg:text-[2.7rem]">
                  Simula tu crédito <span className="text-mint">en segundos</span>
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/65">
                  Mueve los controles y descubre una cuota estimada al instante. Luego radicas con nosotros y
                  las entidades compiten por darte la mejor condición.
                </p>

                <ul className="mt-7 space-y-3">
                  {bullets.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-white/80">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint/20">
                        <Check className="h-3 w-3 text-mint" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 grid max-w-md grid-cols-3 gap-3">
                  {[
                    { icon: Building2, value: '+20', label: 'Entidades' },
                    { icon: Percent, value: `${simulator.annualRate}%`, label: 'Tasa E.A.' },
                    { icon: Clock, value: '24-72h', label: 'Respuesta' },
                  ].map(({ icon: Icon, value, label }) => (
                    <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur">
                      <Icon className="h-4 w-4 text-mint" />
                      <p className="mt-2 text-lg font-extrabold">{value}</p>
                      <p className="text-[10px] uppercase tracking-widest text-white/40">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-white p-5 text-ink shadow-2xl sm:rounded-4xl sm:p-7">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                      <Wallet className="h-4.5 w-4.5" />
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-ink/40">Simulador</p>
                      <p className="text-sm font-extrabold">Tu crédito vehicular</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-mint-50 px-2.5 py-1 text-[10px] font-bold text-mint-600">
                    <BadgeCheck className="h-3 w-3" /> Sin costo
                  </span>
                </div>

                <div className="mt-6">
                  <div className="flex items-end justify-between">
                    <label className="text-xs font-semibold text-ink/50" htmlFor="sim-amount">
                      Valor del vehículo
                    </label>
                    <span className="text-lg font-extrabold text-ink">{formatCOP(amount)}</span>
                  </div>
                  <input
                    id="sim-amount"
                    type="range"
                    min={simulator.minAmount}
                    max={simulator.maxAmount}
                    step={simulator.step}
                    value={amount}
                    onChange={(event) => setAmount(Number(event.target.value))}
                    className="range mt-3 w-full"
                    style={{
                      background: `linear-gradient(to right, #00a8c5 0%, #00c08b ${amountPercent}%, #e2edf0 ${amountPercent}%, #e2edf0 100%)`,
                    }}
                  />
                  <div className="mt-1.5 flex justify-between text-[10px] font-medium text-ink/35">
                    <span>{formatCOP(simulator.minAmount)}</span>
                    <span>{formatCOP(simulator.maxAmount)}</span>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex items-end justify-between">
                    <label className="text-xs font-semibold text-ink/50" htmlFor="sim-months">
                      Plazo
                    </label>
                    <span className="text-lg font-extrabold text-ink">{months} meses</span>
                  </div>
                  <input
                    id="sim-months"
                    type="range"
                    min={simulator.minMonths}
                    max={simulator.maxMonths}
                    step={6}
                    value={months}
                    onChange={(event) => setMonths(Number(event.target.value))}
                    className="range mt-3 w-full"
                    style={{
                      background: `linear-gradient(to right, #00a8c5 0%, #00c08b ${monthsPercent}%, #e2edf0 ${monthsPercent}%, #e2edf0 100%)`,
                    }}
                  />
                  <div className="mt-1.5 flex justify-between text-[10px] font-medium text-ink/35">
                    <span>{simulator.minMonths} meses</span>
                    <span>{simulator.maxMonths} meses</span>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl bg-cream p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-ink/50">Cuota mensual estimada</p>
                    <span className="rounded-full bg-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-brand-700">
                      Tasa {simulator.annualRate}% E.A.
                    </span>
                  </div>
                  <motion.p
                    key={payment}
                    initial={{ opacity: 0.4, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mt-1 text-[2.1rem] font-black leading-none tracking-tight text-ink"
                  >
                    {formatCOP(payment)}
                  </motion.p>

                  <div className="mt-4 flex h-2 overflow-hidden rounded-full bg-line">
                    <div className="h-full bg-brand" style={{ width: `${principalShare}%` }} />
                    <div className="h-full flex-1 bg-mint" />
                  </div>
                  <div className="mt-2 flex justify-between text-[10px] font-medium text-ink/45">
                    <span className="inline-flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand" /> Capital
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-mint" /> Intereses
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-ink/35">Intereses totales</p>
                      <p className="text-sm font-bold">{formatCOP(interest)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-ink/35">Total a pagar</p>
                      <p className="text-sm font-bold">{formatCOP(total)}</p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openQuote({ type: 'Crédito' })}
                  className="btn-primary mt-5 w-full py-3.5"
                >
                  Solicitar mi crédito <ArrowRight className="h-4 w-4" />
                </button>
                <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[10px] leading-relaxed text-ink/40">
                  <ShieldCheck className="h-3 w-3 shrink-0" /> Valores estimados. La cuota final depende de la
                  entidad y tu perfil crediticio.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
