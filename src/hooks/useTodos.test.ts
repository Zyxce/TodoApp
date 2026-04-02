import { renderHook, act } from '@testing-library/react'
import useTodos from './useTodos'
import { v4 as uuidv4 } from 'uuid'

// Мокаем uuid на уровне каждого теста с помощью spy
jest.mock('uuid', () => ({
  v4: jest.fn(),
}))

describe('useTodos', () => {
  let mockUuid: jest.Mock

  beforeEach(() => {
    // Очищаем localStorage перед каждым тестом
    localStorage.clear()
    // Сбрасываем мок uuid и задаём последовательность id
    mockUuid = uuidv4 as jest.Mock
    mockUuid.mockReset()
    // Первый вызов даст id-1, второй id-2 и т.д.
    let counter = 0
    mockUuid.mockImplementation(() => `id-${++counter}`)
  })

  test('addTodo добавляет задачу', () => {
    const { result } = renderHook(() => useTodos())
    act(() => {
      result.current.addTodo('Learn testing')
    })
    expect(result.current.todos).toHaveLength(1)
    expect(result.current.todos[0]).toEqual({
      id: 'id-1',
      text: 'Learn testing',
      isCompleted: false,
    })
    expect(result.current.remainingCount).toBe(1)
    expect(result.current.hasCompleted).toBe(false)
  })

  test('toggleTodo переключает статус задачи', () => {
    const { result } = renderHook(() => useTodos())
    act(() => {
      result.current.addTodo('Task')
    })
    const id = result.current.todos[0].id
    act(() => {
      result.current.toggleTodo(id)
    })
    expect(result.current.todos[0].isCompleted).toBe(true)
    expect(result.current.remainingCount).toBe(0)
    expect(result.current.hasCompleted).toBe(true)
  })

  test('deleteTodo удаляет задачу', () => {
    const { result } = renderHook(() => useTodos())
    act(() => {
      result.current.addTodo('To delete')
    })
    const id = result.current.todos[0].id
    act(() => {
      result.current.deleteTodo(id)
    })
    expect(result.current.todos).toHaveLength(0)
    expect(result.current.remainingCount).toBe(0)
    expect(result.current.hasCompleted).toBe(false)
  })

  test('clearCompleted удаляет только выполненные задачи', () => {
    const { result } = renderHook(() => useTodos())

    act(() => {
      result.current.addTodo('Task 1')
    })
    act(() => {
      result.current.addTodo('Task 2')
    })

    expect(result.current.todos).toHaveLength(2)

    const id1 = result.current.todos[0].id
    const id2 = result.current.todos[1].id

    act(() => {
      result.current.toggleTodo(id1)
    })

    expect(result.current.todos.find((t) => t.id === id1)?.isCompleted).toBe(
      true,
    )
    expect(result.current.todos.find((t) => t.id === id2)?.isCompleted).toBe(
      false,
    )

    act(() => {
      result.current.clearCompleted()
    })

    expect(result.current.todos).toHaveLength(1)
    expect(result.current.todos[0].text).toBe('Task 2')
    expect(result.current.todos[0].isCompleted).toBe(false)
  })
})
