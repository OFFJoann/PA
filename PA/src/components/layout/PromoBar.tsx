import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, LayoutDashboard, Megaphone, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/format'
import { useStore } from '../../lib/store'
import { promoThemeClass } from '../../lib/themes'

export function PromoBar() {
  const { livePromos, trackPromo } = useStore()
  const barPromos = livePromos.filter((promo) => promo.placement === 'bar' || promo.placement === 'both')
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (barPromos.length <= 1) return
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % barPromos.length)
    }, 6000)
    return () => window.clearInterval(timer)
  }, [barPromos.length])

  if (!visible || barPromos.length === 0) return null
  const promo = barPromos[index % barPromos.length]

  return (
    <div className={cn('relative z-30 text-white', promoThemeClass[promo.theme])}>
      <div className="container-x flex h-10 items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <Megaphone className="h-3.5 w-3.5 shrink-0 opacity-80" />
          <AnimatePresence mode="wait">
            <motion.a
              key={promo.id}
              href={promo.ctaHref}
              onClick={() => trackPromo(promo.id)}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="truncate text-[11px] font-semibold tracking-wide sm:text-xs"
            >
              <span className="mr-2 rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest">
                {promo.badge}
              </span>
              {promo.title}
              <span className="ml-2 hidden items-center gap-1 underline underline-offset-2 sm:inline-flex">
                {promo.ctaLabel} <ArrowRight className="h-3 w-3" />
              </span>
            </motion.a>
          </AnimatePresence>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <Link
            to="/admin"
            className="hidden items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold text-white/90 transition hover:bg-white/25 sm:inline-flex"
          >
            <LayoutDashboard className="h-3 w-3" /> Gestionar en el CRM
          </Link>
          <button
            type="button"
            onClick={() => setVisible(false)}
            className="rounded-full p-1 text-white/70 transition hover:bg-white/15 hover:text-white"
            aria-label="Cerrar promoción"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
