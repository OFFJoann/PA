import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Info, X, XCircle } from 'lucide-react'
import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react'

type ToastTone = 'success' | 'error' | 'info'

interface ToastItem {
  id: number
  message: string
  tone: ToastTone
}

interface ToastValue {
  notify: (message: string, tone?: ToastTone) => void
}

const ToastContext = createContext<ToastValue | null>(null)

const toneStyles: Record<ToastTone, { icon: ReactNode; ring: string }> = {
  success: { icon: <CheckCircle2 className="h-5 w-5 text-mint-600" />, ring: 'border-mint/30' },
  error: { icon: <XCircle className="h-5 w-5 text-rose-500" />, ring: 'border-rose-200' },
  info: { icon: <Info className="h-5 w-5 text-brand" />, ring: 'border-brand/30' },
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const counter = useRef(0)

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const notify = useCallback(
    (message: string, tone: ToastTone = 'success') => {
      counter.current += 1
      const id = counter.current
      setToasts((prev) => [...prev.slice(-3), { id, message, tone }])
      window.setTimeout(() => dismiss(id), 4200)
    },
    [dismiss],
  )

  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[120] flex flex-col items-center gap-2 px-4 sm:bottom-6 sm:items-end sm:pr-6">
        <AnimatePresence initial={false}>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              className={`pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl border bg-white/95 p-4 shadow-soft backdrop-blur ${toneStyles[toast.tone].ring}`}
            >
              <span className="mt-0.5 shrink-0">{toneStyles[toast.tone].icon}</span>
              <p className="flex-1 text-sm font-medium leading-snug text-ink">{toast.message}</p>
              <button
                type="button"
                onClick={() => dismiss(toast.id)}
                className="rounded-full p-1 text-ink/40 transition hover:bg-ink/5 hover:text-ink"
                aria-label="Cerrar notificación"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast debe usarse dentro de ToastProvider')
  return context
}
