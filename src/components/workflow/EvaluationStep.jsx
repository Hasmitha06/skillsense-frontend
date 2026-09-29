import { useEffect, useRef, useState } from 'react'
import StepShell from './StepShell'

const stages = [
  'Scoring your answers',
  'Comparing against role benchmarks',
  'Detecting repeated mistake patterns',
  'Building your skill intelligence profile',
]

export default function EvaluationStep({ onSubmit, onNext }) {
  const [stageIndex, setStageIndex] = useState(0)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const onSubmitRef = useRef(onSubmit)
  onSubmitRef.current = onSubmit

  useEffect(() => {
    let cancelled = false
    async function run() {
      for (let i = 0; i < stages.length - 1; i++) {
        await new Promise((r) => setTimeout(r, 500))
        if (cancelled) return
        setStageIndex(i + 1)
      }
      try {
        await onSubmitRef.current()
        if (!cancelled) setDone(true)
      } catch (err) {
        if (!cancelled) setError(err.message || 'Evaluation failed.')
      }
    }
    run()
    return () => {
      cancelled = true
    }
    // Runs once per real mount. React StrictMode's dev-only double-invoke
    // (mount → cleanup → mount) is handled correctly by the `cancelled`
    // flag above: the first, throwaway run is cancelled before it can call
    // the API, and the second run completes normally.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <StepShell eyebrow="Step 4" title="AI evaluation in progress" hideBack onNext={done ? onNext : undefined} nextLabel="View results">
      <div className="rounded-xl border border-line bg-primary-soft/40 p-6">
        <div className="space-y-3">
          {stages.map((stage, i) => (
            <div key={stage} className="flex items-center gap-3">
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                  i < stageIndex || (i === stageIndex && done)
                    ? 'bg-mastery text-white'
                    : i === stageIndex
                    ? 'bg-primary text-white animate-pulse'
                    : 'bg-line text-transparent'
                }`}
              >
                {i < stageIndex || (i === stageIndex && done) ? '✓' : ''}
              </span>
              <p className={`font-body text-sm ${i <= stageIndex ? 'text-ink' : 'text-ink/35'}`}>{stage}</p>
            </div>
          ))}
        </div>
        {error && <p className="font-body text-sm text-gap mt-4">{error}</p>}
      </div>
    </StepShell>
  )
}
