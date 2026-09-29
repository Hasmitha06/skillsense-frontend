export default function StrengthsGaps({ strengths, gaps }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="border border-mastery/30 bg-mastery-soft/40 rounded-2xl p-5 shadow-sm">
        <h3 className="font-body font-semibold text-mastery mb-3">Strong areas</h3>
        {strengths.length === 0 && <p className="font-body text-sm text-ink/50">None yet — keep practicing.</p>}
        <ul className="space-y-2">
          {strengths.map((item) => (
            <li key={item.topic} className="font-body text-sm text-ink flex gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-mastery mt-1.5 shrink-0" />
              <span>
                <span className="font-medium">{item.topic}</span>
                {item.detail && <span className="text-ink/60"> — {item.detail}</span>}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="border border-gap/30 bg-gap-soft/40 rounded-2xl p-5 shadow-sm">
        <h3 className="font-body font-semibold text-gap mb-3">Knowledge gaps</h3>
        {gaps.length === 0 && <p className="font-body text-sm text-ink/50">No significant gaps detected.</p>}
        <ul className="space-y-2">
          {gaps.map((item) => (
            <li key={item.topic} className="font-body text-sm text-ink flex gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gap mt-1.5 shrink-0" />
              <span>
                <span className="font-medium">{item.topic}</span>
                {item.pattern && <span className="text-ink/60"> — {item.pattern}</span>}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
