// tailwind.config.js
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // Add other paths where you use Tailwind classes
  ],
  theme: {
    extend: {
      colors: {
        // You can use the slate palette directly, or define custom names
        primary: {
          DEFAULT: '#1E293B', // slate-800
          light: colors.slate[600],
          dark: colors.slate[900],
          foreground: colors.white, // Text color for primary buttons
        },
        slate: colors.slate, // Make sure the full slate palette is available
      },
      // Optional: Map the focus ring color to your primary color
      ringColor: {
        DEFAULT: colors.slate[500], // Or your preferred focus color
        primary: colors.slate[500],
      },
      // Optional: Map border color for focused inputs
      borderColor: theme => ({
        ...theme('colors'),
        DEFAULT: theme('colors.slate.300', 'currentColor'),
        primary: colors.slate[500],
       })
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Ensure you have this for form styling
  ],
}