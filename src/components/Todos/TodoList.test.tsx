/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react'
import { render } from '@testing-library/react'
import TodoList from './TodoList'

const mockTodos = [
  { id: '1', text: 'Task 1', isCompleted: false },
  { id: '2', text: 'Task 2', isCompleted: true },
]

describe('TodoList', () => {
  test('рендерит список задач', () => {
    const { getByText, getAllByRole } = render(
      <TodoList
        todos={mockTodos}
        toggleTodo={() => {}}
        deleteTodo={() => {}}
      />,
    )
    expect(getByText('Task 1')).toBeInTheDocument()
    expect(getByText('Task 2')).toBeInTheDocument()
    expect(getAllByRole('listitem')).toHaveLength(2)
  })

  test('показывает "No todos here", если массив пуст', () => {
    const { getByText } = render(
      <TodoList todos={[]} toggleTodo={() => {}} deleteTodo={() => {}} />,
    )
    expect(getByText('No todos here')).toBeInTheDocument()
  })
})
