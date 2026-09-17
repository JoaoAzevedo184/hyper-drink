import { useEffect, useState } from 'react'
import { Preloader } from './components/Preloader'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Benefits } from './components/Benefits'
import { Catalog } from './components/Catalog'
import { Location } from './components/Location'
import { InstagramSection } from './components/InstagramSection'
import { NFCSection } from './components/NFCSection'
import { CTA } from './components/CTA'
import { Footer } from './components/Footer'
import { WhatsAppFab } from './components/WhatsAppFab'
import { useSmoothScroll } from './hooks/useSmoothScroll'

export default function App() {
  const [loading, setLoading] = useState(true)
  useSmoothScroll(!loading)

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 1400)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <>
      <Preloader visible={loading} />
      <Header />
      <main>
        <Hero ready={!loading} />
        <About />
        <Benefits />
        <Catalog />
        <Location />
        <InstagramSection />
        <NFCSection />
        <CTA />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}
