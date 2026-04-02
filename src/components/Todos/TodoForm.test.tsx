/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoForm from './TodoForm'

describe('TodoForm', () => {
  test('вызывает addTodo с текстом и очищает поле', async () => {
    const mockAddTodo = jest.fn()
    const { getByPlaceholderText, getByText } = render(
      <TodoForm addTodo={mockAddTodo} />,
    )
    const input = getByPlaceholderText('Add a new task')
    const button = getByText('Add Task')

    await userEvent.type(input, 'New task')
    await userEvent.click(button)

    expect(mockAddTodo).toHaveBeenCalledWith('New task')
    expect(input).toHaveValue('')
  })

  test('не вызывает addTodo, если поле пустое', async () => {
    const mockAddTodo = jest.fn()
    const { getByText } = render(<TodoForm addTodo={mockAddTodo} />)
    const button = getByText('Add Task')

    await userEvent.click(button)

    expect(mockAddTodo).not.toHaveBeenCalled()
  })
})
