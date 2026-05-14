import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  RotateCw,
} from 'lucide-react'
import { allSites, hotServices, supportedSiteCount } from '../mocks/sites'
import RecordingTabStrip from '../components/RecordingTabStrip'
import WindowTitleBar from '../components/WindowTitleBar'
import { PRODUCT_URL } from '../constants/urls'
import { useRecording } from '../stores/recording'
import SearchHistoryDropdown from '../components/SearchHistoryDropdown'

export default function HomePage() {
  const navigate = useNavigate()
  const contentRef = useRef<HTMLDivElement>(null)
  const letterRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const tabs = useRecording((s) => s.openTabs)
  const activeTabId = useRecording((s) => s.activeTabId)
  const openSiteTab = useRecording((s) => s.openSiteTab)
  const selectTab = useRecording((s) => s.selectTab)
  const requestCloseTab = useRecording((s) => s.requestCloseTab)
  const detectionState = useRecording((s) => s.detectionState)
  const history = useRecording((s) => s.searchHistory)
  const addHistory = useRecording((s) => s.addSearchHistory)
  const removeHistory = useRecording((s) => s.removeSearchHistory)
  const openWelcomeOnce = useRecording((s) => s.openWelcomeOnce)

  const letters = useMemo(() => allSites.map((g) => g.letter), [])

  useLayoutEffect(() => {
    selectTab('home')
    openWelcomeOnce()
  }, [selectTab, openWelcomeOnce])

  const handleLetterClick = (letter: string) => {
    letterRefs.current[letter]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="flex h-full flex-col bg-[#202020] font-[Arial,sans-serif] text-[#eee]">
      <WindowTitleBar />
      <RecordingTabStrip
        tabs={tabs}
        activeTabId={activeTabId}
        onSelect={(id) => {
          selectTab(id)
          if (id === 'home') {
            navigate('/')
          } else {
            navigate(`/site/${id}`)
          }
        }}
        onCloseTab={(id) => {
          requestCloseTab(id)
          if (detectionState !== 'recording' && id === activeTabId) {
            navigate('/')
          }
        }}
      />
      <AddressBar
        history={history}
        onSelectDomain={(domain) => {
          addHistory(domain)
          const slug = domain.split('.')[0].toLowerCase()
          const service = hotServices.find((s) => s.slug === slug)
          openSiteTab(slug, service?.label ?? slug, service?.slug === 'netflix' ? '/figma/tab_icon_netflix.svg' : undefined)
          navigate(`/site/${slug}`)
        }}
        onRemoveDomain={removeHistory}
      />

      <div ref={contentRef} className="relative flex-1 overflow-auto">
        <div className="flex">
          <div className="min-w-0 flex-1 px-8 pb-10 pt-6">
            <section>
              <h2 className="text-[20px] font-bold leading-7 text-[#eee]">Hot Services</h2>
              <p className="mt-3 text-[14px] leading-5 text-[#aeb1b6]">
                Record 1080p/720p videos from Amazon, Netflix, Disney Plus and the other streaming services.
                <a href={PRODUCT_URL} target="_blank" rel="noreferrer" className="ml-1 text-[#4162fb] hover:underline">More Info…</a>
              </p>

              <div className="mt-5 grid grid-cols-5 gap-4">
                {hotServices.map((s) => (
                  <Link
                    key={s.id}
                    to={`/site/${s.slug}`}
                    onClick={() => {
                      openSiteTab(s.slug, s.label)
                    }}
                    className="group relative block aspect-[16/9] overflow-hidden rounded-md transition hover:ring-2 hover:ring-[#4162fb]"
                  >
                    {s.image ? (
                      <img
                        src={s.image}
                        alt={s.label}
                        className="absolute inset-0 size-full object-cover"
                      />
                    ) : (
                      <div
                        className="absolute inset-0 grid place-items-center"
                        style={{ background: s.background ?? '#333', color: s.text ?? '#fff' }}
                      >
                        <span className="font-semibold">{s.label}</span>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </section>

            <section className="mt-10">
              <h2 className="text-[20px] font-bold leading-7 text-[#eee]">All Supported Sites</h2>
              <p className="mt-3 text-[14px] leading-5 text-[#aeb1b6]">
                Securely and efficiently record videos from more than {supportedSiteCount} sites. Explore our expanding platform list below.
              </p>

              <div className="mt-6 flex flex-col gap-8">
                {allSites.map((group) => (
                  <div
                    key={group.letter}
                    ref={(el) => {
                      letterRefs.current[group.letter] = el
                    }}
                  >
                    <div className="text-[20px] font-bold leading-7 text-[#eee]">
                      {group.letter}
                    </div>
                    <div className="mt-3 border-t border-[#292929] pt-3">
                      <ul className="grid grid-cols-5 gap-x-6 gap-y-2 text-[14px] leading-5 text-[#aeb1b6]">
                        {group.domains.map((d) => (
                          <li key={d}>
                            <a
                              href="#"
                              className="block truncate hover:text-[#4162fb]"
                              title={d}
                            >
                              {d}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <LetterAnchor letters={letters} onSelect={handleLetterClick} />
        </div>
      </div>
    </div>
  )
}

function AddressBar({
  history,
  onSelectDomain,
  onRemoveDomain,
}: {
  history: string[]
  onSelectDomain: (domain: string) => void
  onRemoveDomain: (domain: string) => void
}) {
  const [open, setOpen] = useState(false)
  const openHistoryDialog = useRecording((s) => s.openHistoryDialog)
  return (
    <div className="flex h-11 flex-none items-center gap-3 border-b border-[#161719] bg-[#202020] px-4">
      <button type="button" aria-label="back" className="grid h-8 w-8 place-items-center rounded-md hover:bg-white/5">
        <ArrowLeft size={17} strokeWidth={1.75} className="text-[#74777d]" />
      </button>
      <button type="button" aria-label="forward" className="grid h-8 w-8 place-items-center rounded-md hover:bg-white/5">
        <ArrowRight size={17} strokeWidth={1.75} className="text-[#74777d]" />
      </button>
      <button type="button" aria-label="refresh" className="grid h-8 w-8 place-items-center rounded-md hover:bg-white/5">
        <RotateCw size={17} strokeWidth={1.75} className="text-[#74777d]" />
      </button>

      <div className="relative flex-1 min-w-0">
        <div
          className="flex h-7 w-full items-center gap-2 rounded-md bg-[#161719] px-3 text-[14px] leading-5 text-[#595b5f]"
          style={{ border: open ? '1px solid #4162fb' : '1px solid transparent' }}
          onClick={() => setOpen(true)}
          role="button"
          tabIndex={0}
        >
          <img src="/figma/nav_icon_search.svg" alt="" className="size-4" />
          <input
            className="w-full bg-transparent outline-none placeholder:text-[#595b5f]"
            placeholder="search or visit a website"
            onFocus={() => setOpen(true)}
          />
        </div>
        <SearchHistoryDropdown
          open={open}
          items={history}
          onClose={() => setOpen(false)}
          onRemove={onRemoveDomain}
          onSelect={(domain) => {
            setOpen(false)
            onSelectDomain(domain)
          }}
        />
      </div>

      <button
        type="button"
        aria-label="history"
        onClick={openHistoryDialog}
        className="grid h-7 w-7 place-items-center rounded hover:bg-white/5"
      >
        <img src="/figma/nav_icon_history.svg" alt="" className="size-4" />
      </button>
    </div>
  )
}

function LetterAnchor({
  letters,
  onSelect,
}: {
  letters: string[]
  onSelect: (letter: string) => void
}) {
  return (
    <aside
      aria-label="letter index"
      className="sticky top-0 flex h-fit w-12 flex-none flex-col items-center gap-1 px-2 py-6 text-[12px] leading-4 text-[#aeb1b6]"
    >
      {letters.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => onSelect(l)}
          className="grid w-full place-items-center rounded text-center hover:text-[#eee]"
        >
          {l}
        </button>
      ))}
    </aside>
  )
}
