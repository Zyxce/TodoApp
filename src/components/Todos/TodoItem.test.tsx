/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoItem from './TodoItem'

const mockTodo = { id: '123', text: 'Test task', isCompleted: false }
const mockToggle = jest.fn()
const mockDelete = jest.fn()

describe('TodoItem', () => {
  test('отображает текст задачи', () => {
    const { getByText } = render(
      <TodoItem
        todo={mockTodo}
        toggleTodo={mockToggle}
        deleteTodo={mockDelete}
      />,
    )
    expect(getByText('Test task')).toBeInTheDocument()
  })

  test('чекбокс вызывает toggleTodo с правильным id', async () => {
    const { getByRole } = render(
      <TodoItem
        todo={mockTodo}
        toggleTodo={mockToggle}
        deleteTodo={mockDelete}
      />,
    )
    const checkbox = getByRole('checkbox')
    await userEvent.click(checkbox)
    expect(mockToggle).toHaveBeenCalledWith('123')
  })

  test('кнопка Delete вызывает deleteTodo с правильным id', async () => {
    const { getByTestId } = render(
      <TodoItem
        todo={mockTodo}
        toggleTodo={mockToggle}
        deleteTodo={mockDelete}
      />,
    )
    const deleteButton = getByTestId('delete-btn')
    await userEvent.click(deleteButton)
    expect(mockDelete).toHaveBeenCalledWith('123')
  })
})
