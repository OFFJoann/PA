import { Reveal } from './Reveal'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  highlight?: string
  subtitle?: string
  align?: 'center' | 'left'
  light?: boolean
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = 'center',
  light = false,
  className,
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'mx-auto text-center items-center' : 'text-left items-start'
  return (
    <Reveal className={`flex max-w-3xl flex-col gap-3 ${alignment} ${className ?? ''}`}>
      {eyebrow && (
        <span
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] ${
            light
              ? 'border-white/20 bg-white/10 text-white/80'
              : 'border-brand/20 bg-brand-50 text-brand-700'
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${light ? 'bg-mint' : 'bg-brand'}`} />
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-balance text-3xl font-extrabold leading-[1.08] sm:text-4xl lg:text-[2.7rem] ${
          light ? 'text-white' : 'text-ink'
        }`}
      >
        {title} {highlight && <span className="grad-text">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className={`max-w-2xl text-[15px] leading-relaxed ${light ? 'text-white/65' : 'text-ink/60'}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  )
}
