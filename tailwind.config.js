/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#050806',
        ink: '#0B120E',
        hype: {
          DEFAULT: '#079447',
          50: '#EAFBF1',
          300: '#4DE08A',
          400: '#22C96F',
          500: '#079447',
          700: '#04682F',
          900: '#023A1C',
        },
        foam: '#F2FFF6',
      },
      fontFamily: {
        display: ['Archivo', 'system-ui', 'sans-serif'],
        sans: ['Figtree', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
      },
      boxShadow: {
        glow: '0 0 80px -20px rgba(7,148,71,0.65)',
        card: '0 24px 60px -30px rgba(0,0,0,0.9)',
        lift: '0 30px 70px -35px rgba(7,148,71,0.55)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        rise: {
          '0%': { transform: 'translateY(0) scale(0.6)', opacity: '0' },
          '15%': { opacity: '0.8' },
          '100%': { transform: 'translateY(-120vh) scale(1.1)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        rise: 'rise linear infinite',
        shimmer: 'shimmer 1.6s linear infinite',
      },
    },
  },
  plugins: [],
}
