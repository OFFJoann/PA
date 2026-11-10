import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { useStore } from '../../lib/store'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function FaqSection() {
  const { content } = useStore()
  const [openId, setOpenId] = useState<string | null>(content.faqs[0]?.id ?? null)

  const whatsapp = `https://wa.me/${content.whatsapp}?text=${encodeURIComponent(
    'Hola, tengo una pregunta sobre seguros y crédito.',
  )}`

  return (
    <section id="faq" className="py-20 sm:py-24">
      <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Preguntas frecuentes"
            title="Resolvemos tus"
            highlight="dudas"
            subtitle="Y si te queda alguna, un asesor real está a un mensaje de distancia."
          />

          <Reveal delay={0.1}>
            <div className="mt-8 overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#0c1a2e,#14506a)] p-6 text-white">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-mint">
                <MessageCircle className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-extrabold">¿Prefieres hablar con alguien?</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                Escríbenos por WhatsApp y te respondemos en minutos, sin bots ni filas.
              </p>
              <a
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-bold text-ink transition hover:-translate-y-0.5 hover:bg-mint hover:text-white"
              >
                Abrir WhatsApp
              </a>
            </div>
          </Reveal>
        </div>

        <div className="space-y-3">
          {content.faqs.map((faq, index) => {
            const isOpen = openId === faq.id
            return (
              <Reveal key={faq.id} delay={index * 0.04}>
                <div className="overflow-hidden rounded-3xl border border-line/80 bg-white shadow-card">
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-bold leading-snug sm:text-[15px]">{faq.question}</span>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all ${
                        isOpen ? 'rotate-180 bg-brand text-white' : 'bg-cream text-ink/40'
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="px-5 pb-5 text-sm leading-relaxed text-ink/55 sm:px-6">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
