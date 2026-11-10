import { Plus, RotateCcw, Save, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { AdminPageHeader } from '../../components/admin/AdminUI'
import { useToast } from '../../components/ui/Toaster'
import { cn } from '../../lib/format'
import { useStore } from '../../lib/store'
import type { Faq, SiteContent, Stat } from '../../lib/types'

const clone = (value: SiteContent): SiteContent => JSON.parse(JSON.stringify(value))

export default function ContentEditor() {
  const { content, updateContent } = useStore()
  const { notify } = useToast()
  const [draft, setDraft] = useState<SiteContent>(() => clone(content))

  const dirty = JSON.stringify(draft) !== JSON.stringify(content)

  const set = <K extends keyof SiteContent>(key: K, value: SiteContent[K]) =>
    setDraft((current) => ({ ...current, [key]: value }))

  const updateStat = (id: string, patch: Partial<Stat>) =>
    setDraft((current) => ({
      ...current,
      stats: current.stats.map((stat) => (stat.id === id ? { ...stat, ...patch } : stat)),
    }))

  const updateFaq = (id: string, patch: Partial<Faq>) =>
    setDraft((current) => ({
      ...current,
      faqs: current.faqs.map((faq) => (faq.id === id ? { ...faq, ...patch } : faq)),
    }))

  const addFaq = () =>
    setDraft((current) => ({
      ...current,
      faqs: [
        ...current.faqs,
        { id: `faq_${Date.now().toString(36)}`, question: 'Nueva pregunta', answer: 'Escribe aquí la respuesta.' },
      ],
    }))

  const removeFaq = (id: string) =>
    setDraft((current) => ({ ...current, faqs: current.faqs.filter((faq) => faq.id !== id) }))

  const handleSave = () => {
    updateContent(draft)
    notify('Contenido actualizado. Los cambios ya están en el sitio.')
  }

  const handleReset = () => {
    setDraft(clone(content))
    notify('Cambios descartados.', 'info')
  }

  return (
    <div className="space-y-5 pb-20">
      <AdminPageHeader
        eyebrow="Editor del sitio"
        title="Contenido"
        description="Edita los textos principales del sitio. Los cambios se publican al guardar y se ven en la página pública."
      >
        <button type="button" onClick={handleReset} disabled={!dirty} className="btn-ghost px-4 py-2.5 text-xs">
          <RotateCcw className="h-4 w-4" /> Descartar
        </button>
        <button type="button" onClick={handleSave} disabled={!dirty} className="btn-primary px-4 py-2.5 text-xs">
          <Save className="h-4 w-4" /> Guardar cambios
        </button>
      </AdminPageHeader>

      <div className="grid gap-4 xl:grid-cols-2">
        <section className="rounded-3xl border border-line/80 bg-white p-5 shadow-card sm:p-6">
          <h2 className="text-sm font-extrabold text-ink">Portada</h2>
          <p className="mt-0.5 text-xs text-ink/45">El primer mensaje que ven los visitantes.</p>

          <div className="mt-5 space-y-4">
            <div>
              <label className="label" htmlFor="content-badge">Texto del distintivo superior</label>
              <input
                id="content-badge"
                className="field"
                value={draft.heroBadge}
                onChange={(event) => set('heroBadge', event.target.value)}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="content-title">Título</label>
                <input
                  id="content-title"
                  className="field"
                  value={draft.heroTitle}
                  onChange={(event) => set('heroTitle', event.target.value)}
                />
              </div>
              <div>
                <label className="label" htmlFor="content-highlight">Parte destacada</label>
                <input
                  id="content-highlight"
                  className="field"
                  value={draft.heroHighlight}
                  onChange={(event) => set('heroHighlight', event.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="label" htmlFor="content-subtitle">Subtítulo</label>
              <textarea
                id="content-subtitle"
                rows={3}
                className="field resize-none"
                value={draft.heroSubtitle}
                onChange={(event) => set('heroSubtitle', event.target.value)}
              />
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-line/80 bg-white p-5 shadow-card sm:p-6">
          <h2 className="text-sm font-extrabold text-ink">Contacto</h2>
          <p className="mt-0.5 text-xs text-ink/45">Se usa en el footer, la sección de contacto y los botones de WhatsApp.</p>

          <div className="mt-5 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="content-phone">Teléfono</label>
                <input
                  id="content-phone"
                  className="field"
                  value={draft.phone}
                  onChange={(event) => set('phone', event.target.value)}
                />
              </div>
              <div>
                <label className="label" htmlFor="content-whatsapp">WhatsApp (con indicativo)</label>
                <input
                  id="content-whatsapp"
                  className="field"
                  value={draft.whatsapp}
                  onChange={(event) => set('whatsapp', event.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="content-email">Correo</label>
                <input
                  id="content-email"
                  type="email"
                  className="field"
                  value={draft.email}
                  onChange={(event) => set('email', event.target.value)}
                />
              </div>
              <div>
                <label className="label" htmlFor="content-schedule">Horario</label>
                <input
                  id="content-schedule"
                  className="field"
                  value={draft.schedule}
                  onChange={(event) => set('schedule', event.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="label" htmlFor="content-medellin">Dirección Medellín</label>
              <input
                id="content-medellin"
                className="field"
                value={draft.addressMedellin}
                onChange={(event) => set('addressMedellin', event.target.value)}
              />
            </div>
            <div>
              <label className="label" htmlFor="content-bogota">Dirección Bogotá</label>
              <input
                id="content-bogota"
                className="field"
                value={draft.addressBogota}
                onChange={(event) => set('addressBogota', event.target.value)}
              />
            </div>
          </div>
        </section>
      </div>

      <section className="rounded-3xl border border-line/80 bg-white p-5 shadow-card sm:p-6">
        <h2 className="text-sm font-extrabold text-ink">Métricas de confianza</h2>
        <p className="mt-0.5 text-xs text-ink/45">Los indicadores que aparecen en la portada y en “Nosotros”.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {draft.stats.map((stat) => (
            <div key={stat.id} className="rounded-2xl border border-line/70 bg-cream/50 p-3.5">
              <label className="label" htmlFor={`stat-value-${stat.id}`}>Valor</label>
              <input
                id={`stat-value-${stat.id}`}
                className="field font-bold"
                value={stat.value}
                onChange={(event) => updateStat(stat.id, { value: event.target.value })}
              />
              <label className="label mt-3" htmlFor={`stat-label-${stat.id}`}>Descripción</label>
              <input
                id={`stat-label-${stat.id}`}
                className="field"
                value={stat.label}
                onChange={(event) => updateStat(stat.id, { label: event.target.value })}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-line/80 bg-white p-5 shadow-card sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-extrabold text-ink">Preguntas frecuentes</h2>
            <p className="mt-0.5 text-xs text-ink/45">Aparecen en la sección de FAQ de todo el sitio.</p>
          </div>
          <button type="button" onClick={addFaq} className="btn-ghost px-3.5 py-2 text-xs">
            <Plus className="h-3.5 w-3.5" /> Agregar pregunta
          </button>
        </div>

        <div className="mt-5 space-y-3">
          {draft.faqs.map((faq, index) => (
            <div key={faq.id} className="rounded-2xl border border-line/70 bg-cream/40 p-4">
              <div className="flex items-start gap-3">
                <span className="mt-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-[10px] font-bold text-ink/40">
                  {index + 1}
                </span>
                <div className="flex-1 space-y-2">
                  <input
                    className="field font-semibold"
                    value={faq.question}
                    onChange={(event) => updateFaq(faq.id, { question: event.target.value })}
                    placeholder="Pregunta"
                  />
                  <textarea
                    rows={2}
                    className="field resize-none"
                    value={faq.answer}
                    onChange={(event) => updateFaq(faq.id, { answer: event.target.value })}
                    placeholder="Respuesta"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeFaq(faq.id)}
                  className="rounded-xl border border-line bg-white p-2 text-ink/40 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                  aria-label="Eliminar pregunta"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
          {draft.faqs.length === 0 && (
            <p className="rounded-2xl bg-cream px-4 py-6 text-center text-xs text-ink/40">
              No hay preguntas. Agrega la primera.
            </p>
          )}
        </div>
      </section>

      <div
        className={cn(
          'sticky bottom-4 z-20 flex flex-col gap-3 rounded-2xl border p-3 shadow-soft backdrop-blur sm:flex-row sm:items-center sm:justify-between',
          dirty ? 'border-brand/30 bg-white/95' : 'border-line bg-white/80',
        )}
      >
        <p className="text-xs font-medium text-ink/50">
          {dirty ? 'Tienes cambios sin publicar.' : 'Todo guardado y publicado en el sitio.'}
        </p>
        <div className="flex gap-2">
          <button type="button" onClick={handleReset} disabled={!dirty} className="btn-ghost px-4 py-2 text-xs">
            Descartar
          </button>
          <button type="button" onClick={handleSave} disabled={!dirty} className="btn-primary px-4 py-2 text-xs">
            <Save className="h-3.5 w-3.5" /> Guardar y publicar
          </button>
        </div>
      </div>
    </div>
  )
}
