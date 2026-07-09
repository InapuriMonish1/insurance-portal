import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { severityBreakdown } from '../data/mockData'

export default function SeverityBreakdownChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={severityBreakdown} layout="vertical" margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey="band"
          width={120}
          tick={{ fontSize: 12, fill: '#5C7391' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{ borderRadius: 8, borderColor: '#E2E5EB', fontSize: 13 }}
          cursor={{ fill: '#F7F8FA' }}
        />
        <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={22}>
          {severityBreakdown.map((entry, index) => (
            <Cell key={index} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
