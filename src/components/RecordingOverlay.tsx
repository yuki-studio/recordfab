import { formatRecordingTime } from '../stores/recording'

type Props = {
  recordingSeconds: number
}

export default function RecordingOverlay({ recordingSeconds }: Props) {
  return (
    <div className="pointer-events-auto absolute left-[133px] right-[127px] bottom-10 z-40">
      <div
        className="flex h-[112px] items-center justify-center"
        style={{
          background:
            'linear-gradient(to right, rgba(0,0,0,0) 0%, #000 50%, rgba(0,0,0,0) 100%)',
        }}
      >
        <div className="flex w-[460px] flex-col items-center text-center">
          <div className="text-[24px] font-bold leading-9 text-[#eee]">
            Recording Duration: {formatRecordingTime(recordingSeconds)}
          </div>
          <div className="mt-1 text-[14px] leading-5 text-[#aeb1b6]">
            To ensure smooth recording, other actions are disabled.
            <br />
            You can click &quot;Stop&quot; to end the recording or simply close the webpage.
          </div>
        </div>
      </div>
    </div>
  )
}
