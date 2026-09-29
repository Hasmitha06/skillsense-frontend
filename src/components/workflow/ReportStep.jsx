import { useState } from 'react'
import StepShell from './StepShell'
import * as api from '../../api/client'

const files = [
  { kind: 'pdf', name: 'SkillSense_Performance_Report.pdf', label: 'PDF', color: 'bg-gap-soft text-gap' },
  { kind: 'excel', name: 'SkillSense_Skill_Matrix.xlsx', label: 'Excel', color: 'bg-mastery-soft text-mastery' },
]

export default function ReportStep({ result, roleKey, onBack, onFinish }) {
  const [downloading, setDownloading] = useState(null)
  const [error, setError] = useState('')

  async function handleDownload(kind) {
    setDownloading(kind)
    setError('')
    try {
      await api.downloadReport(kind, roleKey)
    } catch (err) {
      setError(err.message || 'Download failed.')
    } finally {
      setDownloading(null)
    }
  }

  return (
    <StepShell
      eyebrow="Step 12"
      title="Your AI-generated report is ready"
      subtitle="A complete snapshot of your skills, gaps, readiness and roadmap — ready to download."
      onBack={onBack}
      onNext={onFinish}
      nextLabel="Go to dashboard"
    >
      <div className="rounded-xl bg-gradient-to-br from-primary via-violet to-gap text-white p-6 mb-6 text-center">
        <p className="font-body text-sm text-white/70">Overall skill score</p>
        <p className="font-display text-6xl font-bold tabular">{result.overall_score}%</p>
      </div>

      {error && <p className="font-body text-sm text-gap mb-3">{error}</p>}

      <div className="space-y-2">
        {files.map((f) => (
          <div key={f.kind} className="flex items-center justify-between rounded-xl border border-line px-4 py-3">
            <div className="flex items-center gap-3">
              <span className={`font-body text-xs font-semibold rounded-full px-2 py-0.5 ${f.color}`}>{f.label}</span>
              <span className="font-body text-sm text-ink">{f.name}</span>
            </div>
            <button
              onClick={() => handleDownload(f.kind)}
              disabled={downloading === f.kind}
              className="font-body text-xs font-semibold text-primary hover:underline disabled:opacity-50"
            >
              {downloading === f.kind ? 'Downloading…' : 'Download'}
            </button>
          </div>
        ))}
      </div>
    </StepShell>
  )
}
