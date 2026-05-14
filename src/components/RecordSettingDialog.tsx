import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { useRecording, type Resolution, type Speed } from '../stores/recording'

const RESOLUTIONS: Resolution[] = ['Full HD - 1080P', 'HD - 720P', 'Smooth - 540P']
const SPEEDS: Speed[] = ['1x (Default)', '1.25x', '1.5x']

type Props = {
  recordTitle: string
}

export default function RecordSettingDialog({ recordTitle }: Props) {
  const open = useRecording((s) => s.recordSettingOpen)
  const close = useRecording((s) => s.closeRecordSetting)
  const start = useRecording((s) => s.startRecording)
  const resolution = useRecording((s) => s.resolution)
  const speed = useRecording((s) => s.speed)
  const customDuration = useRecording((s) => s.customDuration)
  const stopAfterMinutes = useRecording((s) => s.stopAfterMinutes)
  const setResolution = useRecording((s) => s.setResolution)
  const setSpeed = useRecording((s) => s.setSpeed)
  const toggleCustomDuration = useRecording((s) => s.toggleCustomDuration)
  const setStopAfterMinutes = useRecording((s) => s.setStopAfterMinutes)

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/45 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <article
        role="dialog"
        aria-modal="true"
        aria-labelledby="record-setting-title"
        className="relative h-[414px] w-[624px] overflow-hidden rounded-xl bg-[#202020] shadow-[0_12px_40px_0_rgba(15,16,17,0.2)]"
      >
        <h2
          id="record-setting-title"
          className="absolute left-8 top-[18px] text-[14px] leading-5 text-[#eee]"
        >
          Record Setting
        </h2>
        <button
          type="button"
          aria-label="Close"
          onClick={close}
          className="absolute right-5 top-5 grid size-4 place-items-center hover:opacity-80"
        >
          <X size={16} className="text-[#aeb1b6]" />
        </button>

        <div className="flex h-full flex-col px-8 pb-8 pt-[70px]">

          <div className="relative h-24 w-[560px] rounded-lg bg-[#242426]">
            <div className="absolute left-3 top-3 grid h-[72px] w-32 place-items-center rounded bg-[#d8d8d8] text-[12px] text-[#595b5f]">
              Thumbnail
            </div>
            <div className="absolute left-[156px] top-[22px] right-4 min-w-0">
              <div className="truncate text-[14px] leading-5 text-[#eee]">
                {recordTitle || 'The title of the video'}
              </div>
              <div className="mt-2 flex items-center gap-3 text-[14px] leading-5 text-[#aeb1b6]">
                <span>00:24:09</span>
                <span className="inline-block h-3 w-px bg-[#aeb1b6]" />
                <span>Start From the begining</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-8 text-[14px] leading-5 text-[#aeb1b6]">
            <div className="flex w-[264px] items-center gap-2">
              <span>Output Resolution</span>
              <HelpIcon />
            </div>
            <div className="flex w-[264px] items-center gap-2">
              <span>Record Speed</span>
              <HelpIcon />
            </div>
          </div>

          <div className="mt-3 flex items-center gap-8">
            <SelectBox
              value={resolutionToLabel(resolution)}
              options={RESOLUTIONS.map(resolutionToLabel)}
              onChange={(v) => setResolution(labelToResolution(v))}
            />
            <SelectBox value={speed} options={SPEEDS} onChange={setSpeed} />
          </div>

          <div className="flex-1" />

          <div
            data-testid="custom-duration-section"
            className="mt-4 w-[560px] overflow-hidden rounded bg-[#242426]"
          >
            <div className="flex h-8 items-center justify-between px-4">
              <div className="flex items-center gap-2 text-[14px] leading-5 text-[#eee]">
                <span>Custom Recording Length</span>
                <HelpIcon />
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={customDuration}
                onClick={toggleCustomDuration}
                className={`relative h-5 w-9 rounded-full transition ${customDuration ? 'bg-[#4162fb]' : 'bg-[#323234]'}`}
              >
                <span
                  className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition ${customDuration ? 'left-4' : 'left-0.5'}`}
                />
              </button>
            </div>
            {customDuration ? (
              <>
                <div className="mx-auto h-px w-[532px] bg-[#292935]" />
                <div
                  data-testid="custom-duration-row"
                  className="flex h-8 items-center px-4 text-[14px] leading-5 text-[#eee]"
                >
                  <span className="mr-2">Recording Stops when the video reaches</span>
                  <NumberStepper value={stopAfterMinutes} onChange={setStopAfterMinutes} />
                  <span className="ml-2">minutes.</span>
                </div>
              </>
            ) : null}
          </div>

          <div data-testid="record-setting-footer" className="mt-5 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={start}
              className="h-8 w-[88px] rounded-md bg-[#4162fb] text-[14px] leading-5 text-white hover:bg-[#3a54cf]"
            >
              OK
            </button>
            <button
              type="button"
              onClick={close}
              className="h-8 w-[88px] rounded-md border border-[#7f8186] text-[14px] leading-5 text-[#aeb1b6] hover:bg-white/5"
            >
              Cancel
            </button>
          </div>
        </div>
      </article>
    </div>
  )
}

function SelectBox<T extends string>({
  value,
  options,
  onChange,
}: {
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
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className="flex h-8 w-[264px] items-center justify-between rounded bg-[#242426] px-4 text-[14px] leading-5 text-[#eee]"
      >
        <span className="truncate">{value}</span>
        <span className="text-[12px] text-[#aeb1b6]">▾</span>
      </button>
      {open && (
        <div className="absolute z-10 mt-1 w-[264px] overflow-hidden rounded bg-[#242426] shadow-lg">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt)
                setOpen(false)
              }}
              className={`flex w-full items-center justify-between px-4 py-2 text-left text-[14px] leading-5 hover:bg-white/5 ${
                opt === value ? 'text-[#eee]' : 'text-[#aeb1b6]'
              }`}
            >
              <span>{opt}</span>
              {opt === value ? <span className="text-[#eee]">✓</span> : null}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function NumberStepper({
  value,
  onChange,
}: {
  value: number
  onChange: (value: number) => void
}) {
  return (
    <div className="relative h-6 w-[72px] rounded-[2px] bg-[#323234]">
      <input
        className="h-6 w-[52px] bg-transparent pl-2 text-[14px] leading-5 text-[#eee] outline-none"
        value={String(value)}
        inputMode="numeric"
        onChange={(e) => {
          const n = Number.parseInt(e.target.value || '0', 10)
          if (Number.isFinite(n)) onChange(n)
        }}
      />
      <div className="absolute right-0 top-0 flex h-6 w-5 flex-col">
        <button
          type="button"
          aria-label="increase"
          className="grid h-3 w-5 place-items-center hover:bg-white/10"
          onClick={() => onChange(value + 1)}
        >
          <span className="text-[9px] leading-none text-[#aeb1b6]">▴</span>
        </button>
        <button
          type="button"
          aria-label="decrease"
          className="grid h-3 w-5 place-items-center hover:bg-white/10"
          onClick={() => onChange(Math.max(1, value - 1))}
        >
          <span className="text-[9px] leading-none text-[#aeb1b6]">▾</span>
        </button>
      </div>
    </div>
  )
}

function HelpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="7" fill="none" stroke="#aeb1b6" strokeWidth="1.2" opacity="0.8" />
      <path
        d="M6.6 6.2c.2-.9 1-1.5 2-1.5 1.1 0 2 .7 2 1.8 0 .8-.4 1.2-1.2 1.7-.8.5-1 .8-1 1.6v.2"
        fill="none"
        stroke="#aeb1b6"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="8" cy="12.1" r="0.7" fill="#aeb1b6" />
    </svg>
  )
}

function resolutionToLabel(value: Resolution) {
  if (value === 'Full HD - 1080P') return 'FullHD-1080P'
  if (value === 'HD - 720P') return 'HD-720P'
  return 'Smooth-540P'
}

function labelToResolution(label: string): Resolution {
  if (label.toLowerCase().includes('1080')) return 'Full HD - 1080P'
  if (label.toLowerCase().includes('720')) return 'HD - 720P'
  return 'Smooth - 540P'
}
