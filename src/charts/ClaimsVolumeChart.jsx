import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { claimsVolumeTrend } from '../data/mockData'

export default function ClaimsVolumeChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={claimsVolumeTrend} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="filedGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1F3A5F" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#1F3A5F" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="settledGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3F6E52" stopOpacity={0.2} />
            <stop offset="100%" stopColor="#3F6E52" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E5EB" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#5C7391' }} axisLine={{ stroke: '#E2E5EB' }} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#5C7391' }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ borderRadius: 8, borderColor: '#E2E5EB', fontSize: 13 }}
          labelStyle={{ fontWeight: 600, color: '#0F1C2E' }}
        />
        <Area type="monotone" dataKey="filed" stroke="#1F3A5F" strokeWidth={2} fill="url(#filedGradient)" name="Filed" />
        <Area type="monotone" dataKey="settled" stroke="#3F6E52" strokeWidth={2} fill="url(#settledGradient)" name="Settled" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
