import React from 'react'
import { TodoItemProps } from '../../types'
import style from '../../styles/components/Todos/TodoItem.module.css'

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  toggleTodo,
  deleteTodo,
}) => {
  return (
    <li className={style.itemList}>
      <label className={style.labelContainer}>
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => toggleTodo(todo.id)}
          className={style.checkbox}
        ></input>
        <span className={style.labelText}>{todo.text}</span>
      </label>
      <button
        className={style.deleteBtn}
        onClick={() => deleteTodo(todo.id)}
        data-testid="delete-btn"
      >
        Delete
      </button>
    </li>
  )
}

export default TodoItem
