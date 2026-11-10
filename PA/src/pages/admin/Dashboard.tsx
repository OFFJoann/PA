import { ArrowRight, Eye, Megaphone, MousePointerClick, Sparkles, TrendingUp, Users, Wallet } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { AdminPageHeader, StatCard, StatusBadge } from '../../components/admin/AdminUI'
import { formatCompact, formatCount, formatDate, formatNumber } from '../../lib/format'
import { useStore } from '../../lib/store'
import { promoThemeClass } from '../../lib/themes'

const shortProduct = (product: string) =>
  product
    .replace('Seguro de ', '')
    .replace('Seguro ', '')
    .replace('Póliza de ', '')
    .replace('Crédito vehicular', 'Crédito')
    .replace(/^./, (letter) => letter.toUpperCase())

const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

export default function Dashboard() {
  const { leads, promos, livePromos } = useStore()

  const days = Array.from({ length: 14 }, (_, index) => {
    const date = new Date()
    date.setDate(date.getDate() - (13 - index))
    return date
  })

  const series = days.map((date) => ({
    label: date.toLocaleDateString('es-CO', { day: '2-digit', month: 'short' }),
    leads: leads.filter((lead) => sameDay(new Date(lead.createdAt), date)).length,
  }))

  const productCounts = Object.entries(
    leads.reduce<Record<string, number>>((acc, lead) => {
      const key = shortProduct(lead.product)
      acc[key] = (acc[key] ?? 0) + 1
      return acc
    }, {}),
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, total]) => ({ name, total }))

  const nuevos = leads.filter((lead) => lead.status === 'nuevo').length
  const cerrados = leads.filter((lead) => lead.status === 'cerrado').length
  const pipeline = leads
    .filter((lead) => lead.status !== 'cerrado' && lead.status !== 'perdido')
    .reduce((total, lead) => total + lead.value, 0)
  const conversion = leads.length ? (cerrados / leads.length) * 100 : 0
  const views = promos.reduce((total, promo) => total + promo.views, 0)
  const clicks = promos.reduce((total, promo) => total + promo.clicks, 0)
  const ctr = views ? (clicks / views) * 100 : 0

  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Buenos días' : hour < 19 ? 'Buenas tardes' : 'Buenas noches'

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Resumen general"
        title={`${greeting}, Admin`}
        description="Este es el pulso de Punto Aliado: leads, promociones y rendimiento del sitio en tiempo real."
      >
        <Link to="/admin/promociones" className="btn-primary px-4 py-2.5 text-xs">
          <Megaphone className="h-4 w-4" /> Nueva promoción
        </Link>
      </AdminPageHeader>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Users}
          label="Leads totales"
          value={formatNumber(leads.length)}
          hint={`${nuevos} sin contactar`}
          trend="up"
          tone="brand"
        />
        <StatCard
          icon={Wallet}
          label="Pipeline estimado"
          value={formatCompact(pipeline)}
          hint="Oportunidades abiertas"
          trend="up"
          tone="mint"
        />
        <StatCard
          icon={TrendingUp}
          label="Tasa de cierre"
          value={`${conversion.toFixed(1)}%`}
          hint={`${cerrados} negocios cerrados`}
          trend={conversion >= 15 ? 'up' : 'down'}
          tone="violet"
        />
        <StatCard
          icon={Megaphone}
          label="Promociones activas"
          value={formatNumber(livePromos.length)}
          hint={`${promos.length} creadas en total`}
          trend="up"
          tone="amber"
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-3xl border border-line/80 bg-white p-5 shadow-card sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-sm font-extrabold text-ink">Leads de los últimos 14 días</h2>
              <p className="mt-0.5 text-xs text-ink/45">Solicitudes recibidas desde el sitio web</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-mint-50 px-2.5 py-1 text-[10px] font-bold text-mint-600">
              <TrendingUp className="h-3 w-3" /> En vivo
            </span>
          </div>

          <div className="mt-5 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={series} margin={{ top: 6, right: 6, left: -22, bottom: 0 }}>
                <defs>
                  <linearGradient id="leadsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00a8c5" stopOpacity={0.32} />
                    <stop offset="100%" stopColor="#00a8c5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef3f5" />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 10, fill: '#8ba1aa' }}
                  axisLine={false}
                  tickLine={false}
                  interval={1}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 10, fill: '#8ba1aa' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: '1px solid #e2edf0',
                    fontSize: 12,
                    boxShadow: '0 10px 30px -18px rgba(12,26,46,0.3)',
                  }}
                  labelStyle={{ color: '#0a1b2b', fontWeight: 700 }}
                />
                <Area
                  type="monotone"
                  dataKey="leads"
                  name="Leads"
                  stroke="#00a8c5"
                  strokeWidth={2.5}
                  fill="url(#leadsFill)"
                  activeDot={{ r: 4, fill: '#00a8c5', strokeWidth: 2, stroke: '#fff' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl border border-line/80 bg-white p-5 shadow-card sm:p-6">
          <div>
            <h2 className="text-sm font-extrabold text-ink">Productos más solicitados</h2>
            <p className="mt-0.5 text-xs text-ink/45">Distribución de leads por producto</p>
          </div>
          <div className="mt-5 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productCounts} layout="vertical" margin={{ top: 0, right: 12, left: 8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#eef3f5" />
                <XAxis type="number" allowDecimals={false} tick={{ fontSize: 10, fill: '#8ba1aa' }} axisLine={false} tickLine={false} />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={78}
                  tick={{ fontSize: 10, fill: '#5c7480' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: '#f4fafb' }}
                  contentStyle={{ borderRadius: 12, border: '1px solid #e2edf0', fontSize: 12 }}
                />
                <Bar dataKey="total" name="Leads" radius={[0, 8, 8, 0]} barSize={16}>
                  {productCounts.map((entry, index) => (
                    <Cell key={entry.name} fill={index === 0 ? '#00a8c5' : index === 1 ? '#00c08b' : '#9bdbe7'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <div className="rounded-3xl border border-line/80 bg-white shadow-card">
          <div className="flex items-center justify-between border-b border-line/70 px-5 py-4 sm:px-6">
            <div>
              <h2 className="text-sm font-extrabold text-ink">Leads recientes</h2>
              <p className="mt-0.5 text-xs text-ink/45">Las últimas solicitudes del sitio</p>
            </div>
            <Link
              to="/admin/leads"
              className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700 transition hover:gap-2"
            >
              Ver todos <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-xs">
              <thead>
                <tr className="text-[10px] uppercase tracking-widest text-ink/35">
                  <th className="px-5 py-3 font-bold sm:px-6">Cliente</th>
                  <th className="px-3 py-3 font-bold">Producto</th>
                  <th className="px-3 py-3 font-bold">Estado</th>
                  <th className="px-3 py-3 font-bold">Valor</th>
                  <th className="px-5 py-3 text-right font-bold sm:px-6">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="transition hover:bg-cream/50">
                    <td className="px-5 py-3 sm:px-6">
                      <p className="font-bold text-ink">{lead.name}</p>
                      <p className="text-[10px] text-ink/40">{lead.phone}</p>
                    </td>
                    <td className="px-3 py-3 text-ink/60">{lead.product}</td>
                    <td className="px-3 py-3"><StatusBadge status={lead.status} /></td>
                    <td className="px-3 py-3 font-semibold text-ink/70">{formatCompact(lead.value)}</td>
                    <td className="px-5 py-3 text-right text-ink/45 sm:px-6">
                      {formatDate(lead.createdAt, { day: '2-digit', month: 'short' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-line/80 bg-white p-5 shadow-card sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-ink">Rendimiento del sitio</h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-700">
                <Sparkles className="h-3 w-3" /> {ctr.toFixed(1)}% CTR
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-cream p-3">
                <p className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-ink/35">
                  <Eye className="h-3 w-3" /> Vistas
                </p>
                <p className="mt-1 text-xl font-black text-ink">{formatCount(views)}</p>
              </div>
              <div className="rounded-2xl bg-cream p-3">
                <p className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-ink/35">
                  <MousePointerClick className="h-3 w-3" /> Clics
                </p>
                <p className="mt-1 text-xl font-black text-ink">{formatCount(clicks)}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-line/80 bg-white p-5 shadow-card sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-ink">Promociones activas</h2>
              <Link to="/admin/promociones" className="text-xs font-semibold text-brand-700">
                Gestionar
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              {livePromos.slice(0, 3).map((promo) => {
                const promoRate = promo.views ? (promo.clicks / promo.views) * 100 : 0
                return (
                  <div key={promo.id} className="rounded-2xl border border-line/70 p-3">
                    <div className="flex items-start gap-2.5">
                      <span className={`mt-0.5 h-8 w-8 shrink-0 rounded-xl ${promoThemeClass[promo.theme]}`} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-bold text-ink">{promo.title}</p>
                        <p className="mt-0.5 text-[10px] text-ink/40">
                          {formatCount(promo.views)} vistas · {promoRate.toFixed(1)}% CTR
                        </p>
                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
                          <div
                            className="h-full rounded-full bg-brand"
                            style={{ width: `${Math.min(100, promoRate * 8)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
              {livePromos.length === 0 && (
                <p className="rounded-2xl bg-cream px-3 py-6 text-center text-xs text-ink/40">
                  No hay promociones activas.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
