export default function SkillGauge({ skills }) {
  return (
    <div className="border border-line bg-surface rounded-2xl p-6 shadow-sm">
      <h2 className="font-display text-xl font-semibold mb-5">Skill breakdown</h2>
      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.name}>
            <div className="flex justify-between font-body text-sm mb-1">
              <span className="text-ink">{skill.name}</span>
              <span className="tabular text-ink/60">{skill.score}%</span>
            </div>
            <div className="h-2 bg-line/60 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  skill.score >= 70 ? 'bg-mastery' : skill.score >= 50 ? 'bg-accent' : 'bg-gap'
                }`}
                style={{ width: `${skill.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
