import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { hotServices } from '../mocks/sites'
import type { BrowserHistoryItem } from '../stores/recording'
import { useRecording } from '../stores/recording'

function formatDateYMD(ts: number) {
  const d = new Date(ts)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function formatTimeHM(ts: number) {
  const d = new Date(ts)
  const h = String(d.getHours()).padStart(2, '0')
  const m = String(d.getMinutes()).padStart(2, '0')
  return `${h}:${m}`
}

export default function HistoryDialog() {
  const navigate = useNavigate()
  const open = useRecording((s) => s.historyDialogOpen)
  const close = useRecording((s) => s.closeHistoryDialog)
  const requestClear = useRecording((s) => s.requestClearHistory)
  const removeItem = useRecording((s) => s.removeBrowserHistoryItem)
  const openSiteTab = useRecording((s) => s.openSiteTab)
  const items = useRecording((s) => s.browserHistory)

  const ref = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!open) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, close])

  const onBackdrop = useMemo(
    () => (e: React.MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close()
    },
    [close],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const base = [...items].sort((a, b) => b.visitedAt - a.visitedAt)
    if (!q) return base
    return base.filter((x) => x.title.toLowerCase().includes(q) || x.url.toLowerCase().includes(q))
  }, [items, query])

  const groups = useMemo(() => {
    const map = new Map<string, BrowserHistoryItem[]>()
    for (const it of filtered) {
      const k = formatDateYMD(it.visitedAt)
      const arr = map.get(k)
      if (arr) arr.push(it)
      else map.set(k, [it])
    }
    return Array.from(map.entries())
  }, [filtered])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-black/40" onMouseDown={onBackdrop}>
      <div
        ref={ref}
        className="relative flex flex-col overflow-hidden rounded-xl bg-[#202020] shadow-[0_12px_40px_0_rgba(15,16,17,0.2)]"
        style={{
          width: 'min(868px, calc(100vw - 80px))',
          height: 'min(574px, calc(100vh - 80px))',
        }}
      >
        <div className="flex items-center justify-between px-8 pt-[18px]">
          <div className="text-[14px] leading-5 text-white">History</div>
          <button type="button" aria-label="close" onClick={close} className="grid size-8 place-items-center rounded hover:bg-white/5">
            <img src="/figma/icon_close_window.svg" alt="" className="size-4 opacity-70" />
          </button>
        </div>

        <div className="mt-8 flex items-center gap-[22px] px-8">
          <div className="flex h-8 flex-1 items-center gap-2 rounded-md bg-[#161719] px-3">
            <img src="/figma/nav_icon_search.svg" alt="" className="size-3.5 opacity-80" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="search or visit a website"
              className="flex-1 bg-transparent text-[14px] leading-5 text-[#eee] outline-none placeholder:text-[#595b5f]"
            />
          </div>

          <button
            type="button"
            onClick={requestClear}
            className="flex h-8 w-[132px] items-center justify-center gap-2 rounded-md bg-[#2a2a2c] text-[14px] leading-5 text-[#aeb1b6] hover:brightness-110"
          >
            <Trash2 size={16} className="text-[#aeb1b6]" />
            Clear History
          </button>
        </div>

        <div
          className="mt-6 flex-1 overflow-y-auto px-8 pb-8"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#2a2a2c transparent' }}
        >
          {filtered.length === 0 ? (
            <div className="grid h-full place-items-center">
              <div className="flex flex-col items-center">
                {items.length === 0 ? (
                  <>
                    <div className="grid h-20 w-[100px] place-items-center rounded-lg bg-[#242426] text-[12px] text-[#595b5f]">
                      Empty
                    </div>
                    <div className="mt-4 text-[14px] leading-5 text-[#595b5f]">No history yet</div>
                  </>
                ) : (
                  <>
                    <div className="grid size-16 place-items-center rounded-full bg-[#242426]">
                      <img src="/figma/nav_icon_search.svg" alt="" className="size-6 opacity-80" />
                    </div>
                    <div className="mt-4 text-center text-[14px] leading-5 text-[#595b5f]">
                      No results found.
                      <br />
                      Please check your spelling or try other keywords.
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {groups.map(([date, list]) => (
                <div key={date} className="overflow-hidden rounded-md bg-transparent">
                  <div className="flex h-10 items-center bg-[#323234] px-4 text-[14px] leading-5 text-[#aeb1b6]">
                    {date}
                  </div>
                  <div className="overflow-x-auto">
                    <div className="min-w-[804px]">
                      {list.map((it, idx) => (
                        <div key={it.id}>
                          <div
                            role="button"
                            tabIndex={0}
                            onClick={() => {
                              const domain = it.url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
                              const slug = domain.split('.')[0].toLowerCase()
                              const service = hotServices.find((s) => s.slug === slug)
                              openSiteTab(slug, service?.label ?? slug, slug === 'netflix' ? '/figma/tab_icon_netflix.svg' : undefined)
                              navigate(`/site/${slug}`)
                              close()
                            }}
                            className="group flex h-12 items-center bg-[#242426] px-4 hover:bg-[#2a2a2c]"
                          >
                            <div className="flex w-full items-center gap-6 text-[14px] leading-5 text-[#eee]">
                              <div className="flex w-6 items-center justify-center">
                                {it.siteSlug === 'netflix' ? (
                                  <div className="grid size-6 place-items-center overflow-hidden rounded-full bg-black">
                                    <img src="/figma/tab_icon_netflix.svg" alt="" className="size-4" />
                                  </div>
                                ) : (
                                  <div className="grid size-6 place-items-center rounded-full bg-[#2a2a2c] text-[12px] font-semibold text-[#eee]">
                                    {it.siteSlug.trim().charAt(0).toUpperCase()}
                                  </div>
                                )}
                              </div>
                              <div className="w-[308px] truncate">{it.title}</div>
                              <div className="w-[260px] truncate">{it.url}</div>
                              <div className="w-20">{formatTimeHM(it.visitedAt)}</div>
                              <button
                                type="button"
                                aria-label="remove"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  removeItem(it.id)
                                }}
                                className="grid size-4 place-items-center rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                                style={{ background: 'transparent' }}
                              >
                                <img src="/figma/tab_icon_close.svg" alt="" className="size-4 opacity-80" />
                              </button>
                            </div>
                          </div>
                          {idx < list.length - 1 ? <div className="mx-4 h-px bg-[#323234]" /> : null}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
