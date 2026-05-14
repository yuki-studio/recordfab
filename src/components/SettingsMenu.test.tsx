import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import SettingsMenu from './SettingsMenu'

describe('SettingsMenu', () => {
  afterEach(() => {
    cleanup()
  })

  it('uses design-like sizing for the dropdown menu', () => {
    render(
      <SettingsMenu
        open
        onClose={() => {}}
        onOpenAuthorize={() => {}}
        onOpenLicenseInfo={() => {}}
      />
    )

    const menu = screen.getByRole('menu', { name: 'Settings' })
    expect(menu.className).toContain('w-[264px]')

    const title = screen.getByText('Settings')
    expect(title.className).toContain('h-[54px]')

    const authorize = screen.getByRole('menuitem', { name: 'Authorize' })
    expect(authorize.className).toContain('h-11')
  })
})
