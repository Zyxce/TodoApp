import { v4 as uuidv4 } from 'uuid'
import useLocalStorage from './useLocalStorage'
import { Todo } from '../types'

const useTodos = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', [])

  // Добавление задачи
  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: uuidv4(),
      text: text,
      isCompleted: false,
    }
    setTodos((prev) => [...prev, newTodo])
  }
  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      ),
    )
  }
  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }
  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.isCompleted))
  }
  const remainingCount = todos.filter((t) => !t.isCompleted).length
  const hasCompleted = todos.some((t) => t.isCompleted)
  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    remainingCount,
    hasCompleted,
  }
}

export default useTodos
