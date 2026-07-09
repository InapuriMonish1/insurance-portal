import { NavLink } from 'react-router-dom'
import { LayoutGrid, FileSearch, PieChart, ShieldCheck } from 'lucide-react'

const navItems = [
  { to: '/', label: 'Claims Overview', icon: LayoutGrid, end: true },
  { to: '/claims', label: 'Claim Investigation', icon: FileSearch },
  { to: '/portfolio', label: 'Portfolio & Risk', icon: PieChart }
]

export default function Sidebar() {
  return (
    <aside className="w-60 shrink-0 bg-ink-900 text-paper-50 flex flex-col h-screen sticky top-0">
      <div className="px-5 py-6 flex items-center gap-2 border-b border-white/10">
        <ShieldCheck size={22} className="text-gold-500" strokeWidth={2} />
        <span className="font-display text-lg font-semibold tracking-tight">Assurly</span>
      </div>

      <nav className="flex-1 px-3 py-5 space-y-1">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                isActive
                  ? 'bg-white/10 text-white font-medium'
                  : 'text-ink-200 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Icon size={17} strokeWidth={1.8} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-5 py-4 border-t border-white/10">
        <div className="text-xs font-mono text-ink-400">Ops workspace</div>
        <div className="text-sm text-paper-50 mt-0.5">Northeast Claims Unit</div>
      </div>
    </aside>
  )
}
