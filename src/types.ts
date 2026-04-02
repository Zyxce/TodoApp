export interface Todo {
  id: string
  text: string
  isCompleted: boolean
}

export type Filter = 'all' | 'active' | 'completed'

export interface TodoFormProps {
  addTodo: (text: string) => void
}

export interface TodoItemProps {
  todo: Todo
  toggleTodo: (id: string) => void
  deleteTodo: (id: string) => void
}

export interface TodoFilterProps {
  filter: Filter
  setFilter: (filter: Filter) => void
}

export interface TodoListProps {
  todos: Todo[]
  toggleTodo: (id: string) => void
  deleteTodo: (id: string) => void
}

export interface TodosActionsProps {
  remaining: number
  clearCompleted: () => void
  hasCompleted: boolean
}
