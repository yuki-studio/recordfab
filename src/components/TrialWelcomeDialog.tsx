import { X } from 'lucide-react'
import { useRecording } from '../stores/recording'
import { PURCHASE_URL } from '../constants/urls'

const BENEFITS = [
  { icon: '/figma/icon_features.svg', label: 'Access to all features' },
  { icon: '/figma/icon_unlimited.svg', label: 'Unlimited processing' },
  { icon: '/figma/icon_lightning.svg', label: 'High speed batch processing' },
  { icon: '/figma/icon_protection.svg', label: 'Privacy Protection' },
  { icon: '/figma/icon_diamond.svg', label: 'Professional technical support' },
  { icon: '/figma/icon_rocket.svg', label: 'Free updates within period of validity' },
]

export default function TrialWelcomeDialog() {
  const open = useRecording((s) => s.trialWelcomeOpen)
  const close = useRecording((s) => s.closeTrialWelcome)
  const continueToSetting = useRecording((s) => s.trialContinue)

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/45 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <article
        role="dialog"
        aria-modal="true"
        aria-labelledby="trial-welcome-title"
        className="relative h-[422px] w-[740px] overflow-hidden rounded-xl bg-[#202020] shadow-xl"
      >
        <div className="absolute left-0 top-0 h-[134px] w-full bg-[#202020]" style={{ boxShadow: 'inset 0 -1px 0 #2a2a2c' }}>
          <div className="absolute right-[-80px] top-[-40px] select-none text-[120px] font-black leading-none text-white/10">
            RecordFab
          </div>
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(32,32,32,0) 60.4%, rgba(32,32,32,0.8) 100%)',
            }}
          />
          <img
            src="/wordmark.png"
            alt=""
            className="absolute left-10 top-10 h-[18px] w-[114px]"
            style={{ filter: 'invert(1)' }}
          />
        </div>

        <button
          type="button"
          aria-label="Close"
          onClick={close}
          className="absolute right-5 top-5 grid size-8 place-items-center rounded-md hover:bg-white/5"
        >
          <X size={16} className="text-[#aeb1b6]" />
        </button>

        <p
          id="trial-welcome-title"
          className="absolute left-10 top-[74px] w-[500px] text-[14px] leading-5"
        >
          <span className="text-[#aeb1b6]">You are in the </span>
          <span className="font-bold text-[#eee]">trial version</span>
          <span className="text-[#aeb1b6]">, 3 videos can be recorded.</span>
          <br />
          <span className="text-[#aeb1b6]">Upgrade to the paid version to enjoy all benefits.</span>
        </p>

        <div className="absolute left-10 top-[154px] text-[16px] font-bold leading-5 text-[#eee]">
          Benefits of Paid Version
        </div>

        <div className="absolute left-10 top-[198px] grid w-[660px] grid-cols-2 gap-x-[76px] gap-y-6">
          {BENEFITS.map((b) => (
            <div key={b.label} className="flex items-center gap-2">
              <img src={b.icon} alt="" className="size-6" />
              <div className="text-[14px] leading-5 text-[#eee]">{b.label}</div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-10 right-10 flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              window.open(PURCHASE_URL, '_blank', 'noopener,noreferrer')
              close()
            }}
            className="h-8 w-[104px] rounded-md bg-[#4162fb] text-[14px] leading-5 text-white hover:bg-[#3a54cf]"
          >
            Update Now
          </button>
          <button
            type="button"
            onClick={continueToSetting}
            className="h-8 w-[104px] rounded-md border border-[#7f8186] text-[14px] leading-5 text-[#aeb1b6] hover:bg-white/5"
          >
            Continue
          </button>
        </div>
      </article>
    </div>
  )
}
