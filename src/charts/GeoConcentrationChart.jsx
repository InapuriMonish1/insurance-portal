import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { regionConcentration } from '../data/mockData'

function colorForRisk(riskIndex) {
  if (riskIndex >= 75) return '#9E3D22'
  if (riskIndex >= 50) return '#B5482B'
  if (riskIndex >= 25) return '#C88A2E'
  return '#3F6E52'
}

export default function GeoConcentrationChart() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={regionConcentration} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E5EB" vertical={false} />
        <XAxis dataKey="region" tick={{ fontSize: 12, fill: '#5C7391' }} axisLine={{ stroke: '#E2E5EB' }} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#5C7391' }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ borderRadius: 8, borderColor: '#E2E5EB', fontSize: 13 }}
          formatter={(v, name) => [name === 'policies' ? v.toLocaleString() : v, name === 'policies' ? 'Active policies' : 'Risk index']}
        />
        <Bar dataKey="policies" radius={[4, 4, 0, 0]} barSize={36}>
          {regionConcentration.map((entry, index) => (
            <Cell key={index} fill={colorForRisk(entry.riskIndex)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
