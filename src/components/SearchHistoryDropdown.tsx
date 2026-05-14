import { useEffect, useMemo, useRef, useState } from 'react'

type Props = {
  open: boolean
  items: string[]
  onSelect: (domain: string) => void
  onRemove: (domain: string) => void
  onClose: () => void
}

export default function SearchHistoryDropdown({ open, items, onSelect, onRemove, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState<string | null>(null)

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

  const visibleItems = useMemo(() => items.slice(0, 5), [items])
  if (!open) return null

  return (
    <div
      ref={ref}
      className="absolute left-0 top-[32px] z-50 h-[168px] w-full overflow-hidden rounded-lg bg-[#242426] p-1 shadow-[0_12px_40px_0_rgba(15,16,17,0.2)]"
    >
      {visibleItems.map((domain, idx) => {
        const active = idx === 0
        const isHover = hovered === domain
        return (
          <div
            key={domain}
            onMouseEnter={() => setHovered(domain)}
            onMouseLeave={() => setHovered((p) => (p === domain ? null : p))}
            onClick={() => onSelect(domain)}
            role="button"
            tabIndex={0}
            className={`flex h-8 w-full items-center rounded px-2 text-left text-[14px] leading-5 ${
              isHover ? 'bg-[#2a2a2c]' : 'bg-transparent'
            }`}
          >
            <img src="/figma/nav_icon_history.svg" alt="" className="ml-[2px] size-4 opacity-80" />
            <span className={`ml-2 flex-1 truncate ${active ? 'text-[#4162fb]' : 'text-[#eee]'}`}>
              {domain}
            </span>
            {isHover ? (
              <button
                type="button"
                aria-label="remove"
                onClick={(e) => {
                  e.stopPropagation()
                  onRemove(domain)
                }}
                className="grid size-6 place-items-center rounded hover:bg-white/5"
              >
                <img src="/figma/tab_icon_close.svg" alt="" className="size-4" />
              </button>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
