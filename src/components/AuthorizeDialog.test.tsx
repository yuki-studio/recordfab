import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import AuthorizeDialog from './AuthorizeDialog'
import { useRecording } from '../stores/recording'

describe('AuthorizeDialog', () => {
  afterEach(() => {
    cleanup()
    vi.useRealTimers()
    useRecording.setState({ licenseInfoDialogOpen: false, licenseInfoView: { mode: 'success', email: 'Nora@gmail.com', subscription: 'lifetime' } })
  })

  it('shows format error when email is invalid', () => {
    render(<AuthorizeDialog open onClose={() => {}} />)

    fireEvent.change(screen.getByPlaceholderText('Enter your E-mail'), { target: { value: 'abc' } })
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: '123' } })
    fireEvent.click(screen.getByRole('button', { name: 'Authorize' }))

    expect(screen.getByText('E-mail format is incorrect, please check it and try again.')).toBeTruthy()
  })

  it('shows verifying state then closes when email is valid', () => {
    vi.useFakeTimers()
    const onClose = vi.fn()

    render(<AuthorizeDialog open onClose={onClose} />)

    fireEvent.change(screen.getByPlaceholderText('Enter your E-mail'), { target: { value: 'jingjing@gmail.com' } })
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: '123' } })
    fireEvent.click(screen.getByRole('button', { name: 'Authorize' }))

    expect(screen.getByText('Verifying account information......')).toBeTruthy()

    vi.advanceTimersByTime(1200)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('shows waiting state then opens license info when Sign in with Google is clicked', () => {
    vi.useFakeTimers()
    const onClose = vi.fn()
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)

    render(<AuthorizeDialog open onClose={onClose} />)

    fireEvent.click(screen.getByRole('button', { name: /Sign in with Google/i }))

    expect(screen.getByText('Waiting to sign in')).toBeTruthy()

    vi.advanceTimersByTime(1200)

    expect(onClose).toHaveBeenCalledTimes(1)
    expect(useRecording.getState().licenseInfoDialogOpen).toBe(true)
    expect(useRecording.getState().licenseInfoView.mode).toBe('failure')

    openSpy.mockRestore()
  })
})

