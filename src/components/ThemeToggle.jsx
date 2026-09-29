import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle light/dark theme"
      className="w-10 h-10 rounded-full border border-line bg-surface flex items-center justify-center text-ink/70 hover:text-ink hover:border-primary/40 transition-colors shrink-0"
    >
      {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  )
}
