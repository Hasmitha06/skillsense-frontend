const colorMap = {
  primary: 'bg-primary text-white',
  violet: 'bg-violet text-white',
  sky: 'bg-sky text-white',
  accent: 'bg-accent text-white',
  mastery: 'bg-mastery text-white',
  gap: 'bg-gap text-white',
}

export default function StepperNav({ steps, activeIndex, furthestIndex, onJump }) {
  return (
    <div className="flex gap-1.5 overflow-x-auto pb-3 mb-8 -mx-1 px-1">
      {steps.map((step, i) => {
        const done = i < activeIndex
        const active = i === activeIndex
        const reachable = i <= furthestIndex
        const Icon = step.icon
        return (
          <button
            key={step.key}
            onClick={() => reachable && onJump(i)}
            disabled={!reachable}
            className={`flex items-center gap-2 shrink-0 rounded-full pl-1.5 pr-3.5 py-1.5 border transition-all
              ${active ? 'border-transparent shadow-sm ' + colorMap[step.color] : ''}
              ${!active && done ? 'border-line bg-surface text-ink/70' : ''}
              ${!active && !done ? 'border-line/70 bg-white/40 text-ink/35' : ''}
              ${reachable && !active ? 'hover:border-primary/40 cursor-pointer' : ''}
              ${!reachable ? 'cursor-not-allowed' : ''}
            `}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-body font-semibold
                ${active ? 'bg-white/25' : done ? colorMap[step.color] : 'bg-line text-ink/40'}`}
            >
              {Icon ? <Icon size={13} /> : i + 1}
            </span>
            <span className="font-body text-xs font-medium whitespace-nowrap">{step.label}</span>
          </button>
        )
      })}
    </div>
  )
}
