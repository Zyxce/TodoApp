import React, { useState, useEffect } from 'react'
import style from '../styles/components/App.module.css'
import { v4 as uuidv4 } from 'uuid'
import { Todo, Filter } from '../types'
import TodoForm from './Todos/TodoForm'
import TodoList from './Todos/TodoList'
import TodoFilter from './Todos/TodoFilter'
import TodosActions from './Todos/TodosActions'

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<Filter>('all')
  // Добавление задачи
  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: uuidv4(),
      text: text,
      isCompleted: false,
    }
    setTodos((prev) => [...prev, newTodo])
  }
  // переключение статуса задачи
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

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.isCompleted
    if (filter === 'completed') return todo.isCompleted
    return true
  })

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.isCompleted))
  }

  useEffect(() => {
    const stored = localStorage.getItem('todos')
    if (stored) {
      setTodos(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const remainingCount = todos.filter((t) => !t.isCompleted).length
  const hasCompleted = todos.some((t) => t.isCompleted)
  return (
    <div className={style.appContainer}>
      <div className={style.todoContainer}>
        <h1 className={style.todoHeader}>Task List</h1>
        <TodoForm addTodo={addTodo}></TodoForm>
        <TodoFilter filter={filter} setFilter={setFilter} />
        <TodoList
          todos={filteredTodos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
        <TodosActions
          remaining={remainingCount}
          hasCompleted={hasCompleted}
          clearCompleted={clearCompleted}
        />
      </div>
    </div>
  )
}

export default App
