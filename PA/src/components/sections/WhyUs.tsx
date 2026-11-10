import { Handshake, Layers, Lock, Users } from 'lucide-react'
import { useStore } from '../../lib/store'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const features = [
  {
    icon: Layers,
    title: 'Comparas, no recorres',
    text: 'Un solo formulario y varias entidades compitiendo por darte la mejor opción.',
  },
  {
    icon: Users,
    title: 'Asesoría humana real',
    text: 'Personas que te escuchan y te acompañan por WhatsApp o teléfono, no un bot.',
  },
  {
    icon: Lock,
    title: '100% digital y seguro',
    text: 'Procesos claros, datos protegidos y aliados vigilados por la Superfinanciera.',
  },
  {
    icon: Handshake,
    title: 'Acompañamiento completo',
    text: 'Desde la cotización hasta la firma, el desembolso y la renovación de tu póliza.',
  },
]

export function WhyUs() {
  const { content } = useStore()

  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute -left-20 top-1/3 h-64 w-64 rounded-full bg-mint/10 blur-3xl" />
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
        <div>
          <SectionHeading
            align="left"
            eyebrow="La diferencia Punto Aliado"
            title="Menos filas, más"
            highlight="decisiones claras"
            subtitle="No somos un banco ni una aseguradora: somos tu aliado neutral para comparar y elegir con confianza."
          />
          <Reveal delay={0.1}>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {content.stats.map((stat) => (
                <div key={stat.id} className="rounded-3xl border border-line/80 bg-white p-4 shadow-card">
                  <p className="grad-text text-2xl font-black tracking-tight sm:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-xs font-medium text-ink/50">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {features.map(({ icon: Icon, title, text }, index) => (
            <Reveal key={title} delay={index * 0.06}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-line/80 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-soft">
                <span className="pointer-events-none absolute -right-3 -top-5 text-6xl font-black text-brand-50 transition-colors group-hover:text-brand-100">
                  0{index + 1}
                </span>
                <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="relative mt-4 text-base font-extrabold">{title}</h3>
                <p className="relative mt-1.5 text-sm leading-relaxed text-ink/55">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
