import React, { useState } from 'react'
import style from '../styles/components/App.module.css'
import { Filter } from '../types'
import TodoForm from './Todos/TodoForm'
import TodoList from './Todos/TodoList'
import TodoFilter from './Todos/TodoFilter'
import TodosActions from './Todos/TodosActions'
import useTodos from '../hooks/useTodos'

const App: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('all')

  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    remainingCount,
    hasCompleted,
  } = useTodos()

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.isCompleted
    if (filter === 'completed') return todo.isCompleted
    return true
  })

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
