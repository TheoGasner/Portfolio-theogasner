/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Palette personnalisée pour Théo
      colors: {
        // Noir et gris
        'dark': {
          950: '#0a0a0a',
          900: '#0f0f0f',
          800: '#1a1a1a',
          700: '#2a2a2a',
          600: '#3a3a3a',
        },
        // Bleu électrique
        'electric': {
          50: '#f0f9ff',
          100: '#e0f2ff',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
        // Violet néon
        'neon': {
          400: '#d946ef',
          500: '#c639cc',
          600: '#a855f7',
          700: '#9333ea',
        },
        // Cyan clair
        'cyan': {
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
        },
      },
      // Polices personnalisées (à charger via Google Fonts dans index.html)
      fontFamily: {
        'grotesk': ['Space Grotesk', 'sans-serif'],
        'satoshi': ['Satoshi', 'sans-serif'],
      },
      fontSize: {
        'display': ['3.5rem', { lineHeight: '1.1', fontWeight: '700' }],
        'h1': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['2rem', { lineHeight: '1.3', fontWeight: '600' }],
        'h3': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
      },
      // Animations personnalisées
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'orbit': 'orbit 8s linear infinite',
        'fadeInUp': 'fadeInUp 0.6s ease-out',
        'slideIn': 'slideIn 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5', boxShadow: '0 0 20px rgba(14, 165, 233, 0.5)' },
          '50%': { opacity: '1', boxShadow: '0 0 40px rgba(14, 165, 233, 0.8)' },
        },
        orbit: {
          'from': { transform: 'rotate(0deg) translateX(100px) rotate(0deg)' },
          'to': { transform: 'rotate(360deg) translateX(100px) rotate(-360deg)' },
        },
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          'from': { opacity: '0', transform: 'translateX(-30px)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      // Glassmorphism
      backdropBlur: {
        xl: '20px',
      },
      // Ombres personnalisées
      boxShadow: {
        'glow': '0 0 30px rgba(14, 165, 233, 0.5)',
        'glow-lg': '0 0 60px rgba(14, 165, 233, 0.7)',
        'glow-neon': '0 0 30px rgba(217, 70, 239, 0.5)',
      },
    },
  },
  plugins: [
    // Glassmorphism plugin
    function ({ addUtilities }) {
      const newUtilities = {
        '.glass': {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          '--tw-border-opacity': '1',
          borderColor: 'rgba(255, 255, 255, 0.2)',
        },
        '.glass-dark': {
          background: 'rgba(15, 15, 15, 0.6)',
          backdropFilter: 'blur(12px)',
          '--tw-border-opacity': '1',
          borderColor: 'rgba(255, 255, 255, 0.1)',
        },
        // Utilitaire pour le gradient global du portfolio
        // Utilisation optionnelle si vous voulez appliquer le gradient ailleurs
        '.bg-gradient-portfolio': {
          background: 'linear-gradient(135deg, #0D2137 0%, #3A1E5D 50%, #7F3FF1 100%)',
        },
      }
      addUtilities(newUtilities)
    },
  ],
}
