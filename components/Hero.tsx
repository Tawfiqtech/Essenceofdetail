'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: 'easeOut' as const },
})

export default function Hero() {
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background image */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/hero-car.jpg"
          alt=""
          fill
          className="object-cover object-right"
          priority
          sizes="100vw"
        />
      </div>
      {/* Dark radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 80% at 50% 40%, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.92) 70%, #0a0a0a 100%)',
        }}
        aria-hidden="true"
      />
      {/* Gold glow orb */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(201,168,76,0.07) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      {/* Horizontal divider lines */}
      <div className="absolute top-0 inset-x-0 h-px divider-gold opacity-40" aria-hidden="true" />
      <div className="absolute bottom-0 inset-x-0 h-px divider-gold opacity-40" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 text-center px-5 sm:px-8 max-w-5xl mx-auto">
        {/* Pre-label */}
        <motion.p
          {...fade(0.1)}
          className="section-label mb-6 inline-block"
        >
          Premium Car Detailing · Greater Vancouver
        </motion.p>

        {/* Main headline */}
        <motion.h1
          {...fade(0.25)}
          className="heading-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-4"
        >
          Essence{' '}
          <span className="text-gold-gradient italic">of Detail</span>
        </motion.h1>

        {/* Thin gold rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="w-24 h-px bg-gold mx-auto my-7 origin-center"
          aria-hidden="true"
        />

        {/* Tagline */}
        <motion.p
          {...fade(0.55)}
          className="text-gray-300 text-lg sm:text-xl md:text-2xl font-sans font-light tracking-wide max-w-xl mx-auto mb-10"
        >
          Where Perfection Meets Every Surface
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fade(0.7)}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => scrollTo('#services')}
            className="btn-gold text-xs tracking-[0.18em] uppercase px-10 py-4"
            aria-label="View our detailing packages"
          >
            View Packages
          </button>
          <button
            onClick={() => scrollTo('#contact')}
            className="btn-outline-gold text-xs tracking-[0.18em] uppercase px-10 py-4"
            aria-label="Book a detailing appointment"
          >
            Book Now
          </button>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        onClick={() => scrollTo('#features')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-gray-600 hover:text-gold transition-colors group"
        aria-label="Scroll down"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase font-sans">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" aria-hidden="true" />
      </motion.button>
    </section>
  )
}
