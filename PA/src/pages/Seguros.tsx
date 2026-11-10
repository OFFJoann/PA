import { ArrowRight } from 'lucide-react'
import { useQuote } from '../components/quote/QuoteProvider'
import { CtaBand } from '../components/sections/CtaBand'
import { FaqSection } from '../components/sections/FaqSection'
import { InsuranceGrid } from '../components/sections/InsuranceGrid'
import { Partners } from '../components/sections/Partners'
import { PromoSection } from '../components/sections/PromoSection'
import { WhyUs } from '../components/sections/WhyUs'
import { PageHeader } from '../components/ui/PageHeader'

export default function Seguros() {
  const { openQuote } = useQuote()

  return (
    <>
      <PageHeader
        breadcrumb="Seguros"
        eyebrow="Protección para lo que más quieres"
        title="Seguros"
        highlight="a tu medida"
        subtitle="Compara coberturas y precios entre las mejores aseguradoras del país. Te ayudamos a elegir sin letra menuda y con acompañamiento real."
      >
        <button type="button" onClick={() => openQuote()} className="btn-primary px-6 py-3">
          Cotizar mi seguro <ArrowRight className="h-4 w-4" />
        </button>
      </PageHeader>

      <InsuranceGrid compact />
      <PromoSection />
      <Partners />
      <WhyUs />
      <FaqSection />
      <CtaBand />
    </>
  )
}
