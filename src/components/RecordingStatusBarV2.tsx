import { Loader2 } from 'lucide-react'
import type { DetectionState } from '../stores/recording'

type Props = {
  detectionState: DetectionState
  unsupportedHintOpen: boolean
  onStart: () => void
  onStop: () => void
}

export default function RecordingStatusBarV2({
  detectionState,
  unsupportedHintOpen,
  onStart,
  onStop,
}: Props) {
  const detecting = detectionState === 'detecting'
  const detected = detectionState === 'detected'
  const unsupported = detectionState === 'unsupported'
  const recording = detectionState === 'recording'
  const failed = detectionState === 'failed'
  const canceled = detectionState === 'canceled'

  const startDisabled = detecting || recording
  const stopDisabled = detecting || !recording
  const startVisual = unsupported ? 'hover' : startDisabled ? 'disabled' : 'normal'

  let label = 'Detecting Video...'
  if (detected || unsupported) label = 'Video Detected'
  if (recording) label = 'Video Recording'
  if (failed) label = 'Recording Failed'
  if (canceled) label = 'Recording Canceled'

  return (
    <footer className="relative flex h-[60px] flex-none items-center justify-between bg-[#202020] px-8">
      <div className="flex items-center gap-3 text-sm">
        {detecting ? (
          <Loader2 size={16} className="animate-spin text-[#aeb1b6]" />
        ) : failed ? (
          <StatusFailedIcon />
        ) : canceled ? (
          <StatusCanceledIcon />
        ) : recording ? (
          <StatusRecordingIcon />
        ) : (
          <StatusDetectedIcon />
        )}
        <span className="text-[#aeb1b6]">{label}</span>
      </div>

      <div className="flex items-center gap-3">
        <StartButton disabled={startDisabled} visual={startVisual} onClick={onStart} />
        <StopButton disabled={stopDisabled} onClick={onStop} />
      </div>

      {unsupportedHintOpen && (
        <div className="absolute right-[32px] top-[-32px] grid h-7 w-[264px] place-items-center rounded-md bg-[#161719] text-[14px] leading-5 text-[#eee] shadow-lg">
          Refresh the page or it is not supported
        </div>
      )}
    </footer>
  )
}

function StartButton({
  disabled,
  visual,
  onClick,
}: {
  disabled: boolean
  visual: 'normal' | 'hover' | 'disabled'
  onClick: () => void
}) {
  const bg =
    visual === 'disabled' ? '#323234' : visual === 'hover' ? '#3a54cf' : '#4162fb'
  const fg = visual === 'disabled' ? '#595b5f' : '#ffffff'
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="flex h-7 w-[88px] items-center gap-2 rounded-md px-3 text-[14px] leading-5"
      style={{ backgroundColor: bg, color: fg }}
    >
      <StartIcon color={fg} />
      <span>Start</span>
    </button>
  )
}

function StopButton({ disabled, onClick }: { disabled: boolean; onClick: () => void }) {
  const iconColor = disabled ? '#595b5f' : '#aeb1b6'
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="group flex h-7 w-[88px] items-center gap-2 rounded-md px-3 text-[14px] leading-5"
      style={{
        backgroundColor: disabled ? '#323234' : '#2a2a2c',
        color: disabled ? '#595b5f' : '#aeb1b6',
      }}
    >
      <StopIcon color={iconColor} />
      <span className={disabled ? '' : 'group-hover:text-[#f92f4f]'}>Stop</span>
    </button>
  )
}

function StartIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="5.6" fill="none" stroke={color} strokeWidth="1.3" opacity="0.95" />
      <circle cx="8" cy="8" r="1.6" fill={color} opacity="0.95" />
    </svg>
  )
}

function StopIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="5.6" fill="none" stroke={color} strokeWidth="1.3" opacity="0.95" />
      <rect x="7.1" y="7.1" width="1.8" height="1.8" rx="0.2" fill={color} opacity="0.95" />
    </svg>
  )
}

function StatusDetectedIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="7" fill="none" stroke="#aeb1b6" strokeWidth="1.3" opacity="0.9" />
      <path
        d="M4.2 8.2l2.2 2.2 5.4-5.4"
        fill="none"
        stroke="#aeb1b6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function StatusRecordingIcon() {
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

function StatusFailedIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="7" fill="none" stroke="#f92f4f" strokeWidth="1.3" opacity="0.95" />
      <path
        d="M5 5l6 6M11 5l-6 6"
        stroke="#f92f4f"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function StatusCanceledIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M6.2 5.2H10a3.8 3.8 0 1 1-2.7 6.4"
        fill="none"
        stroke="#f92f4f"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M6.2 5.2l-1.7 1.7M6.2 5.2L4.5 3.5"
        fill="none"
        stroke="#f92f4f"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  )
}
