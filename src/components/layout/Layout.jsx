import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function Layout({ title, subtitle, children }) {
  return (
    <div className="flex min-h-screen bg-paper-50">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Topbar title={title} subtitle={subtitle} />
        <main className="px-8 py-6">{children}</main>
      </div>
    </div>
  )
}
