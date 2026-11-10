import { AlertTriangle, KeyRound, Palette, RotateCcw, Save, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'
import { AdminPageHeader } from '../../components/admin/AdminUI'
import { useToast } from '../../components/ui/Toaster'
import { formatCOP } from '../../lib/format'
import { createSeed } from '../../lib/seed'
import { useStore } from '../../lib/store'
import type { SimulatorSettings } from '../../lib/types'

const swatches = [
  { name: 'Cian Punto Aliado', hex: '#00A8C5' },
  { name: 'Verde menta', hex: '#00C08B' },
  { name: 'Azul marino', hex: '#0C1A2E' },
  { name: 'Crema', hex: '#F4FAFB' },
  { name: 'Ámbar', hex: '#FFB020' },
]

export default function SettingsPage() {
  const { content, updateContent, resetDemo } = useStore()
  const { notify } = useToast()
  const [sim, setSim] = useState<SimulatorSettings>({ ...content.simulator })

  const update = (key: keyof SimulatorSettings, value: string) =>
    setSim((current) => ({ ...current, [key]: Number(value) }))

  const handleSave = () => {
    if (sim.minAmount >= sim.maxAmount) {
      notify('El monto mínimo debe ser menor que el máximo.', 'error')
      return
    }
    if (sim.minMonths >= sim.maxMonths) {
      notify('El plazo mínimo debe ser menor que el máximo.', 'error')
      return
    }
    if (sim.defaultAmount < sim.minAmount || sim.defaultAmount > sim.maxAmount) {
      notify('El monto por defecto debe estar dentro del rango.', 'error')
      return
    }
    updateContent({ simulator: { ...sim } })
    notify('Parámetros del simulador actualizados.')
  }

  const handleReset = () => {
    if (
      window.confirm(
        'Esto restaurará los leads, promociones y contenido originales de la demo. ¿Continuar?',
      )
    ) {
      const seed = createSeed()
      resetDemo()
      setSim({ ...seed.content.simulator })
      notify('Datos de demostración restaurados.', 'info')
    }
  }

  return (
    <div className="space-y-5">
      <AdminPageHeader
        eyebrow="Configuración"
        title="Ajustes"
        description="Parametriza el simulador de crédito y administra la información general de la demo."
      >
        <button type="button" onClick={handleSave} className="btn-primary px-4 py-2.5 text-xs">
          <Save className="h-4 w-4" /> Guardar ajustes
        </button>
      </AdminPageHeader>

      <div className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
        <section className="rounded-3xl border border-line/80 bg-white p-5 shadow-card sm:p-6">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              <SlidersHorizontal className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-sm font-extrabold text-ink">Simulador de crédito</h2>
              <p className="text-xs text-ink/45">Estos valores alimentan el simulador del sitio público.</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              { key: 'annualRate' as const, label: 'Tasa efectiva anual (%)', hint: 'Ej: 16.5' },
              { key: 'step' as const, label: 'Incremento del monto (COP)', hint: 'Paso del slider' },
              { key: 'minAmount' as const, label: 'Monto mínimo (COP)', hint: formatCOP(sim.minAmount) },
              { key: 'maxAmount' as const, label: 'Monto máximo (COP)', hint: formatCOP(sim.maxAmount) },
              { key: 'defaultAmount' as const, label: 'Monto por defecto (COP)', hint: formatCOP(sim.defaultAmount) },
              { key: 'defaultMonths' as const, label: 'Plazo por defecto (meses)', hint: `${sim.defaultMonths} meses` },
              { key: 'minMonths' as const, label: 'Plazo mínimo (meses)', hint: `${sim.minMonths} meses` },
              { key: 'maxMonths' as const, label: 'Plazo máximo (meses)', hint: `${sim.maxMonths} meses` },
            ].map(({ key, label, hint }) => (
              <div key={key}>
                <label className="label" htmlFor={`sim-${key}`}>{label}</label>
                <input
                  id={`sim-${key}`}
                  type="number"
                  className="field"
                  value={sim[key]}
                  onChange={(event) => update(key, event.target.value)}
                />
                <p className="mt-1 text-[10px] text-ink/35">{hint}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-brand/15 bg-brand-50/50 p-4 text-xs leading-relaxed text-ink/55">
            Vista previa: con {formatCOP(sim.defaultAmount)} a {sim.defaultMonths} meses y una tasa de{' '}
            {sim.annualRate}% E.A., el simulador mostrará una cuota estimada acorde a estos parámetros.
          </div>
        </section>

        <div className="space-y-4">
          <section className="rounded-3xl border border-line/80 bg-white p-5 shadow-card sm:p-6">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-mint-50 text-mint-600">
                <Palette className="h-4 w-4" />
              </span>
              <h2 className="text-sm font-extrabold text-ink">Identidad de marca</h2>
            </div>
            <p className="mt-2 text-xs text-ink/45">Paleta aplicada en todo el sitio y el CRM.</p>
            <div className="mt-4 space-y-2">
              {swatches.map((swatch) => (
                <div key={swatch.hex} className="flex items-center justify-between rounded-xl border border-line/70 px-3 py-2">
                  <div className="flex items-center gap-2.5">
                    <span className="h-6 w-6 rounded-lg border border-black/5" style={{ backgroundColor: swatch.hex }} />
                    <span className="text-xs font-semibold text-ink/70">{swatch.name}</span>
                  </div>
                  <span className="font-mono text-[10px] text-ink/40">{swatch.hex}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-line/80 bg-white p-5 shadow-card sm:p-6">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <KeyRound className="h-4 w-4" />
              </span>
              <h2 className="text-sm font-extrabold text-ink">Acceso demo</h2>
            </div>
            <div className="mt-3 space-y-1 font-mono text-xs text-ink/65">
              <p>admin@puntoaliado.com</p>
              <p>demo123</p>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-ink/40">
              La sesión se guarda en esta pestaña. Cerrar sesión no borra los datos.
            </p>
          </section>
        </div>
      </div>

      <section className="rounded-3xl border border-rose-200 bg-white p-5 shadow-card sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
              <AlertTriangle className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-sm font-extrabold text-ink">Zona de riesgo</h2>
              <p className="mt-0.5 max-w-xl text-xs leading-relaxed text-ink/45">
                Restaura la demo a su estado inicial. Se eliminarán los leads, promociones y cambios de
                contenido que hayas creado.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs font-bold text-rose-600 transition hover:bg-rose-100"
          >
            <RotateCcw className="h-4 w-4" /> Restaurar demo
          </button>
        </div>
      </section>
    </div>
  )
}
