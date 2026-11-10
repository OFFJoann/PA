import { cn } from '../../lib/format'

interface LogoProps {
  inverted?: boolean
  className?: string
}

export function Logo({ inverted = false, className }: LogoProps) {
  return (
    <img
      src="/assets/brand/logo.png"
      alt="Punto Aliado"
      draggable={false}
      className={cn(
        'h-8 w-auto select-none sm:h-9',
        inverted && 'brightness-0 invert',
        className,
      )}
    />
  )
}
