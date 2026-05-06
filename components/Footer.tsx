'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

const navLinks = [
  { label: 'Home',     href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'About',    href: '#about' },
  { label: 'Contact',  href: '#contact' },
]

/* SVG social icons (lucide-react v0.x doesn't ship Instagram/Facebook) */
function IgIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )
}

function FbIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

const socials = [
  { icon: IgIcon, label: 'Instagram', href: '#' },
  { icon: FbIcon, label: 'Facebook',  href: '#' },
]

export default function Footer() {
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="relative bg-ink-soft border-t border-ink-border pt-14 pb-8">
      <div className="divider-gold absolute top-0 inset-x-0" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-ink-border">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
          >
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); scrollTo('#hero') }}
              className="inline-flex mb-5 group"
              aria-label="Essence of Detail"
            >
              <Image
                src="/logo.png"
                alt="Essence of Detail"
                width={72}
                height={72}
                className="h-14 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              />
            </a>
            <p className="text-gray-600 text-sm leading-relaxed font-sans max-w-[220px]">
              Premium mobile car detailing, brought to your door. Serving the Greater Vancouver Area.
            </p>

            {/* Social */}
            <div className="flex items-center gap-3 mt-6" aria-label="Social media links">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 border border-ink-border flex items-center justify-center text-gray-600 hover:text-gold hover:border-gold/30 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            aria-label="Footer navigation"
          >
            <h4 className="text-[10px] font-semibold text-gray-600 uppercase tracking-[0.2em] mb-5 font-sans">
              Navigation
            </h4>
            <ul className="flex flex-col gap-3" role="list">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <button
                    onClick={() => scrollTo(href)}
                    className="text-sm text-gray-500 hover:text-gold transition-colors duration-200 inline-flex items-center gap-1 group font-sans"
                  >
                    {label}
                    <ArrowUpRight
                      className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-hidden="true"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Services quick-links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-[10px] font-semibold text-gray-600 uppercase tracking-[0.2em] mb-5 font-sans">
              Our Packages
            </h4>
            <ul className="flex flex-col gap-3" role="list">
              {['Basic Detail', 'Essential Detail', 'Extra Services', 'Book Now'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollTo(item === 'Book Now' ? '#contact' : '#services')}
                    className="text-sm text-gray-500 hover:text-gold transition-colors duration-200 font-sans inline-flex items-center gap-1 group"
                  >
                    {item}
                    <ArrowUpRight
                      className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-hidden="true"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-700 font-sans">
          <p>© 2025 Essence of Detail. All rights reserved.</p>
          <p className="italic font-serif text-gray-600">Where Perfection Meets Every Surface</p>
        </div>
      </div>
    </footer>
  )
}
