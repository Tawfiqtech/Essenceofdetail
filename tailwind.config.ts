import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0a0a0a',
          soft: '#111111',
          muted: '#1a1a1a',
          card: '#141414',
          border: '#252525',
        },
        gold: {
          DEFAULT: '#C9A84C',
          light: '#e2c97e',
          dark: '#9e7d2e',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gold-sm': '0 0 20px rgba(201,168,76,0.12)',
        'gold-md': '0 0 50px rgba(201,168,76,0.18)',
        'gold-lg': '0 0 90px rgba(201,168,76,0.22)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-400% 0' },
          '100%': { backgroundPosition: '400% 0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        shimmer: 'shimmer 4s infinite linear',
        'fade-up': 'fadeUp 0.8s ease forwards',
      },
    },
  },
  plugins: [],
}

export default config
