export default function ScoreHero({ role, score, readiness }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-primary via-violet to-gap text-white p-8 mb-6 shadow-sm">
      <p className="font-body text-sm text-white/70 mb-2">
        Skill Intelligence Profile — target role: {role}
      </p>
      <div className="flex items-end gap-6 flex-wrap">
        <span className="font-display text-[72px] leading-none font-bold tabular">
          {score}
          <span className="text-3xl align-top text-white/50">%</span>
        </span>
        <div className="pb-3">
          <p className="font-body font-semibold text-white">{readiness.label}</p>
          <p className="font-body text-sm text-white/75 max-w-md mt-1">{readiness.note}</p>
        </div>
      </div>
    </div>
  )
}
