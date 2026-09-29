export default function StepShell({ eyebrow, title, subtitle, children, onBack, onNext, nextLabel = 'Continue', nextDisabled, hideBack }) {
  return (
    <div className="bg-surface border border-line rounded-2xl p-6 md:p-8 shadow-sm">
      {eyebrow && <p className="font-body text-sm font-semibold text-primary mb-1">{eyebrow}</p>}
      <h1 className="font-display text-2xl md:text-3xl font-semibold mb-2">{title}</h1>
      {subtitle && <p className="font-body text-sm text-ink/60 mb-6 max-w-xl">{subtitle}</p>}

      <div className="mb-8">{children}</div>

      <div className="flex items-center justify-between pt-5 border-t border-line">
        {!hideBack ? (
          <button
            onClick={onBack}
            className="font-body text-sm font-medium text-ink/50 hover:text-ink transition-colors"
          >
            ← Back
          </button>
        ) : (
          <span />
        )}
        {onNext && (
          <button
            onClick={onNext}
            disabled={nextDisabled}
            className="font-body text-sm font-semibold text-white bg-gradient-to-r from-primary to-violet rounded-full px-6 py-2.5 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            {nextLabel}
          </button>
        )}
      </div>
    </div>
  )
}
