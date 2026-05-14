import { useEffect, useRef } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  onOpenAuthorize: () => void
  onOpenLicenseInfo: () => void
}

export default function SettingsMenu({ open, onClose, onOpenAuthorize, onOpenLicenseInfo }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function onMouseDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      ref={ref}
      role="menu"
      aria-label="Settings"
      className="absolute right-5 top-[44px] z-50 w-[264px] overflow-hidden rounded-xl border border-[#2a2a2c] shadow-[0_12px_40px_0_rgba(15,16,17,0.45)]"
      style={{
        background: 'linear-gradient(180deg, #1a1b1d 0%, #111214 100%)',
      }}
    >
      <div className="flex h-[54px] items-center px-6 text-[20px] leading-7 text-[#eee]">
        Settings
      </div>
      <div className="h-px bg-[#0f1011]/80" />

      <MenuItem
        onClick={() => {
          onClose()
          onOpenAuthorize()
        }}
      >
        Authorize
      </MenuItem>
      <MenuItem disabled>Deauthorize</MenuItem>
      <MenuItem
        onClick={() => {
          onClose()
          onOpenLicenseInfo()
        }}
      >
        License Info
      </MenuItem>
      <MenuItem onClick={onClose}>Member Center</MenuItem>

      <div className="my-4 h-px bg-[#0f1011]/80" />

      <MenuItem onClick={onClose}>Online Help</MenuItem>
      <MenuItem onClick={onClose}>Feedback</MenuItem>

      <div className="my-4 h-px bg-[#0f1011]/80" />

      <MenuItem onClick={onClose}>Check for update</MenuItem>
      <MenuItem onClick={onClose}>What&apos;s New</MenuItem>
      <MenuItem onClick={onClose}>Open Log Folder</MenuItem>
      <MenuItem onClick={onClose}>Clear Cache</MenuItem>
      <MenuItem onClick={onClose}>About</MenuItem>
    </div>
  )
}

function MenuItem({
  children,
  onClick,
  disabled,
}: {
  children: string
  onClick?: () => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      onClick={onClick}
      className={`flex h-11 w-full items-center px-6 text-left text-[18px] leading-6 ${
        disabled ? 'cursor-default text-[#595b5f]' : 'text-[#aeb1b6] hover:bg-white/5 hover:text-[#eee]'
      }`}
    >
      {children}
    </button>
  )
}
