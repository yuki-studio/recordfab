import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import HomePage from './HomePage'
import { useRecording } from '../stores/recording'

describe('HomePage', () => {
  afterEach(() => {
    cleanup()
    useRecording.setState({ openTabs: [{ id: 'home', label: 'Home', iconHome: true }], activeTabId: 'home' })
  })

  it('sets title and aria-label for address bar navigation icons', () => {
    useRecording.setState({ openTabs: [{ id: 'home', label: 'Home', iconHome: true }], activeTabId: 'home' })
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )

    const previous = screen.getByLabelText('Previous')
    const next = screen.getByLabelText('Next')
    const refresh = screen.getByLabelText('Refresh')

    expect(previous.getAttribute('title')).toBe('Previous')
    expect(next.getAttribute('title')).toBe('Next')
    expect(refresh.getAttribute('title')).toBe('Refresh')
  })

  it('uses design width 800 for the top search input', () => {
    useRecording.setState({ openTabs: [{ id: 'home', label: 'Home', iconHome: true }], activeTabId: 'home' })
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )

    const search = screen.getByTestId('home-search')
    expect(search.className.includes('w-[800px]')).toBe(true)
  })
})
