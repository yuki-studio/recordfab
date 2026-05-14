import { useEffect, useMemo, useRef } from 'react'
import { useRecording } from '../stores/recording'

export default function ClearHistoryConfirmDialog() {
  const open = useRecording((s) => s.clearHistoryConfirmOpen)
  const cancel = useRecording((s) => s.cancelClearHistory)
  const confirm = useRecording((s) => s.confirmClearHistory)

  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') cancel()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, cancel])

  const onBackdrop = useMemo(
    () => (e: React.MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) cancel()
    },
    [cancel],
  )

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/40" onMouseDown={onBackdrop}>
      <div
        ref={ref}
        className="relative h-[min(206px,calc(100vh-40px))] w-[min(480px,calc(100vw-40px))] overflow-hidden rounded-xl bg-[#202020] shadow-[0_12px_40px_0_rgba(15,16,17,0.2)]"
      >
        <div className="flex h-12 items-center justify-between px-6">
          <div className="text-[16px] font-semibold leading-6 text-[#eee]">RecordFab</div>
          <button type="button" aria-label="close" onClick={cancel} className="grid size-8 place-items-center rounded hover:bg-white/5">
            <img src="/figma/icon_close_window.svg" alt="" className="size-4 opacity-70" />
          </button>
        </div>

        <div className="flex flex-col px-6 pt-8">
          <div className="flex items-center gap-[12px]">
            <div className="grid size-10 flex-shrink-0 place-items-center rounded-full border-2 border-[#2b86ff] text-[20px] font-semibold leading-none text-[#2b86ff]">
              ?
            </div>
            <div className="text-[16px] leading-6 text-[#aeb1b6]">Are you sure to clear all history?</div>
          </div>
        </div>

        <div className="absolute bottom-5 right-6 flex items-center gap-4">
          <button
            type="button"
            onClick={confirm}
            className="h-8 w-[88px] rounded-lg bg-[#4162fb] text-[14px] leading-5 text-white hover:brightness-110"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={cancel}
            className="h-8 w-[88px] rounded-lg border border-[#595b5f] bg-transparent text-[14px] leading-5 text-[#aeb1b6] hover:bg-white/5"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
