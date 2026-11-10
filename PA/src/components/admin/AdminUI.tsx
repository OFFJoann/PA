import type { LucideIcon } from 'lucide-react'
import { ArrowDownRight, ArrowUpRight, Inbox } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '../../lib/format'
import { LEAD_STATUSES, type LeadStatus } from '../../lib/types'

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string
  title: string
  description?: string
  children?: ReactNode
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && (
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-700">{eyebrow}</p>
        )}
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-ink sm:text-[1.75rem]">{title}</h1>
        {description && <p className="mt-1.5 max-w-2xl text-sm text-ink/50">{description}</p>}
      </div>
      {children && <div className="flex shrink-0 flex-wrap items-center gap-2">{children}</div>}
    </div>
  )
}

const toneStyles: Record<string, string> = {
  brand: 'bg-brand-50 text-brand-700',
  mint: 'bg-mint-50 text-mint-600',
  amber: 'bg-amber-50 text-amber-600',
  violet: 'bg-violet-50 text-violet-600',
  rose: 'bg-rose-50 text-rose-600',
  navy: 'bg-navy/5 text-navy',
}

export function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  trend,
  tone = 'brand',
}: {
  icon: LucideIcon
  label: string
  value: string
  hint?: string
  trend?: 'up' | 'down'
  tone?: keyof typeof toneStyles
}) {
  const TrendIcon = trend === 'down' ? ArrowDownRight : ArrowUpRight
  return (
    <div className="rounded-3xl border border-line/80 bg-white p-5 shadow-card">
      <div className="flex items-start justify-between">
        <span className={cn('flex h-10 w-10 items-center justify-center rounded-2xl', toneStyles[tone])}>
          <Icon className="h-5 w-5" />
        </span>
        {trend && (
          <span
            className={cn(
              'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold',
              trend === 'up' ? 'bg-mint-50 text-mint-600' : 'bg-rose-50 text-rose-600',
            )}
          >
            <TrendIcon className="h-3 w-3" /> {trend === 'up' ? 'Activo' : 'Bajo'}
          </span>
        )}
      </div>
      <p className="mt-4 text-2xl font-black tracking-tight text-ink">{value}</p>
      <p className="mt-0.5 text-xs font-medium text-ink/45">{label}</p>
      {hint && <p className="mt-1 text-[11px] text-ink/35">{hint}</p>}
    </div>
  )
}

export function StatusBadge({ status }: { status: LeadStatus }) {
  const config = LEAD_STATUSES.find((item) => item.value === status) ?? LEAD_STATUSES[0]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-bold',
        config.tone,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {config.label}
    </span>
  )
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  children,
}: {
  icon?: LucideIcon
  title: string
  description?: string
  children?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-line bg-white/60 px-6 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cream text-ink/30">
        <Icon className="h-7 w-7" />
      </span>
      <h3 className="mt-4 text-base font-bold text-ink">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-sm text-ink/45">{description}</p>}
      {children && <div className="mt-5">{children}</div>}
    </div>
  )
}
