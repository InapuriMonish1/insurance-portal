import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { premiumClaimsRatio } from '../data/mockData'

export default function PremiumClaimsRatioChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <ComposedChart data={premiumClaimsRatio} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E5EB" vertical={false} />
        <XAxis dataKey="quarter" tick={{ fontSize: 12, fill: '#5C7391' }} axisLine={{ stroke: '#E2E5EB' }} tickLine={false} />
        <YAxis
          tick={{ fontSize: 12, fill: '#5C7391' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `$${v}M`}
        />
        <Tooltip
          contentStyle={{ borderRadius: 8, borderColor: '#E2E5EB', fontSize: 13 }}
          formatter={(v) => `$${v}M`}
        />
        <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
        <Bar dataKey="premium" fill="#1F3A5F" radius={[4, 4, 0, 0]} barSize={28} name="Premium written" />
        <Line type="monotone" dataKey="claims" stroke="#B5482B" strokeWidth={2.5} dot={{ r: 4 }} name="Claims paid" />
      </ComposedChart>
    </ResponsiveContainer>
  )
}
