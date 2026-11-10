export const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ')

const cop = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

export const formatCOP = (value: number) => cop.format(Math.round(value))

export const formatCompact = (value: number) => {
  if (Math.abs(value) >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}MM`
  if (Math.abs(value) >= 1_000_000) return `$${Math.round(value / 1_000_000)}M`
  if (Math.abs(value) >= 1_000) return `$${Math.round(value / 1_000)}K`
  return `$${Math.round(value)}`
}

const compactFormatter = new Intl.NumberFormat('es-CO', { maximumFractionDigits: 1 })

/** Compact count for non-monetary values such as views or clicks. */
export const formatCount = (value: number) => {
  if (Math.abs(value) >= 1_000_000) return `${compactFormatter.format(value / 1_000_000)}M`
  if (Math.abs(value) >= 1_000) return `${compactFormatter.format(value / 1_000)}K`
  return new Intl.NumberFormat('es-CO').format(Math.round(value))
}

export const formatNumber = (value: number) => new Intl.NumberFormat('es-CO').format(value)

export const formatDate = (iso: string, options?: Intl.DateTimeFormatOptions) =>
  new Date(iso).toLocaleDateString('es-CO', options ?? { day: '2-digit', month: 'short', year: 'numeric' })

export const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString('es-CO', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })

export const daysBetween = (a: Date, b: Date) =>
  Math.round((b.getTime() - a.getTime()) / 86_400_000)

export const monthlyPayment = (amount: number, annualRate: number, months: number) => {
  const monthlyRate = annualRate / 100 / 12
  if (monthlyRate === 0) return amount / months
  return (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months))
}

export const initials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')

export const todayISO = () => new Date().toISOString().slice(0, 10)

export const isPromoLive = (promo: { active: boolean; startDate: string; endDate: string }) => {
  if (!promo.active) return false
  const today = todayISO()
  if (promo.startDate && promo.startDate > today) return false
  if (promo.endDate && promo.endDate < today) return false
  return true
}
