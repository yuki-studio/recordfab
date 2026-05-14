import { useCallback, useState } from 'react'
import { Clock, Menu, Minus, Shirt, Square, X } from 'lucide-react'
import { PURCHASE_URL } from '../constants/urls'
import SettingsMenu from './SettingsMenu'
import AuthorizeDialog from './AuthorizeDialog'
import LicenseInfoDialog from './LicenseInfoDialog'
import { useRecording } from '../stores/recording'

export default function WindowTitleBar() {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const closeSettings = useCallback(() => setSettingsOpen(false), [])
  const openHistoryDialog = useRecording((s) => s.openHistoryDialog)
  const historyCount = useRecording((s) => s.browserHistory.length)
  const historyBadge = historyCount > 99 ? '99+' : historyCount > 0 ? String(historyCount) : undefined
  const authorizeOpen = useRecording((s) => s.authorizeDialogOpen)
  const openAuthorize = useRecording((s) => s.openAuthorizeDialog)
  const closeAuthorize = useRecording((s) => s.closeAuthorizeDialog)
  const licenseOpen = useRecording((s) => s.licenseInfoDialogOpen)
  const openLicense = useRecording((s) => s.openLicenseInfoDialog)
  const closeLicense = useRecording((s) => s.closeLicenseInfoDialog)
  const licenseView = useRecording((s) => s.licenseInfoView)

  return (
    <div
      className="relative flex h-11 flex-none items-center justify-end gap-2 border-b border-[#161719] px-3"
      style={{
        background: 'linear-gradient(180deg, #2a2a2a 0%, #232323 100%)',
      }}
    >
      <button
        type="button"
        onClick={() => window.open(PURCHASE_URL, '_blank', 'noopener,noreferrer')}
        className="flex h-7 items-center gap-1.5 rounded-[14px] px-3 text-[12px] leading-5 text-white"
        style={{ background: 'linear-gradient(to left, #4162fb, #4465ff)' }}
      >
        <img src="/figma/icon_buy.svg" alt="" className="size-3.5" />
        Buy Now
      </button>
      <TitleActionButton label="history" badge={historyBadge} onClick={openHistoryDialog}>
        <Clock size={16} strokeWidth={1.7} className="text-[#6f757d]" />
      </TitleActionButton>
      <TitleActionButton label="theme">
        <Shirt size={15} strokeWidth={1.7} className="text-[#6f757d]" />
      </TitleActionButton>
      <TitleActionButton
        label="menu"
        onClick={() => setSettingsOpen((s) => !s)}
      >
        <Menu size={16} strokeWidth={1.7} className="text-[#6f757d]" />
      </TitleActionButton>
      <TitleActionButton label="Minimize" title="Minimize">
        <Minus size={16} strokeWidth={1.7} className="text-[#6f757d]" />
      </TitleActionButton>
      <TitleActionButton label="Maximize" title="Maximize">
        <Square size={13} strokeWidth={1.7} className="text-[#6f757d]" />
      </TitleActionButton>
      <TitleActionButton label="Exit" title="Exit">
        <X size={17} strokeWidth={1.7} className="text-[#6f757d]" />
      </TitleActionButton>

      <SettingsMenu
        open={settingsOpen}
        onClose={closeSettings}
        onOpenAuthorize={openAuthorize}
        onOpenLicenseInfo={openLicense}
      />
      <AuthorizeDialog open={authorizeOpen} onClose={closeAuthorize} />
      <LicenseInfoDialog open={licenseOpen} onClose={closeLicense} view={licenseView} />
    </div>
  )
}

function TitleActionButton({
  label,
  title,
  children,
  badge,
  onClick,
}: {
  label: string
  title?: string
  children: React.ReactNode
  badge?: string
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={title}
      onClick={onClick}
      className="relative grid h-8 w-8 place-items-center rounded-md hover:bg-white/5"
    >
      {children}
      {badge && (
        <span className="absolute right-0.5 top-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[#f32727] px-1 text-[10px] font-semibold leading-none text-white">
          {badge}
        </span>
      )}
    </button>
  )
}
