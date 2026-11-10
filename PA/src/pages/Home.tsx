import { ContactSection } from '../components/sections/ContactSection'
import { CreditSimulator } from '../components/sections/CreditSimulator'
import { FaqSection } from '../components/sections/FaqSection'
import { Hero } from '../components/sections/Hero'
import { InsuranceGrid } from '../components/sections/InsuranceGrid'
import { Partners } from '../components/sections/Partners'
import { PromoSection } from '../components/sections/PromoSection'
import { Testimonials } from '../components/sections/Testimonials'
import { WhyUs } from '../components/sections/WhyUs'

export default function Home() {
  return (
    <>
      <Hero />
      <InsuranceGrid />
      <PromoSection />
      <CreditSimulator />
      <Partners />
      <WhyUs />
      <Testimonials />
      <FaqSection />
      <ContactSection />
    </>
  )
}
