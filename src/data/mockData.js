// Mock data layer. In a real system this would be replaced by API calls.
// Kept centralized so every dashboard reads from the same source of truth.

export const claimTypes = ['Auto', 'Property', 'Health', 'Liability', 'Marine']
export const claimStatuses = ['New', 'Under Review', 'Investigating', 'Approved', 'Denied', 'Settled']

const adjusters = ['R. Okafor', 'M. Chen', 'S. Bianchi', 'T. Aldous', 'P. Verma', 'L. Novak']
const regions = ['Northeast', 'Southeast', 'Midwest', 'Southwest', 'Pacific']

function seededRandom(seed) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

const rand = seededRandom(42)

function pick(arr) {
  return arr[Math.floor(rand() * arr.length)]
}

function generateClaimId(i) {
  return `CLM-${(2026000 + i).toString()}`
}

export const claims = Array.from({ length: 48 }).map((_, i) => {
  const severity = Math.round(rand() * 100)
  const amount = Math.round(2000 + rand() * 48000)
  const daysOpen = Math.round(rand() * 45)
  return {
    id: generateClaimId(i),
    type: pick(claimTypes),
    status: pick(claimStatuses),
    claimant: pick([
      'A. Fernandez', 'J. Whitfield', 'K. Osei', 'D. Mercer', 'N. Tanaka',
      'B. Holloway', 'C. Reyes', 'E. Sorensen', 'F. Kowalski', 'G. Adeyemi'
    ]),
    adjuster: pick(adjusters),
    region: pick(regions),
    severity,
    amount,
    daysOpen,
    riskScore: Math.round(rand() * 100),
    flaggedForFraud: rand() > 0.88,
    filedDate: new Date(2026, 5, 1 + Math.floor(rand() * 38)).toISOString()
  }
})

export const claimsRequiringAttention = claims
  .filter((c) => c.flaggedForFraud || c.severity > 75 || c.daysOpen > 30)
  .slice(0, 8)

export const kpis = {
  openClaims: claims.filter((c) => !['Settled', 'Denied'].includes(c.status)).length,
  avgSettlementDays: 18.4,
  lossRatio: 0.62,
  fraudFlags: claims.filter((c) => c.flaggedForFraud).length
}

export const claimsVolumeTrend = [
  { month: 'Feb', filed: 132, settled: 118 },
  { month: 'Mar', filed: 145, settled: 129 },
  { month: 'Apr', filed: 158, settled: 141 },
  { month: 'May', filed: 149, settled: 152 },
  { month: 'Jun', filed: 171, settled: 149 },
  { month: 'Jul', filed: 163, settled: 158 }
]

export const severityBreakdown = [
  { band: 'Low (0–30)', count: claims.filter((c) => c.severity <= 30).length, color: '#3F6E52' },
  { band: 'Moderate (31–60)', count: claims.filter((c) => c.severity > 30 && c.severity <= 60).length, color: '#C88A2E' },
  { band: 'High (61–85)', count: claims.filter((c) => c.severity > 60 && c.severity <= 85).length, color: '#B5482B' },
  { band: 'Critical (86–100)', count: claims.filter((c) => c.severity > 85).length, color: '#9E3D22' }
]

export const premiumClaimsRatio = [
  { quarter: 'Q3 \'25', premium: 4.2, claims: 2.6 },
  { quarter: 'Q4 \'25', premium: 4.4, claims: 2.9 },
  { quarter: 'Q1 \'26', premium: 4.6, claims: 3.4 },
  { quarter: 'Q2 \'26', premium: 4.9, claims: 3.0 },
  { quarter: 'Q3 \'26', premium: 5.1, claims: 3.3 }
]

export const regionConcentration = regions.map((r) => ({
  region: r,
  policies: Math.round(800 + rand() * 2200),
  riskIndex: Math.round(30 + rand() * 60)
}))

export const renewalPipeline = [
  { window: 'Next 30 days', count: 214, atRisk: 31 },
  { window: '31–60 days', count: 268, atRisk: 22 },
  { window: '61–90 days', count: 192, atRisk: 14 }
]

export function getClaimById(id) {
  return claims.find((c) => c.id === id)
}

export const claimTimeline = (claim) => ([
  { label: 'Claim filed', detail: `Submitted by ${claim.claimant} via mobile intake`, date: claim.filedDate, done: true },
  { label: 'Initial review', detail: `Assigned to adjuster ${claim.adjuster}`, date: claim.filedDate, done: true },
  { label: 'Evidence collected', detail: 'Photos, police report, and repair estimate uploaded', date: claim.filedDate, done: claim.daysOpen > 3 },
  { label: 'Investigation', detail: claim.flaggedForFraud ? 'Escalated for fraud review — pattern match on prior claims' : 'Standard verification in progress', date: claim.filedDate, done: claim.daysOpen > 10 },
  { label: 'Decision', detail: claim.status === 'Approved' || claim.status === 'Settled' ? 'Claim approved for payout' : claim.status === 'Denied' ? 'Claim denied — insufficient coverage match' : 'Pending adjuster decision', date: claim.filedDate, done: ['Approved', 'Denied', 'Settled'].includes(claim.status) },
  { label: 'Payout issued', detail: claim.status === 'Settled' ? `Payout of $${claim.amount.toLocaleString()} disbursed` : 'Awaiting decision', date: claim.filedDate, done: claim.status === 'Settled' }
])
