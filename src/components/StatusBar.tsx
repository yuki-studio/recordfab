import { Loader2, Play, Square } from 'lucide-react'
import type { DetectionState } from '../stores/recording'

type Props = {
  detectionState: DetectionState
  onStart: () => void
  onStop: () => void
}

export default function StatusBar({ detectionState, onStart, onStop }: Props) {
  const detecting = detectionState === 'detecting'
  const detected = detectionState === 'detected'
  const recording = detectionState === 'recording'

  let label = 'Detecting video...'
  if (detected) label = 'Video detected'
  if (recording) label = 'Recording'

  return (
    <footer className="flex items-center justify-between border-t border-[#292929] bg-[#161719] px-4 py-2">
      <div className="flex items-center gap-2 text-sm">
        {detecting ? (
          <Loader2 size={14} className="animate-spin text-[#4162fb]" />
        ) : (
          <span
            className={`inline-block h-2 w-2 rounded-full ${
              recording ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'
            }`}
          />
        )}
        <span className="text-[#aeb1b6]">{label}</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onStart}
          disabled={!detected}
          className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition ${
            detected
              ? 'bg-[#4162fb] text-white hover:bg-[#3d5dea]'
              : 'bg-[#202020] text-[#595b5f]'
          }`}
        >
          <Play size={12} />
          <span>Start</span>
        </button>
        <button
          type="button"
          onClick={onStop}
          disabled={!recording}
          className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition ${
            recording
              ? 'border border-rose-500/50 bg-[#202020] text-rose-400 hover:bg-rose-500/10'
              : 'border border-[#292929] bg-[#202020] text-[#595b5f]'
          }`}
        >
          <Square size={12} />
          <span>Stop</span>
        </button>
      </div>
    </footer>
  )
}
