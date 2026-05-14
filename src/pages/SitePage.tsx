import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BrowserToolbar from '../components/BrowserToolbar'
import RecordingStatusBarV2 from '../components/RecordingStatusBarV2'
import RecordingTabStrip from '../components/RecordingTabStrip'
import RecordingOverlay from '../components/RecordingOverlay'
import WindowTitleBar from '../components/WindowTitleBar'
import TrialWelcomeDialog from '../components/TrialWelcomeDialog'
import RecordSettingDialog from '../components/RecordSettingDialog'
import { hotServices } from '../mocks/sites'
import { kickStreams, kickCategories, kickDetectedStream } from '../mocks/kick'
import { useRecording } from '../stores/recording'

export default function SitePage() {
  const { slug = '' } = useParams()
  const navigate = useNavigate()
  const detectionState = useRecording((s) => s.detectionState)
  const recordingSeconds = useRecording((s) => s.recordingSeconds)
  const enterSite = useRecording((s) => s.enterSite)
  const leaveSite = useRecording((s) => s.leaveSite)
  const clickStart = useRecording((s) => s.clickStart)
  const stopRecording = useRecording((s) => s.stopRecording)
  const unsupportedHintOpen = useRecording((s) => s.unsupportedHintOpen)
  const tabs = useRecording((s) => s.openTabs)
  const activeTabId = useRecording((s) => s.activeTabId)
  const openSiteTab = useRecording((s) => s.openSiteTab)
  const selectTab = useRecording((s) => s.selectTab)
  const requestCloseTab = useRecording((s) => s.requestCloseTab)

  const service = hotServices.find((s) => s.slug === slug)
  const displayName = service?.label ?? slug

  useEffect(() => {
    enterSite(slug, displayName)
    openSiteTab(slug, displayName)
    return () => {
      leaveSite()
    }
  }, [slug, displayName, enterSite, leaveSite, openSiteTab])

  const detected =
    detectionState === 'detected' ||
    detectionState === 'recording' ||
    detectionState === 'failed' ||
    detectionState === 'canceled'
  const recording = detectionState === 'recording'
  const baseUrl = `https://${slug}.com/`
  const detectedUrl = slug === 'kick' ? kickDetectedStream.url : baseUrl
  const detectedTabLabel = slug === 'kick' ? kickDetectedStream.tabLabel : `${displayName}...`
  const detectedRecordTitle =
    slug === 'kick'
      ? kickDetectedStream.recordTitle
      : `${displayName} Stream - Watch Live`
  const url = detected ? detectedUrl : baseUrl
  const tabLabel = detected ? detectedTabLabel : displayName
  const recordTitle = detected ? detectedRecordTitle : displayName

  return (
    <div className="flex h-full flex-col bg-[#202020]">
      <WindowTitleBar />
      <RecordingTabStrip
        tabs={tabs.map((t) => (t.id === slug ? { ...t, label: tabLabel } : t))}
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
        recordingTabId={recording ? slug : null}
      />

      <BrowserToolbar url={url} supported />

      <div className="relative flex-1 overflow-auto bg-[#202020]">
        {!detected ? (
          slug === 'kick' ? (
            <KickBrowseView />
          ) : (
            <GenericBrowseView name={displayName} />
          )
        ) : (
          <DetectedView />
        )}

        {recording ? <RecordingOverlay recordingSeconds={recordingSeconds} /> : null}
      </div>

      <RecordingStatusBarV2
        detectionState={detectionState}
        unsupportedHintOpen={unsupportedHintOpen}
        onStart={clickStart}
        onStop={stopRecording}
      />
      <TrialWelcomeDialog />
      <RecordSettingDialog recordTitle={recordTitle} />
    </div>
  )
}

function KickBrowseView() {
  return (
    <div className="space-y-6 px-6 py-5">
      <header className="flex items-center justify-between">
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-bold text-emerald-500">KICK</span>
          <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700">
            BETA
          </span>
        </div>
        <div className="flex items-center gap-3 text-[#aeb1b6]">
          <span>📹</span>
          <span>🌐</span>
          <span>🔍</span>
          <span>👤</span>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kickStreams.map((stream) => (
          <article
            key={stream.id}
            className="overflow-hidden rounded-lg border border-[#292929] bg-[#161719] shadow-sm"
          >
            <div
              className="relative aspect-video"
              style={{ background: stream.thumb }}
            >
              <span className="absolute left-2 top-2 rounded bg-rose-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                LIVE
              </span>
              <span className="absolute right-2 top-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white">
                {stream.watchers} watching
              </span>
            </div>
            <div className="space-y-1.5 p-3">
              <h3 className="text-sm font-semibold text-[#eee]">
                {stream.title}
              </h3>
              <p className="text-xs text-[#aeb1b6]">{stream.category}</p>
              <strong className="block text-xs text-[#eee]">
                {stream.streamer}
              </strong>
              <div className="flex flex-wrap gap-1 pt-1">
                {stream.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-[#202020] px-1.5 py-0.5 text-[10px] text-[#aeb1b6]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="flex items-end justify-between border-b border-[#292929] pb-2">
        <h2 className="text-base font-semibold text-[#eee]">Top Live Categories</h2>
        <a className="text-xs text-emerald-600" href="#">
          View all
        </a>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {kickCategories.map((cat) => (
          <article
            key={cat.id}
            className="grid aspect-[3/4] place-items-center rounded-lg p-3 text-center text-xs font-bold uppercase shadow-sm"
            style={{ background: cat.background, color: cat.text ?? '#fff' }}
          >
            {cat.label}
          </article>
        ))}
      </div>
    </div>
  )
}

function GenericBrowseView({ name }: { name: string }) {
  return (
    <div className="grid h-full place-items-center px-6 py-12 text-center">
      <div className="max-w-md space-y-3">
        <div className="text-2xl font-semibold text-[#eee]">{name} Site</div>
        <p className="text-sm text-[#aeb1b6]">
          This is a placeholder browsing view for {name}. The real site content will be loaded here in the RecordFab client shell.
        </p>
        <p className="text-xs text-[#595b5f]">
          The prototype simulates "video detected" after 1.8 seconds to demonstrate the recording flow.
        </p>
      </div>
    </div>
  )
}

function DetectedView() {
  return (
    <div className="relative grid h-full place-items-center bg-gradient-to-br from-[#2a2a2a] via-[#242424] to-[#3a2a33]">
      <div className="relative h-72 w-[480px] overflow-hidden rounded-2xl bg-gradient-to-br from-purple-200 via-rose-200 to-pink-200 shadow-md">
        <span className="absolute left-4 top-4 -rotate-6 select-none font-mono text-3xl font-black uppercase tracking-tight text-white/85 drop-shadow-md">
          BOOBSY
        </span>
        <span className="absolute right-4 top-4 rotate-6 select-none font-mono text-2xl font-black uppercase tracking-tight text-rose-500 drop-shadow-md">
          LIVE
        </span>
        <div className="absolute inset-x-12 top-16 mx-auto h-32 rounded-2xl bg-amber-700/60 shadow-inner" />
        <div className="absolute bottom-6 left-12 h-16 w-16 rounded-full bg-rose-400" />
        <div className="absolute bottom-6 left-32 h-16 w-12 rounded-full bg-amber-300" />
        <div className="absolute bottom-6 right-32 h-16 w-12 rounded-full bg-purple-400" />
        <div className="absolute bottom-6 right-12 h-16 w-16 rounded-full bg-pink-400" />
      </div>
      <p className="mt-4 text-xs text-[#595b5f]">
        (Demo only: simulated detected stream)
      </p>
    </div>
  )
}
