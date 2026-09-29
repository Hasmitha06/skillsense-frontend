import { useEffect, useState } from 'react'
import { User, Target, ClipboardList, Sparkles, TrendingUp, Search, Award, Lightbulb, Map, RotateCcw, BarChart3, FileText } from 'lucide-react'
import StepperNav from './StepperNav'
import ThemeToggle from '../ThemeToggle'
import ProfileStep from './ProfileStep'
import RoleSelectStep from './RoleSelectStep'
import AssessmentStep from './AssessmentStep'
import EvaluationStep from './EvaluationStep'
import StrengthWeaknessStep from './StrengthWeaknessStep'
import GapDetectionStep from './GapDetectionStep'
import ReadinessStep from './ReadinessStep'
import RecommendationsStep from './RecommendationsStep'
import RoadmapStep from './RoadmapStep'
import RetestStep from './RetestStep'
import ProgressComparisonStep from './ProgressComparisonStep'
import ReportStep from './ReportStep'
import * as api from '../../api/client'

const steps = [
  { key: 'profile', label: 'User Profile', icon: User, color: 'primary' },
  { key: 'role', label: 'Target Role', icon: Target, color: 'violet' },
  { key: 'assessment', label: 'Skill Assessment', icon: ClipboardList, color: 'sky' },
  { key: 'evaluation', label: 'AI Evaluation', icon: Sparkles, color: 'accent' },
  { key: 'strengths', label: 'Strengths & Weaknesses', icon: TrendingUp, color: 'mastery' },
  { key: 'gaps', label: 'Knowledge Gaps', icon: Search, color: 'gap' },
  { key: 'readiness', label: 'Career Readiness', icon: Award, color: 'primary' },
  { key: 'recommendations', label: 'Recommendations', icon: Lightbulb, color: 'violet' },
  { key: 'roadmap', label: 'Learning Roadmap', icon: Map, color: 'accent' },
  { key: 'retest', label: 'Retest', icon: RotateCcw, color: 'sky' },
  { key: 'progress', label: 'Progress Comparison', icon: BarChart3, color: 'mastery' },
  { key: 'report', label: 'AI Report', icon: FileText, color: 'gap' },
]

export default function Workflow({ user, onFinish, theme, onToggleTheme }) {
  const [index, setIndex] = useState(0)
  const [furthest, setFurthest] = useState(0)

  const [roles, setRoles] = useState([])
  const [rolesError, setRolesError] = useState('')
  const [selectedRole, setSelectedRole] = useState(user.target_role_key || null)

  const [questions, setQuestions] = useState([])
  const [questionsError, setQuestionsError] = useState('')
  const [answers, setAnswers] = useState({})

  const [result, setResult] = useState(null) // latest AssessmentResult from the backend
  const [progress, setProgress] = useState([])

  // Load roles once
  useEffect(() => {
    api.getRoles().then(setRoles).catch((e) => setRolesError(e.message))
  }, [])

  // Load questions whenever the selected role changes
  useEffect(() => {
    if (!selectedRole) return
    setQuestions([])
    setAnswers({})
    api.getQuestions(selectedRole).then(setQuestions).catch((e) => setQuestionsError(e.message))
  }, [selectedRole])

  function goTo(i) {
    setIndex(i)
    setFurthest((f) => Math.max(f, i))
  }
  const next = () => goTo(Math.min(index + 1, steps.length - 1))
  const back = () => goTo(Math.max(index - 1, 0))

  async function submitCurrentAnswers() {
    const numericAnswers = Object.fromEntries(Object.entries(answers).map(([k, v]) => [Number(k), v]))
    const res = await api.submitAssessment(selectedRole, numericAnswers)
    setResult(res)
    return res
  }

  async function refreshProgress() {
    const p = await api.getProgress(selectedRole)
    setProgress(p)
  }

  const role = roles.find((r) => r.key === selectedRole)
  const stepProps = { onNext: next, onBack: back }

  return (
    <div className="min-h-screen bg-paper">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <header className="flex items-center justify-between mb-6 gap-4">
          <p className="font-display text-xl font-semibold bg-gradient-to-r from-primary to-violet bg-clip-text text-transparent">
            SkillSense AI
          </p>
          <div className="flex items-center gap-3">
            <span className="font-body text-sm text-ink/50 hidden sm:inline">{user.name || user.email}</span>
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>
        </header>

        <StepperNav steps={steps} activeIndex={index} furthestIndex={furthest} onJump={goTo} />

        {index === 0 && <ProfileStep user={user} onNext={next} />}

        {index === 1 && (
          <RoleSelectStep
            roles={roles}
            error={rolesError}
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
            {...stepProps}
          />
        )}

        {index === 2 && (
          <AssessmentStep
            questions={questions}
            error={questionsError}
            answers={answers}
            setAnswers={setAnswers}
            onBack={back}
            onNext={next}
          />
        )}

        {index === 3 && <EvaluationStep onSubmit={submitCurrentAnswers} onNext={next} />}

        {index === 4 && result && <StrengthWeaknessStep result={result} {...stepProps} />}
        {index === 5 && result && <GapDetectionStep result={result} {...stepProps} />}
        {index === 6 && result && role && <ReadinessStep result={result} role={role} {...stepProps} />}
        {index === 7 && result && <RecommendationsStep result={result} {...stepProps} />}
        {index === 8 && result && <RoadmapStep result={result} {...stepProps} />}

        {index === 9 && (
          <RetestStep
            roleKey={selectedRole}
            questions={questions}
            previousAnswers={answers}
            onRetested={(newAnswers, newResult) => {
              setAnswers(newAnswers)
              setResult(newResult)
            }}
            onRefreshProgress={refreshProgress}
            {...stepProps}
          />
        )}

        {index === 10 && <ProgressComparisonStep progress={progress} {...stepProps} />}

        {index === 11 && result && (
          <ReportStep
            result={result}
            roleKey={selectedRole}
            onBack={back}
            onFinish={() => onFinish(selectedRole, result)}
          />
        )}
      </div>
    </div>
  )
}
