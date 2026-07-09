// Signature visual element of the portal — a radial risk gauge.
// Reused across the Overview, Claim Detail, and Portfolio pages so risk
// is always represented the same way, regardless of context.

function toneFor(value) {
  if (value >= 75) return { stroke: '#9E3D22', label: 'Critical' }
  if (value >= 50) return { stroke: '#B5482B', label: 'High' }
  if (value >= 25) return { stroke: '#C88A2E', label: 'Moderate' }
  return { stroke: '#3F6E52', label: 'Low' }
}

export default function RiskGauge({ value, size = 96, label, showLabel = true }) {
  const tone = toneFor(value)
  const stroke = 8
  const radius = (size - stroke) / 2
  const circumference = Math.PI * radius * 1.5 // 270-degree arc
  const offset = circumference * (1 - value / 100)

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-[135deg]">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#E2E5EB"
            strokeWidth={stroke}
            strokeDasharray={`${circumference} ${2 * Math.PI * radius}`}
            strokeLinecap="round"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={tone.stroke}
            strokeWidth={stroke}
            strokeDasharray={`${circumference} ${2 * Math.PI * radius}`}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.6s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display font-semibold text-ink-900" style={{ fontSize: size * 0.26 }}>
            {value}
          </span>
        </div>
      </div>
      {showLabel && (
        <div className="text-center">
          <div className="text-xs font-mono uppercase tracking-wide" style={{ color: tone.stroke }}>
            {tone.label}
          </div>
          {label && <div className="text-xs text-ink-400">{label}</div>}
        </div>
      )}
    </div>
  )
}
