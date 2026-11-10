import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Reveal } from './Reveal'

interface PageHeaderProps {
  eyebrow?: string
  title: string
  highlight?: string
  subtitle?: string
  breadcrumb: string
  children?: ReactNode
}

export function PageHeader({ eyebrow, title, highlight, subtitle, breadcrumb, children }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-line/70">
      <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_80%_0%,#e6f8fb_0%,#f4fafb_50%,#ffffff_100%)]" />
      <div className="grid-bg absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 animate-pulse-soft rounded-full bg-mint/15 blur-3xl" />

      <div className="container-x relative py-12 sm:py-16">
        <Reveal>
          <nav className="flex items-center gap-1.5 text-[11px] font-semibold text-ink/40">
            <Link to="/" className="transition hover:text-brand-700">Inicio</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-ink/60">{breadcrumb}</span>
          </nav>

          <div className="mt-5 max-w-3xl">
            {eyebrow && (
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-700 shadow-sm backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                {eyebrow}
              </span>
            )}
            <h1 className="mt-4 text-balance text-[2.3rem] font-black leading-[1.05] sm:text-5xl">
              {title} {highlight && <span className="grad-text">{highlight}</span>}
            </h1>
            {subtitle && (
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink/60">{subtitle}</p>
            )}
          </div>

          {children && <div className="mt-7">{children}</div>}
        </Reveal>
      </div>
    </section>
  )
}
