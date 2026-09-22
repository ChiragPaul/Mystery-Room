/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        noir: {
          950: '#050505',
          900: '#0a0a0a',
          850: '#111112',
          800: '#18181b',
          700: '#27272a',
          600: '#3f3f46',
        },
        inkred: {
          DEFAULT: '#e50914',
          glow: '#ff1f2d',
          dark: '#990000',
          blood: '#660000',
        },
        stark: '#f4f4f5',
        amberdoc: '#f59e0b',
      },
      fontFamily: {
        stencil: ['"Anton"', '"Bebas Neue"', 'Impact', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Courier Prime"', 'Courier', 'monospace'],
        display: ['"Syne"', 'sans-serif'],
      },
      animation: {
        'pulse-fast': 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glitch-skew': 'glitchSkew 1s infinite linear alternate-reverse',
        'flicker': 'flicker 0.15s infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        glitchSkew: {
          '0%': { transform: 'skew(0deg)' },
          '20%': { transform: 'skew(-2deg)' },
          '40%': { transform: 'skew(1.5deg)' },
          '60%': { transform: 'skew(-1deg)' },
          '80%': { transform: 'skew(2deg)' },
          '100%': { transform: 'skew(0deg)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      },
    },
  },
  plugins: [],
}
