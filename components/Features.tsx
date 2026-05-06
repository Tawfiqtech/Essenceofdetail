'use client'

import { motion } from 'framer-motion'
import { Hand, Eye, FlaskConical, ShieldCheck } from 'lucide-react'

const features = [
  {
    icon: Hand,
    title: 'Hand-Crafted Cleaning',
    body: 'Every surface treated with care — no automated machines, only skilled hands and proven techniques.',
  },
  {
    icon: Eye,
    title: 'Attention to Detail',
    body: 'We don\'t overlook a single vent, seam, or panel. Obsessive precision is our standard.',
  },
  {
    icon: FlaskConical,
    title: 'Premium Products',
    body: 'Professional-grade cleaners, conditioners, and protectants that deliver lasting results.',
  },
  {
    icon: ShieldCheck,
    title: 'Satisfaction Guaranteed',
    body: 'Your vehicle leaves looking exceptional — or we make it right. Every time.',
  },
]

export default function Features() {
  return (
    <section
      id="features"
      className="relative bg-ink-soft py-16 md:py-20"
      aria-label="Why choose us"
    >
      <div className="divider-gold absolute top-0 inset-x-0" aria-hidden="true" />
      <div className="divider-gold absolute bottom-0 inset-x-0" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink-border">
          {features.map(({ icon: Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-ink-soft px-8 py-10 flex flex-col gap-4 group hover:bg-ink-card transition-colors duration-300"
            >
              <div className="w-10 h-10 flex items-center justify-center border border-gold/30 group-hover:border-gold/60 transition-colors duration-300">
                <Icon className="w-5 h-5 text-gold" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-base font-semibold text-white tracking-wide">
                {title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed font-sans">
                {body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
