import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class', // <--- ADD THIS LINE
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#E53E3E', // Red accent (same for both modes)
          dark: '#9B2C2C',
          light: 'rgba(229, 62, 62, 0.1)',
        },
        // We remove the hardcoded ink/surface colors so we can use standard Tailwind gray/black/white
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.06)',
        'card-dark': '0 4px 24px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
}
export default config