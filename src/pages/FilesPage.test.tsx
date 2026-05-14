import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import FilesPage from './FilesPage'
import { useRecording } from '../stores/recording'

describe('FilesPage', () => {
  afterEach(() => {
    cleanup()
    useRecording.setState({
      files: [],
    })
  })

  it('sets title and aria-label for toolbar icons', () => {
    render(<FilesPage />)

    const filter = screen.getByLabelText('Filter')
    const openFolder = screen.getByLabelText('Open Folder')
    const deleteAll = screen.getByLabelText('Delete All')

    expect(filter.getAttribute('title')).toBe('Filter')
    expect(openFolder.getAttribute('title')).toBe('Open Folder')
    expect(deleteAll.getAttribute('title')).toBe('Delete All')
  })

  it('sets title and aria-label for item action icons', () => {
    useRecording.setState({
      files: [
        {
          id: 'file-1',
          title: 'Test video',
          site: 'netflix',
          resolution: 'Full HD - 1080P',
          durationSeconds: 65,
          finishedAt: Date.now(),
        },
      ],
    })

    render(<FilesPage />)

    const openContainingFolder = screen.getByLabelText('Open Containing Folder')
    const deleteItem = screen.getByLabelText('Delete')

    expect(openContainingFolder.getAttribute('title')).toBe('Open Containing Folder')
    expect(deleteItem.getAttribute('title')).toBe('Delete')
  })
})

