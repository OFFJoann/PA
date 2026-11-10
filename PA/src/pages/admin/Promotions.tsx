import { AnimatePresence, motion } from 'framer-motion'
import {
  CalendarDays,
  Eye,
  Megaphone,
  MousePointerClick,
  Pencil,
  Plus,
  Trash2,
  X,
} from 'lucide-react'
import { useMemo, useState, type FormEvent } from 'react'
import { AdminPageHeader, EmptyState, StatCard } from '../../components/admin/AdminUI'
import { useToast } from '../../components/ui/Toaster'
import { cn, formatCount, formatDate, isPromoLive, todayISO } from '../../lib/format'
import { useStore } from '../../lib/store'
import { promoThemeClass } from '../../lib/themes'
import { PROMO_THEMES, type Promo } from '../../lib/types'

const placementLabel: Record<Promo['placement'], string> = {
  bar: 'Barra superior',
  section: 'Sección del sitio',
  both: 'Barra + sección',
}

const addDays = (days: number) => {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.toISOString().slice(0, 10)
}

const createDraft = (): Promo => ({
  id: `promo_${Date.now().toString(36)}`,
  title: '',
  description: '',
  badge: 'Oferta',
  ctaLabel: 'Quiero saber más',
  ctaHref: '#seguros',
  theme: 'brand',
  placement: 'section',
  active: true,
  startDate: todayISO(),
  endDate: addDays(30),
  views: 0,
  clicks: 0,
})

const promoStatus = (promo: Promo) => {
  if (!promo.active) return { label: 'Pausada', tone: 'bg-ink/10 text-ink/50' }
  if (isPromoLive(promo)) return { label: 'Activa', tone: 'bg-mint/20 text-white' }
  if (promo.startDate > todayISO()) return { label: 'Programada', tone: 'bg-white/20 text-white' }
  return { label: 'Finalizada', tone: 'bg-white/15 text-white/60' }
}

export default function Promotions() {
  const { promos, savePromo, deletePromo, togglePromo } = useStore()
  const { notify } = useToast()
  const [draft, setDraft] = useState<Promo | null>(null)

  const stats = useMemo(() => {
    const today = todayISO()
    const views = promos.reduce((total, promo) => total + promo.views, 0)
    const clicks = promos.reduce((total, promo) => total + promo.clicks, 0)
    return {
      active: promos.filter((promo) => isPromoLive(promo)).length,
      scheduled: promos.filter((promo) => promo.active && promo.startDate > today).length,
      finished: promos.filter((promo) => promo.endDate < today || !promo.active).length,
      ctr: views ? (clicks / views) * 100 : 0,
    }
  }, [promos])

  const openNew = () => setDraft(createDraft())
  const openEdit = (promo: Promo) => setDraft({ ...promo })

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!draft) return
    if (!draft.title.trim()) {
      notify('El título de la promoción es obligatorio.', 'error')
      return
    }
    if (draft.endDate < draft.startDate) {
      notify('La fecha de fin no puede ser anterior a la de inicio.', 'error')
      return
    }
    savePromo({ ...draft, title: draft.title.trim() })
    notify('Promoción guardada. Ya se ve en el sitio público.')
    setDraft(null)
  }

  const handleDelete = (promo: Promo) => {
    if (window.confirm(`¿Eliminar la promoción "${promo.title}"?`)) {
      deletePromo(promo.id)
      notify('Promoción eliminada.', 'info')
    }
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Marketing"
        title="Promociones"
        description="Crea ofertas, prográmalas y mídelas. Todo lo que actives aquí aparece al instante en el sitio público."
      >
        <button type="button" onClick={openNew} className="btn-primary px-4 py-2.5 text-xs">
          <Plus className="h-4 w-4" /> Nueva promoción
        </button>
      </AdminPageHeader>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Megaphone} label="Activas ahora" value={String(stats.active)} tone="mint" trend="up" />
        <StatCard icon={CalendarDays} label="Programadas" value={String(stats.scheduled)} tone="brand" />
        <StatCard icon={Eye} label="Vistas totales" value={formatCount(promos.reduce((total, promo) => total + promo.views, 0))} tone="violet" />
        <StatCard icon={MousePointerClick} label="CTR promedio" value={`${stats.ctr.toFixed(1)}%`} tone="amber" />
      </div>

      {promos.length === 0 ? (
        <EmptyState
          icon={Megaphone}
          title="Aún no hay promociones"
          description="Crea tu primera oferta y aparecerá en la barra superior o en la sección de promociones del sitio."
        >
          <button type="button" onClick={openNew} className="btn-primary px-4 py-2.5 text-xs">
            <Plus className="h-4 w-4" /> Crear promoción
          </button>
        </EmptyState>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {promos.map((promo) => {
            const status = promoStatus(promo)
            const rate = promo.views ? (promo.clicks / promo.views) * 100 : 0
            return (
              <div
                key={promo.id}
                className="overflow-hidden rounded-3xl border border-line/80 bg-white shadow-card"
              >
                <div className={cn('relative overflow-hidden p-5 text-white sm:p-6', promoThemeClass[promo.theme])}>
                  <div className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
                  <div className="relative flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] backdrop-blur">
                      {promo.badge}
                    </span>
                    <span className={cn('rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest', status.tone)}>
                      {status.label}
                    </span>
                  </div>
                  <h3 className="relative mt-3 line-clamp-2 text-lg font-extrabold leading-tight">{promo.title || 'Sin título'}</h3>
                  <p className="relative mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/70">{promo.description}</p>
                  <p className="relative mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold text-white/80">
                    {promo.ctaLabel} →
                  </p>
                </div>

                <div className="p-5">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-ink/45">
                    <span className="inline-flex items-center gap-1">
                      <Megaphone className="h-3 w-3" /> {placementLabel[promo.placement]}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="h-3 w-3" />
                      {formatDate(promo.startDate, { day: '2-digit', month: 'short' })} —{' '}
                      {formatDate(promo.endDate, { day: '2-digit', month: 'short' })}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-cream p-3 text-center">
                    <div>
                      <p className="text-[9px] uppercase tracking-widest text-ink/35">Vistas</p>
                      <p className="text-sm font-extrabold text-ink">{formatCount(promo.views)}</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-widest text-ink/35">Clics</p>
                      <p className="text-sm font-extrabold text-ink">{formatCount(promo.clicks)}</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-widest text-ink/35">CTR</p>
                      <p className="text-sm font-extrabold text-brand-700">{rate.toFixed(1)}%</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-line/70 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        togglePromo(promo.id)
                        notify(promo.active ? 'Promoción pausada.' : 'Promoción activada.', 'info')
                      }}
                      className="flex items-center gap-2 text-[11px] font-semibold text-ink/55"
                    >
                      <span
                        className={cn(
                          'relative h-5 w-9 rounded-full transition-colors',
                          promo.active ? 'bg-mint' : 'bg-line',
                        )}
                      >
                        <span
                          className={cn(
                            'absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-all',
                            promo.active ? 'left-4.5' : 'left-0.5',
                          )}
                        />
                      </span>
                      {promo.active ? 'Activa' : 'Pausada'}
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => openEdit(promo)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-line px-2.5 py-1.5 text-[11px] font-semibold text-ink/60 transition hover:border-brand/30 hover:text-brand-700"
                      >
                        <Pencil className="h-3 w-3" /> Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(promo)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-line px-2.5 py-1.5 text-[11px] font-semibold text-ink/60 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                      >
                        <Trash2 className="h-3 w-3" /> Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <AnimatePresence>
        {draft && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-end justify-center bg-navy/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setDraft(null)
            }}
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 30, opacity: 0, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              className="relative max-h-[94vh] w-full max-w-2xl overflow-y-auto rounded-t-4xl bg-white p-5 shadow-2xl sm:rounded-4xl sm:p-7"
            >
              <button
                type="button"
                onClick={() => setDraft(null)}
                className="absolute right-4 top-4 rounded-full bg-cream p-2 text-ink/50 transition hover:text-ink"
                aria-label="Cerrar"
              >
                <X className="h-4 w-4" />
              </button>

              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-700">
                {promos.some((promo) => promo.id === draft.id) ? 'Editar promoción' : 'Nueva promoción'}
              </p>
              <h2 className="mt-1 text-2xl font-extrabold">Diseña tu oferta</h2>
              <p className="mt-1 text-sm text-ink/50">
                Se mostrará en el sitio según la ubicación y las fechas que elijas.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="label" htmlFor="promo-title">Título</label>
                  <input
                    id="promo-title"
                    required
                    className="field"
                    placeholder="Ej: 20% de descuento en tu seguro vehicular"
                    value={draft.title}
                    onChange={(event) => setDraft({ ...draft, title: event.target.value })}
                  />
                </div>

                <div>
                  <label className="label" htmlFor="promo-description">Descripción</label>
                  <textarea
                    id="promo-description"
                    rows={3}
                    className="field resize-none"
                    placeholder="Explica el beneficio y las condiciones..."
                    value={draft.description}
                    onChange={(event) => setDraft({ ...draft, description: event.target.value })}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="label" htmlFor="promo-badge">Etiqueta</label>
                    <input
                      id="promo-badge"
                      className="field"
                      placeholder="Oferta del mes"
                      value={draft.badge}
                      onChange={(event) => setDraft({ ...draft, badge: event.target.value })}
                    />
                  </div>
                  <div>
                    <label className="label" htmlFor="promo-cta">Texto del botón</label>
                    <input
                      id="promo-cta"
                      className="field"
                      placeholder="Cotizar ahora"
                      value={draft.ctaLabel}
                      onChange={(event) => setDraft({ ...draft, ctaLabel: event.target.value })}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="label" htmlFor="promo-href">Enlace del CTA</label>
                    <input
                      id="promo-href"
                      className="field"
                      placeholder="#seguros"
                      value={draft.ctaHref}
                      onChange={(event) => setDraft({ ...draft, ctaHref: event.target.value })}
                    />
                  </div>
                  <div>
                    <label className="label" htmlFor="promo-placement">Ubicación</label>
                    <select
                      id="promo-placement"
                      className="field"
                      value={draft.placement}
                      onChange={(event) =>
                        setDraft({ ...draft, placement: event.target.value as Promo['placement'] })
                      }
                    >
                      <option value="bar">Barra superior</option>
                      <option value="section">Sección del sitio</option>
                      <option value="both">Barra + sección</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="label" htmlFor="promo-start">Inicio</label>
                    <input
                      id="promo-start"
                      type="date"
                      className="field"
                      value={draft.startDate}
                      onChange={(event) => setDraft({ ...draft, startDate: event.target.value })}
                    />
                  </div>
                  <div>
                    <label className="label" htmlFor="promo-end">Fin</label>
                    <input
                      id="promo-end"
                      type="date"
                      className="field"
                      value={draft.endDate}
                      onChange={(event) => setDraft({ ...draft, endDate: event.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <p className="label">Color de la promoción</p>
                  <div className="flex flex-wrap gap-2">
                    {PROMO_THEMES.map((theme) => (
                      <button
                        key={theme.value}
                        type="button"
                        onClick={() => setDraft({ ...draft, theme: theme.value })}
                        className={cn(
                          'flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold transition',
                          draft.theme === theme.value
                            ? 'border-brand bg-brand-50 text-brand-700'
                            : 'border-line text-ink/55 hover:border-brand/30',
                        )}
                      >
                        <span className={cn('h-4 w-4 rounded-full bg-gradient-to-br', theme.preview)} />
                        {theme.label}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="flex cursor-pointer items-center gap-2.5 rounded-2xl bg-cream px-3.5 py-3 text-xs font-semibold text-ink/65">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-line accent-brand"
                    checked={draft.active}
                    onChange={(event) => setDraft({ ...draft, active: event.target.checked })}
                  />
                  Publicar y activar esta promoción
                </label>

                <div className="flex flex-col-reverse gap-2 border-t border-line pt-4 sm:flex-row sm:justify-end">
                  <button type="button" onClick={() => setDraft(null)} className="btn-ghost px-5 py-2.5 text-xs">
                    Cancelar
                  </button>
                  <button type="submit" className="btn-primary px-5 py-2.5 text-xs">
                    Guardar promoción
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
