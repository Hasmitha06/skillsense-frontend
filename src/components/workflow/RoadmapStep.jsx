import StepShell from './StepShell'

const palette = ['primary', 'violet', 'accent']
const bar = { primary: 'bg-primary', violet: 'bg-violet', accent: 'bg-accent' }
const soft = { primary: 'bg-primary-soft', violet: 'bg-violet-soft', accent: 'bg-accent-soft' }

export default function RoadmapStep({ result, onNext, onBack }) {
  const roadmap = result.roadmap

  return (
    <StepShell
      eyebrow="Step 9"
      title="Adaptive learning roadmap"
      subtitle="Updates automatically as you close gaps and retest."
      onBack={onBack}
      onNext={onNext}
    >
      <div className="grid sm:grid-cols-3 gap-4">
        {roadmap.map((phase, i) => {
          const color = palette[i % palette.length]
          return (
            <div key={phase.window} className={`rounded-xl p-4 ${soft[color]}`}>
              <span className={`inline-block w-2 h-2 rounded-full mb-2 ${bar[color]}`} />
              <p className="font-body font-semibold text-sm text-ink mb-2">{phase.window}</p>
              <ul className="space-y-1.5">
                {phase.goals.map((g) => (
                  <li key={g} className="font-body text-xs text-ink/70">
                    · {g}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </StepShell>
  )
}
