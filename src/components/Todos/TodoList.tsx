import React from 'react'
import { TodoListProps } from '../../types'
import TodoItem from './TodoItem'
import style from '../../styles/components/Todos/TodoList.module.css'

const TodoList: React.FC<TodoListProps> = ({
  todos,
  toggleTodo,
  deleteTodo,
}) => {
  return (
    <ul className={style.listTodos}>
      {todos.length === 0 ? (
        <div className={style.itemContainer}>
          <p className={style.noTodos}>No todos here</p>
        </div>
      ) : (
        todos.map((todo) => (
          <div className={style.itemContainer} key={todo.id}>
            <TodoItem
              todo={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            ></TodoItem>
          </div>
        ))
      )}
    </ul>
  )
}

export default TodoList
