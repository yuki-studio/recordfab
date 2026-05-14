import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout'

describe('Layout', () => {
  afterEach(() => {
    cleanup()
  })

  it('uses design spec sizes for sidebar and main area', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<div />} />
          </Route>
        </Routes>
      </MemoryRouter>
    )

    const frame = screen.getByTestId('app-frame')
    const sidebar = screen.getByTestId('app-sidebar')
    const main = screen.getByTestId('app-main')

    expect(frame.className.includes('w-[1200px]')).toBe(true)
    expect(frame.className.includes('h-[700px]')).toBe(true)
    expect(sidebar.className.includes('w-[240px]')).toBe(true)
    expect(main.className.includes('w-[960px]')).toBe(true)
  })
})

