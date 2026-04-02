/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoFilter from './TodoFilter'

describe('TodoFilter', () => {
  test('отображает три кнопки', () => {
    const { getByText } = render(
      <TodoFilter filter="all" setFilter={() => {}} />,
    )
    expect(getByText('All')).toBeInTheDocument()
    expect(getByText('Active')).toBeInTheDocument()
    expect(getByText('Completed')).toBeInTheDocument()
  })

  test('при клике на "Active" вызывается setFilter с "active"', async () => {
    const mockSetFilter = jest.fn()
    const { getByText } = render(
      <TodoFilter filter="all" setFilter={mockSetFilter} />,
    )
    const activeButton = getByText('Active')
    await userEvent.click(activeButton)
    expect(mockSetFilter).toHaveBeenCalledWith('active')
  })
})
