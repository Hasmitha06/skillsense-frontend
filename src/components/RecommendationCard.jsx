export default function RecommendationCard({ recommendation }) {
  return (
    <div className="bg-[#181626] text-white rounded-2xl p-6 shadow-sm">
      <p className="font-body text-sm text-white/60 mb-2">AI recommendation</p>
      <h3 className="font-display text-2xl font-semibold leading-snug mb-3">{recommendation.headline}</h3>
      <p className="font-body text-sm text-white/70 mb-5">{recommendation.detail}</p>
      <ul className="space-y-2 border-t border-white/15 pt-4">
        {recommendation.actions.map((action) => (
          <li key={action} className="font-body text-sm text-white/90 flex gap-2">
            <span className="text-accent">●</span>
            {action}
          </li>
        ))}
      </ul>
    </div>
  )
}
