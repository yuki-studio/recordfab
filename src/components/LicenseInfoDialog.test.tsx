import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import LicenseInfoDialog from './LicenseInfoDialog'

describe('LicenseInfoDialog', () => {
  afterEach(() => {
    cleanup()
  })

  it('uses design dimensions 480x274 and close button position', () => {
    render(<LicenseInfoDialog open onClose={() => {}} />)

    const dialog = screen.getByRole('dialog')
    expect(dialog.className).toContain('w-[480px]')
    expect(dialog.className).toContain('h-[274px]')

    const closeButton = screen.getByRole('button', { name: 'Close' })
    expect(closeButton.className).toContain('absolute')
    expect(closeButton.className).toContain('right-5')
    expect(closeButton.className).toContain('top-5')
    expect(closeButton.className).toContain('size-4')
  })
})

