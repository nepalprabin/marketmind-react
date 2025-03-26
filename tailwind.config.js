/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': "#0ea5e9",
        'secondary': "#10b981",
        'dark': "#1e293b",
        'light': "#f8fafc",
        'accent': "#8b5cf6",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      // Add keyframes
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-10px) rotate(1deg)' },
          '50%': { transform: 'translateY(5px) rotate(-1deg)' },
          '75%': { transform: 'translateY(-5px) rotate(0.5deg)' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '0.5' },
        },
        'pulse-slower': {
          '0%, 100%': { opacity: '0.1' },
          '50%': { opacity: '0.3' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-delay': {
          '0%, 50%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'ticker-tape': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      // Add animation classes
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        'pulse-slower': 'pulse-slower 6s ease-in-out infinite',
        'fade-in': 'fade-in 1s ease-out',
        'slide-up': 'slide-up 1s ease-out',
        'fade-in-delay': 'fade-in-delay 1.5s ease-out',
        'ticker': 'ticker-tape 20s linear infinite',
      },
      // Add box shadow for glow effect
      boxShadow: {
        'glow': '0 0 15px rgba(59, 130, 246, 0.3)',
      },
    },
  },
  plugins: [],
}
