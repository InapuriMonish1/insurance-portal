import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import Layout from '../components/layout/Layout'
import { Card, KpiStat, StatusBadge } from '../components/ui/Card'
import RiskGauge from '../components/ui/RiskGauge'
import ClaimsVolumeChart from '../charts/ClaimsVolumeChart'
import SeverityBreakdownChart from '../charts/SeverityBreakdownChart'
import { kpis, claimsRequiringAttention, claims, claimStatuses } from '../data/mockData'

export default function ClaimsOverview() {
  const navigate = useNavigate()
  const [statusFilter, setStatusFilter] = useState('All')

  const filteredQueue =
    statusFilter === 'All'
      ? claimsRequiringAttention
      : claimsRequiringAttention.filter((c) => c.status === statusFilter)

  return (
    <Layout title="Claims Overview" subtitle="Live operational snapshot across all active claims">
      {/* KPI strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <KpiStat label="Open Claims" value={kpis.openClaims} delta="↑ 4.2% vs last month" deltaTone="down" />
        </Card>
        <Card>
          <KpiStat label="Avg Settlement Time" value={kpis.avgSettlementDays} suffix="days" delta="↓ 1.3 days vs last month" deltaTone="up" />
        </Card>
        <Card>
          <KpiStat label="Loss Ratio" value={`${(kpis.lossRatio * 100).toFixed(0)}%`} delta="Within target band" deltaTone="neutral" />
        </Card>
        <Card>
          <KpiStat label="Fraud Flags" value={kpis.fraudFlags} delta="Requires review" deltaTone="down" />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Volume trend */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-display font-semibold text-ink-900">Claims Volume</h3>
            <div className="flex items-center gap-4 text-xs text-ink-400 font-mono">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-steel-600" /> Filed</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-moss-500" /> Settled</span>
            </div>
          </div>
          <p className="text-sm text-ink-400 mb-2">Monthly filed vs. settled, last 6 months</p>
          <ClaimsVolumeChart />
        </Card>

        {/* Severity breakdown */}
        <Card>
          <h3 className="font-display font-semibold text-ink-900 mb-1">Severity Breakdown</h3>
          <p className="text-sm text-ink-400 mb-2">Active claims by severity band</p>
          <SeverityBreakdownChart />
        </Card>
      </div>

      {/* Attention queue */}
      <Card padded={false}>
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div className="flex items-center gap-2">
            <AlertTriangle size={17} className="text-brick-500" />
            <h3 className="font-display font-semibold text-ink-900">Requires Attention</h3>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-sm border border-paper-200 rounded-md px-2.5 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-steel-500/30"
          >
            <option value="All">All statuses</option>
            {claimStatuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-y border-paper-200 text-left text-xs font-mono uppercase tracking-wide text-ink-400">
                <th className="px-5 py-2.5 font-medium">Claim ID</th>
                <th className="px-5 py-2.5 font-medium">Claimant</th>
                <th className="px-5 py-2.5 font-medium">Type</th>
                <th className="px-5 py-2.5 font-medium">Status</th>
                <th className="px-5 py-2.5 font-medium">Adjuster</th>
                <th className="px-5 py-2.5 font-medium text-right">Amount</th>
                <th className="px-5 py-2.5 font-medium text-right">Days Open</th>
                <th className="px-5 py-2.5 font-medium text-right">Risk</th>
              </tr>
            </thead>
            <tbody>
              {filteredQueue.map((claim) => (
                <tr
                  key={claim.id}
                  onClick={() => navigate(`/claims/${claim.id}`)}
                  className="border-b border-paper-100 last:border-0 hover:bg-paper-50 cursor-pointer transition-colors"
                >
                  <td className="px-5 py-3 font-mono text-ink-600">{claim.id}</td>
                  <td className="px-5 py-3 text-ink-900">{claim.claimant}</td>
                  <td className="px-5 py-3 text-ink-600">{claim.type}</td>
                  <td className="px-5 py-3"><StatusBadge status={claim.status} /></td>
                  <td className="px-5 py-3 text-ink-600">{claim.adjuster}</td>
                  <td className="px-5 py-3 text-right font-mono text-ink-900">${claim.amount.toLocaleString()}</td>
                  <td className="px-5 py-3 text-right font-mono text-ink-600">
                    <span className="inline-flex items-center gap-1">
                      {claim.daysOpen > 30 ? (
                        <ArrowUpRight size={12} className="text-brick-500" />
                      ) : (
                        <ArrowDownRight size={12} className="text-moss-500" />
                      )}
                      {claim.daysOpen}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <span
                      className="inline-block px-2 py-0.5 rounded font-mono text-xs"
                      style={{
                        color: claim.riskScore >= 75 ? '#9E3D22' : claim.riskScore >= 50 ? '#B5482B' : '#3F6E52',
                        backgroundColor: claim.riskScore >= 75 ? '#F3DCD3' : claim.riskScore >= 50 ? '#F3DCD3' : '#DCE8DF'
                      }}
                    >
                      {claim.riskScore}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredQueue.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-8 text-center text-ink-400 text-sm">
                    No claims match this filter right now.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </Layout>
  )
}
