import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CheckCircle2, Circle, ShieldAlert, FileText } from 'lucide-react'
import Layout from '../components/layout/Layout'
import { Card, StatusBadge } from '../components/ui/Card'
import RiskGauge from '../components/ui/RiskGauge'
import { claims, getClaimById, claimTimeline } from '../data/mockData'

function ClaimList({ activeId, onSelect }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query) return claims
    const q = query.toLowerCase()
    return claims.filter(
      (c) => c.id.toLowerCase().includes(q) || c.claimant.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <Card padded={false} className="flex flex-col h-[calc(100vh-140px)]">
      <div className="p-4 border-b border-paper-200">
        <input
          type="text"
          placeholder="Filter by claim ID or claimant…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full text-sm border border-paper-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-steel-500/30"
        />
      </div>
      <div className="overflow-y-auto flex-1">
        {filtered.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={`w-full text-left px-4 py-3 border-b border-paper-100 transition-colors ${
              activeId === c.id ? 'bg-steel-600/[0.06] border-l-2 border-l-steel-600' : 'hover:bg-paper-50 border-l-2 border-l-transparent'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-ink-600">{c.id}</span>
              {c.flaggedForFraud && <ShieldAlert size={13} className="text-brick-500" />}
            </div>
            <div className="text-sm font-medium text-ink-900 mt-0.5">{c.claimant}</div>
            <div className="flex items-center justify-between mt-1.5">
              <StatusBadge status={c.status} />
              <span className="text-xs font-mono text-ink-400">${c.amount.toLocaleString()}</span>
            </div>
          </button>
        ))}
      </div>
    </Card>
  )
}

function Timeline({ claim }) {
  const events = claimTimeline(claim)
  return (
    <div className="relative pl-6">
      <div className="absolute left-[7px] top-1 bottom-1 w-px bg-paper-200" />
      {events.map((event, i) => (
        <div key={i} className="relative pb-6 last:pb-0">
          <div className="absolute -left-[24px] top-0.5">
            {event.done ? (
              <CheckCircle2 size={16} className="text-moss-600 bg-white" />
            ) : (
              <Circle size={16} className="text-ink-200 bg-white" />
            )}
          </div>
          <div className="text-sm font-medium text-ink-900">{event.label}</div>
          <div className="text-sm text-ink-400 mt-0.5">{event.detail}</div>
        </div>
      ))}
    </div>
  )
}

function ClaimDetailPanel({ claim }) {
  if (!claim) {
    return (
      <Card className="flex items-center justify-center h-[calc(100vh-140px)] text-ink-400 text-sm">
        Select a claim from the list to view its investigation record.
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm text-ink-400">{claim.id}</span>
              <StatusBadge status={claim.status} />
              {claim.flaggedForFraud && (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-brick-600 bg-brick-100 px-2 py-0.5 rounded-full">
                  <ShieldAlert size={12} /> Fraud review
                </span>
              )}
            </div>
            <h2 className="font-display text-xl font-semibold text-ink-900 mt-1.5">{claim.claimant}</h2>
            <p className="text-sm text-ink-400 mt-0.5">
              {claim.type} claim · {claim.region} region · Adjuster {claim.adjuster}
            </p>
          </div>
          <RiskGauge value={claim.riskScore} size={92} label="Risk score" />
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6 pt-5 border-t border-paper-100">
          <div>
            <div className="text-xs font-mono uppercase tracking-wide text-ink-400 mb-1">Claimed Amount</div>
            <div className="font-display text-lg font-semibold text-ink-900">${claim.amount.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-wide text-ink-400 mb-1">Days Open</div>
            <div className="font-display text-lg font-semibold text-ink-900">{claim.daysOpen}</div>
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-wide text-ink-400 mb-1">Severity</div>
            <div className="font-display text-lg font-semibold text-ink-900">{claim.severity} / 100</div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-display font-semibold text-ink-900 mb-4">Investigation Timeline</h3>
          <Timeline claim={claim} />
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-4">
            <FileText size={16} className="text-ink-600" />
            <h3 className="font-display font-semibold text-ink-900">Evidence & Documents</h3>
          </div>
          <ul className="space-y-2.5">
            {['Incident photos (4)', 'Police report', 'Repair estimate', 'Prior claim history'].map((doc) => (
              <li key={doc} className="flex items-center justify-between text-sm border border-paper-200 rounded-md px-3 py-2.5">
                <span className="text-ink-900">{doc}</span>
                <span className="text-xs font-mono text-ink-400">On file</span>
              </li>
            ))}
          </ul>

          <h3 className="font-display font-semibold text-ink-900 mt-6 mb-2">Adjuster Notes</h3>
          <p className="text-sm text-ink-600 leading-relaxed border border-paper-200 rounded-md px-3 py-2.5 bg-paper-50">
            {claim.flaggedForFraud
              ? 'Claim pattern flagged by anomaly detection — similar claim filed against a related policy within 90 days. Awaiting SIU review before proceeding.'
              : 'Documentation consistent with reported incident. No discrepancies found in initial review. Proceeding to standard verification.'}
          </p>
        </Card>
      </div>
    </div>
  )
}

export default function ClaimDetail() {
  const { claimId } = useParams()
  const navigate = useNavigate()
  const activeClaim = claimId ? getClaimById(claimId) : null

  return (
    <Layout title="Claim Investigation" subtitle="Search, review, and track individual claim records">
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        <ClaimList activeId={claimId} onSelect={(id) => navigate(`/claims/${id}`)} />
        <ClaimDetailPanel claim={activeClaim} />
      </div>
    </Layout>
  )
}
