import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import RecordSettingDialog from './RecordSettingDialog'
import { useRecording } from '../stores/recording'

describe('RecordSettingDialog', () => {
  afterEach(() => {
    cleanup()
    useRecording.setState({
      recordSettingOpen: false,
      customDuration: true,
      stopAfterMinutes: 2,
    })
  })

  it('collapses and expands duration input when toggled', () => {
    useRecording.setState({ recordSettingOpen: true, customDuration: false })
    render(<RecordSettingDialog recordTitle="Prime Video Stream - Watch Live" />)

    expect(screen.queryByTestId('custom-duration-row')).toBeNull()

    fireEvent.click(screen.getByRole('switch'))
    expect(screen.getByTestId('custom-duration-row')).toBeTruthy()
  })

  it('keeps a fixed 20px spacing between duration area and footer buttons', () => {
    useRecording.setState({ recordSettingOpen: true, customDuration: true })
    render(<RecordSettingDialog recordTitle="Prime Video Stream - Watch Live" />)

    const section = screen.getByTestId('custom-duration-section')
    expect(section.className.includes('mt-4')).toBe(true)

    const footer = screen.getByTestId('record-setting-footer')
    expect(footer.className.includes('mt-5')).toBe(true)
    expect(footer.className.includes('absolute')).toBe(false)
  })

  it('uses design dimensions 624x414 and close button position', () => {
    useRecording.setState({ recordSettingOpen: true, customDuration: true })
    render(<RecordSettingDialog recordTitle="Prime Video Stream - Watch Live" />)

    const dialog = screen.getByRole('dialog')
    expect(dialog.className).toContain('w-[624px]')
    expect(dialog.className).toContain('h-[414px]')

    const closeButton = screen.getByRole('button', { name: 'Close' })
    expect(closeButton.className).toContain('absolute')
    expect(closeButton.className).toContain('right-5')
    expect(closeButton.className).toContain('top-5')
    expect(closeButton.className).toContain('size-4')
  })
})
