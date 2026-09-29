import StepShell from './StepShell'

export default function ProfileStep({ user, onNext }) {
  const fields = [
    { label: 'Name', value: user.name || 'Not set' },
    { label: 'Email', value: user.email },
    { label: 'Education', value: 'B.Tech, Computer Science' },
    { label: 'Experience level', value: 'Fresher' },
  ]

  return (
    <StepShell
      eyebrow="Step 1"
      title="Confirm your profile"
      subtitle="This helps SkillSense AI tailor assessments and recommendations to where you're starting from."
      onNext={onNext}
      hideBack
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((f) => (
          <div key={f.label} className="rounded-xl bg-primary-soft/50 border border-line px-4 py-3">
            <p className="font-body text-xs text-ink/50 mb-0.5">{f.label}</p>
            <p className="font-body text-sm font-medium text-ink">{f.value}</p>
          </div>
        ))}
      </div>
    </StepShell>
  )
}
