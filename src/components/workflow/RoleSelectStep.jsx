import StepShell from './StepShell'

const ring = {
  primary: 'border-primary bg-primary-soft',
  sky: 'border-sky bg-sky-soft',
  violet: 'border-violet bg-violet-soft',
  accent: 'border-accent bg-accent-soft',
}
const dot = { primary: 'bg-primary', sky: 'bg-sky', violet: 'bg-violet', accent: 'bg-accent' }

export default function RoleSelectStep({ roles, error, selectedRole, setSelectedRole, onNext, onBack }) {
  return (
    <StepShell
      eyebrow="Step 2"
      title="Select your target role"
      subtitle="Your assessments, gap analysis and readiness score will be measured against this role."
      onBack={onBack}
      onNext={onNext}
      nextDisabled={!selectedRole}
    >
      {error && <p className="font-body text-sm text-gap mb-4">Couldn't load roles: {error}</p>}
      {!error && roles.length === 0 && <p className="font-body text-sm text-ink/50">Loading roles…</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {roles.map((role) => {
          const active = selectedRole === role.key
          return (
            <button
              key={role.key}
              onClick={() => setSelectedRole(role.key)}
              className={`text-left rounded-xl border-2 px-4 py-4 transition-all ${
                active ? ring[role.color] || ring.primary : 'border-line bg-surface hover:border-ink/20'
              }`}
            >
              <span className={`inline-block w-2.5 h-2.5 rounded-full mb-2 ${dot[role.color] || dot.primary}`} />
              <p className="font-body font-semibold text-sm text-ink">{role.name}</p>
              <p className="font-body text-xs text-ink/55 mt-1">{role.blurb}</p>
            </button>
          )
        })}
      </div>
    </StepShell>
  )
}
