import { X } from 'lucide-react'
import { PRODUCT_URL, PURCHASE_URL } from '../constants/urls'
import { useRecording } from '../stores/recording'

const BENEFITS = [
  { icon: '/figma/icon_features.svg', label: 'Access to all features' },
  { icon: '/figma/icon_unlimited.svg', label: 'Unlimited processing' },
  { icon: '/figma/icon_lightning.svg', label: 'High speed batch processing' },
  { icon: '/figma/icon_protection.svg', label: 'Privacy Protection' },
  { icon: '/figma/icon_diamond.svg', label: 'Professional technical support' },
  { icon: '/figma/icon_rocket.svg', label: 'Free updates within period of validity' },
]

const BENEFIT_ROWS: Array<
  [{ icon: string; label: string }, { icon: string; label: string }]
> = [
  [BENEFITS[0], BENEFITS[1]],
  [BENEFITS[2], BENEFITS[3]],
  [BENEFITS[4], BENEFITS[5]],
]

export default function WelcomeDialog() {
  const open = useRecording((s) => s.welcomeOpen)
  const close = useRecording((s) => s.closeWelcome)
  const openAuthorize = useRecording((s) => s.openAuthorizeDialog)

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/45 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <article
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-title"
        className="relative h-[482px] w-[740px] overflow-hidden rounded-xl bg-[#202020] shadow-[0_12px_40px_0_rgba(15,16,17,0.2)]"
      >
        <div className="absolute left-0 top-0 h-[118px] w-full overflow-hidden rounded-t-xl">
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(120deg, rgba(65,98,251,0.9) 0%, rgba(112,65,251,0.9) 40%, rgba(32,32,32,0.9) 100%)',
            }}
          />
          <div className="absolute -left-16 -top-20 size-[240px] rounded-full bg-[#4162fb]/40 blur-[40px]" />
          <div className="absolute left-[220px] -top-24 size-[220px] rounded-full bg-[#7041fb]/35 blur-[44px]" />
          <div className="absolute -right-24 top-2 size-[240px] rounded-full bg-[#6a8bff]/20 blur-[46px]" />
          <div className="absolute left-24 top-10 size-2 rounded-full bg-white/60" />
          <div className="absolute left-40 top-6 size-1.5 rounded-full bg-white/50" />
          <div className="absolute left-[320px] top-14 size-1.5 rounded-full bg-white/40" />
          <div className="absolute right-44 top-10 size-2 rounded-full bg-white/40" />
          <div className="absolute right-28 top-6 size-1.5 rounded-full bg-white/30" />
        </div>

        <button
          type="button"
          aria-label="Close"
          onClick={close}
          className="absolute right-5 top-5 grid size-8 place-items-center rounded-md hover:bg-white/5"
        >
          <X size={16} className="text-[#aeb1b6]" />
        </button>

        <div
          id="welcome-title"
          className="absolute left-1/2 top-[66px] w-[324px] -translate-x-1/2 text-center text-[24px] font-bold leading-9 text-white"
        >
          Welcome to use RecordFab!
        </div>

        <div className="absolute left-10 top-[134px] h-10 w-[660px] text-[14px] leading-none text-[#eee]">
          <span className="leading-5">
            Easily record any stream in up to 1080p at lightning-fast speed with the ultimate recording solution, and enjoy your
            offline videos anytime, anywhere.{` `}
          </span>
          <a
            href={PRODUCT_URL}
            target="_blank"
            rel="noreferrer"
            className="leading-5 text-[#4162fb] hover:underline"
          >
            More Info...
          </a>
        </div>

        <div className="absolute left-10 top-[214px] text-[16px] font-bold leading-5 text-[#eee]">
          Benefits of Paid Version
        </div>

        <div className="absolute left-10 top-[258px] w-[660px]">
          {BENEFIT_ROWS.map((row, idx) => (
            <div
              key={row[0].label}
              className="absolute left-0 h-6 w-full"
              style={{ top: idx * 48 }}
            >
              <BenefitCell benefit={row[0]} left={0} />
              <BenefitCell benefit={row[1]} left={368} />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => window.open(PURCHASE_URL, '_blank', 'noopener,noreferrer')}
          className="absolute left-10 top-[410px] h-8 w-[88px] rounded-md border border-[#7f8186] text-[14px] leading-5 text-[#aeb1b6] hover:bg-white/5"
        >
          Buy Now
        </button>
        <button
          type="button"
          onClick={() => {
            close()
            openAuthorize()
          }}
          className="absolute left-[136px] top-[410px] h-8 w-[88px] rounded-md border border-[#7f8186] text-[14px] leading-5 text-[#aeb1b6] hover:bg-white/5"
        >
          Authorize
        </button>
        <button
          type="button"
          onClick={() => {
            close()
            openAuthorize()
          }}
          className="absolute left-[570px] top-[410px] h-8 w-[130px] rounded-md bg-[#4162fb] text-[14px] leading-5 text-white hover:bg-[#3a54cf]"
        >
          Start Free Trial
        </button>
      </article>
    </div>
  )
}

function BenefitCell({
  benefit,
  left,
}: {
  benefit: { icon: string; label: string }
  left: number
}) {
  return (
    <div className="absolute top-0 h-6 w-[292px]" style={{ left }}>
      <img src={benefit.icon} alt="" className="absolute left-0 top-0 size-6" />
      <div className="absolute left-8 top-[2px] w-[260px] text-[14px] leading-5 text-[#eee]">
        {benefit.label}
      </div>
    </div>
  )
}
