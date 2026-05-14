import { create } from 'zustand'

export type DetectionState =
  | 'idle' // 无站点（home 或 files）
  | 'detecting' // 站点首页，正在检测
  | 'detected' // 已检测到视频，可开始
  | 'unsupported' // 检测到但不可录制
  | 'recording' // 录制中
  | 'failed' // 录制失败
  | 'canceled' // 取消录制

export type Resolution = 'Full HD - 1080P' | 'HD - 720P' | 'Smooth - 540P'
export type Speed = '1x (Default)' | '1.25x' | '1.5x'

export type SavedFile = {
  id: string
  title: string
  site: string
  resolution: Resolution
  durationSeconds: number
  finishedAt: number
}

export type AppTab = {
  id: string
  label: string
  iconHome?: boolean
  iconSrc?: string
  width?: number
}

export type BrowserHistoryItem = {
  id: string
  siteSlug: string
  title: string
  url: string
  visitedAt: number
}

export type LicenseSubscriptionType = 'trial' | 'subscription' | 'lifetime'

export type LicenseInfoView =
  | {
      mode: 'success'
      email: string
      subscription: LicenseSubscriptionType
    }
  | {
      mode: 'failure'
    }

type RecordingState = {
  detectionState: DetectionState
  currentSiteSlug: string | null
  currentSiteName: string
  detectionTimer: number | null
  recordingSeconds: number
  recordingTicker: number | null
  welcomeOpen: boolean
  welcomeShownThisSession: boolean
  trialWelcomeOpen: boolean
  recordSettingOpen: boolean
  unsupportedHintOpen: boolean
  resolution: Resolution
  speed: Speed
  customDuration: boolean
  stopAfterMinutes: number
  isPaid: boolean
  trialRemaining: number
  files: SavedFile[]

  openTabs: AppTab[]
  activeTabId: string
  closeTabConfirmOpen: boolean
  closeTabConfirmTargetId: string | null
  searchHistory: string[]
  historyDialogOpen: boolean
  clearHistoryConfirmOpen: boolean
  browserHistory: BrowserHistoryItem[]
  authorizeDialogOpen: boolean
  licenseInfoDialogOpen: boolean
  licenseInfoView: LicenseInfoView

  openWelcomeOnce: () => void
  closeWelcome: () => void
  enterSite: (slug: string, name: string) => void
  finishDetection: () => void
  leaveSite: () => void
  clickStart: () => void
  closeTrialWelcome: () => void
  trialContinue: () => void
  openRecordSetting: () => void
  closeRecordSetting: () => void
  setResolution: (value: Resolution) => void
  setSpeed: (value: Speed) => void
  toggleCustomDuration: () => void
  setStopAfterMinutes: (value: number) => void
  startRecording: () => void
  stopRecording: () => void
  cancelRecording: () => void
  failRecording: () => void

  openSiteTab: (slug: string, label: string, iconSrc?: string) => void
  selectTab: (id: string) => void
  requestCloseTab: (id: string) => void
  cancelCloseTab: () => void
  confirmCloseTab: () => void

  addSearchHistory: (domain: string) => void
  removeSearchHistory: (domain: string) => void

  openHistoryDialog: () => void
  closeHistoryDialog: () => void
  requestClearHistory: () => void
  cancelClearHistory: () => void
  confirmClearHistory: () => void
  removeBrowserHistoryItem: (id: string) => void

  openAuthorizeDialog: () => void
  closeAuthorizeDialog: () => void
  openLicenseInfoDialog: (view?: LicenseInfoView) => void
  closeLicenseInfoDialog: () => void
}

let detectionTimerHandle: ReturnType<typeof setTimeout> | null = null
let recordingTickerHandle: ReturnType<typeof setInterval> | null = null
let unsupportedHintHandle: ReturnType<typeof setTimeout> | null = null

const RECORDING_STARTING_SECONDS = 5
const HOME_TAB: AppTab = { id: 'home', label: 'Home', iconHome: true }
const INITIAL_SEARCH_HISTORY = ['netflix.com', 'abcdef.com', 'amazon.com', 'joyn.com', 'ABCdef.com']
const INITIAL_BROWSER_HISTORY: BrowserHistoryItem[] = [
  {
    id: 'h-20240918-1',
    siteSlug: 'netflix',
    title: 'Netflix - Watch TV Shows Online',
    url: 'https://netflix.com/',
    visitedAt: new Date('2024-09-18T09:12:00Z').getTime(),
  },
  {
    id: 'h-20240918-2',
    siteSlug: 'prime',
    title: 'Prime Video',
    url: 'https://prime.com/',
    visitedAt: new Date('2024-09-18T08:31:00Z').getTime(),
  },
  {
    id: 'h-20240918-3',
    siteSlug: 'hbo',
    title: 'HBO',
    url: 'https://hbo.com/',
    visitedAt: new Date('2024-09-18T07:20:00Z').getTime(),
  },
  {
    id: 'h-20240918-4',
    siteSlug: 'espn',
    title: 'Stream ESPN+ Live Games',
    url: 'https://espn.com/',
    visitedAt: new Date('2024-09-18T06:05:00Z').getTime(),
  },
  {
    id: 'h-20240808-1',
    siteSlug: 'netflix',
    title: 'Netflix - Watch TV Shows Online',
    url: 'https://netflix.com/',
    visitedAt: new Date('2024-08-08T09:18:00Z').getTime(),
  },
  {
    id: 'h-20240808-2',
    siteSlug: 'amazon',
    title: 'Amazon.com. Spend less. Smile more.',
    url: 'https://amazon.com/',
    visitedAt: new Date('2024-08-08T08:41:00Z').getTime(),
  },
  {
    id: 'h-20240808-3',
    siteSlug: 'joyn',
    title: 'JOY' + 'N',
    url: 'https://joyn.com/',
    visitedAt: new Date('2024-08-08T07:22:00Z').getTime(),
  },
]

const INITIAL_FILES: SavedFile[] = [
  {
    id: 'file-1',
    title: 'This is the tittle of the Video',
    site: 'netflix',
    resolution: 'Full HD - 1080P',
    durationSeconds: 7 * 60 + 5,
    finishedAt: Date.now() - 1000 * 60 * 60 * 2,
  },
  {
    id: 'file-2',
    title: 'This is the tittle of the Video',
    site: 'prime',
    resolution: 'HD - 720P',
    durationSeconds: 24 * 60 + 9,
    finishedAt: Date.now() - 1000 * 60 * 60 * 8,
  },
  {
    id: 'file-3',
    title: 'This is the tittle of the Video',
    site: 'hbo',
    resolution: 'Smooth - 540P',
    durationSeconds: 12 * 60 + 34,
    finishedAt: Date.now() - 1000 * 60 * 60 * 24,
  },
]

export const useRecording = create<RecordingState>((set, get) => ({
  detectionState: 'idle',
  currentSiteSlug: null,
  currentSiteName: '',
  detectionTimer: null,
  recordingSeconds: RECORDING_STARTING_SECONDS,
  recordingTicker: null,
  welcomeOpen: false,
  welcomeShownThisSession: false,
  trialWelcomeOpen: false,
  recordSettingOpen: false,
  unsupportedHintOpen: false,
  resolution: 'Full HD - 1080P',
  speed: '1x (Default)',
  customDuration: true,
  stopAfterMinutes: 2,
  isPaid: false,
  trialRemaining: 3,
  files: INITIAL_FILES,

  openTabs: [HOME_TAB],
  activeTabId: 'home',
  closeTabConfirmOpen: false,
  closeTabConfirmTargetId: null,
  searchHistory: INITIAL_SEARCH_HISTORY,
  historyDialogOpen: false,
  clearHistoryConfirmOpen: false,
  browserHistory: INITIAL_BROWSER_HISTORY,
  authorizeDialogOpen: false,
  licenseInfoDialogOpen: false,
  licenseInfoView: { mode: 'success', email: 'Nora@gmail.com', subscription: 'lifetime' },

  openWelcomeOnce: () => {
    const state = get()
    if (state.welcomeShownThisSession) return
    set({ welcomeOpen: true, welcomeShownThisSession: true })
  },
  closeWelcome: () => set({ welcomeOpen: false }),

  enterSite: (slug, name) => {
    if (detectionTimerHandle) {
      clearTimeout(detectionTimerHandle)
    }
    if (recordingTickerHandle) {
      clearInterval(recordingTickerHandle)
    }
    if (unsupportedHintHandle) {
      clearTimeout(unsupportedHintHandle)
    }
    detectionTimerHandle = setTimeout(() => {
      get().finishDetection()
    }, 1800)
    set({
      detectionState: 'detecting',
      currentSiteSlug: slug,
      currentSiteName: name,
      recordingSeconds: RECORDING_STARTING_SECONDS,
      trialWelcomeOpen: false,
      recordSettingOpen: false,
      unsupportedHintOpen: false,
    })
    set((s) => ({
      browserHistory: [
        {
          id: `h-${Date.now()}`,
          siteSlug: slug,
          title: name,
          url: `https://${slug}.com/`,
          visitedAt: Date.now(),
        },
        ...s.browserHistory,
      ].slice(0, 100),
    }))
  },

  finishDetection: () => {
    const state = get()
    if (state.detectionState === 'detecting') {
      set({ detectionState: 'detected' })
    }
  },

  leaveSite: () => {
    if (detectionTimerHandle) {
      clearTimeout(detectionTimerHandle)
      detectionTimerHandle = null
    }
    if (recordingTickerHandle) {
      clearInterval(recordingTickerHandle)
      recordingTickerHandle = null
    }
    if (unsupportedHintHandle) {
      clearTimeout(unsupportedHintHandle)
      unsupportedHintHandle = null
    }
    set({
      detectionState: 'idle',
      currentSiteSlug: null,
      currentSiteName: '',
      recordingSeconds: RECORDING_STARTING_SECONDS,
      trialWelcomeOpen: false,
      recordSettingOpen: false,
      unsupportedHintOpen: false,
    })
  },

  clickStart: () => {
    const state = get()
    if (state.detectionState === 'unsupported') {
      if (unsupportedHintHandle) {
        clearTimeout(unsupportedHintHandle)
      }
      set({ unsupportedHintOpen: true })
      unsupportedHintHandle = setTimeout(() => {
        set({ unsupportedHintOpen: false })
      }, 2500)
      return
    }
    if (state.detectionState !== 'detected' && state.detectionState !== 'failed' && state.detectionState !== 'canceled') {
      return
    }
    if (state.isPaid) {
      set({ recordSettingOpen: true })
      return
    }
    if (state.trialRemaining <= 0) {
      set({ trialWelcomeOpen: true })
      return
    }
    set({ trialWelcomeOpen: true })
  },

  closeTrialWelcome: () => set({ trialWelcomeOpen: false }),
  trialContinue: () => set({ trialWelcomeOpen: false, recordSettingOpen: true }),
  openRecordSetting: () => set({ recordSettingOpen: true }),
  closeRecordSetting: () => set({ recordSettingOpen: false }),

  setResolution: (value) => set({ resolution: value }),
  setSpeed: (value) => set({ speed: value }),
  toggleCustomDuration: () =>
    set((state) => ({ customDuration: !state.customDuration })),
  setStopAfterMinutes: (value) =>
    set({ stopAfterMinutes: Math.max(1, Math.min(999, Math.floor(value))) }),

  startRecording: () => {
    if (recordingTickerHandle) {
      clearInterval(recordingTickerHandle)
    }
    set({
      detectionState: 'recording',
      trialWelcomeOpen: false,
      recordSettingOpen: false,
      recordingSeconds: RECORDING_STARTING_SECONDS,
      trialRemaining: get().isPaid ? get().trialRemaining : Math.max(0, get().trialRemaining - 1),
    })
    recordingTickerHandle = setInterval(() => {
      set((state) => ({ recordingSeconds: state.recordingSeconds + 1 }))
    }, 1000)
  },

  stopRecording: () => {
    if (recordingTickerHandle) {
      clearInterval(recordingTickerHandle)
      recordingTickerHandle = null
    }
    const state = get()
    const file: SavedFile = {
      id: `file-${Date.now()}`,
      title: state.currentSiteName,
      site: state.currentSiteSlug ?? '',
      resolution: state.resolution,
      durationSeconds: state.recordingSeconds,
      finishedAt: Date.now(),
    }
    set({
      detectionState: 'detected',
      recordingSeconds: RECORDING_STARTING_SECONDS,
      files: [file, ...state.files],
    })
  },

  cancelRecording: () => {
    if (recordingTickerHandle) {
      clearInterval(recordingTickerHandle)
      recordingTickerHandle = null
    }
    set({
      detectionState: 'canceled',
      recordingSeconds: RECORDING_STARTING_SECONDS,
    })
  },

  failRecording: () => {
    if (recordingTickerHandle) {
      clearInterval(recordingTickerHandle)
      recordingTickerHandle = null
    }
    set({
      detectionState: 'failed',
      recordingSeconds: RECORDING_STARTING_SECONDS,
    })
  },

  openSiteTab: (slug, label, iconSrc) =>
    set((state) => {
      const next = state.openTabs.some((t) => t.id === slug)
        ? state.openTabs
        : [...state.openTabs, { id: slug, label, iconSrc }]
      return { openTabs: next, activeTabId: slug }
    }),
  selectTab: (id) => set({ activeTabId: id }),
  requestCloseTab: (id) => {
    const state = get()
    if (id === 'home') return
    if (state.detectionState === 'recording') {
      set({ closeTabConfirmOpen: true, closeTabConfirmTargetId: id })
      return
    }
    set((s) => {
      const next = s.openTabs.filter((t) => t.id !== id)
      return { openTabs: next, activeTabId: s.activeTabId === id ? 'home' : s.activeTabId }
    })
  },
  cancelCloseTab: () => set({ closeTabConfirmOpen: false, closeTabConfirmTargetId: null }),
  confirmCloseTab: () => {
    const state = get()
    const id = state.closeTabConfirmTargetId
    if (!id) {
      set({ closeTabConfirmOpen: false, closeTabConfirmTargetId: null })
      return
    }
    if (state.detectionState === 'recording') {
      state.cancelRecording()
    }
    set((s) => {
      const next = s.openTabs.filter((t) => t.id !== id)
      return {
        openTabs: next,
        activeTabId: s.activeTabId === id ? 'home' : s.activeTabId,
        closeTabConfirmOpen: false,
        closeTabConfirmTargetId: null,
      }
    })
  },

  addSearchHistory: (domain) =>
    set((state) => {
      const d = domain.trim()
      if (!d) return state
      const next = [d, ...state.searchHistory.filter((x) => x.toLowerCase() !== d.toLowerCase())].slice(0, 5)
      return { searchHistory: next }
    }),
  removeSearchHistory: (domain) =>
    set((state) => ({
      searchHistory: state.searchHistory.filter((x) => x.toLowerCase() !== domain.toLowerCase()),
    })),

  openHistoryDialog: () => set({ historyDialogOpen: true }),
  closeHistoryDialog: () => set({ historyDialogOpen: false, clearHistoryConfirmOpen: false }),
  requestClearHistory: () => set({ clearHistoryConfirmOpen: true }),
  cancelClearHistory: () => set({ clearHistoryConfirmOpen: false }),
  confirmClearHistory: () => set({ browserHistory: [], clearHistoryConfirmOpen: false }),
  removeBrowserHistoryItem: (id) =>
    set((state) => ({ browserHistory: state.browserHistory.filter((x) => x.id !== id) })),

  openAuthorizeDialog: () => set({ authorizeDialogOpen: true }),
  closeAuthorizeDialog: () => set({ authorizeDialogOpen: false }),
  openLicenseInfoDialog: (view) =>
    set({
      licenseInfoDialogOpen: true,
      licenseInfoView: view ?? { mode: 'success', email: 'Nora@gmail.com', subscription: 'lifetime' },
    }),
  closeLicenseInfoDialog: () => set({ licenseInfoDialogOpen: false }),
}))

export function formatRecordingTime(totalSeconds: number) {
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0')
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0')
  const seconds = String(totalSeconds % 60).padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
}
