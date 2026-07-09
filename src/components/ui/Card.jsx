export function Card({ children, className = '', padded = true }) {
  return (
    <div className={`bg-white border border-paper-200 rounded-lg shadow-panel ${padded ? 'p-5' : ''} ${className}`}>
      {children}
    </div>
  )
}

const statusStyles = {
  New: 'bg-steel-500/10 text-steel-600',
  'Under Review': 'bg-gold-100 text-gold-600',
  Investigating: 'bg-brick-100 text-brick-600',
  Approved: 'bg-moss-100 text-moss-600',
  Denied: 'bg-ink-100 text-ink-600',
  Settled: 'bg-moss-100 text-moss-600'
}

export function StatusBadge({ status }) {
  const style = statusStyles[status] || 'bg-paper-200 text-ink-600'
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${style}`}>
      {status}
    </span>
  )
}

export function KpiStat({ label, value, delta, deltaTone = 'neutral', suffix = '' }) {
  const toneColor =
    deltaTone === 'up' ? 'text-moss-600' : deltaTone === 'down' ? 'text-brick-600' : 'text-ink-400'
  return (
    <div>
      <div className="text-xs font-mono uppercase tracking-wide text-ink-400 mb-2">{label}</div>
      <div className="flex items-baseline gap-2">
        <span className="font-display text-3xl font-semibold text-ink-900">{value}</span>
        {suffix && <span className="text-sm text-ink-400">{suffix}</span>}
      </div>
      {delta && <div className={`text-xs mt-1 font-mono ${toneColor}`}>{delta}</div>}
    </div>
  )
}
