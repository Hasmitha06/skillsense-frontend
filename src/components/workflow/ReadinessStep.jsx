import StepShell from './StepShell'

export default function ReadinessStep({ result, role, onNext, onBack }) {
  const { score, threshold, label, note } = result.readiness

  return (
    <StepShell
      eyebrow="Step 7"
      title="Career readiness analysis"
      subtitle={`How your demonstrated skills compare to the bar for ${role ? role.name : 'your selected role'}.`}
      onBack={onBack}
      onNext={onNext}
    >
      <div className="rounded-xl bg-gradient-to-br from-primary to-violet text-white p-6 mb-5">
        <p className="font-body text-sm text-white/70 mb-1">Readiness score</p>
        <div className="flex items-end gap-3">
          <span className="font-display text-5xl font-bold tabular">{score}%</span>
          <span className="font-body text-sm text-white/80 pb-2">{label}</span>
        </div>
        <div className="h-2 bg-white/25 rounded-full mt-4 overflow-hidden relative">
          <div className="h-full bg-white rounded-full" style={{ width: `${score}%` }} />
          <div
            className="absolute top-[-4px] w-0.5 h-4 bg-accent"
            style={{ left: `${threshold}%` }}
            title={`Threshold: ${threshold}%`}
          />
        </div>
        <p className="font-body text-xs text-white/70 mt-2">Role threshold: {threshold}%</p>
      </div>
      <p className="font-body text-sm text-ink/70">{note}</p>
    </StepShell>
  )
}
