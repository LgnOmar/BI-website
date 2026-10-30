/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        plum: {
          50: '#FDF2F4',
          100: '#FCE7EC',
          200: '#F9D0DA',
          300: '#F4A9BC',
          400: '#E77494',
          500: '#D2416D',
          600: '#B02652',
          700: '#7B1537',
          800: '#60102B',
          900: '#470923', // Primary brand color
          950: '#2A0515',
        },
        cream: {
          50: '#FDFBF7',
          100: '#FBF7EE',
          200: '#F9EACD', // Brand cream
          300: '#F3DBAC',
          400: '#EAC57B',
          500: '#DDB052',
        },
        roseGold: {
          light: '#F5E6E8',
          DEFAULT: '#D8A48F',
          dark: '#B0755F',
        },
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        amiri: ['Amiri', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 25px -4px rgba(71, 9, 35, 0.08), 0 2px 10px -2px rgba(71, 9, 35, 0.04)',
        'plum': '0 10px 30px -5px rgba(71, 9, 35, 0.25)',
        'plum-lg': '0 20px 40px -10px rgba(71, 9, 35, 0.35)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}

