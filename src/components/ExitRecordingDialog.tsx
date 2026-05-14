import { X } from 'lucide-react'

type Props = {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function ExitRecordingDialog({ open, onClose, onConfirm }: Props) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/45 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <article
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-recording-title"
        className="relative h-[174px] w-[560px] rounded-xl bg-[#242426] shadow-[0_12px_40px_0_rgba(15,16,17,0.2)]"
      >
        <div className="flex items-center justify-between px-8 pt-6">
          <div id="exit-recording-title" className="text-[18px] leading-6 text-[#eee]">
            Tips
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="grid size-8 place-items-center rounded-md hover:bg-white/5"
          >
            <X size={16} className="text-[#595b5f]" />
          </button>
        </div>

        <div className="mt-4 flex items-center gap-6 px-8">
          <div className="grid size-12 place-items-center rounded-full border-2 border-[#f92f4f]">
            <span className="text-[24px] font-bold leading-none text-[#f92f4f]">!</span>
          </div>
          <div className="text-[20px] leading-7 text-[#aeb1b6]">
            Recording progress will not be saved. Are you sure you want to exit?
          </div>
        </div>

        <div className="absolute bottom-6 right-8 flex items-center gap-4">
          <button
            type="button"
            onClick={onConfirm}
            className="h-10 w-[120px] rounded-md bg-[#4162fb] text-[18px] leading-6 text-white hover:bg-[#3a54cf]"
          >
            Yes
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-10 w-[120px] rounded-md border border-[#7f8186] text-[18px] leading-6 text-[#aeb1b6] hover:bg-white/5"
          >
            NO
          </button>
        </div>
      </article>
    </div>
  )
}

