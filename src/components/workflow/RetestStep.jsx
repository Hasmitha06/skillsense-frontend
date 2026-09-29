import { useState } from 'react'
import StepShell from './StepShell'
import * as api from '../../api/client'

export default function RetestStep({ roleKey, questions, previousAnswers, onRetested, onRefreshProgress, onNext, onBack }) {
  const [answers, setAnswers] = useState(previousAnswers)
  const [retested, setRetested] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const answeredCount = Object.keys(answers).length

  async function handleRetest() {
    setSubmitting(true)
    setError('')
    try {
      const numericAnswers = Object.fromEntries(Object.entries(answers).map(([k, v]) => [Number(k), v]))
      const newResult = await api.submitAssessment(roleKey, numericAnswers)
      await onRefreshProgress()
      onRetested(answers, newResult)
      setRetested(true)
    } catch (err) {
      setError(err.message || 'Retest failed.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <StepShell
      eyebrow="Step 10"
      title="Retest"
      subtitle="Review your answers below — change anything you've since learned, then submit for a fresh evaluation."
      onBack={onBack}
      onNext={onNext}
      nextLabel={retested ? 'Continue' : 'Skip for now'}
    >
      {!retested ? (
        <>
          <div className="space-y-5 mb-5">
            {questions.map((q, i) => (
              <div key={q.id} className="rounded-xl border border-line p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-body text-xs font-semibold text-primary bg-primary-soft rounded-full px-2 py-0.5">
                    {q.topic}
                  </span>
                  <span className="font-body text-xs text-ink/40">Question {i + 1} of {questions.length}</span>
                </div>
                <p className="font-body text-sm font-medium text-ink mb-3">{q.prompt}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt, oi) => {
                    const selected = answers[q.id] === oi
                    return (
                      <button
                        key={opt}
                        onClick={() => setAnswers({ ...answers, [q.id]: oi })}
                        className={`text-left font-body text-sm rounded-lg border px-3 py-2 transition-colors ${
                          selected
                            ? 'border-primary bg-primary-soft text-primary-dark font-medium'
                            : 'border-line hover:border-ink/25'
                        }`}
                      >
                        {opt}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
          {error && <p className="font-body text-sm text-gap mb-3">{error}</p>}
          <div className="rounded-xl border border-line p-4 text-center">
            <button
              onClick={handleRetest}
              disabled={submitting || answeredCount < questions.length}
              className="font-body text-sm font-semibold text-white bg-gradient-to-r from-mastery to-sky rounded-full px-6 py-2.5 disabled:opacity-50"
            >
              {submitting ? 'Submitting…' : 'Submit retest'}
            </button>
          </div>
        </>
      ) : (
        <div className="rounded-xl border border-line p-6 text-center">
          <p className="font-display text-lg font-semibold text-mastery mb-1">Retest complete</p>
          <p className="font-body text-sm text-ink/60">
            Your profile has been updated with the new scores — see the comparison on the next step.
          </p>
        </div>
      )}
    </StepShell>
  )
}
