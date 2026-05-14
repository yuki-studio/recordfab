import { useEffect, useMemo, useState } from 'react'
import { X } from 'lucide-react'

type Props = {
  open: boolean
  onClose: () => void
}

export default function AuthorizeDialog({ open, onClose }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [status, setStatus] = useState<'idle' | 'verifying' | 'error'>('idle')

  const emailValue = email.trim()
  const canAuthorize = useMemo(() => emailValue.length > 0 && password.length > 0 && status !== 'verifying', [emailValue, password, status])
  const emailFormatOk = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue), [emailValue])

  useEffect(() => {
    if (status === 'error') {
      setStatus('idle')
    }
  }, [emailValue])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/45 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <article
        role="dialog"
        aria-modal="true"
        aria-labelledby="authorize-title"
        className="relative h-[550px] w-[480px] overflow-hidden rounded-xl bg-[#202020] shadow-[0_12px_40px_0_rgba(15,16,17,0.2)]"
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-5 top-5 grid size-8 place-items-center rounded-md hover:bg-white/5"
        >
          <X size={16} className="text-[#aeb1b6]" />
        </button>
        <div className="absolute left-10 top-10 flex items-center gap-3">
          <div className="grid size-[72px] place-items-center rounded-full bg-[#d8d8d8] text-[12px] text-[#595b5f]">
            Logo
          </div>
          <img
            src="/wordmark.png"
            alt=""
            className="h-[18px] w-[114px]"
            style={{ filter: 'invert(1)' }}
          />
        </div>

        <div id="authorize-title" className="absolute left-10 top-[130px] text-[14px] leading-5 text-[#eee]">
          Authorize this computer with your account.
        </div>

        <button
          type="button"
          onClick={() => window.open('https://accounts.google.com', '_blank', 'noopener,noreferrer')}
          className="absolute left-10 top-[174px] flex h-11 w-[400px] items-center overflow-hidden rounded-md"
          style={{
            background: 'linear-gradient(270deg, #4162fb 0%, #7041fb 100%)',
          }}
        >
          <div
            className="grid h-11 w-11 place-items-center bg-white"
            style={{ border: '2px solid #475ffb', borderRadius: 6 }}
          >
            <span className="text-[12px] font-semibold text-[#595b5f]">G</span>
          </div>
          <div className="flex-1 text-center text-[16px] leading-6 text-white">Sign in with Google</div>
        </button>

        <div className="absolute left-10 top-[226px] flex h-5 w-[400px] items-center gap-3">
          <div
            className="h-px flex-1"
            style={{
              background: 'linear-gradient(to left, #595b5f, rgba(89,91,95,0.16))',
            }}
          />
          <div className="text-[14px] leading-5 text-[#595b5f]">or</div>
          <div
            className="h-px flex-1"
            style={{
              background: 'linear-gradient(to right, #595b5f, rgba(89,91,95,0.16))',
            }}
          />
        </div>

        <div
          className={`absolute left-10 top-[254px] flex h-11 w-[400px] items-center gap-2 rounded-md bg-[#242426] px-4 ${
            status === 'error' ? 'border border-[#e02020]' : 'border border-transparent'
          }`}
        >
          <span className="text-[12px] text-[#595b5f]">@</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'verifying'}
            className="h-11 flex-1 bg-transparent text-[14px] leading-5 text-[#eee] outline-none placeholder:text-[#aeb1b6]"
            placeholder="Enter your E-mail"
          />
        </div>

        <div className="absolute left-10 top-[306px] flex h-11 w-[400px] items-center gap-2 rounded-md bg-[#242426] px-4">
          <span className="text-[12px] text-[#595b5f]">🔒</span>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            disabled={status === 'verifying'}
            className="h-11 flex-1 bg-transparent text-[14px] leading-5 text-[#eee] outline-none placeholder:text-[#aeb1b6]"
            placeholder="Enter your password"
          />
          <button
            type="button"
            aria-label="toggle password"
            onClick={() => setShowPassword((s) => !s)}
            className="grid size-6 place-items-center rounded hover:bg-white/5"
          >
            <span className="text-[12px] text-[#aeb1b6]">{showPassword ? '🙈' : '👁'}</span>
          </button>
        </div>

        {status === 'verifying' && (
          <div className="absolute left-10 top-[362px] text-[14px] leading-5 text-[#595b5f]">Verifying account information......</div>
        )}
        {status === 'error' && (
          <div className="absolute left-10 top-[362px] text-[14px] leading-5 text-[#e02020]">
            E-mail format is incorrect, please check it and try again.
          </div>
        )}

        <button
          type="button"
          disabled={!canAuthorize}
          onClick={() => {
            if (status === 'verifying') return
            if (!emailFormatOk) {
              setStatus('error')
              return
            }
            setStatus('verifying')
            window.setTimeout(() => {
              setStatus('idle')
              onClose()
            }, 1200)
          }}
          className="absolute left-10 top-[410px] h-11 w-[400px] rounded-lg text-[16px] leading-[18px] text-white"
          style={{ backgroundColor: canAuthorize ? '#4162fb' : '#323234' }}
        >
          Authorize
        </button>

        <div className="absolute left-[109px] top-[462px] text-[14px] leading-5 text-[#7f8288]">
          Don&apos;t have an account? Sign up free{' '}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.open('https://www.recordfab.com', '_blank', 'noopener,noreferrer')
            }}
            className="text-[#4162fb] hover:underline"
          >
            here.
          </a>
        </div>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            window.open('https://www.recordfab.com', '_blank', 'noopener,noreferrer')
          }}
          className="absolute left-[172px] top-[490px] text-[14px] leading-5 text-[#4162fb] hover:underline"
        >
          Forgot the Password?
        </a>
      </article>
    </div>
  )
}
