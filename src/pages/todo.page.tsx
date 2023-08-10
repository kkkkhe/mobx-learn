import { observer } from "mobx-react-lite";
import { todoStore } from "../entities/todos/todo.model";
import { createTodo } from "../features/todos/todo-create";
import { FormEvent } from "react";
export const TodoPage = observer(() => {
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    createTodo.createTodo()
  }
  return (
    <div>
      {todoStore.todos.map(({id, text}) => {
        return (
          <div key={id}>
            {text}
          </div>
      )
      })}
      <form action="">
        <input type="text" value={createTodo.title} placeholder="title" onChange={(e) => createTodo.changeTitle(e.target.value)} />
        <button onClick={onSubmit}>Create</button>
      </form>
    </div>
  )
})