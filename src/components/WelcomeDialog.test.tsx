import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import WelcomeDialog from './WelcomeDialog'
import AuthorizeDialog from './AuthorizeDialog'
import { useRecording } from '../stores/recording'

function DialogHarness() {
  const authorizeOpen = useRecording((s) => s.authorizeDialogOpen)
  const closeAuthorize = useRecording((s) => s.closeAuthorizeDialog)

  return (
    <>
      <WelcomeDialog />
      <AuthorizeDialog open={authorizeOpen} onClose={closeAuthorize} />
    </>
  )
}

describe('WelcomeDialog', () => {
  beforeEach(() => {
    useRecording.setState({
      welcomeOpen: true,
      authorizeDialogOpen: false,
    })
  })

  afterEach(() => {
    cleanup()
  })

  it('opens authorize dialog when Start Free Trial is clicked', () => {
    render(<DialogHarness />)

    fireEvent.click(screen.getByRole('button', { name: 'Start Free Trial' }))

    expect(useRecording.getState().welcomeOpen).toBe(false)
    expect(useRecording.getState().authorizeDialogOpen).toBe(true)
    expect(screen.getByText('Authorize this computer with your account.')).toBeTruthy()
  })
})
