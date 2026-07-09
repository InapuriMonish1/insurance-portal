import { TrendingUp, Users } from 'lucide-react'
import Layout from '../components/layout/Layout'
import { Card, KpiStat } from '../components/ui/Card'
import RiskGauge from '../components/ui/RiskGauge'
import PremiumClaimsRatioChart from '../charts/PremiumClaimsRatioChart'
import GeoConcentrationChart from '../charts/GeoConcentrationChart'
import { regionConcentration, renewalPipeline } from '../data/mockData'

const portfolioRiskScore = Math.round(
  regionConcentration.reduce((sum, r) => sum + r.riskIndex, 0) / regionConcentration.length
)

export default function PortfolioAnalytics() {
  return (
    <Layout title="Portfolio & Risk Analytics" subtitle="Aggregate view across the active policy book">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <Card className="lg:col-span-1 flex flex-col items-center justify-center">
          <RiskGauge value={portfolioRiskScore} size={120} label="Portfolio-wide" />
        </Card>

        <div className="lg:col-span-3 grid grid-cols-2 gap-4">
          <Card>
            <KpiStat label="Active Policies" value="9,842" delta="↑ 2.1% this quarter" deltaTone="up" />
          </Card>
          <Card>
            <KpiStat label="Gross Written Premium" value="$5.1M" delta="This quarter" deltaTone="neutral" />
          </Card>
          <Card>
            <KpiStat label="Combined Ratio" value="94.2%" suffix="%" delta="Below breakeven" deltaTone="up" />
          </Card>
          <Card>
            <KpiStat label="At-Risk Renewals" value="67" delta="Across next 90 days" deltaTone="down" />
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={16} className="text-steel-600" />
            <h3 className="font-display font-semibold text-ink-900">Premium vs. Claims Paid</h3>
          </div>
          <p className="text-sm text-ink-400 mb-2">Trailing five quarters, in millions</p>
          <PremiumClaimsRatioChart />
        </Card>

        <Card>
          <h3 className="font-display font-semibold text-ink-900 mb-1">Renewal Pipeline</h3>
          <p className="text-sm text-ink-400 mb-4">Upcoming renewals and retention risk</p>
          <div className="space-y-4">
            {renewalPipeline.map((row) => (
              <div key={row.window}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-ink-900 font-medium">{row.window}</span>
                  <span className="font-mono text-ink-400">{row.count}</span>
                </div>
                <div className="w-full h-2 bg-paper-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-steel-600 rounded-full"
                    style={{ width: `${100 - (row.atRisk / row.count) * 100}%` }}
                  />
                </div>
                <div className="text-xs font-mono text-brick-500 mt-1">{row.atRisk} flagged at-risk</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center gap-2 mb-1">
          <Users size={16} className="text-steel-600" />
          <h3 className="font-display font-semibold text-ink-900">Regional Risk Concentration</h3>
        </div>
        <p className="text-sm text-ink-400 mb-2">Active policy volume by region, colored by relative risk index</p>
        <GeoConcentrationChart />
        <div className="flex items-center gap-5 mt-3 text-xs font-mono text-ink-400">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-moss-500" /> Low risk</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-gold-500" /> Moderate</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-brick-500" /> High</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-brick-600" /> Critical</span>
        </div>
      </Card>
    </Layout>
  )
}
