import { Building2, Calculator, CheckCircle2, FileText } from 'lucide-react'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const steps = [
  {
    icon: Calculator,
    title: 'Simula tu cuota',
    text: 'Ajusta el valor del vehículo y el plazo para conocer una cuota estimada al instante.',
  },
  {
    icon: FileText,
    title: 'Radica en línea',
    text: 'Un solo formulario con tus datos y documentos. Sin filas ni trámites presenciales.',
  },
  {
    icon: Building2,
    title: 'Comparamos por ti',
    text: 'Más de 20 entidades financieras evalúan tu perfil y compiten por darte la mejor opción.',
  },
  {
    icon: CheckCircle2,
    title: 'Firma y listo',
    text: 'Elige la oferta que más te conviene y te acompañamos hasta el desembolso.',
  },
]

export function Steps() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="Así de fácil"
          title="Tu crédito en"
          highlight="4 pasos"
          subtitle="Un proceso claro, digital y acompañado por asesores reales de principio a fin."
        />

        <div className="relative mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute left-[12%] right-[12%] top-10 hidden border-t border-dashed border-line lg:block" />
          {steps.map(({ icon: Icon, title, text }, index) => (
            <Reveal key={title} delay={index * 0.07}>
              <div className="group relative h-full rounded-3xl border border-line/80 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:border-brand/30 hover:shadow-soft">
                <span className="absolute right-5 top-5 text-4xl font-black text-brand-50">{index + 1}</span>
                <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 transition group-hover:bg-brand group-hover:text-white">
                  <Icon className="h-6 w-6" />
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
