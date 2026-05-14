import { X } from 'lucide-react'

type Props = {
  open: boolean
  onClose: () => void
}

export default function LicenseInfoDialog({ open, onClose }: Props) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/45 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <article
        role="dialog"
        aria-modal="true"
        aria-labelledby="license-info-title"
        className="relative h-[274px] w-[480px] overflow-hidden rounded-xl bg-[#202020] shadow-[0_12px_40px_0_rgba(15,16,17,0.2)]"
      >
        <div className="px-8 pt-[18px]">
          <div className="flex items-center justify-between">
            <h2 id="license-info-title" className="text-[14px] leading-5 text-[#eee]">
              RecordFab
            </h2>
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="grid size-8 place-items-center rounded-md hover:bg-white/5"
            >
              <X size={16} className="text-[#aeb1b6]" />
            </button>
          </div>
        </div>

        <div className="absolute left-8 top-[70px] flex items-center gap-3">
          <img src="/logo.png" alt="" className="size-[72px]" />
          <div className="min-w-0">
            <img
              src="/wordmark.png"
              alt=""
              className="h-[18px] w-[114px]"
              style={{ filter: 'invert(1)' }}
            />
            <div className="mt-[8px] text-[14px] leading-5 text-[#595b5f]">
              Version: 13.0.0.0 (28/2/2023)
            </div>
          </div>
        </div>

        <div className="absolute left-8 top-[166px] w-[416px] text-[14px] leading-5 text-[#eee]">
          <div className="flex h-7 items-center">
            <span className="truncate">License Status: Authorized(Nora@gmail.com)</span>
          </div>
          <div className="flex h-7 items-center justify-between">
            <span className="truncate pr-4">License Edition: Paid version</span>
            <button
              type="button"
              onClick={() => window.open('https://www.recordfab.com', '_blank', 'noopener,noreferrer')}
              className="shrink-0 text-[#4162fb] hover:underline"
            >
              Buy Now
            </button>
          </div>
          <div className="flex h-7 items-center">
            <span className="truncate">License Expiration Date: Never Expired</span>
          </div>
        </div>
      </article>
    </div>
  )
}

