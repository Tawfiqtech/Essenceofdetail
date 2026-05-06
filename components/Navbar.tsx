'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

const links = [
  { label: 'Home',     href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'About',    href: '#about' },
  { label: 'Contact',  href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLink = (href: string) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-ink/95 backdrop-blur-md border-b border-ink-border shadow-[0_4px_30px_rgba(0,0,0,0.6)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-18 py-4">

          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleLink('#hero') }}
            className="group"
            aria-label="Essence of Detail"
          >
            <Image
              src="/logo.png"
              alt="Essence of Detail"
              width={64}
              height={64}
              className="h-12 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
              priority
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {links.map(({ label, href }) => (
              <button
                key={label}
                onClick={() => handleLink(href)}
                className="text-sm font-sans text-gray-400 hover:text-white tracking-widest uppercase transition-colors duration-200 relative group"
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleLink('#contact') }}
              className="hidden md:inline-flex btn-outline-gold text-xs tracking-[0.15em] uppercase py-2.5 px-5"
              aria-label="Book a detailing appointment"
            >
              Book Now
            </a>
            <button
              className="md:hidden text-gray-400 hover:text-gold transition-colors p-1"
              onClick={() => setMenuOpen((p) => !p)}
              aria-label="Toggle mobile menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[65px] inset-x-0 z-40 bg-ink-soft border-b border-ink-border px-6 py-6 flex flex-col gap-5 md:hidden"
          >
            {links.map(({ label, href }) => (
              <button
                key={label}
                onClick={() => handleLink(href)}
                className="text-left text-sm font-sans text-gray-300 hover:text-gold uppercase tracking-widest transition-colors"
              >
                {label}
              </button>
            ))}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleLink('#contact') }}
              className="btn-outline-gold text-xs tracking-[0.15em] uppercase py-3 justify-center mt-2"
            >
              Book Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
