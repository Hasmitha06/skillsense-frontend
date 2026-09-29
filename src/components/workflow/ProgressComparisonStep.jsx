import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'
import StepShell from './StepShell'

export default function ProgressComparisonStep({ progress, onNext, onBack }) {
  return (
    <StepShell
      eyebrow="Step 11"
      title="Progress comparison"
      subtitle="Previous assessment vs. after your retest."
      onBack={onBack}
      onNext={onNext}
    >
      {progress.length === 0 ? (
        <p className="font-body text-sm text-ink/50">
          No comparison yet — this appears once you've submitted at least two assessments for this role
          (skip the retest step and come back later, or retake it now).
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={progress} barGap={6}>
            <CartesianGrid vertical={false} stroke="#E4E0FA" />
            <XAxis dataKey="topic" tickLine={false} axisLine={{ stroke: '#E4E0FA' }} tick={{ fontFamily: 'Inter', fontSize: 13, fill: '#1E1B4B' }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontFamily: 'Inter', fontSize: 12, fill: '#1E1B4B99' }} width={32} />
            <Tooltip contentStyle={{ fontFamily: 'Inter', fontSize: 13, border: '1px solid #E4E0FA', borderRadius: 8 }} />
            <Legend wrapperStyle={{ fontFamily: 'Inter', fontSize: 12 }} />
            <Bar dataKey="previous" name="Previous" fill="#E4E0FA" radius={[6, 6, 0, 0]} />
            <Bar dataKey="current" name="Current" fill="#6366F1" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </StepShell>
  )
}
