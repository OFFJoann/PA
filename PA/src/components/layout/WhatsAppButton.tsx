import { MessageCircle } from 'lucide-react'
import { useStore } from '../../lib/store'

export function WhatsAppButton() {
  const { content } = useStore()
  const href = `https://wa.me/${content.whatsapp}?text=${encodeURIComponent(
    'Hola Punto Aliado, quiero cotizar un seguro o crédito.',
  )}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-2"
      aria-label="Escríbenos por WhatsApp"
    >
      <span className="pointer-events-none hidden translate-x-2 items-center rounded-full bg-navy px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-soft transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:flex">
        ¿Hablamos?
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_30px_-10px_rgba(37,211,102,0.8)] transition-transform duration-300 group-hover:scale-105">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20" />
        <MessageCircle className="relative h-6 w-6" />
      </span>
    </a>
  )
}
