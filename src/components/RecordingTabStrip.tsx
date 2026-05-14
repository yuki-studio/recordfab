import { useEffect, useRef, useState } from 'react'

export type RecordingTab = {
  id: string
  label: string
  iconHome?: boolean
  iconSrc?: string
  width?: number
}

type Props = {
  tabs: RecordingTab[]
  activeTabId: string
  onSelect: (id: string) => void
  recordingTabId?: string | null
  onCloseTab?: (id: string) => void
}

export default function RecordingTabStrip({
  tabs,
  activeTabId,
  onSelect,
  recordingTabId,
  onCloseTab,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [hoveredTabId, setHoveredTabId] = useState<string | null>(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    return () => {}
  }, [])

  return (
    <div ref={wrapRef} className="flex h-11 flex-none items-center border-b border-[#161719] bg-[#191919]">
      <div
        className="flex h-11 min-w-0 flex-1 items-center gap-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {tabs.map((tab, idx) => {
          const active = tab.id === activeTabId
          const showClose = hoveredTabId === tab.id && tab.id !== 'home'
          const showRecording = tab.id === recordingTabId

          const isLast = idx === tabs.length - 1
          const nextActive = !isLast && tabs[idx + 1].id === activeTabId
          const showDivider = !isLast && !active && !nextActive

          return (
            <div key={tab.id} className="flex h-11 shrink-0 items-center">
              <button
                type="button"
                onClick={() => onSelect(tab.id)}
                onMouseEnter={() => setHoveredTabId(tab.id)}
                onMouseLeave={() => setHoveredTabId((prev) => (prev === tab.id ? null : prev))}
                className={`group relative flex h-11 w-[224px] items-center justify-between gap-2 px-4 text-[14px] leading-5 ${
                  active ? 'text-[#eee]' : 'text-[#aeb1b6]'
                }`}
                style={{
                  backgroundColor: active ? '#202020' : '#191919',
                  backgroundImage: `url(${active ? '/figma/tab_active_full.svg' : '/figma/tab_inactive_full.svg'})`,
                  backgroundSize: '100% 100%',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <span className="flex min-w-0 items-center gap-2 truncate">
                  {tab.iconHome ? (
                    <img src="/figma/tab_icon_home.svg" alt="" className="size-4" />
                  ) : tab.iconSrc?.includes('tab_icon_netflix') ? (
                    <span
                      aria-hidden="true"
                      className="block h-3 w-2 shrink-0"
                      style={{
                        background: `url(${tab.iconSrc}) lightgray 0px 0px / 100% 100% no-repeat`,
                      }}
                    />
                  ) : tab.iconSrc ? (
                    <img src={tab.iconSrc} alt="" className="size-4" />
                  ) : null}
                  <span className="truncate">{tab.label}</span>
                </span>

                <span className="mr-2 flex h-4 w-4 flex-none items-center justify-center">
                  {showClose ? (
                    <span
                      role="button"
                      aria-label="Close"
                      title="Close"
                      className="grid size-4 place-items-center rounded hover:bg-white/10"
                      onClick={(e) => {
                        e.stopPropagation()
                        onCloseTab?.(tab.id)
                      }}
                    >
                      <img src="/figma/tab_icon_close.svg" alt="" className="size-2.5" />
                    </span>
                  ) : showRecording ? (
                    <RecordingIndicator />
                  ) : null}
                </span>
              </button>
              {showDivider ? (
                <div aria-hidden="true" className="h-4 w-[2px] rounded-[1px] bg-[#292929]" />
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function RecordingIndicator() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="6" fill="none" stroke="#aeb1b6" strokeWidth="1.3" opacity="0.75" />
      <circle cx="8" cy="8" r="2.2" fill="#aeb1b6" />
      <path
        d="M8 1.8v1.6M8 12.6v1.6M1.8 8h1.6M12.6 8h1.6"
        stroke="#aeb1b6"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  )
}
