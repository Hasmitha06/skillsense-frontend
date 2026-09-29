import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'

export default function ProgressChart({ progress }) {
  return (
    <div className="border border-line bg-surface rounded-2xl p-6 shadow-sm">
      <h2 className="font-display text-xl font-semibold mb-1">Progress since last assessment</h2>
      <p className="font-body text-sm text-ink/60 mb-6">Previous attempt compared with the most recent one</p>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={progress} barGap={6}>
          <CartesianGrid vertical={false} stroke="#E4E0FA" />
          <XAxis
            dataKey="topic"
            tickLine={false}
            axisLine={{ stroke: '#E4E0FA' }}
            tick={{ fontFamily: 'Inter', fontSize: 14, fill: '#1E1B4B' }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontFamily: 'Inter', fontSize: 13, fill: '#1E1B4B99' }}
            width={32}
          />
          <Tooltip
            contentStyle={{ fontFamily: 'Inter', fontSize: 14, border: '1px solid #E4E0FA', borderRadius: 10 }}
          />
          <Legend wrapperStyle={{ fontFamily: 'Inter', fontSize: 13 }} />
          <Bar dataKey="previous" name="Previous" fill="#E4E0FA" radius={[6, 6, 0, 0]} />
          <Bar dataKey="current" name="Current" fill="#6366F1" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
