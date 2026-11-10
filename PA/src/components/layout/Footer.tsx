import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import type { SVGProps } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../../lib/store'
import { PRODUCTS } from '../../lib/products'
import { Logo } from '../ui/Logo'

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 3h-2.5A4.5 4.5 0 0 0 8 7.5V10H5v4h3v7h4v-7h3l1-4h-4V7.5A1.5 1.5 0 0 1 13.5 6H15V3Z" />
    </svg>
  )
}

function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2.5" y="6" width="19" height="12" rx="4" />
      <path d="m10.5 9.5 4.5 2.5-4.5 2.5v-5Z" fill="currentColor" stroke="none" />
    </svg>
  )
}

const legalLinks = [
  'Política de tratamiento de datos',
  'Preguntas frecuentes',
  'PQRS',
  'Portal de referidores',
]

export function Footer() {
  const { content } = useStore()

  return (
    <footer className="grad-navy relative overflow-hidden text-white">
      <div className="dot-bg pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-brand/15 blur-3xl" />

      <div className="container-x relative py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo inverted className="h-9" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              Seguros y crédito en un solo lugar. Comparamos, asesoramos y te acompañamos para que tomes
              la mejor decisión.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[
                { icon: InstagramIcon, href: 'https://www.instagram.com/puntoaliado/', label: 'Instagram' },
                { icon: FacebookIcon, href: 'https://www.facebook.com/puntoaliadosegurosycredito/', label: 'Facebook' },
                { icon: YoutubeIcon, href: 'https://www.youtube.com/channel/UCLKcY3Qzpk4zYVcK-FpcecA', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition hover:-translate-y-0.5 hover:border-mint/40 hover:text-mint"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
              <span className="ml-1 inline-flex items-center gap-1.5 rounded-full border border-mint/25 bg-mint/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-mint">
                <span className="h-1.5 w-1.5 rounded-full bg-mint" /> Vigilado
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">Seguros</h4>
            <ul className="mt-4 space-y-2.5">
              {PRODUCTS.map((product) => (
                <li key={product.key}>
                  <Link
                    to="/seguros"
                    className="text-sm text-white/65 transition hover:text-mint"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">Compañía</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/65">
              <li><Link to="/credito" className="transition hover:text-mint">Simula tu crédito</Link></li>
              <li><Link to="/nosotros" className="transition hover:text-mint">Sobre nosotros</Link></li>
              <li><Link to="/contacto" className="transition hover:text-mint">Contacto</Link></li>
              <li><Link to="/admin" className="transition hover:text-mint">CRM Punto Aliado</Link></li>
              <li><Link to="/credito" className="transition hover:text-mint">Pagos en línea</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">Contacto</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/65">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span>{content.addressMedellin}</span>
              </li>
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span>{content.addressBogota}</span>
              </li>
              <li className="flex gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <a href={`tel:${content.phone.replace(/\s/g, '')}`} className="transition hover:text-mint">
                  {content.phone}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <a href={`mailto:${content.email}`} className="transition hover:text-mint">
                  {content.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Punto Aliado. Todos los derechos reservados.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {legalLinks.map((item) => (
              <a key={item} href="#" onClick={(event) => event.preventDefault()} className="inline-flex items-center gap-1 transition hover:text-white/70">
                {item} <ArrowUpRight className="h-3 w-3" />
              </a>
            ))}
          </div>
        </div>
        <p className="mt-4 text-[10px] leading-relaxed text-white/25">
          Demo conceptual con fines de presentación. La información y las promociones se administran desde
          el CRM incluido y se guardan localmente en este navegador.
        </p>
      </div>
    </footer>
  )
}
