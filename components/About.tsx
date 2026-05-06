'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 bg-ink-soft overflow-hidden">
      <div className="divider-gold absolute top-0 inset-x-0" aria-hidden="true" />
      <div className="divider-gold absolute bottom-0 inset-x-0" aria-hidden="true" />

      {/* Ambient glow */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="section-label">Our Story</p>
            <h2 className="heading-serif text-4xl sm:text-5xl md:text-6xl text-white mb-6 leading-tight">
              Crafted with{' '}
              <span className="text-gold-gradient italic">Purpose</span>
            </h2>

            <div className="divider-gold w-14 mb-8" aria-hidden="true" />

            <div className="flex flex-col gap-5 text-gray-400 font-sans text-base leading-relaxed">
              <p>
                Essence of Detail was born from a simple conviction — that every vehicle deserves
                the same obsessive care and precision as a fine timepiece. We believe the details
                you cannot see are just as important as the ones you can.
              </p>
              <p>
                We use only professional-grade products trusted by detailing specialists worldwide.
                From the deepest carpet fibres to the finest painted surfaces, every inch of your
                vehicle is treated with intention and expertise.
              </p>
              <p>
                Based in the Greater Vancouver Area, we bring a mobile service directly to your
                driveway — because premium care should come to you, on your schedule.
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-ink-border">
              {[
                { value: '500+', label: 'Vehicles Detailed' },
                { value: '100%', label: 'Satisfaction Rate' },
                { value: '5★',   label: 'Average Rating' },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="font-serif text-3xl font-bold text-gold">{value}</span>
                  <span className="text-xs text-gray-600 font-sans tracking-wide uppercase">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Gold border frame */}
            <div
              className="absolute -top-4 -right-4 w-full h-full border border-gold/25 pointer-events-none z-0"
              aria-hidden="true"
            />
            <div className="relative z-10 overflow-hidden aspect-[4/5]">
              <Image
                src="/interior.jpg"
                alt="Freshly detailed clean leather interior"
                fill
                className="object-cover object-center hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Overlay gradient */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.5) 0%, transparent 50%)' }}
                aria-hidden="true"
              />
            </div>

            {/* Floating badge */}
            <div
              className="absolute bottom-6 left-6 z-20 bg-ink-card border border-gold/30 px-5 py-4 shadow-gold-sm"
              aria-label="Service area badge"
            >
              <p className="text-[10px] text-gray-600 uppercase tracking-widest font-sans mb-1">Service Area</p>
              <p className="text-white font-serif font-semibold text-sm">Greater Vancouver</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
