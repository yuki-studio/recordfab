import { ArrowLeft, ArrowRight, Check, Clock, RotateCw, Search } from 'lucide-react'
import { useRecording } from '../stores/recording'

type Props = {
  url: string
  supported: boolean
}

export default function BrowserToolbar({ url, supported }: Props) {
  const openHistoryDialog = useRecording((s) => s.openHistoryDialog)
  return (
    <div className="flex items-center gap-2 border-b border-[#161719] bg-[#202020] px-3 py-2">
      <button className="rounded-md p-1.5 text-[#aeb1b6] hover:bg-white/5" aria-label="Back">
        <ArrowLeft size={16} />
      </button>
      <button className="rounded-md p-1.5 text-[#aeb1b6] hover:bg-white/5" aria-label="Forward">
        <ArrowRight size={16} />
      </button>
      <button className="rounded-md p-1.5 text-[#aeb1b6] hover:bg-white/5" aria-label="Refresh">
        <RotateCw size={16} />
      </button>

      <label className="flex flex-1 items-center gap-2 rounded-md bg-[#161719] px-3 py-1.5">
        <Search size={14} className="text-[#595b5f]" />
        <input
          type="text"
          value={url}
          readOnly
          placeholder="search or visit a website"
          aria-label="Address bar"
          className="flex-1 bg-transparent text-sm text-[#595b5f] outline-none"
        />
      </label>

      {supported && (
        <div className="flex items-center gap-1 rounded-full bg-[#223340] px-2 py-1 text-xs text-[#93d6a3]">
          <span>Supported</span>
          <Check size={12} />
        </div>
      )}

      <button
        className="rounded-md p-1.5 text-[#aeb1b6] hover:bg-white/5"
        aria-label="History"
        onClick={openHistoryDialog}
        type="button"
      >
        <Clock size={16} />
      </button>
    </div>
  )
}
