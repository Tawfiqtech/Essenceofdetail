import Navbar   from '@/components/Navbar'
import Hero     from '@/components/Hero'
import Features from '@/components/Features'
import Services from '@/components/Services'
import About    from '@/components/About'
import Contact  from '@/components/Contact'
import Footer   from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative overflow-x-hidden bg-ink">
      <Navbar />
      <Hero />
      <Features />
      <Services />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}
