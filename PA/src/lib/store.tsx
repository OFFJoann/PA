import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { isPromoLive } from './format'
import { createSeed } from './seed'
import type { DemoState, Lead, LeadType, Promo, SiteContent } from './types'

const STORAGE_KEY = 'punto-aliado-demo-v1'

const loadState = (): DemoState => {
  if (typeof window === 'undefined') return createSeed()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as DemoState
      if (parsed?.promos && parsed?.leads && parsed?.content) return parsed
    }
  } catch {
    // ignore corrupted storage and start fresh
  }
  return createSeed()
}

export interface NewLeadInput {
  name: string
  email: string
  phone: string
  type: LeadType
  product: string
  message: string
  source?: string
  value?: number
}

interface StoreValue {
  state: DemoState
  promos: Promo[]
  leads: Lead[]
  content: SiteContent
  livePromos: Promo[]
  addLead: (input: NewLeadInput) => Lead
  updateLead: (id: string, patch: Partial<Lead>) => void
  deleteLead: (id: string) => void
  savePromo: (promo: Promo) => void
  deletePromo: (id: string) => void
  togglePromo: (id: string) => void
  trackPromo: (id: string) => void
  updateContent: (patch: Partial<SiteContent>) => void
  resetDemo: () => void
}

const StoreContext = createContext<StoreValue | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoState>(loadState)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // storage might be full or blocked; the demo still works in memory
    }
  }, [state])

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY && event.newValue) {
        try {
          const parsed = JSON.parse(event.newValue) as DemoState
          if (parsed?.promos && parsed?.leads && parsed?.content) setState(parsed)
        } catch {
          // ignore
        }
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const addLead = useCallback((input: NewLeadInput) => {
    const lead: Lead = {
      id: `lead_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
      name: input.name.trim(),
      email: input.email.trim(),
      phone: input.phone.trim(),
      type: input.type,
      product: input.product,
      message: input.message.trim(),
      status: 'nuevo',
      value: input.value ?? (input.type === 'Crédito' ? 45_000_000 : 650_000),
      source: input.source ?? 'Sitio web',
      createdAt: new Date().toISOString(),
    }
    setState((prev) => ({ ...prev, leads: [lead, ...prev.leads] }))
    return lead
  }, [])

  const updateLead = useCallback((id: string, patch: Partial<Lead>) => {
    setState((prev) => ({
      ...prev,
      leads: prev.leads.map((lead) => (lead.id === id ? { ...lead, ...patch } : lead)),
    }))
  }, [])

  const deleteLead = useCallback((id: string) => {
    setState((prev) => ({ ...prev, leads: prev.leads.filter((lead) => lead.id !== id) }))
  }, [])

  const savePromo = useCallback((promo: Promo) => {
    setState((prev) => {
      const exists = prev.promos.some((item) => item.id === promo.id)
      return {
        ...prev,
        promos: exists
          ? prev.promos.map((item) => (item.id === promo.id ? promo : item))
          : [promo, ...prev.promos],
      }
    })
  }, [])

  const deletePromo = useCallback((id: string) => {
    setState((prev) => ({ ...prev, promos: prev.promos.filter((promo) => promo.id !== id) }))
  }, [])

  const togglePromo = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      promos: prev.promos.map((promo) =>
        promo.id === id ? { ...promo, active: !promo.active } : promo,
      ),
    }))
  }, [])

  const trackPromo = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      promos: prev.promos.map((promo) =>
        promo.id === id ? { ...promo, clicks: promo.clicks + 1 } : promo,
      ),
    }))
  }, [])

  const updateContent = useCallback((patch: Partial<SiteContent>) => {
    setState((prev) => ({ ...prev, content: { ...prev.content, ...patch } }))
  }, [])

  const resetDemo = useCallback(() => {
    setState(createSeed())
  }, [])

  const livePromos = useMemo(() => state.promos.filter(isPromoLive), [state.promos])

  const value = useMemo<StoreValue>(
    () => ({
      state,
      promos: state.promos,
      leads: state.leads,
      content: state.content,
      livePromos,
      addLead,
      updateLead,
      deleteLead,
      savePromo,
      deletePromo,
      togglePromo,
      trackPromo,
      updateContent,
      resetDemo,
    }),
    [
      state,
      livePromos,
      addLead,
      updateLead,
      deleteLead,
      savePromo,
      deletePromo,
      togglePromo,
      trackPromo,
      updateContent,
      resetDemo,
    ],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) throw new Error('useStore debe usarse dentro de StoreProvider')
  return context
}
