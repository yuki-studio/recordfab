import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import {
  useRecording,
  type Resolution,
  type Speed,
} from '../stores/recording'

const RESOLUTIONS: Resolution[] = ['Full HD - 1080P', 'HD - 720P', 'Smooth - 540P']
const SPEEDS: Speed[] = ['1x (Default)', '1.25x', '1.5x']

type Props = {
  recordTitle: string
}

export default function RecordModal({ recordTitle }: Props) {
  const open = useRecording((s) => s.recordSettingOpen)
  const close = useRecording((s) => s.closeRecordSetting)
  const start = useRecording((s) => s.startRecording)
  const resolution = useRecording((s) => s.resolution)
  const speed = useRecording((s) => s.speed)
  const customDuration = useRecording((s) => s.customDuration)
  const setResolution = useRecording((s) => s.setResolution)
  const setSpeed = useRecording((s) => s.setSpeed)
  const toggleCustomDuration = useRecording((s) => s.toggleCustomDuration)

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/45 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <article
        role="dialog"
        aria-modal="true"
        aria-labelledby="record-modal-title"
        className="w-[480px] overflow-hidden rounded-xl border border-[#292929] bg-[#161719] shadow-xl"
      >
        <header className="flex items-center justify-between border-b border-[#292929] px-5 py-4">
          <h2 id="record-modal-title" className="text-base font-semibold text-[#eee]">
            Recording Settings
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="rounded-md p-1 text-[#aeb1b6] hover:bg-white/5"
          >
            <X size={18} />
          </button>
        </header>

        <div className="space-y-5 px-5 py-5">
          <div className="flex items-center gap-3">
            <div
              className="grid h-16 w-24 place-items-center rounded-lg"
              style={{ background: 'linear-gradient(135deg,#f9d6f2,#a16eff)' }}
            >
              <div className="grid h-7 w-7 place-items-center rounded-full bg-white/80 text-[10px] font-bold text-indigo-600">
                R
              </div>
            </div>
            <div className="text-sm leading-snug text-[#aeb1b6]">
              {recordTitle}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Dropdown
              label="输出分辨率"
              value={resolution}
              options={RESOLUTIONS}
              onChange={setResolution}
            />
            <Dropdown
              label="录制速度"
              value={speed}
              options={SPEEDS}
              onChange={setSpeed}
            />
          </div>

          <div className="flex items-center justify-between border-t border-[#292929] pt-4">
            <span className="text-sm text-[#aeb1b6]">
              Custom duration <span className="ml-1 text-xs text-[#595b5f]">?</span>
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={customDuration}
              onClick={toggleCustomDuration}
              className={`relative h-5 w-9 rounded-full transition ${
                customDuration ? 'bg-[#4162fb]' : 'bg-[#292929]'
              }`}
            >
              <span
                className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition ${
                  customDuration ? 'left-4' : 'left-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        <footer className="flex justify-end gap-3 border-t border-[#292929] bg-[#202020] px-5 py-4">
          <button
            type="button"
            onClick={close}
            className="rounded-md border border-[#292929] bg-[#161719] px-4 py-1.5 text-sm text-[#aeb1b6] hover:bg-white/5"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={start}
            className="rounded-md bg-[#4162fb] px-4 py-1.5 text-sm text-white hover:bg-[#3d5dea]"
          >
            Confirm
          </button>
        </footer>
      </article>
    </div>
  )
}

function Dropdown<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: readonly T[]
  onChange: (value: T) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="space-y-1.5" ref={ref}>
      <span className="block text-sm text-[#aeb1b6]">
        {label} <span className="ml-1 text-xs text-[#595b5f]">?</span>
      </span>
      <div className="relative">
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((s) => !s)}
          className="flex w-full items-center justify-between rounded-md border border-[#292929] bg-[#202020] px-3 py-2 text-sm text-[#aeb1b6] hover:border-[#4162fb]"
        >
          <span className="truncate">{value}</span>
          <span className="ml-2 text-xs text-[#595b5f]">▾</span>
        </button>
        {open && (
          <div className="absolute z-10 mt-1 w-full rounded-md border border-[#292929] bg-[#161719] shadow-lg">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option)
                  setOpen(false)
                }}
                className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-white/5 ${
                  option === value ? 'font-medium text-[#4162fb]' : 'text-[#aeb1b6]'
                }`}
              >
                <span>{option}</span>
                {option === value && <span>✓</span>}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
