import StepShell from './StepShell'

export default function StrengthWeaknessStep({ result, onNext, onBack }) {
  const { skills, strengths } = result

  return (
    <StepShell
      eyebrow="Step 5"
      title="Strength & weakness analysis"
      subtitle="Topic-wise performance from your assessment, plus where you're demonstrably strong."
      onBack={onBack}
      onNext={onNext}
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <p className="font-body text-xs font-semibold text-ink/50 mb-3">TOPIC SCORES</p>
          <div className="space-y-3">
            {skills.map((s) => (
              <div key={s.name}>
                <div className="flex justify-between font-body text-sm mb-1">
                  <span>{s.name}</span>
                  <span className="tabular text-ink/60">{s.score}%</span>
                </div>
                <div className="h-2 bg-line/60 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      s.score >= 70 ? 'bg-mastery' : s.score >= 50 ? 'bg-accent' : 'bg-gap'
                    }`}
                    style={{ width: `${s.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="font-body text-xs font-semibold text-mastery mb-3">STRONG AREAS</p>
          <div className="space-y-3">
            {strengths.length === 0 && (
              <p className="font-body text-sm text-ink/50">No standout strengths this round — keep practicing.</p>
            )}
            {strengths.map((s) => (
              <div key={s.topic} className="rounded-xl border border-mastery/30 bg-mastery-soft/50 p-3">
                <p className="font-body text-sm font-semibold text-ink">{s.topic}</p>
                <p className="font-body text-xs text-ink/60 mt-0.5">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StepShell>
  )
}
