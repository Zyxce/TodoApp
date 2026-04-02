import React, { FormEvent, useState } from 'react'
import { TodoFormProps } from '../../types'
import style from '../../styles/components/Todos/TodoForm.module.css'

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [text, setText] = useState<string>('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    addTodo(text.trim())
    setText('')
  }
  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <input
        className={style.input}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task"
      ></input>
      <button type="submit" className={style.addBtn}>
        Add Task
      </button>
    </form>
  )
}

export default TodoForm
