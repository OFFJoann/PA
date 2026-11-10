import { Download, Search, Trash2, Users, Wallet, CheckCircle2, Target } from 'lucide-react'
import { useMemo, useState } from 'react'
import { AdminPageHeader, EmptyState, StatCard, StatusBadge } from '../../components/admin/AdminUI'
import { useToast } from '../../components/ui/Toaster'
import { cn, formatCompact, formatDate, initials } from '../../lib/format'
import { useStore } from '../../lib/store'
import { LEAD_STATUSES, type LeadStatus, type LeadType } from '../../lib/types'

type StatusFilter = 'todos' | LeadStatus
type TypeFilter = 'todos' | LeadType

export default function Leads() {
  const { leads, updateLead, deleteLead } = useStore()
  const { notify } = useToast()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<StatusFilter>('todos')
  const [type, setType] = useState<TypeFilter>('todos')

  const counts = useMemo(() => {
    const base: Record<string, number> = { todos: leads.length }
    LEAD_STATUSES.forEach((item) => {
      base[item.value] = leads.filter((lead) => lead.status === item.value).length
    })
    return base
  }, [leads])

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    return [...leads]
      .filter((lead) => (status === 'todos' ? true : lead.status === status))
      .filter((lead) => (type === 'todos' ? true : lead.type === type))
      .filter((lead) =>
        term
          ? [lead.name, lead.email, lead.phone, lead.product].some((value) =>
              value.toLowerCase().includes(term),
            )
          : true,
      )
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [leads, query, status, type])

  const openPipeline = filtered
    .filter((lead) => lead.status !== 'cerrado' && lead.status !== 'perdido')
    .reduce((total, lead) => total + lead.value, 0)

  const exportCsv = () => {
    const rows = [
      ['Nombre', 'Email', 'Teléfono', 'Tipo', 'Producto', 'Estado', 'Valor', 'Origen', 'Fecha', 'Mensaje'],
      ...filtered.map((lead) => [
        lead.name,
        lead.email,
        lead.phone,
        lead.type,
        lead.product,
        LEAD_STATUSES.find((item) => item.value === lead.status)?.label ?? lead.status,
        String(lead.value),
        lead.source,
        new Date(lead.createdAt).toLocaleString('es-CO'),
        lead.message,
      ]),
    ]
    const csv = rows
      .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(','))
      .join('\n')
    const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'leads-punto-aliado.csv'
    link.click()
    URL.revokeObjectURL(url)
    notify(`${filtered.length} leads exportados a CSV.`)
  }

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`¿Eliminar el lead de ${name}?`)) {
      deleteLead(id)
      notify('Lead eliminado.', 'info')
    }
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Comercial"
        title="Leads"
        description="Gestiona las solicitudes del sitio, cambia su estado y exporta la información para tu equipo."
      >
        <button
          type="button"
          onClick={exportCsv}
          disabled={filtered.length === 0}
          className="btn-ghost px-4 py-2.5 text-xs"
        >
          <Download className="h-4 w-4" /> Exportar CSV
        </button>
      </AdminPageHeader>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Users} label="Leads filtrados" value={String(filtered.length)} tone="brand" />
        <StatCard icon={Target} label="Sin contactar" value={String(counts.nuevo ?? 0)} tone="amber" hint="Estado nuevo" />
        <StatCard icon={CheckCircle2} label="Cerrados" value={String(counts.cerrado ?? 0)} tone="mint" />
        <StatCard icon={Wallet} label="Pipeline abierto" value={formatCompact(openPipeline)} tone="violet" />
      </div>

      <div className="rounded-3xl border border-line/80 bg-white shadow-card">
        <div className="space-y-3 border-b border-line/70 p-4 sm:p-5">
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />
              <input
                className="field pl-10"
                placeholder="Buscar por nombre, correo, teléfono o producto..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <select
              className="field sm:w-44"
              value={type}
              onChange={(event) => setType(event.target.value as TypeFilter)}
            >
              <option value="todos">Todos los tipos</option>
              <option value="Seguro">Seguros</option>
              <option value="Crédito">Créditos</option>
            </select>
          </div>

          <div className="hide-scrollbar flex gap-1.5 overflow-x-auto pb-1">
            {[{ value: 'todos' as const, label: 'Todos' }, ...LEAD_STATUSES].map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setStatus(item.value as StatusFilter)}
                className={cn(
                  'shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-semibold transition',
                  status === item.value
                    ? 'border-brand bg-brand-50 text-brand-700'
                    : 'border-line bg-white text-ink/50 hover:border-brand/30 hover:text-ink',
                )}
              >
                {item.label}
                <span className="ml-1.5 opacity-60">{counts[item.value] ?? 0}</span>
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="p-5">
            <EmptyState
              icon={Users}
              title="No hay leads con esos filtros"
              description="Prueba con otro estado, tipo o término de búsqueda."
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-xs">
              <thead>
                <tr className="text-[10px] uppercase tracking-widest text-ink/35">
                  <th className="px-5 py-3 font-bold">Cliente</th>
                  <th className="px-3 py-3 font-bold">Contacto</th>
                  <th className="px-3 py-3 font-bold">Interés</th>
                  <th className="px-3 py-3 font-bold">Valor</th>
                  <th className="px-3 py-3 font-bold">Estado</th>
                  <th className="px-3 py-3 font-bold">Fecha</th>
                  <th className="px-5 py-3 text-right font-bold">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {filtered.map((lead) => (
                  <tr key={lead.id} className="transition hover:bg-cream/40">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[10px] font-bold text-brand-700">
                          {initials(lead.name)}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate font-bold text-ink">{lead.name}</p>
                          <p className="truncate text-[10px] text-ink/40">{lead.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3.5">
                      <p className="font-medium text-ink/70">{lead.phone}</p>
                      <p className="text-[10px] text-ink/35">{lead.source}</p>
                    </td>
                    <td className="px-3 py-3.5">
                      <p className="font-medium text-ink/65">{lead.product}</p>
                      <span
                        className={cn(
                          'mt-0.5 inline-block rounded-full px-1.5 py-0.5 text-[9px] font-bold',
                          lead.type === 'Crédito' ? 'bg-violet-50 text-violet-600' : 'bg-brand-50 text-brand-700',
                        )}
                      >
                        {lead.type}
                      </span>
                    </td>
                    <td className="px-3 py-3.5 font-semibold text-ink/70">{formatCompact(lead.value)}</td>
                    <td className="px-3 py-3.5">
                      <select
                        value={lead.status}
                        onChange={(event) => {
                          updateLead(lead.id, { status: event.target.value as LeadStatus })
                          notify('Estado del lead actualizado.')
                        }}
                        className={cn(
                          'cursor-pointer rounded-full border px-2.5 py-1 text-[10px] font-bold outline-none',
                          LEAD_STATUSES.find((item) => item.value === lead.status)?.tone,
                        )}
                      >
                        {LEAD_STATUSES.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-3 py-3.5 text-ink/45">{formatDate(lead.createdAt)}</td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => handleDelete(lead.id, lead.name)}
                        className="rounded-xl border border-line p-2 text-ink/40 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                        aria-label={`Eliminar lead de ${lead.name}`}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 text-[11px] text-ink/40">
        <StatusBadge status="nuevo" />
        <span>Los leads nuevos llegan desde el cotizador, el formulario de contacto y las páginas de seguros y crédito.</span>
      </div>
    </div>
  )
}
