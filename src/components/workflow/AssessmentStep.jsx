import StepShell from './StepShell'

export default function AssessmentStep({ questions, error, answers, setAnswers, onNext, onBack }) {
  const answeredCount = Object.keys(answers).length

  return (
    <StepShell
      eyebrow="Step 3"
      title="Skill assessment"
      subtitle="A short adaptive mock exam covering the topics for your target role."
      onBack={onBack}
      onNext={onNext}
      nextLabel="Submit for AI evaluation"
      nextDisabled={questions.length === 0 || answeredCount < questions.length}
    >
      {error && <p className="font-body text-sm text-gap mb-4">Couldn't load questions: {error}</p>}
      {!error && questions.length === 0 && <p className="font-body text-sm text-ink/50">Loading questions…</p>}

      <div className="space-y-5">
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
      {questions.length > 0 && (
        <p className="font-body text-xs text-ink/40 mt-4">{answeredCount} of {questions.length} answered</p>
      )}
    </StepShell>
  )
}
