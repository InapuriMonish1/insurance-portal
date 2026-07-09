import { Search, Bell } from 'lucide-react'

export default function Topbar({ title, subtitle }) {
  return (
    <header className="flex items-center justify-between px-8 py-5 border-b border-paper-200 bg-paper-50/80 backdrop-blur sticky top-0 z-10">
      <div>
        <h1 className="font-display text-xl font-semibold text-ink-900">{title}</h1>
        {subtitle && <p className="text-sm text-ink-400 mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            type="text"
            placeholder="Search claim ID, policy, claimant…"
            className="pl-9 pr-4 py-2 text-sm rounded-md border border-paper-200 bg-white w-72 focus:outline-none focus:ring-2 focus:ring-steel-500/30 focus:border-steel-500"
          />
        </div>
        <button className="relative p-2 rounded-md hover:bg-paper-100" aria-label="Notifications">
          <Bell size={18} className="text-ink-600" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-brick-500" />
        </button>
        <div className="w-8 h-8 rounded-full bg-steel-600 text-white flex items-center justify-center text-xs font-medium font-mono">
          RO
        </div>
      </div>
    </header>
  )
}
