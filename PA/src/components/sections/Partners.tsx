import { ShieldCheck } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'

const insurers = [
  { src: '/assets/insurers/sura.png', alt: 'Sura' },
  { src: '/assets/insurers/axa.png', alt: 'AXA Colpatria' },
  { src: '/assets/insurers/mundial.png', alt: 'Seguros Mundial' },
  { src: '/assets/insurers/sbs.png', alt: 'SBS Seguros' },
  { src: '/assets/insurers/allianz.png', alt: 'Allianz' },
  { src: '/assets/insurers/bolivar.png', alt: 'Seguros Bolívar' },
  { src: '/assets/insurers/equidad.png', alt: 'Equidad Seguros' },
  { src: '/assets/insurers/hdi.png', alt: 'HDI Seguros' },
  { src: '/assets/insurers/mapfre.png', alt: 'Mapfre' },
  { src: '/assets/insurers/previsora.png', alt: 'Previsora' },
  { src: '/assets/insurers/estado.png', alt: 'Seguros del Estado' },
  { src: '/assets/insurers/solidaria.png', alt: 'Solidaria' },
]

const financiers = [
  { src: '/assets/financiers/vehigroup.png', alt: 'Vehigroup' },
  { src: '/assets/financiers/finesa.png', alt: 'Finesa' },
  { src: '/assets/financiers/finandina.png', alt: 'Finandina' },
  { src: '/assets/financiers/bancobogota.png', alt: 'Banco de Bogotá' },
  { src: '/assets/financiers/davivienda.png', alt: 'Davivienda' },
  { src: '/assets/financiers/bbva.png', alt: 'BBVA' },
  { src: '/assets/financiers/sufi.png', alt: 'Sufi' },
  { src: '/assets/financiers/finanzauto.png', alt: 'Finanzauto' },
  { src: '/assets/financiers/movilize.png', alt: 'Movilize' },
  { src: '/assets/financiers/toyota.png', alt: 'Toyota Financial Services' },
  { src: '/assets/financiers/santander.png', alt: 'Santander' },
  { src: '/assets/financiers/delacredit.png', alt: 'Delta Credit' },
  { src: '/assets/financiers/uni2.png', alt: 'Uni2' },
  { src: '/assets/financiers/summa.png', alt: 'Summa' },
  { src: '/assets/financiers/apoyos.jpg', alt: 'Apoyos Financieros' },
  { src: '/assets/financiers/kuno.png', alt: 'Kuno' },
  { src: '/assets/financiers/occiauto.png', alt: 'Occiauto' },
  { src: '/assets/financiers/tuio.jpg', alt: 'Tuio' },
]

interface RowProps {
  logos: { src: string; alt: string }[]
  reverse?: boolean
  slow?: boolean
}

function LogosRow({ logos, reverse, slow }: RowProps) {
  const items = [...logos, ...logos]
  return (
    <div className="marquee-mask overflow-hidden">
      <div className={`marquee ${reverse ? 'marquee-reverse' : ''} ${slow ? 'marquee-slow' : ''}`}>
        {items.map((logo, index) => (
          <div
            key={`${logo.alt}-${index}`}
            className="mx-2 flex h-16 w-32 shrink-0 items-center justify-center rounded-2xl border border-line/80 bg-white px-4 shadow-[0_6px_16px_-14px_rgba(12,26,46,0.4)] transition hover:border-brand/25 sm:w-36"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              className="max-h-9 w-auto max-w-full object-contain opacity-65 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export function Partners() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-white py-16 sm:py-20">
      <div className="container-x">
        <SectionHeading
          eyebrow="Aliados de confianza"
          title="Las mejores empresas,"
          highlight="en un solo lugar"
          subtitle="Trabajamos con aseguradoras y entidades financieras reconocidas del país para darte opciones reales y comparables."
        />
      </div>

      <div className="mt-10 space-y-6">
        <div>
          <p className="container-x mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-ink/35">
            Aseguradoras
          </p>
          <LogosRow logos={insurers} />
        </div>
        <div>
          <p className="container-x mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-ink/35">
            Entidades financieras
          </p>
          <LogosRow logos={financiers} reverse slow />
        </div>
      </div>

      <div className="container-x mt-10">
        <p className="flex items-center justify-center gap-2 text-center text-xs text-ink/40">
          <ShieldCheck className="h-4 w-4 text-mint-600" />
          Todas nuestras aliadas están vigiladas por la Superintendencia Financiera de Colombia.
        </p>
      </div>
    </section>
  )
}
