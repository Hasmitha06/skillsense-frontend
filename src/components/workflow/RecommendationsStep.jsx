import StepShell from './StepShell'

export default function RecommendationsStep({ result, onNext, onBack }) {
  const { headline, detail, actions } = result.recommendation

  return (
    <StepShell
      eyebrow="Step 8"
      title="Personalized recommendations"
      subtitle="Prioritized by how much each area is likely to move your overall readiness."
      onBack={onBack}
      onNext={onNext}
    >
      <div className="rounded-xl bg-[#181626] text-white p-6">
        <h3 className="font-display text-xl font-semibold mb-2">{headline}</h3>
        <p className="font-body text-sm text-white/70 mb-5">{detail}</p>
        <ul className="space-y-2 border-t border-white/15 pt-4">
          {actions.map((a) => (
            <li key={a} className="font-body text-sm text-white/90 flex gap-2">
              <span className="text-accent">●</span>
              {a}
            </li>
          ))}
        </ul>
      </div>
    </StepShell>
  )
}
