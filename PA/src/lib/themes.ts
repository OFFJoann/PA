import type { PromoTheme } from './types'

export const promoThemeClass: Record<PromoTheme, string> = {
  brand: 'bg-[linear-gradient(100deg,#00a8c5_0%,#00c08b_100%)]',
  mint: 'bg-[linear-gradient(100deg,#00a374_0%,#0f766e_100%)]',
  navy: 'bg-[linear-gradient(100deg,#0c1a2e_0%,#14506a_100%)]',
  violet: 'bg-[linear-gradient(100deg,#6d5efc_0%,#a855f7_100%)]',
  amber: 'bg-[linear-gradient(100deg,#f59e0b_0%,#ef4444_100%)]',
}

export const promoThemeSoft: Record<PromoTheme, string> = {
  brand: 'from-[#e6f8fb] to-[#e3faf2] text-brand-700',
  mint: 'from-[#e3faf2] to-[#d7f5ee] text-mint-600',
  navy: 'from-[#eef3f8] to-[#e3edf4] text-navy',
  violet: 'from-[#f1efff] to-[#f7edff] text-[#6d5efc]',
  amber: 'from-[#fff7e8] to-[#ffeede] text-[#b45309]',
}
