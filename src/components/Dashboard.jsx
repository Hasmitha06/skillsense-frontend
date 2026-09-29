import { useEffect, useState } from 'react'
import ScoreHero from './ScoreHero'
import SkillGauge from './SkillGauge'
import StrengthsGaps from './StrengthsGaps'
import RecommendationCard from './RecommendationCard'
import ProgressChart from './ProgressChart'
import ThemeToggle from './ThemeToggle'
import * as api from '../api/client'

export default function Dashboard({ user, roleKey, result, onLogout, onReplayWorkflow, theme, onToggleTheme }) {
  const [roleName, setRoleName] = useState(roleKey)
  const [progress, setProgress] = useState([])

  useEffect(() => {
    if (!roleKey) return
    api.getRoles().then((roles) => {
      const r = roles.find((x) => x.key === roleKey)
      if (r) setRoleName(r.name)
    })
    api.getProgress(roleKey).then(setProgress).catch(() => {})
  }, [roleKey])

  if (!result) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <p className="font-body text-sm text-ink/60">No assessment yet — start a new assessment to see your dashboard.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-paper">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <header className="flex items-center justify-between mb-10 gap-4 flex-wrap">
          <p className="font-display text-xl font-semibold bg-gradient-to-r from-primary to-violet bg-clip-text text-transparent">
            SkillSense AI
          </p>
          <div className="flex items-center gap-3">
            <span className="font-body text-sm text-ink/60 hidden sm:inline">{user.name || user.email}</span>
            <button
              onClick={onReplayWorkflow}
              className="font-body text-sm font-semibold text-white bg-gradient-to-r from-primary to-violet rounded-full px-4 py-1.5 hover:opacity-90 transition-opacity"
            >
              New assessment
            </button>
            <button
              onClick={onLogout}
              className="font-body text-sm text-ink/60 border border-line bg-surface rounded-full px-3 py-1.5 hover:border-ink/30 transition-colors"
            >
              Log out
            </button>
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>
        </header>

        <ScoreHero role={roleName} score={result.overall_score} readiness={result.readiness} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <SkillGauge skills={result.skills} />
          </div>
          <RecommendationCard recommendation={result.recommendation} />
        </div>

        <div className="mb-6">
          <StrengthsGaps strengths={result.strengths} gaps={result.gaps} />
        </div>

        {progress.length > 0 && <ProgressChart progress={progress} />}
      </div>
    </div>
  )
}
