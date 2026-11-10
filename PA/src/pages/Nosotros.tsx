import { Clock, Eye, HeartHandshake, Sparkles } from 'lucide-react'
import { CtaBand } from '../components/sections/CtaBand'
import { PageHeader } from '../components/ui/PageHeader'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { useStore } from '../lib/store'

const values = [
  {
    icon: Eye,
    title: 'Transparencia',
    text: 'Te mostramos las opciones con sus condiciones reales. Sin letra menuda ni costos escondidos.',
  },
  {
    icon: HeartHandshake,
    title: 'Cercanía',
    text: 'Asesores humanos que te escuchan y te acompañan, incluso después de firmar.',
  },
  {
    icon: Clock,
    title: 'Agilidad',
    text: 'Procesos digitales y comparación simultánea para que no pierdas tiempo recorriendo bancos.',
  },
]

export default function Nosotros() {
  const { content } = useStore()

  return (
    <>
      <PageHeader
        breadcrumb="Nosotros"
        eyebrow="Somos Punto Aliado"
        title="El punto donde seguros y crédito"
        highlight="se encuentran"
        subtitle="Nacimos para simplificar decisiones que normalmente implican filas, papeleo y llamadas. Hoy conectamos a miles de personas con las mejores aseguradoras y entidades financieras del país."
      />

      <section className="py-16 sm:py-20">
        <div className="container-x grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <div className="relative">
              <div className="overflow-hidden rounded-4xl border border-line/70 shadow-soft">
                <img
                  src="/assets/img/hero.jpg"
                  alt="Equipo y clientes de Punto Aliado"
                  className="h-64 w-full object-cover sm:h-80"
                />
              </div>
              <div className="absolute -bottom-6 left-5 right-5 flex items-center justify-between gap-4 rounded-3xl border border-line bg-white/95 p-4 shadow-soft backdrop-blur sm:left-8 sm:right-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#00a8c5,#00c08b)] text-white">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-extrabold">+8.500 clientes</p>
                    <p className="text-[11px] text-ink/45">acompañados en todo el país</p>
                  </div>
                </div>
                <span className="hidden rounded-full bg-mint-50 px-3 py-1 text-[10px] font-bold text-mint-600 sm:block">
                  Desde 2020
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="prose-brand">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-700">Nuestra historia</span>
              <h2 className="mt-3 text-balance text-3xl font-extrabold leading-tight sm:text-4xl">
                Menos trámites, más <span className="grad-text">tranquilidad</span>
              </h2>
              <p className="mt-4">
                Punto Aliado es un canal de comparación y asesoría. No somos un banco ni una aseguradora:
                trabajamos para que tengas el panorama completo y elijas con confianza.
              </p>
              <p className="mt-3">
                Nuestro equipo combina tecnología y asesoría humana para acompañarte desde la primera
                cotización hasta la firma, el desembolso y la renovación de tu póliza.
              </p>

              <div className="mt-7 grid grid-cols-2 gap-3">
                {content.stats.map((stat) => (
                  <div key={stat.id} className="rounded-2xl border border-line/80 bg-white p-4 shadow-card">
                    <p className="grad-text text-2xl font-black">{stat.value}</p>
                    <p className="mt-1 text-xs text-ink/50">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 sm:pb-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Lo que nos mueve"
            title="Nuestros"
            highlight="valores"
            subtitle="Tres principios simples que guían cada conversación con nuestros clientes."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {values.map(({ icon: Icon, title, text }, index) => (
              <Reveal key={title} delay={index * 0.07}>
                <div className="group h-full rounded-3xl border border-line/80 bg-white p-7 shadow-card transition hover:-translate-y-1 hover:border-brand/30 hover:shadow-soft">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 transition group-hover:bg-brand group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-lg font-extrabold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/55">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
