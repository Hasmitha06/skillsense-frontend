import { useEffect, useState } from 'react'
import AuthScreen from './components/AuthScreen'
import Workflow from './components/workflow/Workflow'
import Dashboard from './components/Dashboard'
import * as api from './api/client'

function getInitialTheme() {
  const saved = localStorage.getItem('skillsense_theme')
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function App() {
  const [mode, setMode] = useState(api.hasAccountOnDevice() ? 'login' : 'signup')
  const [user, setUser] = useState(null)
  const [view, setView] = useState('workflow') // 'workflow' | 'dashboard'
  const [finishedResult, setFinishedResult] = useState(null) // {roleKey, result} from last completed workflow
  const [theme, setTheme] = useState(getInitialTheme)
  const [checkingSession, setCheckingSession] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('skillsense_theme', theme)
  }, [theme])

  // If a token is already stored (page refresh), try to restore the session
  useEffect(() => {
    const token = api.getToken()
    if (!token) {
      setCheckingSession(false)
      return
    }
    api.getMe()
      .then((me) => setUser(me))
      .catch(() => api.clearToken())
      .finally(() => setCheckingSession(false))
  }, [])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  function handleAuth(authedUser) {
    setUser(authedUser)
    setView('workflow')
  }

  function handleLogout() {
    api.clearToken()
    setUser(null)
    setMode('login')
    setView('workflow')
    setFinishedResult(null)
  }

  function handleWorkflowFinish(roleKey, result) {
    setFinishedResult({ roleKey, result })
    setView('dashboard')
  }

  if (checkingSession) {
    return <div className="min-h-screen bg-paper" />
  }

  if (!user) {
    return (
      <AuthScreen
        mode={mode}
        onSwitchMode={setMode}
        onAuth={handleAuth}
        accountExists={api.hasAccountOnDevice()}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    )
  }

  if (view === 'workflow') {
    return <Workflow user={user} onFinish={handleWorkflowFinish} theme={theme} onToggleTheme={toggleTheme} />
  }

  return (
    <Dashboard
      user={user}
      roleKey={finishedResult?.roleKey}
      result={finishedResult?.result}
      onLogout={handleLogout}
      onReplayWorkflow={() => setView('workflow')}
      theme={theme}
      onToggleTheme={toggleTheme}
    />
  )
}
