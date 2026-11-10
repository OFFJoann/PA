import { ArrowLeft, Compass } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-5 py-20">
      <div className="absolute inset-0 bg-[radial-gradient(100%_80%_at_50%_0%,#e6f8fb,#f4fafb_60%,#ffffff)]" />
      <div className="relative text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-brand-50 text-brand-700">
          <Compass className="h-8 w-8" />
        </span>
        <p className="mt-6 text-7xl font-black tracking-tight text-ink/10">404</p>
        <h1 className="mt-2 text-3xl font-extrabold">Esta página no existe</h1>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink/55">
          Puede que el enlace haya cambiado. Vuelve al inicio y sigue comparando seguros y crédito.
        </p>
        <Link to="/" className="btn-primary mt-7">
          <ArrowLeft className="h-4 w-4" /> Volver al inicio
        </Link>
      </div>
    </div>
  )
}
