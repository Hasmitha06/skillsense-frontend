/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: 'rgb(var(--color-paper) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
        line: 'rgb(var(--color-line) / <alpha-value>)',
        mastery: 'rgb(var(--color-mastery) / <alpha-value>)',
        'mastery-soft': 'rgb(var(--color-mastery-soft) / <alpha-value>)',
        gap: 'rgb(var(--color-gap) / <alpha-value>)',
        'gap-soft': 'rgb(var(--color-gap-soft) / <alpha-value>)',
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        'primary-dark': 'rgb(var(--color-primary-dark) / <alpha-value>)',
        'primary-soft': 'rgb(var(--color-primary-soft) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        'accent-soft': 'rgb(var(--color-accent-soft) / <alpha-value>)',
        sky: 'rgb(var(--color-sky) / <alpha-value>)',
        'sky-soft': 'rgb(var(--color-sky-soft) / <alpha-value>)',
        violet: 'rgb(var(--color-violet) / <alpha-value>)',
        'violet-soft': 'rgb(var(--color-violet-soft) / <alpha-value>)',
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        hero: 'linear-gradient(135deg, #6366F1 0%, #A855F7 55%, #F43F5E 100%)',
      },
    },
  },
  plugins: [],
}
