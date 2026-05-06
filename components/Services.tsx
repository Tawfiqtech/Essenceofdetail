'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Clock, Plus, Minus, Sparkles } from 'lucide-react'

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const basicIncludes = {
  interior: [
    'Full interior vacuuming — seats, carpets, floor mats, trunk',
    'Wipe down of dashboard, console, door panels, cup holders',
    'Cleaning of steering wheel, gear shifter, high-touch surfaces',
    'Interior windows and mirrors',
    'Door jambs wiped down',
    'Light interior deodorizing',
  ],
  exterior: [
    'Exterior degreased',
    'Hand wash',
    'Bug and grime removal',
    'Wheel faces and tires cleaned',
    'Exterior windows cleaned',
    'Light wipe down of door jambs',
  ],
}

const basicPricing = [
  { name: 'Interior & Exterior — Small/Medium', note: 'Sedan, Compact SUV (e.g. Civic, Corolla)', price: '$109.99', duration: '1 hr' },
  { name: 'Interior & Exterior — Large', note: 'Mid-Size SUV (e.g. RAV4, CR-V)', price: '$129.99', duration: '1 hr 30 min' },
  { name: 'Interior & Exterior — XL', note: 'Large SUV, Minivans, Trucks (e.g. Sienna, Suburban)', price: '$149.99', duration: '1 hr 50 min' },
  { name: 'Interior Detail Only', note: 'All vehicle sizes', price: '$79.99', duration: '45 min' },
  { name: 'Exterior Detail Only', note: 'All vehicle sizes', price: '$49.99', duration: '30 min' },
]

const essentialIncludes = {
  interior: [
    'Thorough vacuuming — seats, carpets, floor mats, trunk',
    'Deep cleaning & shampoo extraction of carpets and floor mats',
    'Spot treatment for stains on fabric seats and surfaces',
    'Detailed cleaning of dashboard, console, door panels, vents, crevices',
    'Cleaning and conditioning of leather seats (where applicable)',
    'Steering wheel, pedals, gear shifter, all high-touch areas detailed',
    'Interior windows and mirrors cleaned streak-free',
    'Door jambs cleaned',
  ],
  exterior: [
    'Safe hand wash using premium products',
    'Deep wheel and tire cleaning including barrels',
    'Bug, tar, and road grime removal',
    'Foam and contact wash',
    'Tire shine applied',
    'Exterior windows cleaned streak-free',
  ],
}

const essentialPricing = [
  { name: 'Interior & Exterior — Small/Medium', note: 'Sedan, Crossovers (e.g. Civic, HR-V)', price: '$224.99', duration: '3 hr 30 min', featured: true },
  { name: 'Interior & Exterior — Large', note: 'Mid-Size SUV (e.g. RAV4, CR-V)', price: '$269.99', duration: '4 hr' },
  { name: 'Interior & Exterior — XL', note: 'Large SUV, Minivans, Trucks (e.g. Sienna, Suburban)', price: '$299.99', duration: '5 hr' },
  { name: 'Interior Detail Only', note: 'All vehicle sizes', price: '$109.99', duration: '2 hr 30 min' },
  { name: 'Exterior Detail Only', note: 'All vehicle sizes', price: '$99.99', duration: '1 hr 30 min' },
]

const extraServices = [
  { name: 'Bug Removal',                   price: '$29.99',  duration: '30 min' },
  { name: 'Spot Stain Removal',            price: '$49.99',  duration: '45 min' },
  { name: 'Anti-Bacterial Steam Treatment',price: '$59.99',  duration: '1 hr 30 min' },
  { name: 'Carpet Shampoo & Extraction',   price: '$79.99',  duration: '1 hr 30 min' },
  { name: 'Engine Bay Cleaning',           price: '$79.99',  duration: '45 min' },
  { name: 'Odour Neutralization',          price: '$89.99',  duration: '2 hr' },
  { name: 'Exterior Machine Polish',       price: '$99.99',  duration: '2 hr 30 min' },
  { name: 'Hand Wax',                      price: '$59.99',  duration: '30 min' },
  { name: 'Scratch Removal',               price: '$149.99', duration: '2 hr 30 min' },
  { name: 'Mold Removal',                  price: '$249.99', duration: '5 hr' },
]

const tabs = ['Basic', 'Essential', 'Extra Services'] as const
type Tab = typeof tabs[number]

/* ─────────────────────────────────────────
   Sub-components
───────────────────────────────────────── */
function IncludeSection({ title, items }: { title: string; items: string[] }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="border border-ink-border">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-5 py-3.5 text-left bg-ink-muted hover:bg-ink-card transition-colors"
        aria-expanded={open}
      >
        <span className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-400">{title}</span>
        {open ? <Minus className="w-3.5 h-3.5 text-gold flex-shrink-0" /> : <Plus className="w-3.5 h-3.5 text-gold flex-shrink-0" />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            key="list"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
            role="list"
          >
            {items.map((item) => (
              <li key={item} className="flex items-start gap-3 px-5 py-2.5 border-t border-ink-border text-sm text-gray-400 font-sans">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold mt-0.5 flex-shrink-0" aria-hidden="true" />
                {item}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

function PricingRow({ item, featured = false }: { item: { name: string; note: string; price: string; duration: string; featured?: boolean }; featured?: boolean }) {
  return (
    <div
      className={`relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border transition-colors duration-200 ${
        featured
          ? 'border-gold/50 bg-ink-card shimmer-border'
          : 'border-ink-border bg-ink-card hover:border-gold/20'
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-4 inline-flex items-center gap-1 bg-gold text-black text-[10px] font-bold tracking-widest uppercase px-3 py-1">
          <Sparkles className="w-3 h-3" aria-hidden="true" />
          Most Popular
        </span>
      )}
      <div>
        <p className="text-sm font-semibold text-white font-sans">{item.name}</p>
        <p className="text-xs text-gray-600 mt-0.5">{item.note}</p>
      </div>
      <div className="flex items-center gap-5 flex-shrink-0">
        <span className="flex items-center gap-1.5 text-xs text-gray-600">
          <Clock className="w-3.5 h-3.5" aria-hidden="true" />
          {item.duration}
        </span>
        <span className="text-gold font-serif font-bold text-lg">{item.price}</span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   Main component
───────────────────────────────────────── */
export default function Services() {
  const [activeTab, setActiveTab] = useState<Tab>('Basic')

  return (
    <section id="services" className="relative py-24 md:py-32 bg-ink">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.04) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-5 sm:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="section-label"
          >
            Packages & Pricing
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.08 }}
            className="heading-serif text-4xl sm:text-5xl md:text-6xl text-white mb-4"
          >
            Our <span className="text-gold-gradient italic">Packages</span>
          </motion.h2>
          <div className="divider-gold w-20 mx-auto mt-5" aria-hidden="true" />
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}
          className="flex border border-ink-border mb-10 overflow-x-auto"
          role="tablist"
          aria-label="Package categories"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 min-w-max py-3.5 px-6 text-xs font-semibold tracking-[0.15em] uppercase transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-gold text-black'
                  : 'text-gray-500 hover:text-white hover:bg-ink-muted'
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {activeTab === 'Basic' && (
            <motion.div
              key="basic"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-2xl font-sans">
                Our Basic Detail is a complete refresh designed to keep your vehicle clean, presentable,
                and protected for everyday use — perfect for regular maintenance or vehicles in average condition.
              </p>

              {/* What's included accordions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                <IncludeSection title="Interior Cleaning Includes" items={basicIncludes.interior} />
                <IncludeSection title="Exterior Cleaning Includes" items={basicIncludes.exterior} />
              </div>

              {/* Pricing */}
              <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-600 mb-4">Pricing</h3>
              <div className="flex flex-col gap-3">
                {basicPricing.map((item) => (
                  <PricingRow key={item.name} item={item} />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'Essential' && (
            <motion.div
              key="essential"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
            >
              {/* Premium label */}
              <div className="inline-flex items-center gap-2 border border-gold/40 bg-gold/[0.06] px-4 py-2 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-gold" aria-hidden="true" />
                <span className="text-gold text-xs font-semibold tracking-[0.15em] uppercase">Premium Package</span>
              </div>

              <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-2xl font-sans">
                Our most comprehensive service, designed to bring your vehicle back to near like-new condition.
                Goes beyond a standard clean — deep restoration, protection, and fine details that make a real difference.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                <IncludeSection title="Interior Deep Detail Includes" items={essentialIncludes.interior} />
                <IncludeSection title="Exterior Detail & Protection" items={essentialIncludes.exterior} />
              </div>

              <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-600 mb-4">Pricing</h3>
              <div className="flex flex-col gap-3">
                {essentialPricing.map((item) => (
                  <PricingRow key={item.name} item={item} featured={item.featured} />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'Extra Services' && (
            <motion.div
              key="extras"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
            >
              <div className="border border-gold/20 bg-gold/[0.04] px-5 py-4 mb-8 text-sm text-gray-400 font-sans">
                <span className="text-gold font-semibold">Note:</span> Prices may vary depending on vehicle condition.{' '}
                <a href="#contact" className="text-gold underline underline-offset-2 hover:text-gold-light transition-colors">
                  Contact us for a custom quote.
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {extraServices.map(({ name, price, duration }, i) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.45, delay: i * 0.05 }}
                    className="card-dark p-5 flex flex-col gap-3 hover:border-gold/20 transition-colors duration-300 group"
                  >
                    <h3 className="text-sm font-semibold text-white font-sans group-hover:text-gold transition-colors duration-200">
                      {name}
                    </h3>
                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-ink-border">
                      <span className="flex items-center gap-1.5 text-xs text-gray-600">
                        <Clock className="w-3 h-3" aria-hidden="true" />
                        {duration}
                      </span>
                      <span className="text-gold font-serif font-bold text-base">{price}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Book CTA */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 text-sm mb-4 font-sans">Not sure which package is right for you?</p>
          <a href="#contact" className="btn-outline-gold text-xs tracking-[0.15em] uppercase px-8 py-3.5">
            Book a Free Consultation
          </a>
        </motion.div>
      </div>
    </section>
  )
}
