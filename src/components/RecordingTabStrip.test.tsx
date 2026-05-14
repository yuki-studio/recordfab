import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import RecordingTabStrip from './RecordingTabStrip'

describe('RecordingTabStrip', () => {
  afterEach(() => {
    cleanup()
  })

  it('uses fixed tab size 224x44 for all tabs', () => {
    render(
      <RecordingTabStrip
        tabs={[
          { id: 'home', label: 'Home', iconHome: true },
          { id: 't1', label: 'Netflix', iconSrc: '/figma/tab_icon_netflix.svg' },
        ]}
        activeTabId="home"
        onSelect={() => {}}
      />
    )

    const home = screen.getByRole('button', { name: 'Home' })
    const netflix = screen.getByRole('button', { name: /netflix/i })

    expect(home.className.includes('h-11')).toBe(true)
    expect(netflix.className.includes('h-11')).toBe(true)
    expect(home.className.includes('w-[224px]')).toBe(true)
    expect(netflix.className.includes('w-[224px]')).toBe(true)
  })

  it('sets title and aria-label for the tab close icon', () => {
    render(
      <RecordingTabStrip
        tabs={[
          { id: 'home', label: 'Home', iconHome: true },
          { id: 't1', label: 'Netflix', iconSrc: '/figma/tab_icon_netflix.svg' },
        ]}
        activeTabId="t1"
        onSelect={() => {}}
        onCloseTab={() => {}}
      />
    )

    fireEvent.mouseEnter(screen.getByRole('button', { name: /netflix/i }))

    const close = screen.getByLabelText('Close')
    expect(close.getAttribute('title')).toBe('Close')
  })
})
