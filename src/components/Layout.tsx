import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Folder, Home } from 'lucide-react'
import { useRecording } from '../stores/recording'
import { PRODUCT_URL } from '../constants/urls'
import ExitRecordingDialog from './ExitRecordingDialog'
import HistoryDialog from './HistoryDialog'
import ClearHistoryConfirmDialog from './ClearHistoryConfirmDialog'
import WelcomeDialog from './WelcomeDialog'

export default function Layout() {
  const navigate = useNavigate()
  const filesCount = useRecording((s) => s.files.length)
  const badge = filesCount > 99 ? '99+' : filesCount > 0 ? String(filesCount) : undefined
  const selectTab = useRecording((s) => s.selectTab)
  const closeTabConfirmOpen = useRecording((s) => s.closeTabConfirmOpen)
  const cancelCloseTab = useRecording((s) => s.cancelCloseTab)
  const confirmCloseTab = useRecording((s) => s.confirmCloseTab)

  return (
    <div className="grid min-h-screen place-items-center bg-[#0f1011]">
      <div data-testid="app-frame" className="flex h-[700px] w-[1200px] bg-[#202020] text-[#eee]">
        <aside
          data-testid="app-sidebar"
          className="flex h-full w-[240px] shrink-0 flex-col border-r border-[#292929] bg-[#161719]"
        >
          <a
            href={PRODUCT_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-start gap-3 px-6 py-5 transition-opacity hover:opacity-80"
          >
          <img src="/logo.png" alt="RecordFab logo" className="h-10 w-10 shrink-0 object-contain" />
          <div className="pt-0.5 leading-none">
            <img src="/wordmark.png" alt="RecordFab" className="h-4 w-auto object-contain" style={{ filter: 'invert(1)' }} />
            <div className="mt-1.5 text-[12px] font-semibold text-white">1.0.1.5</div>
          </div>
        </a>

        <nav aria-label="Primary navigation" className="flex flex-col gap-2 px-2">
          <NavItem
            to="/"
            icon={<Home size={16} />}
            label="Home"
            onClick={() => selectTab('home')}
          />
          <NavItem to="/files" icon={<Folder size={16} />} label="My Files" badge={badge} />
        </nav>
        </aside>

        <main data-testid="app-main" className="flex h-full w-[960px] flex-col overflow-hidden">
          <Outlet />
        </main>

        <ExitRecordingDialog
          open={closeTabConfirmOpen}
          onClose={cancelCloseTab}
          onConfirm={() => {
            confirmCloseTab()
            navigate('/')
          }}
        />
        <WelcomeDialog />
        <HistoryDialog />
        <ClearHistoryConfirmDialog />
      </div>
    </div>
  )
}

function NavItem({
  to,
  icon,
  label,
  badge,
  onClick,
}: {
  to: string
  icon: React.ReactNode
  label: string
  badge?: string
  onClick?: () => void
}) {
  return (
    <NavLink
      to={to}
      end
      onClick={onClick}
      className={({ isActive }) =>
        `flex h-10 items-center gap-2 rounded-l-lg px-4 text-sm transition ${
          isActive
            ? 'bg-[linear-gradient(to_left,rgba(0,115,255,0),rgba(0,115,255,0.08))] text-[#4162fb]'
            : 'text-[#aeb1b6] hover:bg-white/5'
        }`
      }
    >
      {icon}
      <span className="flex-1">{label}</span>
      {badge && (
        <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e02020] px-1 text-[10px] text-[#eee]">
          {badge}
        </span>
      )}
    </NavLink>
  )
}
