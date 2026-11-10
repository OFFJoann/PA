import { ContactSection } from '../components/sections/ContactSection'
import { FaqSection } from '../components/sections/FaqSection'
import { PageHeader } from '../components/ui/PageHeader'

export default function Contacto() {
  return (
    <>
      <PageHeader
        breadcrumb="Contacto"
        eyebrow="Estamos para ayudarte"
        title="Hablemos de lo que"
        highlight="necesitas"
        subtitle="Escríbenos, llámanos o pásate por nuestras oficinas en Medellín y Bogotá. Un asesor real te responde."
      />
      <ContactSection showHeading={false} />
      <FaqSection />
    </>
  )
}
