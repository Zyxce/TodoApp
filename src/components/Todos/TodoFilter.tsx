import React from 'react'
import { TodoFilterProps, Filter } from '../../types'
import style from '../../styles/components/Todos/TodoFilter.module.css'

const TodoFilter: React.FC<TodoFilterProps> = ({ filter, setFilter }) => {
  const filters: Filter[] = ['all', 'active', 'completed']
  return (
    <div className={style.filters}>
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`${style.filterBtn} ${
            filter === f ? style.active : style.inactive
          }`}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  )
}

export default TodoFilter
