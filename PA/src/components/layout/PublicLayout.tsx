import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { QuoteProvider } from '../quote/QuoteProvider'
import { Footer } from './Footer'
import { Header } from './Header'
import { PromoBar } from './PromoBar'
import { WhatsAppButton } from './WhatsAppButton'

export function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

export function PublicLayout() {
  return (
    <QuoteProvider>
      <div className="flex min-h-screen flex-col">
        <PromoBar />
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </QuoteProvider>
  )
}
