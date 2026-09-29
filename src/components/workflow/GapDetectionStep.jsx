import StepShell from './StepShell'

export default function GapDetectionStep({ result, onNext, onBack }) {
  const { gaps } = result

  return (
    <StepShell
      eyebrow="Step 6"
      title="Knowledge gap detection"
      subtitle="Not just wrong answers — the AI looks for patterns behind repeated mistakes."
      onBack={onBack}
      onNext={onNext}
    >
      {gaps.length === 0 && (
        <p className="font-body text-sm text-ink/50">No significant gaps detected this round.</p>
      )}
      <div className="space-y-3">
        {gaps.map((g) => (
          <div key={g.topic} className="rounded-xl border border-gap/30 bg-gap-soft/40 p-4 flex items-start gap-3">
            <span
              className={`mt-0.5 shrink-0 font-body text-xs font-semibold rounded-full px-2 py-0.5 ${
                g.severity === 'high' ? 'bg-gap text-white' : 'bg-accent text-white'
              }`}
            >
              {g.severity === 'high' ? 'High priority' : 'Medium'}
            </span>
            <div>
              <p className="font-body text-sm font-semibold text-ink">{g.topic}</p>
              <p className="font-body text-xs text-ink/60 mt-0.5">{g.pattern}</p>
            </div>
          </div>
        ))}
      </div>
    </StepShell>
  )
}
