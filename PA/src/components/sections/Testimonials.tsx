import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Quote, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn, initials } from '../../lib/format'
import { useStore } from '../../lib/store'
import { SectionHeading } from '../ui/SectionHeading'

export function Testimonials() {
  const { content } = useStore()
  const testimonials = content.testimonials
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (testimonials.length <= 1) return
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length)
    }, 7000)
    return () => window.clearInterval(timer)
  }, [testimonials.length])

  const current = testimonials[index % testimonials.length]
  if (!current) return null

  const go = (direction: number) =>
    setIndex((currentIndex) => (currentIndex + direction + testimonials.length) % testimonials.length)

  return (
    <section className="relative overflow-hidden bg-cream py-20 sm:py-24">
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Historias reales"
          title="Lo que dicen nuestros"
          highlight="aliados"
          subtitle="Más de 8.500 clientes han encontrado su mejor opción con nosotros. Estas son algunas de sus historias."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="card relative flex min-h-[320px] flex-col justify-between overflow-hidden p-7 sm:p-9">
            <Quote className="absolute right-6 top-6 h-16 w-16 text-brand-50" />
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={current.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35 }}
                className="relative"
              >
                <div className="flex items-center gap-1">
                  {Array.from({ length: current.rating }).map((_, starIndex) => (
                    <Star key={starIndex} className="h-4 w-4 fill-sun text-sun" />
                  ))}
                </div>
                <p className="mt-5 max-w-2xl text-balance text-lg font-medium leading-relaxed text-ink/80 sm:text-xl">
                  “{current.quote}”
                </p>
                <footer className="mt-6 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0c1a2e,#14506a)] text-xs font-bold text-white">
                    {initials(current.name)}
                  </span>
                  <div>
                    <p className="text-sm font-bold">{current.name}</p>
                    <p className="text-xs text-ink/45">{current.role}</p>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>

            <div className="relative mt-7 flex items-center justify-between border-t border-line/70 pt-4">
              <div className="flex items-center gap-1.5">
                {testimonials.map((testimonial, dotIndex) => (
                  <button
                    key={testimonial.id}
                    type="button"
                    onClick={() => setIndex(dotIndex)}
                    aria-label={`Ver testimonio de ${testimonial.name}`}
                    className={cn(
                      'h-1.5 rounded-full transition-all',
                      dotIndex === index % testimonials.length
                        ? 'w-7 bg-brand'
                        : 'w-2.5 bg-line hover:bg-ink/20',
                    )}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink/50 transition hover:border-brand/30 hover:text-brand-700"
                  aria-label="Testimonio anterior"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink/50 transition hover:border-brand/30 hover:text-brand-700"
                  aria-label="Siguiente testimonio"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-2.5">
            {testimonials.map((testimonial, itemIndex) => (
              <button
                key={testimonial.id}
                type="button"
                onClick={() => setIndex(itemIndex)}
                className={cn(
                  'flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-all duration-300',
                  itemIndex === index % testimonials.length
                    ? 'border-brand/30 bg-white shadow-card'
                    : 'border-transparent bg-white/50 hover:border-line hover:bg-white',
                )}
              >
                <span
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white',
                    itemIndex === index % testimonials.length
                      ? 'bg-[linear-gradient(135deg,#00a8c5,#00c08b)]'
                      : 'bg-navy/70',
                  )}
                >
                  {initials(testimonial.name)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold text-ink">{testimonial.name}</span>
                  <span className="block truncate text-[11px] text-ink/45">{testimonial.role}</span>
                </span>
                <ArrowRight
                  className={cn(
                    'h-4 w-4 shrink-0 transition',
                    itemIndex === index % testimonials.length ? 'text-brand' : 'text-ink/20',
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
