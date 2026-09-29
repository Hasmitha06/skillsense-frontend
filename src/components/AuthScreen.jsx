import { useState } from 'react'
import ThemeToggle from './ThemeToggle'
import * as api from '../api/client'

export default function AuthScreen({ mode, onSwitchMode, onAuth, accountExists, theme, onToggleTheme }) {
  const isSignup = mode === 'signup'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (isSignup && (!name.trim() || !email.trim() || !password)) {
      setError('Fill in every field to create your account.')
      return
    }
    if (!isSignup && (!email.trim() || !password)) {
      setError('Enter your email and password.')
      return
    }

    setLoading(true)
    try {
      const user = isSignup
        ? await api.signup(name.trim(), email.trim(), password)
        : await api.login(email.trim(), password)
      onAuth(user)
    } catch (err) {
      setError(err.message || 'Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-6 relative">
      <div className="absolute top-6 right-6">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
      <div className="w-full max-w-sm">
        <p className="font-display text-2xl font-bold text-center mb-1 bg-gradient-to-r from-primary via-violet to-gap bg-clip-text text-transparent">SkillSense AI</p>
        <p className="font-body text-sm text-ink/60 text-center mb-8">
          {isSignup ? 'Create an account to start your assessment' : 'Welcome back — log in to see your progress'}
        </p>

        <form onSubmit={handleSubmit} className="border border-line rounded-2xl p-6 bg-surface shadow-sm space-y-4">
          {isSignup && (
            <Field label="Full name" value={name} onChange={setName} type="text" placeholder="Jordan Lee" />
          )}
          <Field label="Email" value={email} onChange={setEmail} type="email" placeholder="you@example.com" />
          <Field label="Password" value={password} onChange={setPassword} type="password" placeholder="••••••••" />

          {error && <p className="font-body text-sm text-gap">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full font-body font-semibold text-sm text-white bg-gradient-to-r from-primary to-violet rounded-full py-2.5 mt-2 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Please wait…' : isSignup ? 'Create account' : 'Log in'}
          </button>
        </form>

        <p className="font-body text-sm text-ink/60 text-center mt-5">
          {isSignup ? 'Already have an account?' : "Don't have an account yet?"}{' '}
          <button
            type="button"
            onClick={() => {
              setError('')
              onSwitchMode(isSignup ? 'login' : 'signup')
            }}
            className="text-mastery font-semibold underline underline-offset-2"
          >
            {isSignup ? 'Log in' : 'Sign up'}
          </button>
        </p>

        {!isSignup && accountExists === false && (
          <p className="font-body text-xs text-ink/40 text-center mt-3">
            No account remembered on this device yet — sign up to create one.
          </p>
        )}
      </div>
    </div>
  )
}

function Field({ label, value, onChange, type, placeholder }) {
  return (
    <label className="block">
      <span className="font-body text-xs text-ink/60 block mb-1">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-line rounded-xl px-3 py-2 font-body text-sm outline-none focus:border-primary"
      />
    </label>
  )
}
