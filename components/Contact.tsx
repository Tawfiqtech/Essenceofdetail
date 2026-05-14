'use client'

import { useState, type FormEvent, type ChangeEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Phone, Mail, Car, CalendarDays, MessageSquare, Send, CheckCircle2, Loader2, MapPin } from 'lucide-react'

const serviceOptions = [
  { value: '', label: 'Select a service…' },
  { value: 'basic-int-ext', label: 'Basic — Interior & Exterior Detail' },
  { value: 'basic-int',     label: 'Basic — Interior Only' },
  { value: 'basic-ext',     label: 'Basic — Exterior Only' },
  { value: 'essential-int-ext', label: 'Essential — Interior & Exterior Detail' },
  { value: 'essential-int', label: 'Essential — Interior Only' },
  { value: 'essential-ext', label: 'Essential — Exterior Only' },
  { value: 'extra',         label: 'Extra Service (specify in message)' },
  { value: 'unsure',        label: 'Not sure — help me decide' },
]

const vehicleOptions = [
  { value: '',   label: 'Select vehicle size…' },
  { value: 'sm', label: 'Small/Medium — Sedan, Compact SUV (e.g. Civic, Corolla)' },
  { value: 'lg', label: 'Large — Mid-Size SUV (e.g. RAV4, CR-V)' },
  { value: 'xl', label: 'XL — Large SUV, Minivan, Truck (e.g. Sienna, Suburban)' },
]

type Fields = {
  name: string; phone: string; email: string;
  vehicle: string; service: string; date: string; message: string
}
type Errors = Partial<Record<keyof Fields, string>>
type Status = 'idle' | 'loading' | 'success'

const EMPTY: Fields = { name: '', phone: '', email: '', vehicle: '', service: '', date: '', message: '' }

export default function Contact() {
  const [fields, setFields] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')

  const set = (key: keyof Fields) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setFields((p) => ({ ...p, [key]: e.target.value }))

  const validate = (): boolean => {
    const e: Errors = {}
    if (!fields.name.trim())    e.name    = 'Name is required'
    if (!fields.phone.trim())   e.phone   = 'Phone is required'
    if (!fields.email.trim() || !/\S+@\S+\.\S+/.test(fields.email)) e.email = 'Valid email is required'
    if (!fields.vehicle)        e.vehicle = 'Please select a vehicle size'
    if (!fields.service)        e.service = 'Please select a service'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
  e.preventDefault()
  if (!validate()) return
  setStatus('loading')

  try {
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        'form-name': 'booking',
        ...fields,
      }).toString(),
    })
    setStatus('success')
  } catch {
    setStatus('idle')
    alert('Something went wrong. Please try again.')
  }
}
  return (
    <section id="contact" className="relative py-24 md:py-32 bg-ink overflow-hidden">
      {/* Required for Netlify Forms detection at build time */}
<form name="booking" data-netlify="true" hidden>
  <input type="text" name="name" />
  <input type="tel" name="phone" />
  <input type="email" name="email" />
  <input type="text" name="vehicle" />
  <input type="text" name="service" />
  <input type="date" name="date" />
  <textarea name="message" />
</form>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(201,168,76,0.05) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 items-start">

          {/* Left: info */}
          <div className="lg:sticky lg:top-28">
            <motion.p
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="section-label"
            >
              Get In Touch
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.08 }}
              className="heading-serif text-4xl sm:text-5xl md:text-6xl text-white mb-5 leading-tight"
            >
              Book Your{' '}
              <span className="text-gold-gradient italic">Detail</span>
            </motion.h2>

            <div className="divider-gold w-14 mb-8" aria-hidden="true" />

            <motion.p
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.15 }}
              className="text-gray-400 text-base leading-relaxed font-sans mb-10"
            >
              Fill in your details and we&apos;ll reach out within 24 hours to confirm your
              appointment. All services are mobile — we come to you.
            </motion.p>

            {/* Contact details */}
            <motion.ul
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.22 }}
              className="flex flex-col gap-5 mb-10"
              role="list"
              aria-label="Contact information"
            >
              {[
                { icon: Phone,  value: '+1 (604) 000-0000',            href: 'tel:+16040000000' },
                { icon: Mail,   value: 'hello@essenceofdetail.ca',      href: 'mailto:hello@essenceofdetail.ca' },
                { icon: MapPin, value: 'Serving the Greater Vancouver Area', href: '#' },
              ].map(({ icon: Icon, value, href }) => (
                <li key={value}>
                  <a
                    href={href}
                    className="flex items-center gap-3.5 text-sm text-gray-500 hover:text-gold transition-colors duration-200 font-sans"
                  >
                    <span className="w-8 h-8 border border-ink-border flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3.5 h-3.5 text-gold" aria-hidden="true" />
                    </span>
                    {value}
                  </a>
                </li>
              ))}
            </motion.ul>

            {/* Promise block */}
            <motion.div
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
              className="border border-gold/20 bg-gold/[0.04] px-6 py-5"
            >
              <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-3 font-sans">Our Promise</p>
              <ul className="flex flex-col gap-2.5" role="list">
                {['Response within 24 hours', 'No obligation consultation', 'Mobile service — we come to you', 'Satisfaction guaranteed'].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-gray-400 font-sans">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold flex-shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div
              className="relative border border-ink-border bg-ink-card"
              style={{ boxShadow: '0 8px 60px rgba(0,0,0,0.6), 0 0 40px rgba(201,168,76,0.03)' }}
            >
              {/* Gold top accent */}
              <div className="divider-gold" aria-hidden="true" />

              <div className="p-8 sm:p-10">
                <AnimatePresence mode="wait">

                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col items-center text-center py-12 gap-5"
                    >
                      <div className="w-16 h-16 border-2 border-gold flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 text-gold" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="heading-serif text-2xl text-white mb-2">Booking Request Sent</h3>
                        <p className="text-gray-500 text-sm font-sans max-w-xs mx-auto">
                          Thank you, <span className="text-white">{fields.name.split(' ')[0]}</span>.
                          We&apos;ll be in touch within 24 hours to confirm your appointment.
                        </p>
                      </div>
                      <button
                        onClick={() => { setFields(EMPTY); setStatus('idle') }}
                        className="text-gold text-sm font-sans hover:text-gold-light transition-colors underline underline-offset-2"
                      >
                        Submit another request
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      noValidate
                      aria-label="Booking form"
                    >
                      <h3 className="heading-serif text-2xl text-white mb-1">Request a Booking</h3>
                      <p className="text-gray-600 text-sm font-sans mb-7">We respond within 24 hours.</p>

                      {/* Grid fields */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">

                        {/* Name */}
                        <div>
                          <label htmlFor="name" className="block text-[11px] text-gray-500 uppercase tracking-widest font-sans mb-1.5">
                            Full Name <span className="text-gold">*</span>
                          </label>
                          <div className="relative">
                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600 pointer-events-none" aria-hidden="true" />
                            <input
                              id="name" type="text" value={fields.name} onChange={set('name')}
                              placeholder="Jane Smith" autoComplete="name"
                              className={`input-dark pl-10 ${errors.name ? 'border-red-500/50' : ''}`}
                              aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-err' : undefined}
                            />
                          </div>
                          {errors.name && <p id="name-err" role="alert" className="text-red-400 text-xs mt-1">{errors.name}</p>}
                        </div>

                        {/* Phone */}
                        <div>
                          <label htmlFor="phone" className="block text-[11px] text-gray-500 uppercase tracking-widest font-sans mb-1.5">
                            Phone <span className="text-gold">*</span>
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600 pointer-events-none" aria-hidden="true" />
                            <input
                              id="phone" type="tel" value={fields.phone} onChange={set('phone')}
                              placeholder="+1 (604) 000-0000" autoComplete="tel"
                              className={`input-dark pl-10 ${errors.phone ? 'border-red-500/50' : ''}`}
                              aria-invalid={!!errors.phone}
                            />
                          </div>
                          {errors.phone && <p role="alert" className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                        </div>

                        {/* Email */}
                        <div>
                          <label htmlFor="email" className="block text-[11px] text-gray-500 uppercase tracking-widest font-sans mb-1.5">
                            Email <span className="text-gold">*</span>
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600 pointer-events-none" aria-hidden="true" />
                            <input
                              id="email" type="email" value={fields.email} onChange={set('email')}
                              placeholder="you@example.com" autoComplete="email"
                              className={`input-dark pl-10 ${errors.email ? 'border-red-500/50' : ''}`}
                              aria-invalid={!!errors.email}
                            />
                          </div>
                          {errors.email && <p role="alert" className="text-red-400 text-xs mt-1">{errors.email}</p>}
                        </div>

                        {/* Preferred date */}
                        <div>
                          <label htmlFor="date" className="block text-[11px] text-gray-500 uppercase tracking-widest font-sans mb-1.5">
                            Preferred Date
                          </label>
                          <div className="relative">
                            <CalendarDays className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600 pointer-events-none z-10" aria-hidden="true" />
                            <input
                              id="date" type="date" value={fields.date} onChange={set('date')}
                              className="input-dark pl-10 [color-scheme:dark]"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Vehicle */}
                      <div className="mb-4">
                        <label htmlFor="vehicle" className="block text-[11px] text-gray-500 uppercase tracking-widest font-sans mb-1.5">
                          Vehicle Size <span className="text-gold">*</span>
                        </label>
                        <div className="relative">
                          <Car className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600 pointer-events-none z-10" aria-hidden="true" />
                          <select
                            id="vehicle" value={fields.vehicle} onChange={set('vehicle')}
                            className={`select-dark pl-10 ${errors.vehicle ? 'border-red-500/50' : ''}`}
                            aria-invalid={!!errors.vehicle}
                          >
                            {vehicleOptions.map((o) => (
                              <option key={o.value} value={o.value} className="bg-[#1a1a1a]">{o.label}</option>
                            ))}
                          </select>
                        </div>
                        {errors.vehicle && <p role="alert" className="text-red-400 text-xs mt-1">{errors.vehicle}</p>}
                      </div>

                      {/* Service */}
                      <div className="mb-4">
                        <label htmlFor="service" className="block text-[11px] text-gray-500 uppercase tracking-widest font-sans mb-1.5">
                          Service <span className="text-gold">*</span>
                        </label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600 pointer-events-none z-10" aria-hidden="true" />
                          <select
                            id="service" value={fields.service} onChange={set('service')}
                            className={`select-dark pl-10 ${errors.service ? 'border-red-500/50' : ''}`}
                            aria-invalid={!!errors.service}
                          >
                            {serviceOptions.map((o) => (
                              <option key={o.value} value={o.value} className="bg-[#1a1a1a]">{o.label}</option>
                            ))}
                          </select>
                        </div>
                        {errors.service && <p role="alert" className="text-red-400 text-xs mt-1">{errors.service}</p>}
                      </div>

                      {/* Message */}
                      <div className="mb-7">
                        <label htmlFor="message" className="block text-[11px] text-gray-500 uppercase tracking-widest font-sans mb-1.5">
                          Additional Notes
                        </label>
                        <textarea
                          id="message" rows={4} value={fields.message} onChange={set('message')}
                          placeholder="Tell us about your vehicle, any specific concerns, or questions…"
                          className="input-dark resize-none"
                          aria-label="Additional notes or questions"
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="btn-gold w-full justify-center py-4 text-sm tracking-[0.1em] uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-busy={status === 'loading'}
                      >
                        {status === 'loading' ? (
                          <><Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Sending…</>
                        ) : (
                          <><Send className="w-4 h-4" aria-hidden="true" /> Request Booking</>
                        )}
                      </button>

                      <p className="text-center text-gray-700 text-xs mt-4 font-sans">
                        By submitting you agree to be contacted regarding your booking.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
