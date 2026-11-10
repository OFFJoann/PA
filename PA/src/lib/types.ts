export type ProductKey =
  | 'vehicular'
  | 'hogar'
  | 'salud'
  | 'viajes'
  | 'bici'
  | 'vida'
  | 'mascotas'

export type LeadType = 'Seguro' | 'Crédito'

export type LeadStatus = 'nuevo' | 'contactado' | 'negociacion' | 'cerrado' | 'perdido'

export type PromoTheme = 'brand' | 'mint' | 'navy' | 'violet' | 'amber'

export type PromoPlacement = 'bar' | 'section' | 'both'

export interface Promo {
  id: string
  title: string
  description: string
  badge: string
  ctaLabel: string
  ctaHref: string
  theme: PromoTheme
  placement: PromoPlacement
  active: boolean
  startDate: string
  endDate: string
  views: number
  clicks: number
}

export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  type: LeadType
  product: string
  message: string
  status: LeadStatus
  value: number
  source: string
  createdAt: string
}

export interface Faq {
  id: string
  question: string
  answer: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  quote: string
  rating: number
}

export interface Stat {
  id: string
  value: string
  label: string
}

export interface SimulatorSettings {
  annualRate: number
  minAmount: number
  maxAmount: number
  step: number
  minMonths: number
  maxMonths: number
  defaultAmount: number
  defaultMonths: number
}

export interface SiteContent {
  heroBadge: string
  heroTitle: string
  heroHighlight: string
  heroSubtitle: string
  phone: string
  whatsapp: string
  email: string
  addressMedellin: string
  addressBogota: string
  schedule: string
  stats: Stat[]
  faqs: Faq[]
  testimonials: Testimonial[]
  simulator: SimulatorSettings
}

export interface DemoState {
  promos: Promo[]
  leads: Lead[]
  content: SiteContent
}

export const LEAD_STATUSES: { value: LeadStatus; label: string; tone: string }[] = [
  { value: 'nuevo', label: 'Nuevo', tone: 'bg-brand-50 text-brand-700 border-brand/20' },
  { value: 'contactado', label: 'Contactado', tone: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { value: 'negociacion', label: 'En negociación', tone: 'bg-amber-50 text-amber-700 border-amber-200' },
  { value: 'cerrado', label: 'Cerrado', tone: 'bg-mint-50 text-mint-600 border-mint/25' },
  { value: 'perdido', label: 'Perdido', tone: 'bg-rose-50 text-rose-600 border-rose-200' },
]

export const PROMO_THEMES: { value: PromoTheme; label: string; preview: string }[] = [
  { value: 'brand', label: 'Cian Punto Aliado', preview: 'from-[#00a8c5] to-[#00c08b]' },
  { value: 'mint', label: 'Verde menta', preview: 'from-[#00c08b] to-[#0f766e]' },
  { value: 'navy', label: 'Azul marino', preview: 'from-[#0c1a2e] to-[#14506a]' },
  { value: 'violet', label: 'Violeta', preview: 'from-[#6d5efc] to-[#a855f7]' },
  { value: 'amber', label: 'Ámbar', preview: 'from-[#f59e0b] to-[#ef4444]' },
]
