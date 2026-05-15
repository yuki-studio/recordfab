import { Filter, Folder, FolderOpen, Search, X } from 'lucide-react'
import { formatRecordingTime, useRecording } from '../stores/recording'

export default function FilesPage() {
  const files = useRecording((s) => s.files)

  // Mock total file size (in bytes) - in a real app this would come from actual file data
  const totalSizeGB = 50 // Mock: 50GB total

  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#202020] px-8 py-6">
      <h1 className="text-xl font-semibold text-[#eee]">My Files</h1>

      <section className="mt-5 flex min-h-0 flex-1 flex-col rounded-lg bg-[#242426]">
        <div className="flex items-center justify-between border-b border-[#2a2a2c] px-4 py-3">
          <div className="text-sm font-medium text-[#eee]">Recorded</div>
          <div className="flex items-center gap-2">
            <button className="rounded-md p-1.5 text-[#aeb1b6] hover:bg-white/5" aria-label="Filter" title="Filter">
              <Filter size={14} />
            </button>
            <label className="flex items-center gap-1.5 rounded-md border border-[#292929] bg-[#202020] px-2 py-1">
              <Search size={12} className="text-[#595b5f]" />
              <input
                type="text"
                placeholder="Search"
                aria-label="Search"
                className="w-32 bg-transparent text-xs text-[#aeb1b6] outline-none placeholder:text-[#595b5f]"
              />
            </label>
            <button
              className="rounded-md p-1.5 text-[#aeb1b6] hover:bg-white/5"
              aria-label="Open Folder"
              title="Open Folder"
            >
              <Folder size={14} />
            </button>
            <button
              className="rounded-md p-1.5 text-[#aeb1b6] hover:bg-white/5"
              aria-label="Delete All"
              title="Delete All"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-auto">
          {files.length === 0 ? (
            <div className="grid h-full place-items-center text-sm text-[#595b5f]">
              No recorded files yet.
            </div>
          ) : (
            <ul className="py-3">
              {files.map((f, idx) => (
                <li key={f.id} className="px-4">
                  <div
                    className={`flex h-24 items-center justify-between rounded-lg px-4 ${
                      idx % 2 === 1 ? 'bg-[#2a2a2c]' : 'bg-[#242426]'
                    }`}
                  >
                    <div className="flex min-w-0 items-center">
                      <img
                        src="/figma/default_cover.png"
                        alt=""
                        className="mr-4 h-[72px] w-32 shrink-0 rounded-lg object-cover bg-[#323234]"
                      />
                      <div className="flex flex-col justify-center min-w-0">
                        <div className="flex items-center gap-[10px] min-w-0">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#202020] text-[12px] font-semibold text-[#eee]">
                            {String(f.site ?? f.title).trim().charAt(0).toUpperCase()}
                          </div>
                          <div className="truncate text-[14px] leading-5 text-[#eee]">
                            {f.title || 'This is the tittle of the Video'}
                          </div>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <TagPill>{formatRecordingTime(f.durationSeconds)}</TagPill>
                          <TagPill>{resolutionToTag(f.resolution)}</TagPill>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        aria-label="Open Containing Folder"
                        title="Open Containing Folder"
                        className="grid h-8 w-8 place-items-center rounded-md text-[#aeb1b6] hover:bg-white/5"
                      >
                        <FolderOpen size={16} />
                      </button>
                      <button
                        type="button"
                        aria-label="Delete"
                        title="Delete"
                        className="grid h-8 w-8 place-items-center rounded-md text-[#aeb1b6] hover:bg-white/5"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* File stats at bottom left */}
      <div
        className="mt-7 font-['Arial'] text-[14px] font-normal leading-5 text-[#AEB1B6]"
      >
        <span>{files.length} Files</span>
        <span className="mx-3">|</span>
        <span>{totalSizeGB}G</span>
      </div>
    </div>
  )
}

function TagPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-[12px] border border-[rgba(250,138,3,0.3)] px-2.5 py-[3px] text-[12px] leading-[18px] text-[#fa8a03]">
      {children}
    </span>
  )
}

function resolutionToTag(resolution: string) {
  const r = resolution.toLowerCase()
  if (r.includes('1080')) return '1080p'
  if (r.includes('720')) return '720p'
  if (r.includes('540')) return '540p'
  return resolution
}
