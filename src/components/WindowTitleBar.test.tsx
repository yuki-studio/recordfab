import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import WindowTitleBar from './WindowTitleBar'
import { useRecording } from '../stores/recording'

describe('WindowTitleBar', () => {
  afterEach(() => {
    cleanup()
    useRecording.setState({
      browserHistory: [],
      authorizeDialogOpen: false,
      licenseInfoDialogOpen: false,
      licenseInfoView: { mode: 'success', email: 'Nora@gmail.com', subscription: 'lifetime' },
    })
  })

  it('sets title for window control icons only', () => {
    useRecording.setState({
      browserHistory: [],
      authorizeDialogOpen: false,
      licenseInfoDialogOpen: false,
    })

    render(<WindowTitleBar />)

    const minimize = screen.getByLabelText('Minimize')
    const maximize = screen.getByLabelText('Maximize')
    const exit = screen.getByLabelText('Exit')

    expect(minimize.getAttribute('title')).toBe('Minimize')
    expect(maximize.getAttribute('title')).toBe('Maximize')
    expect(exit.getAttribute('title')).toBe('Exit')

    const history = screen.getByLabelText('history')
    const theme = screen.getByLabelText('theme')
    const menu = screen.getByLabelText('menu')

    expect(history.getAttribute('title')).toBe(null)
    expect(theme.getAttribute('title')).toBe(null)
    expect(menu.getAttribute('title')).toBe(null)
  })
})

