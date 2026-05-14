import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import BrowserToolbar from './BrowserToolbar'

describe('BrowserToolbar', () => {
  afterEach(() => {
    cleanup()
  })

  it('sets title and aria-label for navigation icons', () => {
    render(<BrowserToolbar url="https://example.com" supported={false} />)

    const previous = screen.getByLabelText('Previous')
    const next = screen.getByLabelText('Next')
    const refresh = screen.getByLabelText('Refresh')

    expect(previous.getAttribute('title')).toBe('Previous')
    expect(next.getAttribute('title')).toBe('Next')
    expect(refresh.getAttribute('title')).toBe('Refresh')
  })
})

