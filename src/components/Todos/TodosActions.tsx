import React from 'react'
import { TodosActionsProps } from '../../types'
import style from '../../styles/components/Todos/TodosActions.module.css'

const TodosActions: React.FC<TodosActionsProps> = ({
  remaining,
  clearCompleted,
  hasCompleted,
}) => {
  return (
    <div className={style.actions}>
      <span className={style.remaining}>
        {remaining === 0 && hasCompleted && 'All tasks completed'}
        {remaining === 0 && !hasCompleted && 'Add new task'}
        {remaining > 0 &&
          `${remaining} ${remaining > 1 ? 'tasks' : 'task'} left`}
      </span>
      {hasCompleted && (
        <button className={style.clearBtn} onClick={clearCompleted}>
          Clear Completed
        </button>
      )}
    </div>
  )
}

export default TodosActions
